import type { RouterClient } from "@orpc/server";
import type { Router } from "@/router/router";

// Shared RPC types
export type RPCClinet = RouterClient<Router>;
