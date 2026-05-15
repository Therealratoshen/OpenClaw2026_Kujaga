"use client";

import { useState } from "react";

export default function LoginPage() {
  const [step, setStep] = useState<"choose" | "telegram" | "email" | "loading" | "success">("choose");
  const [email, setEmail] = useState("");

  const handleTelegramLogin = () => {
    setStep("telegram");
    // Redirect to Telegram bot
    window.open("https://t.me/Kujaga_bot?start=login", "_blank");
    setStep("loading");
    setTimeout(() => setStep("success"), 2000);
  };

  const handleEmailLogin = () => {
    setStep("email");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep("loading");
      // Simulate magic link / OTP
      setTimeout(() => setStep("success"), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Masuk ke Kujaga</h1>
          <p className="text-slate-400">Pilih metode login yang方便 Anda</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
          {step === "choose" && (
            <div className="space-y-4">
              <button
                onClick={handleTelegramLogin}
                className="w-full flex items-center gap-4 bg-[#0088cc]/10 border border-[#0088cc]/30 hover:border-[#0088cc]/50 rounded-xl p-4 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0088cc]/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.338 1.416-.548 1.542-.193.108.477.413.813.3s1.612-.516 2.251-.872c.916-.51 1.62-.916 2.127-1.173.966-.484 1.917-.17 2.097-.406-.076.153-.152.48-.31 1.017-.202.684-.48 1.409-1.117 2.05-1.13 1.12-1.917 1.361-2.172 1.334-.346-.035-.796-.542-1.025-.948-.138-.233-.205-.457-.413-.65-.25-.236-.553-.272-.9-.25-.346.027-.667.074-1.048.108-.6.056-.95.067-1.217-.028-.477-.17-.727-.69-.727-1.24 0-.548.247-1.15.55-1.77.24-.487.54-.97.835-1.44.246-.394.476-.792.668-1.173.182-.315.335-.63.416-.9a.427.427 0 0 0-.023-.385c.022-.323.024-.658.022-.95-.002-.293-.011-.572-.05-.836a3.05 3.05 0 0 0-.084-.368c-.098-.297-.228-.59-.393-.876a7.872 7.872 0 0 1-.246-.542c-.137-.344-.26-.704-.346-1.057z"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-white group-hover:text-[#0088cc] transition">Login dengan Telegram</div>
                  <div className="text-sm text-slate-400">Cara paling cepat & aman</div>
                </div>
                <svg className="w-5 h-5 text-slate-500 group-hover:text-[#0088cc] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-900 text-slate-500">atau</span>
                </div>
              </div>

              <button
                onClick={handleEmailLogin}
                className="w-full flex items-center gap-4 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-4 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-white group-hover:text-indigo-400 transition">Login dengan Email</div>
                  <div className="text-sm text-slate-400">Magic link tanpa password</div>
                </div>
                <svg className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {step === "telegram" && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#0088cc]/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.338 1.416-.548 1.542-.193.108.477.413.813.3s1.612-.516 2.251-.872c.916-.51 1.62-.916 2.127-1.173.966-.484 1.917-.17 2.097-.406-.076.153-.152.48-.31 1.017-.202.684-.48 1.409-1.117 2.05-1.13 1.12-1.917 1.361-2.172 1.334-.346-.035-.796-.542-1.025-.948-.138-.233-.205-.457-.413-.65-.25-.236-.553-.272-.9-.25-.346.027-.667.074-1.048.108-.6.056-.95.067-1.217-.028-.477-.17-.727-.69-.727-1.24 0-.548.247-1.15.55-1.77.24-.487.54-.97.835-1.44.246-.394.476-.792.668-1.173.182-.315.335-.63.416-.9a.427.427 0 0 0-.023-.385c.022-.323.024-.658.022-.95-.002-.293-.011-.572-.05-.836a3.05 3.05 0 0 0-.084-.368c-.098-.297-.228-.59-.393-.876a7.872 7.872 0 0 1-.246-.542c-.137-.344-.26-.704-.346-1.057z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Buka Telegram</h3>
              <p className="text-slate-400 text-sm mb-4">
                Klik tombol di bawah untuk membuka Kujaga Bot di Telegram
              </p>
              <a
                href="https://t.me/Kujaga_bot?start=login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0088cc] hover:bg-[#0077b3] text-white font-semibold px-6 py-3 rounded-full transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.338 1.416-.548 1.542-.193.108.477.413.813.3s1.612-.516 2.251-.872c.916-.51 1.62-.916 2.127-1.173.966-.484 1.917-.17 2.097-.406-.076.153-.152.48-.31 1.017-.202.684-.48 1.409-1.117 2.05-1.13 1.12-1.917 1.361-2.172 1.334-.346-.035-.796-.542-1.025-.948-.138-.233-.205-.457-.413-.65-.25-.236-.553-.272-.9-.25-.346.027-.667.074-1.048.108-.6.056-.95.067-1.217-.028-.477-.17-.727-.69-.727-1.24 0-.548.247-1.15.55-1.77.24-.487.54-.97.835-1.44.246-.394.476-.792.668-1.173.182-.315.335-.63.416-.9a.427.427 0 0 0-.023-.385c.022-.323.024-.658.022-.95-.002-.293-.011-.572-.05-.836a3.05 3.05 0 0 0-.084-.368c-.098-.297-.228-.59-.393-.876a7.872 7.872 0 0 1-.246-.542c-.137-.344-.26-.704-.346-1.057z"/>
                </svg>
                Buka Kujaga Bot
              </a>
            </div>
          )}

          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Email Anda</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition"
              >
                Kirim Magic Link
              </button>
              <button
                type="button"
                onClick={() => setStep("choose")}
                className="w-full text-slate-400 hover:text-white py-2 text-sm transition"
              >
                ← Kembali
              </button>
            </form>
          )}

          {step === "loading" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin mx-auto mb-4" />
              <p className="text-slate-400">Memproses...</p>
            </div>
          )}

          {step === "success" && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Login Berhasil!</h3>
              <p className="text-slate-400 text-sm mb-4">
                Anda sudah masuk. Mengalihkan ke dashboard...
              </p>
              <a href="/dashboard" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition">
                Buka Dashboard
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">
          Belum punya akun? <a href="#" className="text-indigo-400 hover:text-indigo-300">Daftar gratis</a>
        </p>
      </div>
    </div>
  );
}