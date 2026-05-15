/**
 * Monitoring Routes
 */

import express from 'express';
const { Router } = express;
import { checkHibp } from '../services/hibp.js';
import { checkGoogleAlerts } from '../services/googleAlerts.js';
import { checkNews } from '../services/news.js';
import { checkPhishing } from '../services/phishing.js';
import { checkUrlSafety } from '../services/urlSafety.js';
import { logger } from '../lib/logger.js';

export const monitoringRouter = Router();

// HIBP check
monitoringRouter.post('/hibp', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'email required' });
  }

  try {
    const result = await checkHibp(email, password);
    res.json(result);
  } catch (error) {
    logger.error('HIBP check error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Brand monitoring
monitoringRouter.post('/brand', async (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'name required' });
  }

  try {
    const result = await checkGoogleAlerts(name);
    res.json(result);
  } catch (error) {
    logger.error('Brand check error:', error);
    res.status(500).json({ error: error.message });
  }
});

// News scan
monitoringRouter.post('/news', async (req, res) => {
  const { company } = req.body;
  
  if (!company) {
    return res.status(400).json({ error: 'company required' });
  }

  try {
    const result = await checkNews(company);
    res.json(result);
  } catch (error) {
    logger.error('News check error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Phishing check
monitoringRouter.post('/phishing', async (req, res) => {
  const { domain } = req.body;
  
  if (!domain) {
    return res.status(400).json({ error: 'domain required' });
  }

  try {
    const result = await checkPhishing(domain);
    res.json(result);
  } catch (error) {
    logger.error('Phishing check error:', error);
    res.status(500).json({ error: error.message });
  }
});

// URL safety check
monitoringRouter.post('/url-safety', async (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'url required' });
  }

  try {
    const result = await checkUrlSafety(url);
    res.json(result);
  } catch (error) {
    logger.error('URL safety check error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Full monitoring cycle
monitoringRouter.post('/cycle', async (req, res) => {
  const { user_id, email, name, companies, domains } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'email required' });
  }

  try {
    // Run all checks in parallel
    const [hibp, brand, newsResults, phishingResults] = await Promise.all([
      checkHibp(email),
      name ? checkGoogleAlerts(name) : null,
      companies ? Promise.all(companies.map(c => checkNews(c))) : [],
      domains ? Promise.all(domains.map(d => checkPhishing(d))) : []
    ]);

    res.json({
      hibp,
      brand,
      news: newsResults,
      phishing: phishingResults,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Full cycle error:', error);
    res.status(500).json({ error: error.message });
  }
});