/**
 * Google Alerts Service — RSS Monitoring
 */

const GOOGLE_ALERTS_RSS = 'https://www.google.com/alerts/feeds';

export async function checkGoogleAlerts(name) {
  // For demo: return simulated mentions
  const mentions = [
    {
      title: `${name} launches new initiative`,
      sentiment: 'positive',
      source: 'Detik',
      date: new Date().toISOString()
    },
    {
      title: `${name} addresses community questions`,
      sentiment: 'neutral',
      source: 'Kompas',
      date: new Date().toISOString()
    }
  ];

  return {
    new_mentions: mentions.length,
    alert_needed: mentions.some(m => m.sentiment === 'negative'),
    mentions
  };
}