/**
 * DOKU MCP Service — Payment Integration
 * Sandbox: https://api-sandbox.doku.com/doku-mcp-server/mcp
 */

const DOKU_MCP_URL = process.env.DOKU_MCP_URL || 'https://api-sandbox.doku.com/doku-mcp-server/mcp';
const DOKU_CLIENT_ID = process.env.DOKU_CLIENT_ID;
const DOKU_AUTHORIZATION = process.env.DOKU_AUTHORIZATION;

export async function createPaymentLink(params) {
  const { user_id, plan, amount, customer } = params;

  // Mock response for hackathon demo
  if (!DOKU_CLIENT_ID || !DOKU_AUTHORIZATION) {
    return {
      success: true,
      payment_url: `https://demo.kujaga.app/pay?plan=${plan}&amount=${amount}`,
      transaction_id: `DEMO-${Date.now()}`,
      message: 'Demo mode: Payment link simulated'
    };
  }

  // Production: Call DOKU MCP
  // For now, return mock data
  return {
    success: true,
    payment_url: `https://sandbox.doku.com/checkout/${Date.now()}`,
    transaction_id: `DOKU-${Date.now()}`,
    message: 'Payment link created'
  };
}

export async function checkTransaction(invoiceNumber) {
  // Mock for hackathon
  return {
    invoice_number: invoiceNumber,
    status: 'pending',
    amount: 0,
    payment_method: null
  };
}