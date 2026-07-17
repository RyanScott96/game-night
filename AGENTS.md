# game-night

SvelteKit app (Svelte 5 runes mode) that randomly picks a board game from a local JSON list.

## Tech stack

- Svelte 5, SvelteKit, TypeScript strict mode
- TailwindCSS v4 (Vite plugin)
- Node.js adapter (for Docker/self-hosted)
- Prettier (Svelte + Tailwind plugins) + ESLint 10
- Deno for dependency management and task runner

## Docker

Build and run with docker compose. The app is exposed on port 3000 for local network access.

```sh
docker compose up -d    # start in background
docker compose down      # stop
docker compose build --no-cache .  # rebuild without cache
```

Defaults to port 3000. Override with `PORT` env var before running compose:

```sh
PORT=8080 docker compose up -d
```

The container runs a Node.js production server binding to `0.0.0.0`.

## Deno best practices

- Use `deno install` / `deno add` for dependencies (not `npm install`)
- Use `deno task` for project tasks (not `npm run`)
- Run `deno upgrade --check` to verify dependencies after changes
- Deno uses `deno.json` / `deno.jsonc` for configuration — align tasks and imports accordingly

## Commands

```sh
deno task dev          # start dev server
deno task build        # production build
deno task check        # svelte-kit sync + svelte-check
deno task lint         # prettier --check . && eslint .
deno task format       # prettier --write .
```

`task lint` does not run tests — this project has no test framework. Verification is `task check` + `task lint` only.

## Svelte 5 conventions

- All components use runes mode: `$props()`, `$state()`, `$derived()`
- `export let` must NOT be used (vite.config.ts forces runes via `runes` compiler option)
- Reactive props are accessed with `$` prefix: `$game`, `$spinning`
- Event handlers use `onclick`, not `on:click`
- Props use `onselect={callback}` pattern, not `createEventDispatcher`

## Project structure

```
src/
  lib/
    games.json          # game list [{ name, playTime }] — edit this to add games
    games.ts            # Game interface, loadGames(), filterGames()
    types.d.ts          # ambient module for $lib/games.json
    components/game-picker/
      GamePicker.svelte # filter logic, roll animation, maxPlayTime input
      GamePicker.svelte  # filter logic, roll animation, and result display (unified card)
  routes/
    +layout.svelte      # renders children, sets favicon
    +page.svelte        # host page with selected game display
```

## Gotchas

- The app uses `.json` not `.jsonc` — the original `.jsonc` was renamed for SSR compatibility
- `$lib/games.json` import requires the ambient declaration in `src/lib/types.d.ts`
- `svelte-kit sync` runs automatically via `deno task prepare` but may need manual re-run after editing `games.json`
- Prettier config enforces `useTabs: true, singleQuote: true, trailingComma: 'none'`
- `.npmrc` has `engine-strict=true` — node version must match `.nvmrc` or `.node-version` if present
