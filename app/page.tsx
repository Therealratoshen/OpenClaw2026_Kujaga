"use client";

import { useState, useEffect } from "react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar scrolled={scrolled} />
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <Pricing />
      <CTASection />
      <Footer />
    </main>
  );
}

function Navbar({ scrolled }: { scrolled: boolean }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}>
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="font-bold text-lg">Kujaga</span>
        </div>
        <a href="https://t.me/Kujaga_bot" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition">
          Mulai
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-36 pb-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-green-400">Beta — GRATIS</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Kujaga jaga namamu,<br />data kamu, reputasi kamu.
        </h1>
        
        <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto">
          Agent keamanan identitas digital untuk public figure Indonesia. Sekali setup, jaga selamanya.
        </p>
        
        <a href="https://t.me/Kujaga_bot" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-indigo-600 px-6 py-3 rounded-full font-medium hover:bg-indigo-700 transition">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.477-4.941c.242-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.643-.203-.658-.643.135-.953l11.566-4.458c.538-.196 1.006.128.832.941z"/>
          </svg>
          Mulai di @Kujaga_bot
        </a>
      </div>
    </section>
  );
}

function Problem() {
  const stats = [
    { value: "432K+", label: "Kasus Fraud", color: "text-red-400" },
    { value: "148Juta", label: "Data Bocor", color: "text-orange-400" },
    { value: "2-6 Jam", label: "Response Time", color: "text-yellow-400" },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Masalah</h2>
          <p className="text-slate-400">
            Indonesia kehilangan <span className="text-red-400 font-medium">Rp 9.1 Triliun</span> karena cybercrime tahun lalu.
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-5 text-center">
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-5">
          <h3 className="font-medium mb-4 text-center">Siapa yang rentan?</h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
              <span>Influencer & Content Creator</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
              <span>Public Figures</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
              <span>Entrepreneur</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
              <span>Selebriti</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "1", title: "Chat ke Telegram", desc: "Kirim /start ke @KujagaBot" },
    { num: "2", title: "Setup Sekali", desc: "Masukkan email & nama" },
    { num: "3", title: "Kujaga Jaga 24/7", desc: "Dapat alert aja" },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Cara Kerja</h2>
        
        <div className="grid grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-lg font-bold mx-auto mb-3">
                {step.num}
              </div>
              <div className="font-medium mb-1">{step.title}</div>
              <div className="text-sm text-slate-400">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: "🔐", title: "Cek Breach", desc: "15Milyar+ data breach" },
    { icon: "👁️", title: "Pantau Merek", desc: "Nama di internet 24/7" },
    { icon: "🎣", title: "Block Phishing", desc: "Deteksi situs phishing" },
    { icon: "📄", title: "Surat PDUPA", desc: "Surat hukum via AI" },
    { icon: "📱", title: "Alert Telegram", desc: "Notifikasi real-time" },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Fitur</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {features.map((f, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="font-medium text-sm mb-1">{f.title}</div>
              <div className="text-xs text-slate-400">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "Starter", items: ["1 email", "Cek merek", "Alert Telegram"] },
    { name: "Professional", items: ["5 email", "Full monitoring", "PDUPA letter", "Phishing block"], recommended: true },
    { name: "Premium", items: ["Unlimited", "Priority support", "API access"] },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Harga</h2>
          <p className="text-slate-400">GRATIS selama Beta</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <div key={i} className={`rounded-lg p-5 text-center ${plan.recommended ? "bg-indigo-600/20 border border-indigo-500/30" : "bg-white/5 border border-white/10"}`}>
              {plan.recommended && <div className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full inline-block mb-3">Rekomendasi</div>}
              <h3 className="font-medium mb-3">{plan.name}</h3>
              <div className="text-green-400 font-bold mb-4">GRATIS</div>
              <ul className="text-sm text-slate-300 space-y-1 mb-4">
                {plan.items.map((item, j) => (
                  <li key={j}>✓ {item}</li>
                ))}
              </ul>
              <a href="https://t.me/Kujaga_bot" target="_blank" rel="noopener noreferrer" className={`block text-sm py-2 rounded-full transition ${plan.recommended ? "bg-indigo-600 hover:bg-indigo-700" : "bg-white/10 hover:bg-white/20"}`}>
                Mulai
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-3">Siap Lindungi Identitasmu?</h2>
        <p className="text-slate-400 mb-6">Gratis, tanpa kartu kredit.</p>
        <a href="https://t.me/Kujaga_bot" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-indigo-600 px-6 py-3 rounded-full font-medium hover:bg-indigo-700 transition">
          Chat ke @Kujaga_bot
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center text-slate-500 text-sm">
        <span className="font-medium text-white">Kujaga</span> © 2026
      </div>
    </footer>
  );
}