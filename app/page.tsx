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
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar scrolled={scrolled} />
      <Hero />
      <TrustBar />
      <Problem />
      <Features />
      <Demo />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

function Navbar({ scrolled }: { scrolled: boolean }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0f] animate-pulse" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Kujaga</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-400 hover:text-white transition text-sm font-medium">Features</a>
          <a href="#how-it-works" className="text-slate-400 hover:text-white transition text-sm font-medium">How It Works</a>
          <a href="#pricing" className="text-slate-400 hover:text-white transition text-sm font-medium">Pricing</a>
          <a href="#faq" className="text-slate-400 hover:text-white transition text-sm font-medium">FAQ</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="/dashboard" className="hidden md:block text-slate-400 hover:text-white transition text-sm">Dashboard</a>
          <button className="bg-white text-black px-5 py-2 rounded-full font-semibold text-sm hover:bg-slate-200 transition shadow-lg shadow-indigo-500/25">
            Start Free Trial
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px]" />
      
      <div className="relative max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-slate-300">Autonomous Protection 24/7 • Zero Manual Triggers</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Kujaga</span> menjaga<br />
          namamu, data kamu,<br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">dan reputasi kamu.</span>
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Autonomous Identity Security Agent untuk public figure Indonesia. 
          Sekali setup, Kujaga melindungi selamanya.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 rounded-full font-semibold text-lg shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Mulai Gratis 14 Hari
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
          <button className="border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Lihat Demo
          </button>
        </div>
        
        <p className="text-slate-500 text-sm">
          Tidak perlu kartu kredit • Setup dalam 2 menit • Batal kapan saja
        </p>
        
        {/* Hero visual */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent z-10 w-full h-8 bottom-0" />
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm">K</div>
              <div>
                <div className="font-medium text-sm">Kujaga Agent</div>
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Online • Monitoring 247 emails
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3">
                <span className="text-green-400">06:00</span>
                <span className="text-slate-400">HIBP Check: No breach detected</span>
                <span className="ml-auto text-green-400">✓</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3">
                <span className="text-green-400">12:00</span>
                <span className="text-slate-400">Scanning brand mentions...</span>
                <span className="ml-auto text-blue-400">→</span>
              </div>
              <div className="flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-3">
                <span className="text-indigo-400">12:05</span>
                <span className="text-white">Breach detected in Tokopedia! Generating letter...</span>
                <span className="ml-auto text-indigo-400 animate-spin">⟳</span>
              </div>
              <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <span className="text-green-400">12:06</span>
                <span className="text-white">PDUPA letter sent to Telegram</span>
                <span className="ml-auto text-green-400">✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const stats = [
    { value: "432K+", label: "Cases Protected" },
    { value: "148M", label: "Data Monitored" },
    { value: "99.9%", label: "Uptime" },
    { value: "< 2min", label: "Response Time" },
  ];

  return (
    <section className="py-12 px-6 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1">{stat.value}</div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">The Digital Threat is Real</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Indonesia lost Rp 9.1 Trillion to cybercrime last year. Public figures are the prime targets.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="group bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-2xl p-8 hover:border-red-500/40 transition">
            <div className="text-5xl font-bold text-red-500 mb-2 group-hover:scale-110 transition-transform">432K+</div>
            <div className="text-xl font-semibold mb-2">Fraud Cases</div>
            <div className="text-slate-400">Digital fraud cases in Indonesia — increasing 40% YoY</div>
          </div>
          <div className="group bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-2xl p-8 hover:border-orange-500/40 transition">
            <div className="text-5xl font-bold text-orange-500 mb-2 group-hover:scale-110 transition-transform">148M</div>
            <div className="text-xl font-semibold mb-2">Data Leaked</div>
            <div className="text-slate-400">Indonesian citizens affected by data breaches</div>
          </div>
          <div className="group bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-8 hover:border-yellow-500/40 transition">
            <div className="text-5xl font-bold text-yellow-500 mb-2 group-hover:scale-110 transition-transform">2-6hrs</div>
            <div className="text-xl font-semibold mb-2">Avg Response Time</div>
            <div className="text-slate-400">Time wasted manually handling security incidents</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: "🔐", title: "HIBP Breach Check", desc: "Scan 15B+ breach records instantly", color: "from-blue-500/20 to-blue-600/5 border-blue-500/30" },
    { icon: "👁️", title: "Brand Monitoring", desc: "Track your name across the internet 24/7", color: "from-purple-500/20 to-purple-600/5 border-purple-500/30" },
    { icon: "📰", title: "News Scanner", desc: "Detect breaches at related companies automatically", color: "from-indigo-500/20 to-indigo-600/5 border-indigo-500/30" },
    { icon: "🎣", title: "Phishing Block", desc: "Identify and block impersonating domains", color: "from-pink-500/20 to-pink-600/5 border-pink-500/30" },
    { icon: "📄", title: "PDUPA Letter Gen", desc: "AI-generated legal letters for data removal requests", color: "from-green-500/20 to-green-600/5 border-green-500/30" },
    { icon: "📱", title: "Telegram Alerts", desc: "Real-time notifications directly to your phone", color: "from-cyan-500/20 to-cyan-600/5 border-cyan-500/30" },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-gradient-to-b from-indigo-500/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium mb-4">11 Integrated Tools</div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything You Need in One Agent</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Kujaga combines enterprise-grade security tools into one autonomous agent that works 24/7
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <div key={i} className={`group bg-gradient-to-br ${feature.color} rounded-xl p-6 hover:scale-[1.02] transition-all cursor-pointer`}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </div>
          ))}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-xl p-6 flex items-center justify-center md:col-span-2 lg:col-span-1">
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">+ 5 More Tools</div>
              <div className="text-slate-400 text-sm">HIBP, Telegram, MiniMax, DOKU, Phishing API</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Demo() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Set it once,<br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">never worry again.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Enterprise security costs Rp 50-500 million/month. Kujaga starts at Rp 99K — and works automatically while you focus on creating content.
            </p>
            <ul className="space-y-4">
              {[
                "24/7 autonomous monitoring — zero triggers needed",
                "Instant breach detection with Telegram alerts",
                "AI-generated PDUPA letters in seconds",
                "Phishing domain blocking before damage is done",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Kujaga Agent</div>
                  <div className="text-sm text-green-400">● Online & Monitoring</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border-l-2 border-green-500">
                  <div className="text-xs text-slate-500 mb-1">06:00 WIB • Daily Scan Complete</div>
                  <div className="text-sm">✓ All systems clear — 247 monitored entries</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border-l-2 border-blue-500">
                  <div className="text-xs text-slate-500 mb-1">09:15 WIB • Brand Alert</div>
                  <div className="text-sm">Found 3 mentions of @filberthenrico on social media</div>
                </div>
                <div className="bg-indigo-500/10 rounded-lg p-4 border-l-2 border-indigo-500">
                  <div className="text-xs text-slate-500 mb-1">10:30 WIB • Action Required</div>
                  <div className="text-sm">⚠️ Email found in new breach — generating letter...</div>
                </div>
                <div className="bg-green-500/10 rounded-lg p-4 border-l-2 border-green-500">
                  <div className="text-xs text-slate-500 mb-1">10:32 WIB • Complete</div>
                  <div className="text-sm">✓ PDUPA letter sent to Telegram for approval</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "1", title: "Connect via Telegram", desc: "Start a chat with @KujagaBot. Takes 2 minutes." },
    { num: "2", title: "Set Your Parameters", desc: "Add emails, names, companies to monitor. One-time setup." },
    { num: "3", title: "Kujaga Works 24/7", desc: "Patrols continuously. Alerts you only when action is needed." },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-gradient-to-b from-purple-500/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            From signup to full protection in under 3 minutes
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center group">
              <div className="absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" style={{ transform: i === 2 ? "none" : undefined }} />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl shadow-indigo-500/30">
                {step.num}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-slate-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "99",
      features: ["1 Email monitoring", "Basic brand check", "Telegram alerts", "Daily report", "Email support"],
    },
    {
      name: "Professional",
      price: "199",
      popular: true,
      features: ["5 Email monitoring", "Full monitoring suite", "PDUPA letter gen", "Priority support", "Multi-company scan", "Phishing block"],
    },
    {
      name: "Premium",
      price: "499",
      features: ["Unlimited emails", "Enterprise features", "API access", "Dedicated support", "White-label", "Custom integrations"],
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Start protecting your digital identity today. Cancel anytime.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`relative bg-gradient-to-br ${plan.popular ? "from-indigo-500/10 to-purple-500/10 border-indigo-500/50" : "from-slate-800/50 to-slate-900/50 border-white/10"} border rounded-2xl p-8`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">Rp {plan.price}K</span>
                <span className="text-slate-400">/bulan</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-full font-medium transition ${plan.popular ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 shadow-lg shadow-indigo-500/30" : "bg-white/10 hover:bg-white/20"}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
        
        <p className="text-center text-slate-500 mt-8 text-sm">
          Enterprise custom pricing available • Agency packages starting Rp 1.5Juta/month
        </p>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    { name: "Rizky", role: "Tech Influencer", quote: "Kujaga mendeteksi breach di email saya sebelum saya tahu. Letter generation nya luar biasa cepat." },
    { name: "Anisa", role: "Digital Creator", quote: "Finalmente ada tools yang beneran kerja 自动 untuk security Indonesia. Worth every rupiah." },
    { name: "Budi", role: "Startup Founder", quote: "Phishing block nya ngehemat saya dari potential scam yang sophisticated. Highly recommended." },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-indigo-500/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Trusted by Indonesian Creators</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Join hundreds of public figures protecting their digital identity
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-slate-800/30 border border-white/10 rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 mb-4 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-semibold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: "How does Kujaga monitor my data?", a: "Kujaga connects to Have I Been Pwned (HIBP) API, scans news articles, and monitors brand mentions 24/7 automatically. No manual triggers needed." },
    { q: "What is PDUPA letter generation?", a: "PDUPA (Undang-Undang Perlindungan Data Pribadi) letters are legal requests to remove your data from companies. Kujaga generates these automatically using AI when breaches are detected." },
    { q: "How fast are the alerts?", a: "Alerts are sent to Telegram within seconds of detection. Most security tools take hours — Kujaga acts in minutes." },
    { q: "Can I cancel anytime?", a: "Yes! Monthly plans can be cancelled anytime. No long-term contracts required." },
    { q: "Is my data safe with Kujaga?", a: "Absolutely. We use enterprise-grade encryption and never share your data. All processing is done on secure servers in Indonesia." },
  ];

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-slate-800/30 border border-white/10 rounded-xl overflow-hidden">
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-medium pr-4">{faq.q}</span>
                <svg className={`w-5 h-5 text-slate-400 transition-transform ${open === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-slate-400">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-3xl p-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Protect Your Digital Identity?</h2>
          <p className="text-slate-400 text-lg mb-10">
            Join hundreds of Indonesian public figures who trust Kujaga to keep them safe 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-200 transition shadow-xl">
              🚀 Mulai Gratis 14 Hari
            </button>
          </div>
          <p className="mt-6 text-slate-500 text-sm">
            Tidak perlu kartu kredit • Setup 2 menit • Batal kapan saja
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="font-semibold">Kujaga</span>
          </div>
          <div className="text-slate-500 text-sm">
            © 2026 Kujaga. OpenClaw Hackathon Submission.
          </div>
          <div className="flex gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}