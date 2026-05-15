/**
 * Kujaga — Main Server
 * Express server with Telegram webhook and cron jobs
 */

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { telegramRouter } from '../routes/telegram.js';
import { monitoringRouter } from '../routes/monitoring.js';
import { paymentRouter } from '../routes/payment.js';
import { healthRouter } from '../routes/health.js';
import { startCronJobs } from '../jobs/monitor.js';
import { logger } from '../lib/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/telegram', telegramRouter);
app.use('/api/monitoring', monitoringRouter);
app.use('/api/payment', paymentRouter);
app.use('/health', healthRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Kujaga',
    tagline: 'Kujaga menjaga namamu, data kamu, dan reputasi kamu.',
    status: 'running',
    version: '1.0.0'
  });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🛡️ Kujaga server started on port ${PORT}`);
  
  // Start cron jobs
  startCronJobs();
  logger.info('✅ Cron jobs initialized');
});

export default app;