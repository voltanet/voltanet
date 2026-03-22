import { publicRoute } from "./base";
import { coreRouter } from "./core";

// Shared router types
export type Router = typeof router;

// Base router structure
export const router = publicRoute.router({
  ...coreRouter,
});
