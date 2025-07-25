import React from 'react';
import styles from '../../pages/PublicTransparencyPage.module.scss'; // Menggunakan style dari halaman induknya

/**
 * TransactionLog Component
 * Menampilkan satu baris data transaksi dalam tabel.
 * @param {{transaction: object}} props - Menerima satu objek transaksi.
 */
export default function TransactionLog({ transaction }) {
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.program}</td>
      <td className={styles.amountCell}>{transaction.amount}</td>
      {/* ID Penerima dianonimkan untuk menjaga privasi */}
      <td className={styles.recipientIdCell}>{transaction.recipientId}</td>
      <td>
        <a 
          href={`https://dashboard.internetcomputer.org/transaction/${transaction.id}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.explorerLink}
        >
          Lihat
        </a>
      </td>
    </tr>
  );
}