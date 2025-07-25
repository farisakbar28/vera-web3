/*
REVISI STRUKTUR SESUAI FLOW:
- PublicTransparencyPage.jsx sekarang fetch data dari API (publicLedgerManager.js)
- Tidak menambah file baru seperti Navbar sesuai instruksi
- Semua file tetap di SRS structure yang kamu kirim
*/

// src/pages/PublicTransparencyPage.jsx
import React, { useEffect, useState } from 'react';
import TransactionLog from '../components/public/TransactionLog';
import styles from './PublicTransparencyPage.module.scss';
import { getPublicStats, getRecentTransactions } from "../api/publicLedger";


export default function PublicTransparencyPage() {
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedStats = await getPublicStats();
        const fetchedTransactions = await getRecentTransactions();
        setStats(fetchedStats);
        setTransactions(fetchedTransactions);
      } catch (err) {
        console.error("Gagal mengambil data publik:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.transparencyPage}>
      <header className={styles.pageHeader}>
        <h1>Transparansi Publik</h1>
        <p>Setiap transaksi dicatat secara permanen di blockchain dan dapat diverifikasi oleh siapa saja.</p>
      </header>

      {stats && (
        <section className={styles.statsContainer}>
          <div className={styles.statCard}>
            <h3>Total Dana Tersalurkan</h3>
            <span>{stats.totalFunds}</span>
          </div>
          <div className={styles.statCard}>
            <h3>Total Penerima Manfaat</h3>
            <span>{stats.totalRecipients}</span>
          </div>
          <div className={styles.statCard}>
            <h3>Total Transaksi</h3>
            <span>{stats.totalTransactions}</span>
          </div>
        </section>
      )}

      <section className={styles.logSection}>
        <h2>Log Transaksi Terbaru</h2>
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Program Bantuan</th>
                <th>Jumlah</th>
                <th>ID Penerima (Anonim)</th>
                <th>Verifikasi</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <TransactionLog key={tx.id} transaction={tx} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}