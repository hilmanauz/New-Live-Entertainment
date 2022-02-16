import { WebAuth } from "auth0-js";
import React from "react";

export default function useWebAuth() {
  const ref = React.useRef(
    new WebAuth({
      domain: "vuturist-prod.au.auth0.com",
      clientID: "aC5axc6MVIfxbFkWQWxalEWAu4TXCOCD",
    })
  );
  return ref.current;
}
