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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="text-xl font-bold">Kujaga</span>
        </div>
        <a href="https://t.me/Kujaga_bot" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm hover:bg-slate-200 transition">
          Start di Telegram
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-green-400">BETA — GRATIS untuk semua user!</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Kujaga</span> menjaga<br />
          namamu, data kamu,<br />
          dan reputasi kamu.
        </h1>
        
        <p className="text-xl text-slate-400 mb-8">
          Autonomous Identity Security Agent untuk public figure Indonesia.<br />
          Sekali setup, Kujaga melindungi selamanya. GRÁTIS!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <a href="https://t.me/Kujaga_bot" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:opacity-90 transition inline-flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.477-4.941c.242-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.643-.203-.658-.643.135-.953l11.566-4.458c.538-.196 1.006.128.832.941z"/>
            </svg>
            Mulai di Telegram — GRATIS!
          </a>
        </div>
        
        <p className="text-slate-500 text-sm">
          Tidak perlu kartu kredit • Setup 2 menit
        </p>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-red-500/10 to-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Masalahnya</h2>
          <p className="text-slate-400 text-lg">
            Indonesia kehilangan <span className="text-red-400 font-bold">Rp 9.1 Triliun</span> karena cybercrime tahun lalu.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-red-400 mb-2">432K+</div>
            <div className="font-semibold mb-2">Kasus Fraud</div>
            <div className="text-slate-400 text-sm">Digital fraud cases — naik 40% per tahun</div>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">148Juta</div>
            <div className="font-semibold mb-2">Data Bocor</div>
            <div className="text-slate-400 text-sm">Warga Indonesia kena data breach</div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">2-6 Jam</div>
            <div className="font-semibold mb-2">Response Time</div>
            <div className="text-slate-400 text-sm">Waktu buang waktu tangani insiden</div>
          </div>
        </div>

        <div className="mt-12 bg-slate-800/50 border border-white/10 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4 text-center">Siapa yang paling rentan?</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-red-400">•</span>
              <span className="text-slate-300">Influencer & Content Creator — akun di-clone untuk scam followers</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400">•</span>
              <span className="text-slate-300">Public Figures — namanya dipakai untuk investasi bodong</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400">•</span>
              <span className="text-slate-300">Entrepreneur — data perusahaan di-breach</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400">•</span>
              <span className="text-slate-300">Selebriti — doxxing & threats fisik</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Cara Kerja</h2>
          <p className="text-slate-400">Dari signup ke full protection dalam 3 menit</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
            <h3 className="font-bold text-lg mb-2">Chat ke Telegram</h3>
            <p className="text-slate-400 text-sm">Cari @KujagaBot di Telegram, kirim /start</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
            <h3 className="font-bold text-lg mb-2">Setup Sekali</h3>
            <p className="text-slate-400 text-sm">Masukkan nama, email, nomor yang mau dipantau</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="font-bold text-lg mb-2">Kujaga Jaga 24/7</h3>
            <p className="text-slate-400 text-sm">Kujaga patrol otomatis. Kamu dapat alert aja.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: "🔐", title: "Breach Check", desc: "Cek email di 15Milyar+ breach records via HIBP" },
    { icon: "👁️", title: "Brand Monitoring", desc: "Pantau nama di seluruh internet 24/7" },
    { icon: "🎣", title: "Phishing Block", desc: "Deteksi situs phishing yang pakai nama kamu" },
    { icon: "📄", title: "Surat PDUPA", desc: "Generate surat hukum deletion otomatis via AI" },
    { icon: "📱", title: "Telegram Alert", desc: "Notifikasi real-time langsung ke HP kamu" },
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-indigo-500/5 to-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Fitur</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div key={i} className="bg-slate-800/50 border border-white/10 rounded-xl p-5 flex items-start gap-4">
              <div className="text-3xl">{f.icon}</div>
              <div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Harga</h2>
          <p className="text-slate-400">Sekarang dalam fase Beta —GRATIS untuk semua user!</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6">
            <h3 className="font-bold mb-1">Starter</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-green-400">GRATIS</span>
              <span className="text-slate-400"> selamanya</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-300 mb-6">
              <li>✓ 1 email monitoring</li>
              <li>✓ Basic brand check</li>
              <li>✓ Telegram alerts</li>
            </ul>
            <a href="https://t.me/Kujaga_bot" target="_blank" rel="noopener noreferrer" className="block text-center bg-white/10 py-2 rounded-full hover:bg-white/20 transition">
              Mulai Gratis
            </a>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/50 rounded-xl p-6">
            <div className="bg-green-600 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">REKOMENDASI</div>
            <h3 className="font-bold mb-1">Professional</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-green-400">GRATIS</span>
              <span className="text-slate-400"> selamanya</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-300 mb-6">
              <li>✓ 5 email monitoring</li>
              <li>✓ Full monitoring suite</li>
              <li>✓ PDUPA letter generation</li>
              <li>✓ Phishing block</li>
            </ul>
            <a href="https://t.me/Kujaga_bot" target="_blank" rel="noopener noreferrer" className="block text-center bg-gradient-to-r from-indigo-600 to-purple-600 py-2 rounded-full font-semibold hover:opacity-90 transition">
              Mulai Gratis
            </a>
          </div>
          
          <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6">
            <h3 className="font-bold mb-1">Premium</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-green-400">GRATIS</span>
              <span className="text-slate-400"> selamanya</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-300 mb-6">
              <li>✓ Unlimited emails</li>
              <li>✓ Priority support</li>
              <li>✓ API access</li>
              <li>✓ Dedicated support</li>
            </ul>
            <a href="https://t.me/Kujaga_bot" target="_blank" rel="noopener noreferrer" className="block text-center bg-white/10 py-2 rounded-full hover:bg-white/20 transition">
              Mulai Gratis
            </a>
          </div>
        </div>

        <p className="text-center text-slate-400 mt-8 text-sm">
          Beta selesai akan ada paket berbayar • Tidak perlu kartu kredit untuk mulai
        </p>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-indigo-500/10 to-transparent">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Siap Lindungi Identitas Digitalmu?</h2>
        <p className="text-slate-400 mb-8">
          Mulai gratis 14 hari. Tidak perlu kartu kredit.
        </p>
        <a href="https://t.me/Kujaga_bot" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:opacity-90 transition">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.477-4.941c.242-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.643-.203-.658-.643.135-.953l11.566-4.458c.538-.196 1.006.128.832.941z"/>
          </svg>
          Chat ke @Kujaga_bot Sekarang
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="font-semibold">Kujaga</span>
        </div>
        <div className="text-slate-500 text-sm">
          © 2026 Kujaga — OpenClaw Hackathon
        </div>
      </div>
    </footer>
  );
}