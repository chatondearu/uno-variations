# Release

## Versioning

Use conventional version bumps and tags:

```bash
pnpm release
```

This command runs `bumpp` and publishes the package manually.

## CI release workflow

On tag pushes matching `v*`, GitHub Actions:

- checks out the repository
- installs dependencies
- generates changelog content

## npm publication on CI

CI publication is currently disabled by default in `.github/workflows/release.yml`.

To enable it:

1. Add the `NPM_TOKEN` secret.
2. Uncomment the publish step.
