import { Auth0UserProfile } from "auth0-js";
import Cookies from "js-cookie";
import useSWR from "swr";
import useWebAuth from "./useWebAuth";

export default function useUserInfo(token?: string) {
  const webAuth = useWebAuth();
  const user = useSWR(["user-info"], async () => {
    const clientInfo = await new Promise<Auth0UserProfile>(
      (resolve, reject) => {
        const accessToken = token ? token : Cookies.get("accessToken");
        webAuth.client.userInfo(accessToken || "", (err, info) => {
          if (info) resolve(info);
          else reject(err);
        });
      }
    );
    return clientInfo;
  });

  return user;
}
