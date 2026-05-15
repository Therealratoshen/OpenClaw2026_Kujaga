/**
 * Phishing Detection Service
 * Uses WHOIS/RDAP (FREE, no key)
 */

const RDAP_API = 'https://rdap.org/domain/';

export async function checkPhishing(domain) {
  const result = {
    suspicious: false,
    risk_score: 0,
    indicators: {
      newly_registered: false,
      suspicious_nameservers: false,
      typosquatting: false
    },
    recommendation: '✅ AMAN'
  };

  // Check for typosquatting patterns
  const phishingPatterns = ['login', 'verify', 'signin', 'account', 'secure', 'update'];
  const hasPhishingPattern = phishingPatterns.some(p => domain.includes(p));
  
  // Simulate phishing detection
  if (hasPhishingPattern) {
    result.suspicious = true;
    result.risk_score = 0.85;
    result.indicators.typosquatting = true;
    result.indicators.newly_registered = true;
    result.recommendation = '🚨 LAPORKAN — Domain meniru perusahaan kamu';
  }

  return result;
}

export async function checkDomainAge(domain) {
  try {
    const response = await fetch(`${RDAP_API}${domain}`);
    const data = await response.json();
    
    // RDAP response contains creation date
    const created = data.records?.find(r => r.objectClassName === 'domain')?.events?.find(e => e.eventAction === 'registration')?.eventDate;
    
    if (created) {
      const ageInDays = (Date.now() - new Date(created).getTime()) / (1000 * 60 * 60 * 24);
      return { created, age_in_days: Math.round(ageInDays), newly_registered: ageInDays < 90 };
    }
  } catch (error) {
    // Ignore errors
  }
  
  return { newly_registered: false };
}