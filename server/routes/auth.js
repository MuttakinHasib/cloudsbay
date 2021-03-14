import express from 'express';

const router = express.Router();

router.get('/auth', async (req, res) => {
  return res.json('hi');
});

export default router;
