import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    stats: {
      hibpChecked: 847,
      breachesFound: 3,
      phishingBlocked: 12,
      lettersGenerated: 2,
      lastScan: new Date().toLocaleTimeString("id-ID"),
      status: "online",
    },
    alerts: [
      {
        id: "1",
        type: "breach",
        title: "Data Breach Detected",
        description: "Email filbert@example.com found in tiktok breach database",
        timestamp: "2 hours ago",
        severity: "high",
      },
      {
        id: "2",
        type: "phishing",
        title: "Phishing Domain Blocked",
        description: "kujaga-secure.com blocked - impersonating Kujaga",
        timestamp: "5 hours ago",
        severity: "critical",
      },
    ],
  });
}