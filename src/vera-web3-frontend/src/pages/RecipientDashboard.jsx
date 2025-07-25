import React, { useState } from 'react';
import styles from './RecipientDashboard.module.scss';

// --- DUMMY DATA (Kumpulan Data untuk Simulasi) ---
const dataTerverifikasi = {
  name: 'Intan Mutiara',
  status: 'Terverifikasi',
  nextAid: {
    programName: 'Bantuan Langsung Tunai (BLT) - Juli 2025',
    amount: 'Rp 500.000',
    distributionDate: '28 Juli 2025',
  },
  history: [
    { id: 'TXN-001', date: '15 Juni 2025', program: 'Bantuan Sembako Lebaran', amount: 'Paket Sembako', status: 'Diterima' },
    { id: 'TXN-002', date: '20 Mei 2025', program: 'Bantuan Pendidikan Anak', amount: 'Rp 250.000', status: 'Diterima' },
  ]
};

const dataMenunggu = {
  name: 'Intan Mutiara',
  status: 'Menunggu Verifikasi',
};

const dataDitolak = {
  name: 'Intan Mutiara',
  status: 'Ditolak',
  rejectionReason: 'Data pada dokumen pendukung (KTP) tidak sesuai dengan data yang diisi pada formulir.',
};


/**
 * RecipientDashboard Component (Versi Gabungan)
 * Halaman ini secara dinamis menampilkan konten berdasarkan status penerima.
 */
export default function RecipientDashboard() {
  // Ganti variabel ini untuk melihat status yang berbeda:
  // dataTerverifikasi, dataMenunggu, atau dataDitolak
  const [recipientData, setRecipientData] = useState(dataTerverifikasi);

  // Fungsi untuk render konten utama berdasarkan status
  const renderContent = () => {
    // KASUS 1: Jika status 'Terverifikasi'
    if (recipientData.status === 'Terverifikasi') {
      return (
        <>
          <div className={`${styles.card} ${styles.notificationCard}`}>
            <h2>Bantuan Berikutnya</h2>
            <p><strong>Program:</strong> {recipientData.nextAid.programName}</p>
            <p><strong>Jumlah:</strong> {recipientData.nextAid.amount}</p>
            <p><strong>Tanggal Penyaluran (Estimasi):</strong> {recipientData.nextAid.distributionDate}</p>
          </div>

          <div className={`${styles.card} ${styles.historyCard}`}>
            <h2>Riwayat Bantuan</h2>
            <div className={styles.tableContainer}>
              <table>
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Program Bantuan</th>
                    <th>Jumlah</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recipientData.history.map((item) => (
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td>{item.program}</td>
                      <td>{item.amount}</td>
                      <td><span className={styles.statusChipSuccess}>{item.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      );
    }

    // KASUS 2: Jika status 'Menunggu Verifikasi'
    if (recipientData.status === 'Menunggu Verifikasi') {
      return (
        <div className={`${styles.card} ${styles.statusInfoCard}`}>
          <h2>Pengajuan Anda Sedang Diproses</h2>
          <p>Terima kasih telah melakukan pengajuan. Tim kami sedang meninjau data dan dokumen yang Anda kirimkan.</p>
          <p>Anda akan menerima notifikasi lebih lanjut setelah proses verifikasi selesai. Mohon untuk menunggu.</p>
        </div>
      );
    }

    // KASUS 3: Jika status 'Ditolak'
    if (recipientData.status === 'Ditolak') {
      return (
        <div className={`${styles.card} ${styles.statusInfoCard}`}>
          <h2>Mohon Maaf, Pengajuan Anda Ditolak</h2>
          <p>Setelah proses verifikasi, kami menemukan bahwa pengajuan Anda belum dapat kami setujui saat ini.</p>
          <p><strong>Alasan Penolakan:</strong> {recipientData.rejectionReason}</p>
          <p>Jika Anda merasa ini adalah sebuah kekeliruan, silakan hubungi pusat bantuan kami.</p>
        </div>
      );
    }

    // Jika status tidak dikenali
    return <div className={styles.card}><p>Status tidak dikenali.</p></div>;
  };
  
  // Fungsi untuk mendapatkan class badge status yang sesuai
  const getStatusBadgeClass = () => {
    switch (recipientData.status) {
      case 'Terverifikasi':
        return ''; // Menggunakan style default dari .statusBadge
      case 'Menunggu Verifikasi':
        return styles.statusBadgePending;
      case 'Ditolak':
        return styles.statusBadgeRejected;
      default:
        return '';
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <h1>Dashboard Penerima</h1>
        <div className={styles.userProfile}>
          <span>Selamat datang, <strong>{recipientData.name}</strong>!</span>
          <span className={`${styles.statusBadge} ${getStatusBadgeClass()}`}>
            {recipientData.status}
          </span>
        </div>
      </header>
      
      {/* Konten dinamis dirender di sini */}
      {renderContent()}
    </div>
  );
}