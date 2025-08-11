import { storage } from '../server/storage.js';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const { page = '1', limit = '10', search = '', ministry = '', sortBy = 'latest' } = req.query;
      
      const result = await storage.getJobs({
        page: parseInt(page),
        limit: parseInt(limit),
        search: search as string,
        ministry: ministry as string,
        sortBy: sortBy as string
      });
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Jobs API error:', error);
      res.status(500).json({ error: 'Failed to fetch jobs' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}