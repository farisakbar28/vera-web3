/**
 * API Manager for Recipient Canister (Investigation Mode)
 * File ini berfungsi sebagai jembatan antara frontend React dan canister recipient_manager.
 */
import { recipient_manager as recipientManagerActor } from '../../declarations/recipient_manager';

export const submitApplication = async (formData, documentFile) => {
  console.log("--- [DEBUG] Memulai submitApplication ---");
  console.log("[DEBUG] Mengecek objek 'recipientManagerActor':", recipientManagerActor);

  try {
    if (!recipientManagerActor || typeof recipientManagerActor.submit_application !== 'function') {
      console.error("[DEBUG] GAGAL: Pengecekan awal tidak lolos. Actor atau fungsi tidak ada.");
      throw new Error("Canister 'recipient_manager' tidak ditemukan. Pastikan backend sudah berjalan dan `dfx generate` sudah dijalankan.");
    }
    console.log("[DEBUG] Lolos pengecekan awal. Fungsi 'submit_application' ditemukan.");

    const fileBuffer = await documentFile.arrayBuffer();
    const documentBytes = new Uint8Array(fileBuffer);

    const applicationData = {
      fullName: formData.fullName,
      idNumber: formData.idNumber,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      reason: formData.reason,
      document: Array.from(documentBytes),
    };

    console.log("[DEBUG] Siap memanggil canister dengan data:", applicationData);
    const result = await recipientManagerActor.submit_application(applicationData);

    console.log("--- [DEBUG] Respon diterima dari canister ---");
    console.log("[DEBUG] Isi dari variabel 'result':", result);
    console.log("[DEBUG] Tipe dari variabel 'result':", typeof result);

    // --- PERUBAHAN SUPER KETAT DI SINI ---
    // Memeriksa apakah 'result' adalah objek yang valid DAN memiliki kunci 'Ok' atau 'Err' yang isinya BUKAN undefined.
    if (typeof result === 'object' && result !== null) {
      if ('Ok' in result && result.Ok !== undefined) {
        console.log("[DEBUG] 'result' memiliki properti 'Ok' yang valid. Mengembalikan sukses.");
        return { success: true, message: result.Ok || "Pengajuan berhasil tanpa pesan." };
      } else if ('Err' in result && result.Err !== undefined) {
        console.error("[DEBUG] 'result' memiliki properti 'Err' yang valid. Mengembalikan error.");
        const errorKey = Object.keys(result.Err)[0];
        const errorMessage = result.Err[errorKey];
        throw new Error(`Error dari canister: ${errorMessage || 'Unknown error'}`);
      }
    }

    // Jika 'result' bukan objek yang valid atau tidak memiliki 'Ok'/'Err' yang valid, anggap gagal.
    console.error("[DEBUG] GAGAL: Format 'result' tidak valid atau ini adalah 'sukses palsu'.");
    throw new Error("Gagal menerima konfirmasi dari server. Pastikan backend berjalan dengan benar.");

  } catch (error) {
    console.error("--- [DEBUG] Terjadi ERROR di dalam blok catch ---");
    console.error(error);
    throw error;
  }
};