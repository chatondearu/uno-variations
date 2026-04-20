# Development

## Quality checks

Run all checks locally before opening a pull request:

```bash
pnpm lint
pnpm typecheck
pnpm test --run
pnpm build
```

## Git hooks

The pre-commit hook installs dependencies in offline mode and runs `lint-staged`.

## CI parity

The CI workflow executes:

- lint
- typecheck
- build
- tests
- dependency audit
- secret scan
