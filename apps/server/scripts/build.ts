import { $ } from "bun";

// make dirs if not exist
await $`mkdir -p ./dist/data`;

/**
 * - Bundle to esm
 * - Target Bun runtime
 * - Don't inject env
 * - Strip dev code
 */
await $`bun build ./server.ts --outfile=dist/server.js --target=bun --env=disable --production`;
