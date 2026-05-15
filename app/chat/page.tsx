"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Halo! Saya Kujaga 🛡️\n\nSaya autonomous identity security agent untuk Anda. Apa yang ingin Anda proteksi hari ini?\n\n📋 Yang bisa saya bantu:\n• Cek email/password di breach database\n• Pantau mention nama di internet\n• Generate surat UU PDP\n• Deteksi phishing & domain mencurigakan\n\nKetik /help untuk lihat semua perintah.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        {
          content: "🔐 *Breach Check Complete*\n\nEmail:Checked\nStatus: AMAN ✓\n\nTidak ditemukan di breach database manapun. Saya tetap akan pantau terus ya!",
        },
        {
          content: "📄 *Surat UU PDP*\n\nSurat permintaan hapus data sudah saya siapkan. Mau saya kirimkan ke email Anda?",
        },
        {
          content: "🚨 *Phishing Alert*\n\nDomain mencurigakan terdeteksi. Kemungkinan phishing. Jangan klik link tersebut!",
        },
        {
          content: "✅收到! Saya akan pantau email tersebut. Jika ada breach baru, saya akan langsung kirim alert ke Telegram Anda.\n\n⚡ Tips: Untuk proteksi maksimal, disarankan juga untuk:\n• Ganti password secara berkala\n• Aktifkan 2FA di semua akun penting\n• Waspada dengan email dari pengirim tidak dikenal",
        },
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: randomResponse.content,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    { label: "Cek Email", icon: "🔐", action: "/check" },
    { label: "Generate Letter", icon: "📄", action: "/letter" },
    { label: "Status", icon: "📊", action: "/status" },
    { label: "Help", icon: "❓", action: "/help" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
            </div>
            <div>
              <h1 className="font-semibold text-white">Kujaga Chat</h1>
              <p className="text-xs text-green-400">● Online & Monitoring</p>
            </div>
          </div>
          <a href="/dashboard" className="text-slate-400 hover:text-white text-sm transition">
            Dashboard →
          </a>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-4 overflow-hidden flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
                    : "bg-slate-800/50 border border-white/10 text-white"
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                <div
                  className={`text-xs mt-1 ${
                    msg.role === "user" ? "text-white/60" : "text-slate-500"
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => setInput(action.action + " ")}
              className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-indigo-500/50 rounded-full px-4 py-2 text-sm whitespace-nowrap transition flex-shrink-0"
            >
              <span>{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pesan atau perintah (contoh: /check email@anda.com)"
            className="flex-1 bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>

        {/* Tips */}
        <p className="text-center text-slate-500 text-xs mt-4">
          💡 Tip: Ketik /help untuk melihat semua perintah yang tersedia
        </p>
      </main>
    </div>
  );
}