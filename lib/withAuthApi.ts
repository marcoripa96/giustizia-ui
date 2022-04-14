import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next"
import { sessionOptions } from "./session";

export const withAuthApi = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>) => {
  return withIronSessionApiRoute(async (req: NextApiRequest, res: NextApiResponse) => {
    const { user } = req.session;

    if (!user || !user.isLoggedIn) {
      return res.status(403).end();
    }

    return handler(req, res);
  }, sessionOptions)
}

