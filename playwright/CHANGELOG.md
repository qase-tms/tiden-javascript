# Changelog

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
