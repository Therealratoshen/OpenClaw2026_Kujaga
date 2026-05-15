/**
 * Subscription Service
 */

export async function checkSubscription(userId) {
  // Mock subscription data for hackathon
  return {
    user_id: userId,
    plan: 'professional',
    status: 'trial',
    days_remaining: 14,
    trial_end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    next_billing_date: null
  };
}

export async function upgradeSubscription(userId, plan) {
  // Mock upgrade
  return {
    user_id: userId,
    plan,
    status: 'active',
    upgraded_at: new Date().toISOString()
  };
}