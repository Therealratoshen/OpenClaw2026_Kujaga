/**
 * Health Check Routes
 */

import express from 'express';
const { Router } = express;

export const healthRouter = Router();

healthRouter.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

healthRouter.get('/ready', (req, res) => {
  res.json({
    ready: true,
    services: {
      telegram: !!process.env.TELEGRAM_BOT_TOKEN,
      minimax: !!process.env.MINIMAX_API_KEY,
      doku: !!process.env.DOKU_CLIENT_ID
    }
  });
});