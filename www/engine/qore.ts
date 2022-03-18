import { QoreClient } from "@feedloop/qore-client";
import createQoreContext from "@feedloop/qore-react";
import Cookies from "js-cookie";

const client = new QoreClient({
  endpoint: process.env.QORE_ENDPOINT!,
  getToken: () => {
    return Cookies.get("token");
  },
  onError: (err) => {
    alert(err.message);
  },
});

const qoreContext = createQoreContext(client);
export default qoreContext;