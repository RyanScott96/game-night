# game-night

SvelteKit app (Svelte 5 runes mode) that randomly picks a board game from a local JSON list.

## Tech stack

- Svelte 5, SvelteKit, TypeScript strict mode
- TailwindCSS v4 (Vite plugin)
- Vercel adapter
- Prettier (Svelte + Tailwind plugins) + ESLint 10

## Commands

```sh
npm run dev          # start dev server
npm run build        # production build
npm run check        # svelte-kit sync + svelte-check
npm run lint         # prettier --check . && eslint .
npm run format       # prettier --write .
```

`lint` does not run tests — this project has no test framework. Verification is `check` + `lint` only.

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
- `svelte-kit sync` runs automatically via `npm run prepare` but may need manual re-run after editing `games.json`
- Prettier config enforces `useTabs: true, singleQuote: true, trailingComma: 'none'`
- `.npmrc` has `engine-strict=true` — node version must match `.nvmrc` or `.node-version` if present
