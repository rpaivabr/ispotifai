import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  hello: string;
};

export default (_req: NextApiRequest, res: NextApiResponse<Data>): void => {
  res.status(200).json({ hello: 'world' });
};
