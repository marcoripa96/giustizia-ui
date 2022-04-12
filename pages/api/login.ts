import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions, User } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'


export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { password } = req.body

    const isLoggedIn = password === process.env.ACCESS_PASSWORD;

    if (!isLoggedIn) {
      res.status(401).json({ message: 'Invalid password' });
    } else {
      const user = { isLoggedIn, date: new Date().toISOString() } as User;

      req.session.user = user;
      await req.session.save();
      res.json(user);
    }
  } else {
    res.status(500);
  }

}