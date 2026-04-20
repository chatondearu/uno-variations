# Contributing

Thanks for contributing to `uno-variations`.

## Requirements

- Node.js `>=22`
- pnpm `10.13.1`

## Local setup

```bash
pnpm install
```

## Validation commands

Run these before opening a PR:

```bash
pnpm lint
pnpm typecheck
pnpm test --run
pnpm build
```

## Commit format

This repository uses Conventional Commits:

- `fix: ...`
- `feat: ...`
- `docs: ...`
- `refactor: ...`
- `test: ...`
- `chore: ...`

## Release

Releases are tag-driven. The release workflow generates changelog content on tag pushes (`v*`).

Package publishing remains manual unless CI publish is explicitly enabled in `.github/workflows/release.yml`.

## Additional guidelines

For organization-wide practices, see:

- https://github.com/chatondearu/contribute
