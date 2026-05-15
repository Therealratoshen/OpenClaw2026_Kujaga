"use client";

import { useState, useEffect } from "react";

interface MonitoringStats {
  hibpChecked: number;
  breachesFound: number;
  phishingBlocked: number;
  lettersGenerated: number;
  lastScan: string;
  status: "online" | "offline" | "scanning";
}

interface Alert {
  id: string;
  type: "breach" | "phishing" | "news" | "info";
  title: string;
  description: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
}

export default function Dashboard() {
  const [stats, setStats] = useState<MonitoringStats>({
    hibpChecked: 0,
    breachesFound: 0,
    phishingBlocked: 0,
    lettersGenerated: 0,
    lastScan: "Never",
    status: "online",
  });

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/dashboard");
      const data = await response.json();
      if (data.stats) setStats(data.stats);
      if (data.alerts) setAlerts(data.alerts);
    } catch {
      // Demo data when API not available
      setStats({
        hibpChecked: 847,
        breachesFound: 3,
        phishingBlocked: 12,
        lettersGenerated: 2,
        lastScan: new Date().toLocaleTimeString("id-ID"),
        status: "online",
      });
    }
    setLoading(false);
  };

  const scanNow = async () => {
    setStats((prev) => ({ ...prev, status: "scanning" }));
    try {
      await fetch("/api/scan", { method: "POST" });
      await fetchDashboardData();
    } catch {
      setStats((prev) => ({ ...prev, status: "online" }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Kujaga</h1>
            <p className="text-slate-400">Autonomous Identity Security Agent</p>
          </div>
          <div className="flex items-center gap-4">
            <StatusBadge status={stats.status} />
            <button
              onClick={scanNow}
              disabled={stats.status === "scanning"}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition disabled:opacity-50"
            >
              {stats.status === "scanning" ? "Scanning..." : "🔍 Scan Now"}
            </button>
          </div>
        </div>

        <StatsGrid stats={stats} />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <AlertsPanel alerts={alerts} />
          </div>
          <div>
            <QuickActions />
            <MonitoringStatus stats={stats} />
          </div>
        </div>
      </main>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldIcon className="w-8 h-8 text-indigo-500" />
          <span className="text-xl font-bold">Kujaga</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="/" className="text-slate-300 hover:text-white transition">Landing</a>
          <a href="/dashboard" className="text-white font-medium">Dashboard</a>
          <a href="/tools" className="text-slate-300 hover:text-white transition">Tools</a>
          <UserBadge />
        </div>
      </div>
    </nav>
  );
}

function UserBadge() {
  return (
    <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full">
      <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs">FH</div>
      <span className="text-sm">Filbert H.</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs = {
    online: { color: "bg-green-500", text: "Online" },
    offline: { color: "bg-red-500", text: "Offline" },
    scanning: { color: "bg-yellow-500 animate-pulse", text: "Scanning" },
  };
  const config = configs[status as keyof typeof configs] || configs.offline;
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.color}`} />
      <span className="text-sm text-slate-300">{config.text}</span>
    </div>
  );
}

function StatsGrid({ stats }: { stats: MonitoringStats }) {
  const cards = [
    { label: "HIBP Checks", value: stats.hibpChecked, icon: "🔐", color: "text-blue-400" },
    { label: "Breaches Found", value: stats.breachesFound, icon: "🚨", color: "text-red-400" },
    { label: "Phishing Blocked", value: stats.phishingBlocked, icon: "🎣", color: "text-orange-400" },
    { label: "Letters Generated", value: stats.lettersGenerated, icon: "📄", color: "text-green-400" },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className={`text-3xl ${card.color}`}>{card.icon}</span>
          </div>
          <div className="text-3xl font-bold mb-1">{card.value.toLocaleString()}</div>
          <div className="text-slate-400 text-sm">{card.label}</div>
        </div>
      ))}
    </div>
  );
}

function AlertsPanel({ alerts }: { alerts: Alert[] }) {
  const demoAlerts: Alert[] = alerts.length > 0 ? alerts : [
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
    {
      id: "3",
      type: "news",
      title: "Company in News",
      description: "Tokopedia breach news detected - 91M users affected",
      timestamp: "1 day ago",
      severity: "medium",
    },
  ];

  const severityColors = {
    low: "border-l-green-500",
    medium: "border-l-yellow-500",
    high: "border-l-orange-500",
    critical: "border-l-red-500",
  };

  const typeIcons = {
    breach: "🔐",
    phishing: "🎣",
    news: "📰",
    info: "ℹ️",
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Recent Alerts</h2>
        <button className="text-indigo-400 hover:text-indigo-300 text-sm">View All →</button>
      </div>
      <div className="space-y-4">
        {demoAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-slate-800 rounded-lg p-4 border-l-4 ${severityColors[alert.severity]}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{typeIcons[alert.type]}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">{alert.title}</h3>
                  <span className="text-xs text-slate-500">{alert.timestamp}</span>
                </div>
                <p className="text-slate-400 text-sm">{alert.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickActions() {
  const actions = [
    { label: "HIBP Check", icon: "🔐", action: "/tools/hibp" },
    { label: "Generate Letter", icon: "📄", action: "/tools/letter" },
    { label: "Brand Monitor", icon: "📰", action: "/tools/brand" },
    { label: "Phishing Scan", icon: "🎣", action: "/tools/phishing" },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, i) => (
          <button
            key={i}
            className="flex flex-col items-center gap-2 bg-slate-800 hover:bg-slate-700 p-4 rounded-lg transition"
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-sm">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MonitoringStatus({ stats }: { stats: MonitoringStats }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">System Status</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">HIBP API</span>
          <span className="flex items-center gap-2 text-green-400">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Connected
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Telegram Bot</span>
          <span className="flex items-center gap-2 text-green-400">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Active
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">MiniMax API</span>
          <span className="flex items-center gap-2 text-green-400">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Ready
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Last Scan</span>
          <span className="text-slate-300">{stats.lastScan}</span>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="text-xs text-slate-500">
            Next scheduled scan: {getNextScanTime()}
          </div>
        </div>
      </div>
    </div>
  );
}

function getNextScanTime(): string {
  const now = new Date();
  const next6AM = new Date(now);
  next6AM.setHours(6, 0, 0, 0);
  if (next6AM <= now) next6AM.setDate(next6AM.getDate() + 1);
  return next6AM.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";
}

// Icons
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}