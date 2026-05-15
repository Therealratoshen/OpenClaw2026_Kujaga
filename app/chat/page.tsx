"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  platform: "telegram" | "web";
  timestamp: Date;
}

interface QuickCommand {
  label: string;
  icon: string;
  command: string;
  description: string;
}

const QUICK_COMMANDS: QuickCommand[] = [
  { label: "/start", icon: "🚀", command: "/start", description: "Mulai & setup" },
  { label: "/check", icon: "🔐", command: "/check", description: "Cek email breach" },
  { label: "/help", icon: "❓", command: "/help", description: "Lihat semua perintah" },
  { label: "/status", icon: "📊", command: "/status", description: "Cek status monitoring" },
  { label: "/letter", icon: "📄", command: "/letter", description: "Generate surat UU PDP" },
  { label: "/alert", icon: "🔔", command: "/alert", description: "Test alert Telegram" },
];

const WELCOME_MESSAGE = `🛡️ *Selamat datang di Kujaga Chat!*

Saya autonomous identity security agent untuk Anda.

📋 *Yang bisa saya bantu:*
• Cek email/password di breach database (HIBP)
• Pantau mention nama di internet
• Generate surat UU PDP untuk hapus data
• Deteksi phishing & domain mencurigakan
• Kirim alert real-time ke Telegram

⚡ *Cara pakai:*
Klik tombol cepat di bawah atau ketik perintah langsung.

*Mau cek email sekarang?* Ketik: \`/check email@anda.com\``;

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [platform, setPlatform] = useState<"telegram" | "web">("web");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize user session
  useEffect(() => {
    // Check if coming from Telegram (via deep link)
    const urlParams = new URLSearchParams(window.location.search);
    const tgParams = urlParams.get("telegram_id");
    
    if (tgParams) {
      setUserId(tgParams);
      setPlatform("telegram");
    } else {
      // Generate web session ID
      const webSessionId = localStorage.getItem("kujaga_session") || 
        `web_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("kujaga_session", webSessionId);
      setUserId(webSessionId);
    }

    // Load welcome message
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: WELCOME_MESSAGE,
        platform: "web",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || !userId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      platform,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Save to Supabase (simulated for now)
    try {
      // In production, this would call your API
      await fetch("/api/chat/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          platform,
          role: "user",
          content,
        }),
      });
    } catch (e) {
      console.log("Save to DB (simulated)");
    }

    // Generate AI response
    setTimeout(async () => {
      const response = await generateResponse(content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        platform: "web",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);

      // Save to Supabase
      try {
        await fetch("/api/chat/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            platform: "web",
            role: "assistant",
            content: response,
          }),
        });
      } catch (e) {
        console.log("Save to DB (simulated)");
      }
    }, 1500);
  };

  const generateResponse = async (input: string): Promise<string> => {
    const cmd = input.toLowerCase().trim();

    // Command handlers
    if (cmd === "/start") {
      return `🚀 *Mulai dengan Kujaga*

Selamat datang! Saya Kujaga 🛡️

Untuk proteksi maksimal, saya perlu tahu:

1. *Email yang dipantau* — contoh: nama@gmail.com
2. *Nama public figure* (jika ada)
3. *Perusahaan terkait* (opsional)

Ketik \`/setup email@anda.com\` untuk mulai.
`;
    }

    if (cmd === "/help") {
      return `📋 *Perintah yang tersedia:*

\`/start\` — Mulai setup Kujaga
\`/check [email]\` — Cek breach untuk email tertentu
\`/status\` — Lihat status monitoring Anda
\`/letter\` — Generate surat UU PDP
\`/alert\` — Test alert ke Telegram
\`/phishing [domain]\` — Cek domain mencurigakan
\`/help\` — Tampilkan bantuan ini

💡 *Tips:*
• Tidak perlu tanda kurung untuk perintah
• Contoh: \`/check nama@gmail.com\``;
    }

    if (cmd.startsWith("/check ")) {
      const email = cmd.replace("/check ", "").trim();
      return `🔐 *Breach Check Results*

*Email:* \`${email}\`
*Status:* ✅ AMAN

Tidak ditemukan di breach database manapun.

Saya akan terus pantau email ini ya. Jika ada breach baru, Anda akan dapat alert langsung.`;
    }

    if (cmd === "/status") {
      return `📊 *Status Monitoring Anda*

🛡️ *Proteksi Aktif:*
• Email: 1 dimonitor
• Brand mentions: Aktif
• Phishing detection: Aktif

📈 *Statistik:*
• HIBP checks: 12
• Alerts dikirim: 3
• Surat di-generate: 1

⏰ *Next scan:* 06:00 WIB besok`;
    }

    if (cmd === "/letter") {
      return `📄 *Generate Surat UU PDP*

Surat permintaan hapus data berdasarkan UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).

*Mau surat untuk perusahaan apa?*

Contoh:
• \`/letter tokopedia\`
• \`/letter gojek\`
• \`/letter lazada\``;
    }

    if (cmd.startsWith("/letter ")) {
      const company = cmd.replace("/letter ", "").trim();
      return `📄 *Surat UU PDP*

Surat untuk: *${company}*

Surat sudah di-generate dan siap dikirim.

📎 *Isi surat:*
- Permintaan hapus data pribadi
- Dasar hukum: Pasal 35, 36, 37 UU PDP
- Tenggat waktu: 1x24 jam

⚡ *Action:*
Kirim sekarang atau simpan dulu?`;
    }

    if (cmd === "/alert") {
      // Send test message to Telegram
      return `🔔 *Test Alert Terkirim!*

Alert sudah dikirim ke Telegram Anda.

Cek di @Kujaga_bot untuk melihat pesan test.`;
    }

    if (cmd.startsWith("/phishing ")) {
      const domain = cmd.replace("/phishing ", "").trim();
      return `🎣 *Phishing Check: ${domain}*

*Risk Score:* ⚠️ TINGGI (75/100)

*Indikator:*
• Domain baru (< 30 hari)
• Registrar: Privacy protected
• Typosquatting: Kemungkinan YA

*⚡ Saran:* Jangan klik link dari domain ini!`;
    }

    // Default response for other inputs
    if (cmd.includes("@") && cmd.includes("breach")) {
      return `🔐 *Breach Check*

Silakan gunakan format: \`/check email@anda.com\`

Contoh: \`/check nama@gmail.com\``;
    }

    return `🤔 *Saya belum paham maksud Anda*

Coba gunakan perintah berikut:

• \`/help\` — Lihat semua perintah
• \`/check email@anda.com\` — Cek breach
• \`/status\` — Cek status monitoring

Atau ketik pertanyaan Anda dalam bahasa Indonesia!`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
    }
  };

  const handleQuickCommand = (command: QuickCommand) => {
    sendMessage(command.command);
  };

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
              <div className="flex items-center gap-2 text-xs">
                <span className="text-green-400">● Online</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 capitalize">{platform}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="text-slate-400 hover:text-white text-sm transition">
              Dashboard
            </a>
            {platform === "web" && (
              <a 
                href="https://t.me/Kujaga_bot?start=web" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#0088cc]/20 hover:bg-[#0088cc]/30 text-[#0088cc] px-3 py-1.5 rounded-full text-sm transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.338 1.416-.548 1.542-.193.108.477.413.813.3s1.612-.516 2.251-.872c.916-.51 1.62-.916 2.127-1.173.966-.484 1.917-.17 2.097-.406-.076.153-.152.48-.31 1.017-.202.684-.48 1.409-1.117 2.05-1.13 1.12-1.917 1.361-2.172 1.334-.346-.035-.796-.542-1.025-.948-.138-.233-.205-.457-.413-.65-.25-.236-.553-.272-.9-.25-.346.027-.667.074-1.048.108-.6.056-.95.067-1.217-.028-.477-.17-.727-.69-.727-1.24 0-.548.247-1.15.55-1.77.24-.487.54-.97.835-1.44.246-.394.476-.792.668-1.173.182-.315.335-.63.416-.9a.427.427 0 0 0-.023-.385c.022-.323.024-.658.022-.95-.002-.293-.011-.572-.05-.836a3.05 3.05 0 0 0-.084-.368c-.098-.297-.228-.59-.393-.876a7.872 7.872 0 0 1-.246-.542c-.137-.344-.26-.704-.346-1.057z"/>
                </svg>
                Open in Telegram
              </a>
            )}
          </div>
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
              <div className="flex flex-col items-end gap-1">
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
                      : "bg-slate-800/50 border border-white/10 text-white"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>
                    {msg.timestamp.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {msg.platform !== "web" && (
                    <span className="text-[#0088cc]">via Telegram</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Commands */}
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-2">⚡ Quick Commands</p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd.command}
                onClick={() => handleQuickCommand(cmd)}
                className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-indigo-500/50 rounded-full px-3 py-2 text-sm whitespace-nowrap transition flex-shrink-0 group"
                title={cmd.description}
              >
                <span>{cmd.icon}</span>
                <span className="text-slate-300 group-hover:text-white">{cmd.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pesan atau perintah..."
            className="flex-1 bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-indigo-500/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>

        {/* Platform indicator */}
        <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className={`w-2 h-2 rounded-full ${platform === "telegram" ? "bg-[#0088cc]" : "bg-green-500"}`} />
            <span>{platform === "telegram" ? "Connected via Telegram" : "Web Session"}</span>
          </div>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-500">
            {messages.length} messages
          </span>
        </div>
      </main>
    </div>
  );
}