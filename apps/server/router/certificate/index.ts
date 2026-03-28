import { createCertificateRoute } from "./create-certificate.route";
import { deleteCertificateRoute } from "./delete-certificate.route";
import { listCertificateRoute } from "./list-certificate.route";
import { updateCertificateRoute } from "./update-certificate.route";

export const certificateRouter = {
  create: createCertificateRoute,
  delete: deleteCertificateRoute,
  list: listCertificateRoute,
  update: updateCertificateRoute,
};
