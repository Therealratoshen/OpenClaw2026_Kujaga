(()=>{var e={};e.id=929,e.ids=[929],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},6188:(e,a,t)=>{"use strict";t.r(a),t.d(a,{GlobalError:()=>n.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>c,routeModule:()=>h,tree:()=>d}),t(1980),t(1506),t(5866);var s=t(3191),i=t(8716),r=t(7922),n=t.n(r),l=t(5231),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);t.d(a,o);let d=["",{children:["chat",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,1980)),"/Users/filberthenrico/RISTEK x Build Club OpenClaw Agenthon 2026/OpenClaw2026_Kujaga/app/chat/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,1506)),"/Users/filberthenrico/RISTEK x Build Club OpenClaw Agenthon 2026/OpenClaw2026_Kujaga/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,5866,23)),"next/dist/client/components/not-found-error"]}],c=["/Users/filberthenrico/RISTEK x Build Club OpenClaw Agenthon 2026/OpenClaw2026_Kujaga/app/chat/page.tsx"],u="/chat/page",m={require:t,loadChunk:()=>Promise.resolve()},h=new s.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/chat/page",pathname:"/chat",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},2858:(e,a,t)=>{Promise.resolve().then(t.bind(t,2130))},6137:()=>{},245:(e,a,t)=>{Promise.resolve().then(t.t.bind(t,2994,23)),Promise.resolve().then(t.t.bind(t,6114,23)),Promise.resolve().then(t.t.bind(t,9727,23)),Promise.resolve().then(t.t.bind(t,9671,23)),Promise.resolve().then(t.t.bind(t,1868,23)),Promise.resolve().then(t.t.bind(t,4759,23))},2130:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>n});var s=t(326),i=t(7577);let r=[{label:"/start",icon:"\uD83D\uDE80",command:"/start",description:"Mulai & setup"},{label:"/check",icon:"\uD83D\uDD10",command:"/check",description:"Cek email breach"},{label:"/help",icon:"❓",command:"/help",description:"Lihat semua perintah"},{label:"/status",icon:"\uD83D\uDCCA",command:"/status",description:"Cek status monitoring"},{label:"/letter",icon:"\uD83D\uDCC4",command:"/letter",description:"Generate surat UU PDP"},{label:"/alert",icon:"\uD83D\uDD14",command:"/alert",description:"Test alert Telegram"}];function n(){let[e,a]=(0,i.useState)([]),[t,n]=(0,i.useState)(""),[l,o]=(0,i.useState)(!1),[d,c]=(0,i.useState)(""),[u,m]=(0,i.useState)("web"),h=(0,i.useRef)(null),p=async e=>{if(!e.trim()||!d)return;let t={id:Date.now().toString(),role:"user",content:e,platform:u,timestamp:new Date};a(e=>[...e,t]),n(""),o(!0);try{await fetch("/api/chat/save",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:d,platform:u,role:"user",content:e})})}catch(e){console.log("Save to DB (simulated)")}setTimeout(async()=>{let t=await x(e),s={id:(Date.now()+1).toString(),role:"assistant",content:t,platform:"web",timestamp:new Date};a(e=>[...e,s]),o(!1);try{await fetch("/api/chat/save",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:d,platform:"web",role:"assistant",content:t})})}catch(e){console.log("Save to DB (simulated)")}},1500)},x=async e=>{let a=e.toLowerCase().trim();if("/start"===a)return`🚀 *Mulai dengan Kujaga*

Selamat datang! Saya Kujaga 🛡️

Untuk proteksi maksimal, saya perlu tahu:

1. *Email yang dipantau* — contoh: nama@gmail.com
2. *Nama public figure* (jika ada)
3. *Perusahaan terkait* (opsional)

Ketik \`/setup email@anda.com\` untuk mulai.
`;if("/help"===a)return`📋 *Perintah yang tersedia:*

\`/start\` — Mulai setup Kujaga
\`/check [email]\` — Cek breach untuk email tertentu
\`/status\` — Lihat status monitoring Anda
\`/letter\` — Generate surat UU PDP
\`/alert\` — Test alert ke Telegram
\`/phishing [domain]\` — Cek domain mencurigakan
\`/help\` — Tampilkan bantuan ini

💡 *Tips:*
• Tidak perlu tanda kurung untuk perintah
• Contoh: \`/check nama@gmail.com\``;if(a.startsWith("/check ")){let e=a.replace("/check ","").trim();return`🔐 *Breach Check Results*

*Email:* \`${e}\`
*Status:* ✅ AMAN

Tidak ditemukan di breach database manapun.

Saya akan terus pantau email ini ya. Jika ada breach baru, Anda akan dapat alert langsung.`}if("/status"===a)return`📊 *Status Monitoring Anda*

🛡️ *Proteksi Aktif:*
• Email: 1 dimonitor
• Brand mentions: Aktif
• Phishing detection: Aktif

📈 *Statistik:*
• HIBP checks: 12
• Alerts dikirim: 3
• Surat di-generate: 1

⏰ *Next scan:* 06:00 WIB besok`;if("/letter"===a)return`📄 *Generate Surat UU PDP*

Surat permintaan hapus data berdasarkan UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).

*Mau surat untuk perusahaan apa?*

Contoh:
• \`/letter tokopedia\`
• \`/letter gojek\`
• \`/letter lazada\``;if(a.startsWith("/letter ")){let e=a.replace("/letter ","").trim();return`📄 *Surat UU PDP*

Surat untuk: *${e}*

Surat sudah di-generate dan siap dikirim.

📎 *Isi surat:*
- Permintaan hapus data pribadi
- Dasar hukum: Pasal 35, 36, 37 UU PDP
- Tenggat waktu: 1x24 jam

⚡ *Action:*
Kirim sekarang atau simpan dulu?`}if("/alert"===a)return`🔔 *Test Alert Terkirim!*

Alert sudah dikirim ke Telegram Anda.

Cek di @Kujaga_bot untuk melihat pesan test.`;if(a.startsWith("/phishing ")){let e=a.replace("/phishing ","").trim();return`🎣 *Phishing Check: ${e}*

*Risk Score:* ⚠️ TINGGI (75/100)

*Indikator:*
• Domain baru (< 30 hari)
• Registrar: Privacy protected
• Typosquatting: Kemungkinan YA

*⚡ Saran:* Jangan klik link dari domain ini!`}return a.includes("@")&&a.includes("breach")?`🔐 *Breach Check*

Silakan gunakan format: \`/check email@anda.com\`

Contoh: \`/check nama@gmail.com\``:`🤔 *Saya belum paham maksud Anda*

Coba gunakan perintah berikut:

• \`/help\` — Lihat semua perintah
• \`/check email@anda.com\` — Cek breach
• \`/status\` — Cek status monitoring

Atau ketik pertanyaan Anda dalam bahasa Indonesia!`},g=e=>{p(e.command)};return(0,s.jsxs)("div",{className:"min-h-screen bg-[#0a0a0f] flex flex-col",children:[s.jsx("header",{className:"bg-slate-900/80 backdrop-blur-md border-b border-white/5 px-6 py-4",children:(0,s.jsxs)("div",{className:"max-w-4xl mx-auto flex items-center justify-between",children:[(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[(0,s.jsxs)("div",{className:"relative",children:[s.jsx("div",{className:"w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center",children:s.jsx("svg",{className:"w-5 h-5 text-white",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"})})}),s.jsx("div",{className:"absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"})]}),(0,s.jsxs)("div",{children:[s.jsx("h1",{className:"font-semibold text-white",children:"Kujaga Chat"}),(0,s.jsxs)("div",{className:"flex items-center gap-2 text-xs",children:[s.jsx("span",{className:"text-green-400",children:"● Online"}),s.jsx("span",{className:"text-slate-500",children:"•"}),s.jsx("span",{className:"text-slate-400 capitalize",children:u})]})]})]}),(0,s.jsxs)("div",{className:"flex items-center gap-4",children:[s.jsx("a",{href:"/dashboard",className:"text-slate-400 hover:text-white text-sm transition",children:"Dashboard"}),"web"===u&&(0,s.jsxs)("a",{href:"https://t.me/Kujaga_bot?start=web",target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-2 bg-[#0088cc]/20 hover:bg-[#0088cc]/30 text-[#0088cc] px-3 py-1.5 rounded-full text-sm transition",children:[s.jsx("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"currentColor",children:s.jsx("path",{d:"M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.338 1.416-.548 1.542-.193.108.477.413.813.3s1.612-.516 2.251-.872c.916-.51 1.62-.916 2.127-1.173.966-.484 1.917-.17 2.097-.406-.076.153-.152.48-.31 1.017-.202.684-.48 1.409-1.117 2.05-1.13 1.12-1.917 1.361-2.172 1.334-.346-.035-.796-.542-1.025-.948-.138-.233-.205-.457-.413-.65-.25-.236-.553-.272-.9-.25-.346.027-.667.074-1.048.108-.6.056-.95.067-1.217-.028-.477-.17-.727-.69-.727-1.24 0-.548.247-1.15.55-1.77.24-.487.54-.97.835-1.44.246-.394.476-.792.668-1.173.182-.315.335-.63.416-.9a.427.427 0 0 0-.023-.385c.022-.323.024-.658.022-.95-.002-.293-.011-.572-.05-.836a3.05 3.05 0 0 0-.084-.368c-.098-.297-.228-.59-.393-.876a7.872 7.872 0 0 1-.246-.542c-.137-.344-.26-.704-.346-1.057z"})}),"Open in Telegram"]})]})]})}),(0,s.jsxs)("main",{className:"flex-1 max-w-4xl w-full mx-auto px-6 py-4 overflow-hidden flex flex-col",children:[(0,s.jsxs)("div",{className:"flex-1 overflow-y-auto space-y-4 mb-4",children:[e.map(e=>s.jsx("div",{className:`flex ${"user"===e.role?"justify-end":"justify-start"}`,children:(0,s.jsxs)("div",{className:"flex flex-col items-end gap-1",children:[s.jsx("div",{className:`max-w-[85%] rounded-2xl px-4 py-3 ${"user"===e.role?"bg-gradient-to-br from-indigo-600 to-purple-600 text-white":"bg-slate-800/50 border border-white/10 text-white"}`,children:s.jsx("div",{className:"text-sm whitespace-pre-wrap leading-relaxed",children:e.content})}),(0,s.jsxs)("div",{className:"flex items-center gap-2 text-xs text-slate-500",children:[s.jsx("span",{children:e.timestamp.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})}),"web"!==e.platform&&s.jsx("span",{className:"text-[#0088cc]",children:"via Telegram"})]})]})},e.id)),l&&s.jsx("div",{className:"flex justify-start",children:s.jsx("div",{className:"bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-3",children:(0,s.jsxs)("div",{className:"flex items-center gap-1",children:[s.jsx("div",{className:"w-2 h-2 bg-indigo-500 rounded-full animate-bounce",style:{animationDelay:"0ms"}}),s.jsx("div",{className:"w-2 h-2 bg-indigo-500 rounded-full animate-bounce",style:{animationDelay:"150ms"}}),s.jsx("div",{className:"w-2 h-2 bg-indigo-500 rounded-full animate-bounce",style:{animationDelay:"300ms"}})]})})}),s.jsx("div",{ref:h})]}),(0,s.jsxs)("div",{className:"mb-4",children:[s.jsx("p",{className:"text-xs text-slate-500 mb-2",children:"⚡ Quick Commands"}),s.jsx("div",{className:"flex gap-2 overflow-x-auto pb-2 scrollbar-thin",children:r.map(e=>(0,s.jsxs)("button",{onClick:()=>g(e),className:"flex items-center gap-2 bg-white/5 border border-white/10 hover:border-indigo-500/50 rounded-full px-3 py-2 text-sm whitespace-nowrap transition flex-shrink-0 group",title:e.description,children:[s.jsx("span",{children:e.icon}),s.jsx("span",{className:"text-slate-300 group-hover:text-white",children:e.label})]},e.command))})]}),(0,s.jsxs)("form",{onSubmit:e=>{e.preventDefault(),t.trim()&&p(t)},className:"flex gap-3",children:[s.jsx("input",{type:"text",value:t,onChange:e=>n(e.target.value),placeholder:"Ketik pesan atau perintah...",className:"flex-1 bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"}),s.jsx("button",{type:"submit",disabled:!t.trim(),className:"bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-indigo-500/30",children:s.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 19l9 2-9-18-9 18 9-2zm0 0v-8"})})})]}),(0,s.jsxs)("div",{className:"flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/5",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2 text-xs text-slate-500",children:[s.jsx("div",{className:`w-2 h-2 rounded-full ${"telegram"===u?"bg-[#0088cc]":"bg-green-500"}`}),s.jsx("span",{children:"telegram"===u?"Connected via Telegram":"Web Session"})]}),s.jsx("span",{className:"text-slate-600",children:"•"}),(0,s.jsxs)("span",{className:"text-xs text-slate-500",children:[e.length," messages"]})]})]})]})}},1980:(e,a,t)=>{"use strict";t.r(a),t.d(a,{$$typeof:()=>n,__esModule:()=>r,default:()=>l});var s=t(8570);let i=(0,s.createProxy)(String.raw`/Users/filberthenrico/RISTEK x Build Club OpenClaw Agenthon 2026/OpenClaw2026_Kujaga/app/chat/page.tsx`),{__esModule:r,$$typeof:n}=i;i.default;let l=(0,s.createProxy)(String.raw`/Users/filberthenrico/RISTEK x Build Club OpenClaw Agenthon 2026/OpenClaw2026_Kujaga/app/chat/page.tsx#default`)},1506:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>r,metadata:()=>i});var s=t(9510);t(7272);let i={title:"Kujaga — Guardian Digital 24/7",description:"Autonomous Identity Security Agent for Indonesian Public Figures. Zero triggers needed."};function r({children:e}){return s.jsx("html",{lang:"id",children:s.jsx("body",{className:"antialiased",children:e})})}},7272:()=>{}};var a=require("../../webpack-runtime.js");a.C(e);var t=e=>a(a.s=e),s=a.X(0,[948,471],()=>t(6188));module.exports=s})();