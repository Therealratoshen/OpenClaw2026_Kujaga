/**
 * URL Safety Service
 */

export async function checkUrlSafety(url) {
  return {
    safe: !url.includes('phishing') && !url.includes('malware'),
    malicious_count: 0,
    suspicious_count: url.includes('suspicious') ? 1 : 0,
    vendors_flagged: [],
    recommendation: '✅ AMAN'
  };
}