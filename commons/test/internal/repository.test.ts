import fs from 'fs';
import os from 'os';
import path from 'path';

import {
  REPOSITORY_ENV,
  resetRepositoryContext,
  resolveRepositoryContext,
} from '../../src/internal/repository';

const REPO_ENV_NAMES = [
  REPOSITORY_ENV,
  'GITHUB_SERVER_URL',
  'GITHUB_REPOSITORY',
  'CI_SERVER_URL',
  'CI_PROJECT_PATH',
  'BITBUCKET_GIT_HTTP_ORIGIN',
  'BUILD_REPOSITORY_URI',
];

const GIT_CONFIG = (remotes: Record<string, string>): string =>
  [
    '[core]',
    '\trepositoryformatversion = 0',
    ...Object.entries(remotes).flatMap(([name, url]) => [
      `[remote "${name}"]`,
      `\turl = ${url}`,
      `\tfetch = +refs/heads/*:refs/remotes/${name}/*`,
    ]),
    '[branch "main"]',
    '\tremote = origin',
    '',
  ].join('\n');

describe('resolveRepositoryContext', () => {
  const saved: Record<string, string | undefined> = {};
  let tmp: string;

  beforeEach(() => {
    for (const name of REPO_ENV_NAMES) {
      saved[name] = process.env[name];
      Reflect.deleteProperty(process.env, name);
    }
    resetRepositoryContext();
    tmp = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'tiden-repo-')));
  });

  afterEach(() => {
    for (const name of REPO_ENV_NAMES) {
      if (saved[name] === undefined) {
        Reflect.deleteProperty(process.env, name);
      } else {
        process.env[name] = saved[name];
      }
    }
    resetRepositoryContext();
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  /** A checkout: `<tmp>/<name>/.git/config` with the given remotes. */
  function checkout(remotes: Record<string, string>, name = 'repo'): string {
    const root = path.join(tmp, name);
    fs.mkdirSync(path.join(root, '.git'), { recursive: true });
    fs.writeFileSync(path.join(root, '.git', 'config'), GIT_CONFIG(remotes));
    return root;
  }

  describe('repository from the environment', () => {
    it('prefers TIDEN_REPOSITORY over every CI variable and over .git/config', () => {
      const root = checkout({ origin: 'git@github.com:from/config.git' });
      process.env[REPOSITORY_ENV] = 'git@github.com:acme/explicit.git';
      process.env['GITHUB_SERVER_URL'] = 'https://github.com';
      process.env['GITHUB_REPOSITORY'] = 'acme/ci';

      expect(resolveRepositoryContext(root).repository).toBe('git@github.com:acme/explicit.git');
    });

    it('joins GITHUB_SERVER_URL and GITHUB_REPOSITORY', () => {
      process.env['GITHUB_SERVER_URL'] = 'https://github.com';
      process.env['GITHUB_REPOSITORY'] = 'acme/shop';

      expect(resolveRepositoryContext(tmp).repository).toBe('https://github.com/acme/shop');
    });

    it('joins CI_SERVER_URL and CI_PROJECT_PATH, keeping a nested GitLab group path', () => {
      process.env['CI_SERVER_URL'] = 'https://gitlab.example.com/';
      process.env['CI_PROJECT_PATH'] = 'group/sub/shop';

      expect(resolveRepositoryContext(tmp).repository).toBe('https://gitlab.example.com/group/sub/shop');
    });

    it('takes BITBUCKET_GIT_HTTP_ORIGIN as it is', () => {
      process.env['BITBUCKET_GIT_HTTP_ORIGIN'] = 'http://bitbucket.org/acme/shop';

      expect(resolveRepositoryContext(tmp).repository).toBe('http://bitbucket.org/acme/shop');
    });

    it('takes BUILD_REPOSITORY_URI as it is', () => {
      process.env['BUILD_REPOSITORY_URI'] = 'https://dev.azure.com/acme/proj/_git/shop';

      expect(resolveRepositoryContext(tmp).repository).toBe('https://dev.azure.com/acme/proj/_git/shop');
    });

    it('ignores half of a pair and falls through to the next source', () => {
      process.env['GITHUB_REPOSITORY'] = 'acme/shop'; // no GITHUB_SERVER_URL
      process.env['CI_SERVER_URL'] = 'https://gitlab.example.com'; // no CI_PROJECT_PATH
      process.env['BUILD_REPOSITORY_URI'] = 'https://dev.azure.com/acme/proj/_git/shop';

      expect(resolveRepositoryContext(tmp).repository).toBe('https://dev.azure.com/acme/proj/_git/shop');
    });

    it('treats empty and blank variables as unset', () => {
      process.env[REPOSITORY_ENV] = '   ';
      process.env['GITHUB_SERVER_URL'] = '';
      const root = checkout({ origin: 'git@github.com:acme/shop.git' });

      expect(resolveRepositoryContext(root).repository).toBe('git@github.com:acme/shop.git');
    });

    it('collapses a long run of trailing slashes on the server URL without backtracking', () => {
      process.env['GITHUB_SERVER_URL'] = 'https://github.com' + '/'.repeat(50_000);
      process.env['GITHUB_REPOSITORY'] = 'acme/shop';

      expect(resolveRepositoryContext(tmp).repository).toBe('https://github.com/acme/shop');
    });

    it('lets the first CI source in the documented order win', () => {
      process.env['GITHUB_SERVER_URL'] = 'https://github.com';
      process.env['GITHUB_REPOSITORY'] = 'acme/gh';
      process.env['CI_SERVER_URL'] = 'https://gitlab.example.com';
      process.env['CI_PROJECT_PATH'] = 'acme/gl';

      expect(resolveRepositoryContext(tmp).repository).toBe('https://github.com/acme/gh');
    });
  });

  describe('repository from .git/config', () => {
    it('reads the origin URL, not another remote listed before it', () => {
      const root = checkout({
        upstream: 'git@github.com:upstream/shop.git',
        origin: 'git@github.com:acme/shop.git',
      });

      expect(resolveRepositoryContext(root).repository).toBe('git@github.com:acme/shop.git');
    });

    it('is undefined when there is no origin remote', () => {
      const root = checkout({ upstream: 'git@github.com:upstream/shop.git' });

      const context = resolveRepositoryContext(root);

      expect(context.repository).toBeUndefined();
      expect(context.root).toBe(root);
    });

    it('is undefined when the config file is missing', () => {
      const root = path.join(tmp, 'bare');
      fs.mkdirSync(path.join(root, '.git'), { recursive: true });

      expect(resolveRepositoryContext(root)).toEqual({ repository: undefined, root });
    });

    it('accepts CRLF line endings, a quoted value and spacing around the section name', () => {
      const root = path.join(tmp, 'crlf');
      fs.mkdirSync(path.join(root, '.git'), { recursive: true });
      fs.writeFileSync(
        path.join(root, '.git', 'config'),
        '[ remote  "origin" ]\r\n\t# a comment\r\n\turl = "https://example.com/acme/shop.git"\r\n',
      );

      expect(resolveRepositoryContext(root).repository).toBe('https://example.com/acme/shop.git');
    });

    it('finds the repository from a subdirectory of the checkout', () => {
      const root = checkout({ origin: 'git@github.com:acme/shop.git' });
      const nested = path.join(root, 'packages', 'web', 'src');
      fs.mkdirSync(nested, { recursive: true });

      expect(resolveRepositoryContext(nested)).toEqual({
        repository: 'git@github.com:acme/shop.git',
        root,
      });
    });

    it('uses the nearest repository when checkouts are nested', () => {
      const outer = checkout({ origin: 'git@github.com:acme/outer.git' }, 'outer');
      const inner = path.join(outer, 'vendor', 'inner');
      fs.mkdirSync(path.join(inner, '.git'), { recursive: true });
      fs.writeFileSync(
        path.join(inner, '.git', 'config'),
        GIT_CONFIG({ origin: 'git@github.com:acme/inner.git' }),
      );

      expect(resolveRepositoryContext(inner)).toEqual({
        repository: 'git@github.com:acme/inner.git',
        root: inner,
      });
    });

    it('follows a .git file in a linked worktree to the main repository config through commondir', () => {
      const main = checkout({ origin: 'git@github.com:acme/shop.git' }, 'main');
      const worktreeGitDir = path.join(main, '.git', 'worktrees', 'feature');
      fs.mkdirSync(worktreeGitDir, { recursive: true });
      fs.writeFileSync(path.join(worktreeGitDir, 'commondir'), '../..\n');
      const worktree = path.join(tmp, 'feature-worktree');
      fs.mkdirSync(path.join(worktree, 'src'), { recursive: true });
      fs.writeFileSync(path.join(worktree, '.git'), `gitdir: ${worktreeGitDir}\n`);

      expect(resolveRepositoryContext(path.join(worktree, 'src'))).toEqual({
        repository: 'git@github.com:acme/shop.git',
        root: worktree,
      });
    });

    it('follows a relative gitdir in a submodule .git file', () => {
      const parent = path.join(tmp, 'parent');
      const moduleGitDir = path.join(parent, '.git', 'modules', 'sub');
      fs.mkdirSync(moduleGitDir, { recursive: true });
      fs.writeFileSync(
        path.join(moduleGitDir, 'config'),
        GIT_CONFIG({ origin: 'git@github.com:acme/sub.git' }),
      );
      const sub = path.join(parent, 'sub');
      fs.mkdirSync(sub, { recursive: true });
      fs.writeFileSync(path.join(sub, '.git'), 'gitdir: ../.git/modules/sub\n');

      expect(resolveRepositoryContext(sub)).toEqual({
        repository: 'git@github.com:acme/sub.git',
        root: sub,
      });
    });

    it('has a root but no repository when the .git file does not name a git directory', () => {
      const root = path.join(tmp, 'broken');
      fs.mkdirSync(root, { recursive: true });
      fs.writeFileSync(path.join(root, '.git'), 'not a gitdir pointer\n');

      expect(resolveRepositoryContext(root)).toEqual({ repository: undefined, root });
    });
  });

  it('keeps the repository root when the environment names the repository', () => {
    const root = checkout({});
    process.env[REPOSITORY_ENV] = 'git@github.com:acme/shop.git';

    expect(resolveRepositoryContext(root)).toEqual({
      repository: 'git@github.com:acme/shop.git',
      root,
    });
  });

  it('has neither a repository nor a root outside any checkout', () => {
    // `tmp` sits under the OS temp dir, which has no `.git` above it.
    expect(resolveRepositoryContext(tmp)).toEqual({ repository: undefined, root: undefined });
  });

  it('resolves once per process: a later change is not picked up', () => {
    const root = checkout({ origin: 'git@github.com:acme/first.git' });
    expect(resolveRepositoryContext(root).repository).toBe('git@github.com:acme/first.git');

    fs.writeFileSync(path.join(root, '.git', 'config'), GIT_CONFIG({ origin: 'git@github.com:acme/second.git' }));
    process.env[REPOSITORY_ENV] = 'git@github.com:acme/env.git';

    expect(resolveRepositoryContext(root).repository).toBe('git@github.com:acme/first.git');
    resetRepositoryContext();
    expect(resolveRepositoryContext(root).repository).toBe('git@github.com:acme/env.git');
  });
});
