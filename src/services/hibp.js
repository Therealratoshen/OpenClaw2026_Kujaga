/**
 * HIBP Service — Password Breach Check
 * Uses k-anonymity API (FREE, no key needed)
 */

import crypto from 'crypto';

const HIBP_API = 'https://api.pwnedpasswords.com/range/';

export async function checkHibp(email, password = null) {
  const result = {
    breached: false,
    password_count: 0,
    message: 'No breach detected',
    severity: 'low'
  };

  // If password provided, check via k-anonymity
  if (password) {
    try {
      const hash = await crypto.subtle.digest(
        'SHA-1',
        new TextEncoder().encode(password)
      );
      const hashHex = Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();
      
      const prefix = hashHex.substring(0, 5);
      const suffix = hashHex.substring(5);

      const response = await fetch(`${HIBP_API}${prefix}`);
      const data = await response.text();

      const lines = data.split('\n');
      for (const line of lines) {
        const [hashSuffix, count] = line.split(':');
        if (hashSuffix.trim() === suffix) {
          result.breached = true;
          result.password_count = parseInt(count.trim(), 10);
          result.severity = result.password_count > 100000 ? 'critical' : 'high';
          result.message = `Password found in ${result.password_count} breaches`;
          break;
        }
      }

      if (!result.breached) {
        result.message = 'Password not found in breach database';
      }
    } catch (error) {
      result.message = 'HIBP check unavailable, assuming safe';
    }
  }

  // For demo: simulate breach if email contains certain patterns
  if (!result.breached && email.includes('test')) {
    result.breached = true;
    result.password_count = 5;
    result.severity = 'medium';
    result.message = 'Email found in demo breach (simulated)';
  }

  return result;
}