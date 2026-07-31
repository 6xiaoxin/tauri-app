# Repository quality contract

After changing source code or configuration, AI agents must run:

1. `pnpm fix`
2. `pnpm quality`

Do not report completion while either command emits a warning or error. Never introduce
`any`, suppress a TypeScript or ESLint error, or weaken a quality rule to make checks pass.
When Rust files change, also run `pnpm rust:fmt` before `pnpm quality`.
