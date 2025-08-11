import { storage } from '../server/storage.js';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const stats = await storage.getStatistics();
      res.status(200).json(stats);
    } catch (error) {
      console.error('Statistics API error:', error);
      res.status(500).json({ error: 'Failed to fetch statistics' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}