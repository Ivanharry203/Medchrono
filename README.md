
🚀 Cara Mengetes Website Menggunakan XAMPP

![image](https://github.com/user-attachments/assets/c9af7c4e-4af2-4d31-aa3f-f73cbb4d1808)

✨ Apa itu XAMPP?
XAMPP adalah software gratis yang menggabungkan Apache, MySQL/MariaDB, PHP, dan Perl. Dengan XAMPP, kamu bisa menjalankan website lokal di komputer sebelum mengupload ke hosting!


 📥 Download XAMPP

➡️ [Download XAMPP di sini](https://www.apachefriends.org/index.html)

**Pilih sesuai OS:**
- Windows
- Linux
- MacOS

---

## 🛠️ Cara Menjalankan Website di XAMPP

1. **Install XAMPP**  
   Download file instalasi dari link di atas, lalu install seperti biasa.

2. **Buka XAMPP Control Panel**  
   Jalankan `XAMPP Control Panel`, lalu klik **Start** pada:
   - **Apache** (untuk server web)
   - **MySQL** (jika butuh database)

3. **Salin Folder Website ke htdocs**  
   - Pergi ke folder instalasi XAMPP ➔ `htdocs`
   - Buat folder baru, misalnya `projectku`
   - Salin semua file website kamu ke folder tersebut.

4. **Akses Website via Browser**  
   Buka browser favorit kamu dan ketik:
   
   ```
   http://localhost/projectku
   ```

5. **(Opsional) Setup Database**  
   Jika websitenya butuh database:
   - Buka `http://localhost/phpmyadmin`
   - Buat database baru sesuai konfigurasi project kamu.
   - Import file `.sql` yang sudah tersedia.

---

## 📸 Contoh Tampilan

Saat XAMPP sudah berjalan dan project diakses, contoh tampilan akan muncul seperti ini:

![image](https://github.com/user-attachments/assets/cd7027c4-d83c-4682-9d58-bf1b16cb4f0f)


## ⚡ Troubleshooting
- Pastikan tidak ada aplikasi lain yang memakai port **80** dan **443** (seperti Skype, IIS).
- Kalau Apache tidak jalan, coba **Run as Administrator** saat membuka XAMPP.
- Pastikan file project kamu tidak error (cek error_log jika ada masalah).

---

## ✨ Bonus: Tips
- Gunakan folder name **tanpa spasi** di dalam `htdocs`.
- Cek `error_log` di folder `xampp/apache/logs` untuk debug error.

---

> 📌 **Note:** Ini hanya untuk development lokal/localhost. Untuk live production server, rekomendasinya beda ya!
