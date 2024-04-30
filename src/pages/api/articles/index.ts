import axios from '@/lib/axios';
import { ArticleResponse } from '@/types/article';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ArticleResponse>) {
    const response = await axios.get(`/articles?page=${req.query.page}`);

    const data: ArticleResponse = response.data;

    res.status(200).json(data);
}
