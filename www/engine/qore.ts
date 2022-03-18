import { QoreClient } from "@feedloop/qore-client";
import createQoreContext from "@feedloop/qore-react";
import Cookies from "js-cookie";

const client = new QoreClient({
  endpoint: "https://staging-qore-data-lawyer-170534.qore.dev",
  getToken: () => {
    return Cookies.get("token");
  },
  onError: (err) => {
    console.log(err.message);
  },
});

const qoreContext = createQoreContext(client);
export default qoreContext;