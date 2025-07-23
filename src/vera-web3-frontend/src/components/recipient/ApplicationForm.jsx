import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ApplicationForm.module.scss';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    address: '',
    phoneNumber: '',
    reason: '',
  });
  const [documentFile, setDocumentFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');

  const navigate = useNavigate(); // ✅ router redirect

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage('');
    setStatusType('');

    if (!formData.fullName || !formData.idNumber || !documentFile) {
      setStatusMessage('Error: Nama Lengkap, NIK, dan Dokumen wajib diisi.');
      setStatusType('error');
      setIsLoading(false);
      return;
    }

    console.log("Data yang akan dikirim:", formData);
    console.log("Dokumen yang di-upload:", documentFile);

    await new Promise(resolve => setTimeout(resolve, 2000)); // simulasi delay kirim

    // Simpan status dummy ke localStorage (optional)
    localStorage.setItem('application_status', 'menunggu_verifikasi');

    setIsLoading(false);
    setStatusMessage('Pengajuan Anda telah berhasil dikirim! Mohon tunggu proses verifikasi.');
    setStatusType('success');

    // ✅ Redirect setelah submit sukses
    setTimeout(() => {
      navigate('/recipient/dashboard');
    }, 2000); // kasih jeda biar user sempat lihat pesan sukses
  };

  return (
    <div className={styles.applicationFormContainer}>
      <h2>Formulir Pengajuan Bantuan</h2>
      
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">Nama Lengkap (Sesuai KTP)</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="idNumber">Nomor Induk Kependudukan (NIK)</label>
          <input type="text" id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleInputChange} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Alamat Lengkap</label>
          <textarea id="address" name="address" rows="3" value={formData.address} onChange={handleInputChange}></textarea>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber">Nomor Telepon / WhatsApp</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="reason">Alasan Mengajukan Bantuan (Opsional)</label>
          <textarea id="reason" name="reason" rows="3" value={formData.reason} onChange={handleInputChange} placeholder="Jelaskan singkat kondisi Anda..."></textarea>
        </div>

        <div className={styles.formGroup}>
          <label>Unggah Dokumen Pendukung</label>
          <div className={styles.fileUploadArea}>
            <label htmlFor="file-upload" className={styles.fileUploadLabel}>
              Pilih file untuk diunggah
            </label>
            <input id="file-upload" name="file-upload" type="file" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
            <p>atau seret dan lepas</p>
            <p>PDF, PNG, JPG, JPEG hingga 5MB</p>
            {documentFile && <p className={styles.fileName}>File terpilih: {documentFile.name}</p>}
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" disabled={isLoading} className={styles.submitButton}>
            {isLoading ? 'Mengirim Data...' : 'Kirim Pengajuan'}
          </button>

          {statusMessage && (
            <p className={`${styles.statusMessage} ${styles[statusType]}`}>
              {statusMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}