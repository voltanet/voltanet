// @ts-nocheck - Skip server references errors
import { createORPCClient, createSafeClient, type InferClientOutputs } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RPCClinet } from "@repo/server/rpc";

const link = new RPCLink({ url: "/api" });
const client: RPCClinet = createORPCClient(link);

export type RPCOutputs = InferClientOutputs<typeof client>;
export const rpc = createSafeClient(client);
