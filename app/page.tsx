// Landing Page Component
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldIcon className="w-8 h-8 text-indigo-500" />
          <span className="text-xl font-bold">Kujaga</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
          <a href="#pricing" className="text-slate-300 hover:text-white transition">Pricing</a>
          <a href="#contact" className="text-slate-300 hover:text-white transition">Contact</a>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-full font-medium transition">
          Start Free Trial
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full text-sm mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Autonomous Protection 24/7
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Kujaga</span> menjaga<br />
          namamu, data kamu,<br />
          dan reputasi kamu.
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Autonomous Identity Security Agent untuk public figure Indonesia.
          Sekali setup, Kujaga melindungi selamanya. Zero triggers.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="gradient-bg px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition">
            🚀 Mulai Gratis 14 Hari
          </button>
          <button className="border border-slate-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-800 transition">
            Lihat Demo
          </button>
        </div>
        
        <p className="mt-6 text-slate-500 text-sm">
          Tidak perlu kartu kredit • Setup dalam 2 menit • Batal kapan saja
        </p>
        
        <div className="mt-16 shield-animation">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-slate-900 border border-slate-800">
            <ShieldIcon className="w-16 h-16 text-indigo-500" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Problem() {
  return (
    <section className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Masalah yang Kami Selesaikan</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Ancaman digital terhadap public figure Indonesia semakin meningkat
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <StatCard
            number="432K+"
            label="Kasus Fraud"
            description="Kasus penipuan digital di Indonesia"
          />
          <StatCard
            number="Rp 9.1T"
            label="Kerugian"
            description="Total kerugian akibat cybercrime"
          />
          <StatCard
            number="148M"
            label="Data Bocor"
            description="Data warga Indonesia yang bocor"
          />
        </div>
      </div>
    </section>
  )
}

function StatCard({ number, label, description }: { number: string; label: string; description: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
      <div className="text-5xl font-bold text-red-500 mb-2">{number}</div>
      <div className="text-xl font-semibold mb-2">{label}</div>
      <div className="text-slate-400">{description}</div>
    </div>
  )
}

function Solution() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tidak ada yang<br />
              <span className="gradient-text">melindungi Anda?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Enterprise security solutions berharga Rp 50-500 juta/bulan.
              Tidak ada yang dirancang khusus untuk influencer dan public figure Indonesia.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <CheckIcon className="w-6 h-6 text-green-500" />
                <span>Monitoring 24/7 tanpa Anda perlu触发</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="w-6 h-6 text-green-500" />
                <span>Proteksi dari breach, phishing, impersonasi</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="w-6 h-6 text-green-500" />
                <span>Surat UU PDP otomatis ter-generate</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="w-6 h-6 text-green-500" />
                <span>Mulai dari Rp 99K/bulan saja</span>
              </li>
            </ul>
          </div>
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <span className="text-lg">🤖</span>
              </div>
              <div>
                <div className="font-semibold">Kujaga Agent</div>
                <div className="text-sm text-green-500">● Online</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="text-sm text-slate-400 mb-1">06:00 WIB</div>
                <div className="text-sm">✅ HIBP Check: No breach detected</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="text-sm text-slate-400 mb-1">12:00 WIB</div>
                <div className="text-sm">🔍 Scanning Tokopedia news...</div>
              </div>
              <div className="bg-indigo-500/20 rounded-lg p-4 border border-indigo-500/50">
                <div className="text-sm text-slate-400 mb-1">12:05 WIB</div>
                <div className="text-sm">🚨 Breach detected! Generating letter...</div>
              </div>
              <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/50">
                <div className="text-sm text-slate-400 mb-1">12:06 WIB</div>
                <div className="text-sm">✅ PDUPA letter sent to Telegram</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    {
      icon: "🔐",
      title: "HIBP Breach Check",
      description: "Cek email/password di 15 miliar breach database secara gratis"
    },
    {
      icon: "📰",
      title: "Brand Monitoring",
      description: "Pantau mention nama Anda di seluruh internet"
    },
    {
      icon: "📰",
      title: "Company News Scan",
      description: "Deteksi breach di perusahaan yang terkait dengan Anda"
    },
    {
      icon: "🎣",
      title: "Phishing Detection",
      description: "Blokir domain yang meniru perusahaan Anda"
    },
    {
      icon: "📄",
      title: "PDUPA Letter Gen",
      description: "Generate surat permintaan hapus data otomatis via AI"
    },
    {
      icon: "📱",
      title: "Telegram Alerts",
      description: "Notifikasi real-time langsung ke HP Anda"
    }
  ]

  return (
    <section id="features" className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            11 Tools dalam 1 Agent
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Kujaga menggabungkan semua keamanan yang Anda butuhkan
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Daftar via Telegram",
      description: "Mulai dalam 2 menit. Kirim /start ke bot Kujaga."
    },
    {
      step: "2",
      title: "Setup Sekali",
      description: "Masukkan nama, email, dan perusahaan yang dipantau."
    },
    {
      step: "3",
      title: "Kujaga Jaga",
      description: "Patroli 24/7. Anda fokus ke konten, kami jaga keamanan."
    }
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cara Kerja Kujaga
          </h2>
          <p className="text-slate-400">
            Tidak perlu复杂的 setup. Cukup daftar dan Kujaga bekerja.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "99",
      features: ["1 Email monitoring", "Basic brand check", "Telegram alerts", "Daily report"]
    },
    {
      name: "Professional",
      price: "199",
      features: ["5 Email monitoring", "Full monitoring", "PDUPA letter gen", "Priority support", "Multi-company"],
      popular: true
    },
    {
      name: "Premium",
      price: "499",
      features: ["Unlimited emails", "Enterprise features", "API access", "Dedicated support", "White-label"]
    }
  ]

  return (
    <section id="pricing" className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Harga Terjangkau
          </h2>
          <p className="text-slate-400">
            Mulai dari Rp 99K/bulan. Lebih murah dari一杯 kopi sehari.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`relative bg-slate-900 border rounded-2xl p-8 ${plan.popular ? 'border-indigo-500' : 'border-slate-800'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">Rp {plan.price}K</span>
                <span className="text-slate-400">/bulan</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-5 h-5 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-full font-medium transition ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Mulai Trial
              </button>
            </div>
          ))}
        </div>
        
        <p className="text-center text-slate-500 mt-8">
          * Enterprise package tersedia Rp 1.5Juta/bulan untuk agency
        </p>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Siap Lindungi Diri Anda?
        </h2>
        <p className="text-slate-400 text-lg mb-10">
          Bergabung dengan ratusan public figure Indonesia yang sudah diamankan oleh Kujaga.
        </p>
        <button className="gradient-bg px-10 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition">
          🚀 Mulai Gratis 14 Hari
        </button>
        <p className="mt-4 text-slate-500 text-sm">
          Tidak perlu kartu kredit • Setup 2 menit • Batal kapan saja
        </p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-6 h-6 text-indigo-500" />
            <span className="font-semibold">Kujaga</span>
          </div>
          <div className="text-slate-500 text-sm">
            © 2026 Kujaga. OpenClaw Hackathon.
          </div>
          <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Icons
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}