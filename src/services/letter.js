/**
 * Letter Generation Service — PDUPA Letter via MiniMax
 */

const MINIMAX_API = 'https://api.minimax.chat/v1';

export async function generateLetter(params) {
  const { user_name, user_email, target_company, target_company_dpo_email, breach_description, breach_date } = params;

  const letter = `
NOMOR: 001/KUJAGA/${new Date().getFullYear()}
HAL: Permintaan Penghapusan Data Pribadi

Kepada Yth.
Tim Pengelola Data ${target_company}
Via: ${target_company_dpo_email}

Dengan hormat,

Saya, ${user_name} (${user_email}), dengan ini mengajukan permintaan 
penghapusan data pribadi saya yang telah terungkap dalam kejadian kebocoran data 
yang dilaporkan terjadi pada ${breach_date} sebagaimana diberitakan:

"${breach_description}"

Berdasarkan Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP),
Pasal 15 ayat (1), saya berhak meminta penghapusan data pribadi saya dari sistem 
${target_company}.

Saya mengajukan permintaan tersebut karena:
1. Data pribadi saya tidak lagi diperlukan oleh ${target_company}
2. Terdapat risiko penyalahgunaan data pribadi saya
3. Saya tidak memberikan persetujuan untuk penyimpanan lebih lanjut

Saya tunggu tanggapan dalam 1x24 jam sesuai ketentuan UU PDP.
Jika tidak ada respons, saya akan escalate ke KOMINFO dan BPDP.

Hormat saya,

${user_name}
Tanggal: ${new Date().toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta' })}
  `.trim();

  return {
    letter_id: `PDUPA-${Date.now()}`,
    format: 'PDF',
    status: 'ready',
    letter_text: letter
  };
}

// MiniMax integration for enhanced letter generation
export async function generateLetterWithMiniMax(params) {
  const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY;
  
  if (!MINIMAX_API_KEY) {
    // Fallback to basic letter
    return generateLetter(params);
  }

  try {
    const prompt = `Buatkan surat permintaan penghapusan data pribadi (PDUPA) berdasarkan UU PDP Indonesia.
    
Data:
- Nama: ${params.user_name}
- Email: ${params.user_email}
- Perusahaan Target: ${params.target_company}
- Email DPO: ${params.target_company_dpo_email}
- Deskripsi Breach: ${params.breach_description}
- Tanggal Breach: ${params.breach_date}

Surat harus formal, menggunakan bahasa Indonesia hukum, dan mencakup:
1. Identitas pemohon
2. Dasar hukum (UU PDP Pasal 15)
3. Detail data yang diminta untuk dihapus
4. Tenggat waktu 1x24 jam
5. Konsekuensi jika tidak ditanggapi`;

    const response = await fetch(`${MINIMAX_API}/text/chatcompletion_v2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MINIMAX_API_KEY}`
      },
      body: JSON.stringify({
        model: 'MiniMax-Text-01',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0]) {
      return {
        letter_id: `PDUPA-${Date.now()}`,
        format: 'PDF',
        status: 'ready',
        letter_text: data.choices[0].message.content
      };
    }
  } catch (error) {
    console.error('MiniMax error:', error);
  }

  // Fallback to basic letter
  return generateLetter(params);
}