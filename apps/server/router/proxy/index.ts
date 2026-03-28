import { accessControlRouter } from "./access-control";
import { certificateRouter } from "./certificate";
import { hostRouter } from "./host";

export const proxyRouter = {
  accessControl: accessControlRouter,
  certificate: certificateRouter,
  host: hostRouter,
};
