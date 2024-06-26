import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.get('/profile', middleware.user(), async (_req, res) => {
  const content = fs.readFileSync(path.resolve(__dirname, '../data/profile.json')).toString();
  const profile = JSON.parse(content);
  res.json({ code: 200, data: profile });
});

router.post('/profile', middleware.user(), async (req, res) => {
  const params = req.body;
  fs.writeFileSync(path.resolve(__dirname, '../data/profile.json'), JSON.stringify(params));
  res.json({ code: 200 });
});

export default router;
