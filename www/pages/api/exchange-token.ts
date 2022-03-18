// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, DefaultApi, InlineObject3 } from '@feedloop/qore-sdk';
import { AuthenticationClient } from 'auth0';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getDataByExternalId } from '../../engine/helpers';

type Data = {
  token: string
}

var auth0 = new AuthenticationClient({
  domain: "vuturist-prod.au.auth0.com",
  clientId: "aC5axc6MVIfxbFkWQWxalEWAu4TXCOCD",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const userInfo = await auth0.getProfile(req.body.token);
    const sdk = new DefaultApi(new Configuration({
      apiKey: process.env.ADMIN_SECRET,
      basePath: process.env.QORE_ENDPOINT!
    }));
    const query = getDataByExternalId(userInfo.email) as InlineObject3;
    const users = await sdk.execute(query);
    if (!users.data.results.data.length) {
      const data = await sdk.createRow("users", {
        name: "data",
        data: {
          "external_id": userInfo.email,
          password: userInfo.nickname,
          name: userInfo.name.includes("@") ? userInfo.nickname : userInfo.name,
        }
      });
    }
    const response = await sdk.authorize({
      identifier: userInfo.email
    });
    res.status(200).json({ token: response.data.token });
  } catch (error) {
    // @ts-ignore
    res.status(500).json(error);
  }
}