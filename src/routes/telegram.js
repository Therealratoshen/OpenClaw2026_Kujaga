/**
 * Telegram Bot Routes
 */

import express from 'express';
const { Router } = express;
import { sendTelegramMessage } from '../services/telegram.js';
import { processUserCommand } from '../services/command.js';
import { logger } from '../lib/logger.js';

export const telegramRouter = Router();

// Telegram webhook
telegramRouter.post('/webhook', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.sendStatus(200);
    }

    const { chat, text, from } = message;
    logger.info(`Telegram message from ${from?.username}: ${text}`);

    // Process user command
    const response = await processUserCommand(text, {
      telegram_id: String(chat.id),
      username: from?.username,
      first_name: from?.first_name
    });

    // Send response
    if (response) {
      await sendTelegramMessage(chat.id, response);
    }

    res.sendStatus(200);
  } catch (error) {
    logger.error('Telegram webhook error:', error);
    res.sendStatus(500);
  }
});

// Send message endpoint (for internal use)
telegramRouter.post('/send', async (req, res) => {
  const { telegram_id, message, buttons } = req.body;
  
  if (!telegram_id || !message) {
    return res.status(400).json({ error: 'telegram_id and message required' });
  }

  try {
    await sendTelegramMessage(telegram_id, message, buttons);
    res.json({ success: true });
  } catch (error) {
    logger.error('Send message error:', error);
    res.status(500).json({ error: error.message });
  }
});