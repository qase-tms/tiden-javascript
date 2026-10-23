# Changelog

## 0.4.0

- **Every result now carries `identity`** next to the unchanged legacy `signature`:
  `{ language: "js", repository, scope: [<repo-relative POSIX file>], name: [...describe titles, test title] }`.
  Titles are raw, not lowercased or underscored, and the `(Tiden ID: N)` marker is removed from the
  test title, so adding an id to a test does not fork its history. The name ignores `tiden.suite()` / `TidenSuite` annotations and excludes the project.
- **It needs a repository.** `TIDEN_REPOSITORY`, then the CI variables, then the `origin` URL in
  `.git/config`; the file must be under the repository root (the nearest ancestor with `.git`).
  Otherwise no `identity` is sent and one warning is printed per process; results are still
  reported, matched by signature only.
- A server that does not know `identity` yet answers 400 `unknown field "identity"`; the batch is
  resent without it and the reporter stops sending it.
- The run's `clientMeta` carries `gitRepository`.
- **The Playwright project is now a param**, `tiden.playwright.project`, not part of the identity:
  the same test run under `chromium` and `firefox` is one case with two executions. The legacy
  signature still contains the project, unchanged.
- The file-anchor warnings say "spec", the product's new name for what it used to call a
  requirement: `this test cannot be linked to a spec by file anchor`, and an absolute or
  escaping `file_path` "could never match a spec anchor", so the path is derived from the test
  file instead. Wording only; `fields.file_path` and the warning conditions are unchanged.

## 0.3.0

- **Every result now carries `fields.file_path`**, the repo-relative source file of the test —
  the key the server joins a requirement's `repo_file` anchors against. Until now no JS reporter
  set it (only the Go CLI and the PHPUnit reporter did), so a case reported from here could not
  be linked to a requirement by file anchor at all.
- **It depends entirely on `rootDir` / `TIDEN_ROOT_DIR`.** The path is resolved against that
  root; set it to the repository root wherever the runner's cwd is not already it. A file that
  does not resolve under the root omits the field rather than reporting an absolute machine path
  that could never match an anchor, and warns once per file on stderr:
  `tiden: <file> is outside the reporting root, omitting file_path`.
- **A `file_path` the test sets for itself still wins** — it may deliberately name the source
  file under test — but it is held to the same standard a derived one is. An absolute or
  escaping value is replaced by the derived path, with a warning, since keeping it would
  fabricate a link that never joins.

## 0.2.0

- No code changes. Version bumped with the rest of the workspace; the release workflow requires
  all four published packages to match the tag. Requires `@tiden/reporter-commons` `^0.2.0`.
- Note for anyone comparing reporters: this reporter's `signature` has always led with the spec
  file (via `titlePath()`), and it also carries the project name as a segment.
  `@tiden/vitest-reporter` matches the file part as of 0.2.0 but has no project segment; jest
  splits the file on `/`. The three shapes are deliberate and must not be carried across.

## 0.1.1

- No code changes. Requires `@tiden/reporter-commons` `^0.1.1`, which fixes a polynomial ReDoS
  in the step-marker parser this reporter feeds through `tiden.step()` — see the
  [commons changelog](../commons/CHANGELOG.md).

## 0.1.0

Initial Tiden fork release of `@tiden/playwright-reporter`.

- Forked from [`playwright-qase-reporter`](https://github.com/qase-tms/qase-javascript) at commit
  [`d77a157`](https://github.com/qase-tms/qase-javascript/commit/d77a157020fea088ea323050a36b9bf874ad089d)
  (Apache-2.0); wire transport retargeted from Qase TestOps to Tiden's Test Runs API.
- See the [root README](../README.md#lineage) for full fork lineage, and this package's
  [README](./README.md) for the current feature set and configuration reference.
