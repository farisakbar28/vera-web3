export async function getPublicStats() {
  // Simulasi data dari canister
  return Promise.resolve({
    totalFunds: 'Rp 1.250.000.000',
    totalRecipients: 4820,
    totalTransactions: 15321,
  });
}

export async function getRecentTransactions() {
  return Promise.resolve([
    { id: 'TXN-ABC-001', date: '22 Juli 2025', program: 'BLT - Juli 2025', amount: 'Rp 500.000', recipientId: 'rcpt-***-xyz' },
    { id: 'TXN-ABC-002', date: '22 Juli 2025', program: 'Bantuan Pendidikan', amount: 'Rp 250.000', recipientId: 'rcpt-***-pqr' },
    { id: 'TXN-ABC-003', date: '21 Juli 2025', program: 'Bantuan Sembako', amount: 'Paket Sembako', recipientId: 'rcpt-***-lmn' },
    { id: 'TXN-ABC-004', date: '21 Juli 2025', program: 'BLT - Juli 2025', amount: 'Rp 500.000', recipientId: 'rcpt-***-def' },
    { id: 'TXN-ABC-005', date: '20 Juli 2025', program: 'BLT - Juli 2025', amount: 'Rp 500.000', recipientId: 'rcpt-***-abc' },
  ]);
}