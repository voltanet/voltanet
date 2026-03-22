import { $ } from "bun";

// make dirs if not exist
await $`mkdir -p ./dist/data`;

/**
 * - Bundle to binary
 * - Target Bun runtime
 * - Don't inject env
 * - Strip dev code
 */
await $`bun build ./server.ts --outfile=dist/server --target=bun --env=disable --production --compile`;
