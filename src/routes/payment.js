/**
 * Payment Routes — DOKU MCP Integration
 */

import express from 'express';
const { Router } = express;
import { createPaymentLink } from '../services/doku.js';
import { checkSubscription } from '../services/subscription.js';
import { logger } from '../lib/logger.js';

export const paymentRouter = Router();

// Create payment link (DOKU)
paymentRouter.post('/create-link', async (req, res) => {
  const { user_id, plan, amount, customer } = req.body;
  
  if (!user_id || !plan || !amount) {
    return res.status(400).json({ error: 'user_id, plan, and amount required' });
  }

  try {
    const result = await createPaymentLink({
      user_id,
      plan,
      amount,
      customer: customer || {}
    });
    res.json(result);
  } catch (error) {
    logger.error('Create payment link error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Check subscription status
paymentRouter.get('/status/:user_id', async (req, res) => {
  try {
    const result = await checkSubscription(req.params.user_id);
    res.json(result);
  } catch (error) {
    logger.error('Check subscription error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify transaction (webhook from DOKU)
paymentRouter.post('/webhook', async (req, res) => {
  logger.info('Payment webhook received:', req.body);
  
  // Process DOKU payment notification
  // In production: verify signature, update subscription status
  res.sendStatus(200);
});