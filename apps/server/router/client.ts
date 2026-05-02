import type { InferClientOutputs, SafeClient } from "@orpc/client";
import { createORPCClient, createSafeClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import type { Router } from "./router";

const link = new RPCLink({ url: "/api" });
const client: RouterClient<Router> = createORPCClient(link);

export type RPCOutputs = InferClientOutputs<typeof client>;
export const api: SafeClient<typeof client> = createSafeClient(client);
