import type { NextApiRequest, NextApiResponse } from 'next';
import { removeCity } from '@/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const { query } = req;

    const { city: name } = query;

    if (!name) return res.status(200).json({ error: 'Must include name query param' });

    await removeCity(name as string);

    return res.status(200).json({ success: true });
  } catch (err:any) {
    console.log(err);
    return res.status(500).json({
      error: err.message || 'API Error',
    });
  }
}
