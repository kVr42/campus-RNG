
export const ITEMS = [
  // =====================================
  // COMMON
  // =====================================
  { id: 'i01', name: 'Pulpen Pinjaman', category: 'Alat Tulis', rarity: 'Common', emoji: '🖊️', description: 'Pulpen yang selalu berpindah tangan dan jarang kembali.', flavor: 'Katanya cuma pinjam sebentar.' },
  { id: 'i02', name: 'Kertas HVS Sisa', category: 'Alat Tulis', rarity: 'Common', emoji: '📄', description: 'Dua lembar kertas terselip di dalam map.', flavor: 'Masih bisa dipakai.' },
  { id: 'i03', name: 'Penghapus Mini', category: 'Alat Tulis', rarity: 'Common', emoji: '🧽', description: 'Penghapus kecil yang sudah kehilangan separuh bentuk.', flavor: 'Kecil-kecil banyak jasa.' },
  { id: 'i04', name: 'Stabilo Setengah', category: 'Alat Tulis', rarity: 'Common', emoji: '🖍️', description: 'Tintanya tinggal sedikit, tetapi tetap dipertahankan.', flavor: 'Masih ada harapan.' },
  { id: 'i05', name: 'Klip Kertas', category: 'Alat Tulis', rarity: 'Common', emoji: '📎', description: 'Klip kecil untuk menyatukan lembar tugas.', flavor: 'Pemersatu lembaran.' },
  { id: 'i45', name: 'Nasi Bungkus Kantin', category: 'Makanan', rarity: 'Common', emoji: '🍱', description: 'Bekal sederhana yang menyelamatkan jam istirahat.', flavor: 'Menu andalan mahasiswa.' },
  { id: 'i46', name: 'Es Teh Jam Kosong', category: 'Makanan', rarity: 'Common', emoji: '🥤', description: 'Minuman dingin untuk menemani waktu di antara kelas.', flavor: 'Duduk sebentar, lanjut lagi.' },
  { id: 'i48', name: 'Helm Pinjaman', category: 'Perlengkapan', rarity: 'Common', emoji: '🪖', description: 'Helm cadangan yang ukurannya sedikit kebesaran.', flavor: 'Yang penting sampai tujuan.' },
  { id: 'i49', name: 'Kertas Coretan Rumus', category: 'Alat Tulis', rarity: 'Common', emoji: '📄', description: 'Kertas penuh rumus, panah, dan gambar yang sulit dibaca.', flavor: 'Hanya pembuatnya yang paham.' },
  { id: 'i50', name: 'Penggaris Patah', category: 'Alat Tulis', rarity: 'Common', emoji: '📏', description: 'Penggaris pendek yang tetap dipakai untuk membuat garis.', flavor: 'Setengah alat, sepenuh hati.' },
  { id: 'i60', name: 'Uang Kembalian Kantin', category: 'Makanan', rarity: 'Common', emoji: '🪙', description: 'Uang receh yang tersisa setelah membeli makan siang.', flavor: 'Masuk celengan darurat.' },
  { id: 'i61', name: 'Pensil 2B Ujian', category: 'Alat Tulis', rarity: 'Common', emoji: '✏️', description: 'Pensil andalan untuk mengisi lembar jawaban.', flavor: 'Semoga tidak patah di tengah ujian.' },
  { id: 'i62', name: 'Penggaris Transparan', category: 'Alat Tulis', rarity: 'Common', emoji: '📏', description: 'Penggaris bening yang selalu terselip di dalam tas.', flavor: 'Luruskan garis, luruskan masa depan.' },
  { id: 'i63', name: 'Sticky Notes', category: 'Alat Tulis', rarity: 'Common', emoji: '🗒️', description: 'Kertas kecil berisi pengingat tugas dan jadwal.', flavor: 'Jangan lupa jangan lupa.' },

  // =====================================
  // UNCOMMON
  // =====================================
  { id: 'i06', name: 'Buku Catatan', category: 'Perkuliahan', rarity: 'Uncommon', emoji: '📓', description: 'Catatan kuliah bercampur doodle dan jadwal.', flavor: 'Produktif di halaman pertama.' },
  { id: 'i07', name: 'Kopi Deadline', category: 'Makanan', rarity: 'Uncommon', emoji: '☕', description: 'Kopi sachet teman setia saat tugas menumpuk.', flavor: 'Satu teguk, lanjut revisi.' },
  { id: 'i08', name: 'Kartu Parkir', category: 'Akses Kampus', rarity: 'Uncommon', emoji: '🎫', description: 'Kartu yang selalu dicari saat gerbang terlihat.', flavor: 'Ada di tempat terakhir dicari.' },
  { id: 'i09', name: 'Kabel Charger', category: 'Elektronik', rarity: 'Uncommon', emoji: '🔌', description: 'Kabel yang harus diposisikan dengan tepat.', flavor: 'Jangan digerakkan.' },
  { id: 'i10', name: 'Roti Kantin', category: 'Makanan', rarity: 'Uncommon', emoji: '🥐', description: 'Roti untuk mengganjal perut di sela kelas.', flavor: 'Penyelamat jam kosong.' },
  { id: 'i27', name: 'Pulpen Cadangan', category: 'Alat Tulis', rarity: 'Uncommon', emoji: '🖋️', description: 'Pulpen yang benar-benar berfungsi.', flavor: 'Simpan baik-baik.' },
  { id: 'i34', name: 'Sendal Sebelah Kiri', category: 'Absurd', rarity: 'Uncommon', emoji: '🩴', description: 'Sendal tanpa pasangan yang ditemukan dekat parkiran.', flavor: 'Pasangannya sedang merantau.' },
  { id: 'i39', name: 'Kabel Data Serba Bisa', category: 'Elektronik', rarity: 'Uncommon', emoji: '🔌', description: 'Kabel yang cocok dengan hampir semua perangkat.', flavor: 'Pahlawan di dalam tas.' },
  { id: 'i44', name: 'Catatan Senior', category: 'Perkuliahan', rarity: 'Uncommon', emoji: '📒', description: 'Catatan kuliah warisan dari angkatan sebelumnya.', flavor: 'Ringkas dan penuh petunjuk.' },
  { id: 'i47', name: 'Koin Parkir Terakhir', category: 'Akses Kampus', rarity: 'Uncommon', emoji: '🪙', description: 'Koin yang pas jumlahnya untuk keluar dari area parkir.', flavor: 'Nyaris harus mencari ATM.' },
  { id: 'i53', name: 'Stiker Laptop Kampus', category: 'Perlengkapan', rarity: 'Uncommon', emoji: '💻', description: 'Stiker kecil yang membuat laptop tampak lebih personal.', flavor: 'Identitas di setiap sudut.' },
  { id: 'i64', name: 'Kartu Perpustakaan', category: 'Akses Kampus', rarity: 'Uncommon', emoji: '📇', description: 'Kartu akses menuju tempat mencari ilmu.', flavor: 'Tempat tenang, pikiran berisik.' },
  { id: 'i65', name: 'Botol Minum Kampus', category: 'Perlengkapan', rarity: 'Uncommon', emoji: '🧴', description: 'Botol minum yang selalu dibawa ke kelas.', flavor: 'Hidrasi sebelum presentasi.' },
  { id: 'i66', name: 'Jadwal Kuliah', category: 'Perkuliahan', rarity: 'Uncommon', emoji: '🗓️', description: 'Daftar jadwal yang menentukan arah hari-harimu.', flavor: 'Jam kosong adalah harta.' },

  // =====================================
  // RARE
  // =====================================
  { id: 'i11', name: 'Mi Tanggal Tua', category: 'Makanan', rarity: 'Rare', emoji: '🍜', description: 'Mi instan yang terasa istimewa di akhir bulan.', flavor: 'Sahabat akhir bulan.' },
  { id: 'i12', name: 'Flashdisk Misterius', category: 'Elektronik', rarity: 'Rare', emoji: '💾', description: 'Flashdisk tanpa label dengan isi penuh kejutan.', flavor: 'Semoga bukan file tugas lama.' },
  { id: 'i13', name: 'KTM Berstiker', category: 'Akses Kampus', rarity: 'Rare', emoji: '🪪', description: 'Kartu mahasiswa penuh tempelan kenangan.', flavor: 'Identitas sekaligus kartu sakti.' },
  { id: 'i14', name: 'Payung Lipat', category: 'Perlengkapan', rarity: 'Rare', emoji: '☂️', description: 'Payung yang baru diingat saat hujan turun.', flavor: 'Cuaca tak bisa ditebak.' },
  { id: 'i15', name: 'Headset Sebelah', category: 'Elektronik', rarity: 'Rare', emoji: '🎧', description: 'Headset yang hanya satu sisi audionya bekerja.', flavor: 'Mono experience.' },
  { id: 'i28', name: 'Kunci Kos', category: 'Perlengkapan', rarity: 'Rare', emoji: '🔑', description: 'Kunci yang sering tersembunyi di dasar tas.', flavor: 'Jangan sampai tertinggal.' },
  { id: 'i31', name: 'KTM Bisa Bicara', category: 'Akses Kampus', rarity: 'Rare', emoji: '🪪', description: 'Kartu mahasiswa yang tiba-tiba mengingatkan jadwal kuliah.', flavor: 'Jangan lupa kelas jam tujuh!' },
  { id: 'i37', name: 'Kursi Kelas Empuk', category: 'Perlengkapan', rarity: 'Rare', emoji: '🪑', description: 'Kursi kelas yang tidak goyang dan tidak berdecit.', flavor: 'Harta karun ruang kuliah.' },
  { id: 'i40', name: 'Map Anti Hujan', category: 'Perlengkapan', rarity: 'Rare', emoji: '📁', description: 'Map yang menjaga lembar tugas tetap kering saat hujan.', flavor: 'Aman sampai ruang kelas.' },
  { id: 'i43', name: 'Pulpen Tinta Abadi', category: 'Alat Tulis', rarity: 'Rare', emoji: '🖊️', description: 'Pulpen yang tidak pernah macet saat ujian berlangsung.', flavor: 'Jangan dipinjamkan.' },
  { id: 'i51', name: 'Kalkulator Ujian', category: 'Elektronik', rarity: 'Rare', emoji: '🧮', description: 'Kalkulator yang selalu muncul saat hitungan mulai rumit.', flavor: 'Semoga baterainya awet.' },
  { id: 'i54', name: 'Jas Almamater Wangi', category: 'Perlengkapan', rarity: 'Rare', emoji: '🧥', description: 'Jas almamater yang baru dicuci menjelang acara kampus.', flavor: 'Siap untuk foto bersama.' },
  { id: 'i58', name: 'Grup Kelas Senyap', category: 'Absurd', rarity: 'Rare', emoji: '🔕', description: 'Grup kelas yang tidak ramai notifikasi selama satu jam.', flavor: 'Keheningan yang menenangkan.' },
  { id: 'i67', name: 'Kalkulator Saintifik', category: 'Elektronik', rarity: 'Rare', emoji: '🔢', description: 'Kalkulator untuk menghadapi hitungan rumit.', flavor: 'Angka tidak pernah berbohong.' },
  { id: 'i68', name: 'Mouse Wireless', category: 'Elektronik', rarity: 'Rare', emoji: '🖱️', description: 'Mouse tanpa kabel untuk menyelesaikan tugas.', flavor: 'Gerakan lebih bebas.' },
  { id: 'i69', name: 'Buku Referensi', category: 'Perkuliahan', rarity: 'Rare', emoji: '📖', description: 'Buku tebal yang menjadi sumber pengetahuan.', flavor: 'Banyak halaman, banyak perjuangan.' },
  { id: 'i77', name: 'Kopi Tengah Malam', category: 'Special', rarity: 'Rare', emoji: '☕', description: 'Kopi legendaris teman begadang mengerjakan tugas.', flavor: 'Malam panjang, tugas belum selesai.', special: true, obtainMethod: 'event' },

  // =====================================
  // EPIC
  // =====================================
  { id: 'i16', name: 'Laptop Kipas Jet', category: 'Elektronik', rarity: 'Epic', emoji: '💻', description: 'Laptop dengan kipas seperti mesin pesawat.', flavor: 'Mode pesawat aktif.' },
  { id: 'i17', name: 'Tumbler Penyok', category: 'Perlengkapan', rarity: 'Epic', emoji: '🧋', description: 'Tumbler penuh bekas perjalanan ke kampus.', flavor: 'Penyok adalah karakter.' },
  { id: 'i18', name: 'Jas Hujan Darurat', category: 'Perlengkapan', rarity: 'Epic', emoji: '🧥', description: 'Jas hujan yang tersimpan sejak musim lalu.', flavor: 'Persiapan adalah segalanya.' },
  { id: 'i19', name: 'Absen Nyaris Telat', category: 'Perkuliahan', rarity: 'Epic', emoji: '⏰', description: 'Bukti tiba di kelas semenit sebelum pintu ditutup.', flavor: 'Adrenalin pagi hari.' },
  { id: 'i32', name: 'Skripsi Seribu Halaman', category: 'Perkuliahan', rarity: 'Epic', emoji: '📚', description: 'Naskah tebal yang seolah tidak pernah mencapai halaman terakhir.', flavor: 'Bab revisi masih menunggu.' },
  { id: 'i35', name: 'Tugas Kelompok Satu Orang', category: 'Perkuliahan', rarity: 'Epic', emoji: '📝', description: 'Dokumen kelompok yang sebagian besar dikerjakan satu mahasiswa.', flavor: 'Kerja sama dalam teori.' },
  { id: 'i42', name: 'Baterai 100 Persen', category: 'Elektronik', rarity: 'Epic', emoji: '🔋', description: 'Laptop yang tetap penuh setelah dipakai seharian.', flavor: 'Tidak mencari stopkontak.' },
  { id: 'i52', name: 'Flashdisk Tugas Final', category: 'Elektronik', rarity: 'Epic', emoji: '💾', description: 'Flashdisk berisi berkas final_final_baru_banget.docx.', flavor: 'Jangan sampai tertukar.' },
  { id: 'i57', name: 'Colokan Dekat Jendela', category: 'Perlengkapan', rarity: 'Epic', emoji: '🔌', description: 'Stopkontak strategis dengan meja dan pencahayaan terbaik.', flavor: 'Tempat duduk rebutan.' },
  { id: 'i70', name: 'Mechanical Keyboard', category: 'Elektronik', rarity: 'Epic', emoji: '⌨️', description: 'Keyboard dengan suara ketikan yang memuaskan.', flavor: 'Suara coding tengah malam.' },
  { id: 'i71', name: 'Laptop Programmer', category: 'Elektronik', rarity: 'Epic', emoji: '💻', description: 'Laptop andalan untuk membangun berbagai proyek.', flavor: 'npm run dev, semoga berhasil.' },
  { id: 'i76', name: 'Deadline Survivor', category: 'Special', rarity: 'Epic', emoji: '⏳', description: 'Lencana kehormatan bagi mereka yang berhasil melewati deadline.', flavor: 'Dikumpulkan satu menit sebelum tutup.', special: true, obtainMethod: 'achievement' },

  // =====================================
  // LEGENDARY
  // =====================================
  { id: 'i20', name: 'Tanda Tangan Dosen', category: 'Perkuliahan', rarity: 'Legendary', emoji: '✍️', description: 'Satu tanda tangan setelah antre cukup lama.', flavor: 'Lebih berharga dari emas.' },
  { id: 'i21', name: 'Laporan Revisi 17', category: 'Perkuliahan', rarity: 'Legendary', emoji: '📚', description: 'Laporan yang sudah direvisi berkali-kali.', flavor: 'Revisi adalah jalan hidup.' },
  { id: 'i22', name: 'Kursi Pojok Favorit', category: 'Perlengkapan', rarity: 'Legendary', emoji: '🪑', description: 'Kursi strategis yang selalu jadi incaran.', flavor: 'Lokasi menentukan prestasi.' },
  { id: 'i29', name: 'Stopkontak Kosong', category: 'Absurd', rarity: 'Legendary', emoji: '🔋', description: 'Stopkontak kosong di perpustakaan.', flavor: 'Rebut sebelum terlambat.' },
  { id: 'i33', name: 'Wi-Fi Penuh Bar', category: 'Elektronik', rarity: 'Legendary', emoji: '📶', description: 'Sinyal kampus penuh tepat ketika berkas harus diunggah.', flavor: 'Keajaiban yang langka.' },
  { id: 'i36', name: 'Printer Tengah Malam', category: 'Elektronik', rarity: 'Legendary', emoji: '🖨️', description: 'Printer yang baru lancar mencetak ketika malam semakin larut.', flavor: 'Jangan tanya kenapa.' },
  { id: 'i41', name: 'Stempel Sudah ACC', category: 'Perkuliahan', rarity: 'Legendary', emoji: '🔖', description: 'Tanda persetujuan yang membuat revisi berhenti sejenak.', flavor: 'Simpan sebagai kenangan.' },
  { id: 'i55', name: 'Surat Bebas Pustaka', category: 'Perkuliahan', rarity: 'Legendary', emoji: '📜', description: 'Dokumen penting yang menandakan urusan perpustakaan selesai.', flavor: 'Satu langkah menuju kelulusan.' },
  { id: 'i72', name: 'Piala Mahasiswa Berprestasi', category: 'Prestasi', rarity: 'Legendary', emoji: '🏆', description: 'Piala simbol perjuangan dan pencapaian akademik.', flavor: 'Usaha tidak mengkhianati hasil.' },
  { id: 'i73', name: 'Ijazah Emas', category: 'Prestasi', rarity: 'Legendary', emoji: '📜', description: 'Dokumen kelulusan setelah perjalanan panjang.', flavor: 'Akhir dari satu perjuangan.' },
  { id: 'i78', name: 'Bug Hunter', category: 'Special', rarity: 'Legendary', emoji: '🐛', description: 'Lencana untuk programmer yang berhasil membasmi bug.', flavor: 'It works on my machine!', special: true, obtainMethod: 'achievement' },

  // =====================================
  // MYTHICAL
  // =====================================
  { id: 'i23', name: 'Dompet Akhir Bulan', category: 'Absurd', rarity: 'Mythical', emoji: '👛', description: 'Dompet berisi struk dan harapan.', flavor: 'Saldo boleh tipis, mimpi jangan.' },
  { id: 'i24', name: 'Sandal Hilang Sebelah', category: 'Absurd', rarity: 'Mythical', emoji: '🩴', description: 'Sandal yang pasangannya menghilang misterius.', flavor: 'Satu kaki penuh tanda tanya.' },
  { id: 'i25', name: 'Deadline Mundur', category: 'Absurd', rarity: 'Mythical', emoji: '🗓️', description: 'Artefak yang konon membuat tenggat bergeser.', flavor: 'Mitos paling dicari.' },
  { id: 'i26', name: 'Wi-Fi Stabil', category: 'Absurd', rarity: 'Mythical', emoji: '📶', description: 'Sinyal penuh saat mengunggah tugas.', flavor: 'Keajaiban lingkungan kampus.' },
  { id: 'i30', name: 'Kelompok Kompak', category: 'Perkuliahan', rarity: 'Mythical', emoji: '🤝', description: 'Kelompok yang semua anggotanya aktif.', flavor: 'Legenda yang diharapkan.' },
  { id: 'i38', name: 'Jadwal Kosong Mendadak', category: 'Perkuliahan', rarity: 'Mythical', emoji: '🗓️', description: 'Satu hari tanpa kelas, rapat, maupun tugas mendadak.', flavor: 'Hari yang hampir mustahil.' },
  { id: 'i56', name: 'Dosen Tepat Waktu', category: 'Absurd', rarity: 'Mythical', emoji: '⏱️', description: 'Sosok legendaris yang datang tepat saat jadwal dimulai.', flavor: 'Mahasiswa belum tentu siap.' },
  { id: 'i59', name: 'Revisi Tanpa Revisi', category: 'Absurd', rarity: 'Mythical', emoji: '✨', description: 'Berkas yang diterima tanpa satu pun catatan perbaikan.', flavor: 'Legenda akademik sejati.' },
  { id: 'i74', name: 'IPK Sempurna', category: 'Prestasi', rarity: 'Mythical', emoji: '🌟', description: 'Simbol pencapaian akademik yang sangat langka.', flavor: 'Empat koma nol nol.' },
  { id: 'i75', name: 'Mahkota Wisudawan', category: 'Prestasi', rarity: 'Mythical', emoji: '👑', description: 'Mahkota kehormatan bagi pejuang kampus.', flavor: 'Perjalanan panjang akhirnya terbayar.' },
  { id: 'i79', name: 'Skripsi Abadi', category: 'Special', rarity: 'Mythical', emoji: '📚', description: 'Naskah misterius yang seolah tidak pernah selesai direvisi.', flavor: 'Revisi adalah kehidupan.', special: true, obtainMethod: 'event' },
  { id: 'i80', name: 'Crest of Campus', category: 'Special', rarity: 'Mythical', emoji: '🏅', description: 'Lambang kehormatan tertinggi kolektor Campus RNG.', flavor: 'Hanya untuk mahasiswa terpilih.', special: true, obtainMethod: 'achievement' }
];
