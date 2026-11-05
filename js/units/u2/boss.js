// Bab 2 — Uji Kompetensi (buku hlm. 142–146) + soal tambahan.
// IMAGE NEEDED: img/u2-uk6.png = book page 145, infographic "Kasus COVID-19 per provinsi di Indonesia, 10 Juli 2021" (sumber: Arie Pratama, 2021) for Uji Kompetensi no. 6
BOSS(2, [
  // ---- Uji Kompetensi no. 1 dan 2 (wacana "Ancaman Bencana Geologi Indonesia") ----
  { q: 'Wacana: Indonesia rawan bencana karena terletak di pertemuan lempeng Indo-Australia, Eurasia, dan Pasifik, serta di ring of fire. Pemerintah membentuk BNPB untuk merumuskan kebijakan penanggulangan bencana dan penanganan pengungsi, BPBD untuk penanggulangan bencana di daerah, BASARNAS untuk evakuasi dan pertolongan korban, PMI untuk pelayanan transfusi darah dan penanggulangan bencana, dan PVMBG di bawah Badan Geologi Kementerian ESDM untuk penelitian, penyelidikan, perekayasaan, dan pelayanan di bidang vulkanologi dan mitigasi bencana geologi. Nilailah pernyataan berikut. (1) Indonesia rawan bencana sehingga diperlukan lembaga penanggulangan bencana. (2) BNPB dan BPBD menentukan kelompok masyarakat yang dibantu berdasarkan kepentingan golongan. (3) PVMBG melakukan rekayasa sosial sebagai langkah mitigasi bencana geologi. (4) PMI hanya bertugas dalam pelayanan transfusi darah dan tidak bertugas dalam penanggulangan bencana. Kombinasi jawaban yang tepat adalah ....',
    a: 'benar - salah - salah - salah', w: ['benar - benar - salah - benar', 'benar - salah - benar - salah', 'salah - benar - salah - benar'],
    why: 'Pernyataan 2 salah karena BNPB bertindak cepat dan tepat, bukan berdasarkan golongan. Pernyataan 3 salah karena PVMBG melakukan perekayasaan di bidang vulkanologi, bukan rekayasa sosial. Pernyataan 4 salah karena PMI juga bertugas dalam penanggulangan bencana.' },
  { q: 'Berdasarkan fungsi lembaga dalam wacana ancaman bencana geologi, pasangan yang paling tepat antara lembaga dan tugasnya adalah ....',
    a: 'PVMBG memberikan peringatan dini, BASARNAS mengevakuasi warga, dan PMI memberikan pertolongan pertama.',
    w: ['PVMBG melakukan evakuasi warga, BASARNAS melakukan riset geologi dan kegempaan, dan PMI melakukan peringatan dini.', 'BNPB melakukan penelitian gunung api, BPBD melakukan transfusi darah, dan PMI memberikan bantuan makanan kepada balita.', 'BASARNAS memantau aktivitas vulkanik, BPBD memberikan layanan donor darah, dan BNPB mengevakuasi korban ke penampungan.'] },
  // ---- no. 3 ----
  { q: 'Sebuah sekolah di wilayah rawan gempa bekerja sama dengan BPBD dan PMI. BPBD membantu menyusun jalur evakuasi dan melakukan simulasi tanggap darurat, sedangkan PMI memberikan pelatihan pertolongan pertama kepada murid. Kesimpulan yang paling tepat adalah ....',
    a: 'Mitigasi bencana dilakukan sebelum bencana terjadi untuk mengurangi risiko.',
    w: ['Mitigasi bencana hanya dapat dilakukan oleh kolaborasi lembaga pemerintah pusat.', 'Sekolah tidak memiliki peran penting dalam upaya penanggulangan bencana.', 'PMI dan BPBD hanya aktif saat bencana terjadi untuk menyelamatkan kelompok rentan.'] },
  // ---- no. 4 ----
  { q: 'Seorang murid melihat sungai di lingkungannya penuh sampah plastik. Bersama teman-temannya, ia membuat program pembersihan sungai setiap minggu dan memasang poster tentang dampak sampah terhadap banjir dan kesehatan. Tindakan ini paling berkontribusi langsung terhadap pencapaian SDGs nomor ....',
    a: 'SDGs 6: Air Bersih dan Sanitasi Layak', w: ['SDGs 3: Kehidupan Sehat dan Sejahtera', 'SDGs 11: Kota dan Permukiman yang Berkelanjutan', 'SDGs 13: Penanganan Perubahan Iklim'],
    why: 'Menurut Tabel 2.3, tujuan 6 meminta sumber air dijaga agar tidak tercemar, dan aksi murid untuk tujuan 6 adalah membuang sampah pada tempatnya serta menjaga kebersihan selokan atau sumber air. Tujuan 11 dan 13 juga berkaitan, tetapi membersihkan sungai paling langsung menjaga sumber air.' },
  // ---- no. 5 (soal menjodohkan) ----
  { q: 'Pasangkan peran komunitas dengan bidang kehidupannya. (1) Pengolahan sampah daur ulang di masyarakat. (2) Pelatihan pengembangan usaha kecil untuk menambah keuangan keluarga. (3) Pelatihan pembuatan kain songket bagi generasi muda. Pilihan bidang: A institusi ekonomi, B institusi pendidikan, C institusi sosial, D institusi budaya. Pasangan yang tepat adalah ....',
    a: '1 dengan C, 2 dengan A, 3 dengan D', w: ['1 dengan A, 2 dengan B, 3 dengan C', '1 dengan D, 2 dengan C, 3 dengan B', '1 dengan B, 2 dengan D, 3 dengan A'],
    why: 'Daur ulang sampah adalah kegiatan sosial masyarakat, usaha kecil untuk keuangan keluarga adalah bidang ekonomi, dan kain songket adalah warisan budaya.' },
  // ---- no. 6 (perlu infografis) ----
  { q: 'Cermati infografis. Pandemi COVID-19 adalah contoh perubahan sosial budaya yang tidak direncanakan. Berdasarkan data pada infografis, provinsi dengan jumlah kasus COVID-19 terbanyak kedua di Indonesia pada 10 Juli 2021 adalah ....',
    a: 'Jawa Barat', w: ['DKI Jakarta', 'Jawa Tengah', 'Jawa Timur'], img: 'img/u2-uk6.png',
    why: 'Pada 10 Juli 2021, DKI Jakarta berada di urutan pertama dan Jawa Barat di urutan kedua jumlah kasus.' },
  // ---- no. 7 ----
  { q: 'Perhatikan pernyataan berikut. (1) Pemerintah merancang program "Satu Desa Satu Produk" untuk meningkatkan ekonomi lokal. (2) Masyarakat di daerah terpencil perlahan mulai menggunakan listrik tenaga surya. (3) Banyak anak muda mengubah gaya hidup menjadi lebih sehat setelah tren pola makan sehat viral di media sosial. (4) Sebagian masyarakat meninggalkan tradisi lisan karena memilih menyimpan cerita dalam bentuk digital. (5) Pemerintah meluncurkan program "Literasi Digital" untuk meningkatkan kemampuan teknologi pelajar. Pernyataan yang menunjukkan perubahan sosial budaya yang besar dan direncanakan terdapat pada nomor ....',
    a: '1 dan 5', w: ['1 dan 2', '1 dan 3', '2 dan 4'],
    why: 'Nomor 1 dan 5 adalah program pemerintah yang dirancang (direncanakan) dan berdampak luas. Nomor 2, 3, dan 4 terjadi perlahan atau tanpa rencana.' },
  // ---- no. 8 ----
  { q: 'Manakah dari pernyataan berikut yang merupakan contoh faktor internal penyebab perubahan sistem sosial budaya?',
    a: 'Inovasi di bidang pertanian dengan menggunakan teknologi modern seperti drone dan sensor kelembaban tanah.',
    w: ['Berkurangnya jumlah penduduk akibat letusan gunung berapi yang menghancurkan pemukiman warga.', 'Gerakan mahasiswa yang menuntut pemerintah menurunkan biaya pendidikan dan memperluas akses teknologi.', 'Budaya populer Korea (K-Pop) yang memengaruhi gaya berpakaian, kebiasaan, dan bahasa remaja Indonesia.'],
    why: 'Drone dan sensor adalah contoh penemuan baru yang disebut langsung dalam buku sebagai faktor internal. Soal buku menyebut ada dua pernyataan internal: gerakan mahasiswa (konflik dalam masyarakat) juga bisa dianggap internal, dan buku juga menyebut berkurangnya penduduk akibat bencana di faktor internal. K-Pop jelas faktor eksternal (kontak kebudayaan lain).' },
  // ---- no. 9 ----
  { q: 'Seorang kepala desa yang menjabat tiga periode menolak sistem pemilihan langsung berbasis e-voting yang diusulkan pemuda desa. Ia beralasan sistem lama sudah terbukti berhasil, tetapi warga menduga sistem lama lebih mudah ia kendalikan. Pemuda pun protes karena kepemimpinan dinilai tidak demokratis. Faktor penghambat perubahan sosial budaya yang paling relevan adalah ....',
    a: 'Kepentingan yang mengakar kuat.', w: ['Takut terjadinya kegoyahan sosial.', 'Sikap tradisional masyarakat.', 'Prasangka terhadap hal baru atau asing.'],
    why: 'Pihak yang diuntungkan sistem lama cenderung menolak perubahan; ini disebut vested interest.' },
  // ---- no. 10 ----
  { q: 'Sejumlah sekolah di Indonesia mulai menerapkan pembelajaran inklusif yang menerima murid dari berbagai latar belakang, termasuk murid berkebutuhan khusus. Dulu anak disabilitas dianggap sebaiknya belajar di sekolah khusus, kini guru, orang tua, dan murid menyadari pentingnya kesetaraan hak dalam pendidikan. Perubahan sosial ini mendukung tujuan pembangunan berkelanjutan nomor ....',
    a: 'SDG 4: Pendidikan Berkualitas', w: ['SDG 3: Kehidupan Sehat dan Sejahtera', 'SDG 5: Kesetaraan Gender', 'SDG 8: Pekerjaan Layak dan Pertumbuhan Ekonomi'],
    why: 'Tujuan 4 memastikan setiap murid bisa belajar tanpa memandang latar belakang atau keadaannya.' },

  // ---- Soal tambahan ----
  { q: 'Mengapa hampir seluruh warga Pulau Simeulue selamat dari tsunami Aceh tahun 2004?', a: 'Mereka memahami isyarat alam dari tradisi smong dan langsung lari ke tempat tinggi', w: ['Mereka sedang berada di luar pulau', 'Pulau Simeulue dilindungi tanggul laut raksasa', 'Tsunami tidak mencapai Pulau Simeulue'] },
  { q: 'Pembangunan tanggul laut, drainase, dan pompa air di Jakarta adalah contoh mitigasi struktural, sedangkan pendidikan kebencanaan adalah contoh mitigasi non-struktural.', a: 'Benar', w: ['Salah'] },
  { q: 'Menurut Tabel 2.2, kawasan yang berpotensi tinggi mengalami kekeringan adalah ....', a: 'Kawasan kapur', w: ['Lahan gambut', 'Muara sungai', 'Zona tumbukan lempeng'] },
  { q: 'Pemerintah membangun rumah dome setelah gempa Yogyakarta tahun 2006. Apa keunggulan desain kubah ini?', a: 'Beban bangunan terbagi merata sehingga lebih kokoh', w: ['Lebih murah karena tanpa fondasi', 'Tahan terhadap banjir rob', 'Bisa dipindah-pindah dengan mudah'] },
  { q: 'Upaya mitigasi bencana dalam Bab 2 dihubungkan khususnya dengan SDGs nomor 11. Apa isi tujuan itu?', a: 'Kota dan permukiman yang aman dan berkelanjutan', w: ['Tanpa kelaparan', 'Kesetaraan gender', 'Ekosistem laut'] },
  { q: 'Seruan "Opruru Ampuapenu o" adalah peringatan dini gempa tradisional dari daerah mana?', a: 'Desa Nuwewang, Maluku Barat Daya', w: ['Kampung Wana, Lampung', 'Kampung Ciptagelar, Jawa Barat', 'Pulau Simeulue, Aceh'], expert: true },
  { q: 'Tradisi masyarakat Baduy yang menolak listrik dan kendaraan dipakai buku sebagai contoh perubahan apa?', a: 'Perubahan lambat (evolusi)', w: ['Perubahan cepat (revolusi)', 'Perubahan yang direncanakan', 'Perubahan besar'], expert: true },
  { q: 'Konflik Palestina dan Israel yang menghancurkan rumah, sekolah, dan rumah sakit serta mengubah peran keluarga adalah contoh faktor penyebab perubahan apa?', a: 'Peperangan (faktor eksternal)', w: ['Penemuan baru (faktor internal)', 'Bertambahnya penduduk (faktor internal)', 'Sikap konservatif (faktor penghambat)'] },
  { q: 'Setelah gempa dan tsunami Palu dan Donggala 2018, pemerintah perlu mengatur ulang kebijakan pertanahan. Mengapa?', a: 'Banyak tanah tidak lagi memiliki pemilik yang jelas karena pemiliknya meninggal atau mengungsi', w: ['Semua tanah berubah menjadi laut', 'Warga ingin menjual semua tanahnya', 'Tanah di sana menjadi kawasan industri'], expert: true },
  { q: 'Menurut panduan UNICEF, jarak aman antarbangunan sekolah untuk risiko runtuhan struktur adalah ....', a: 'Selebar tinggi bangunan', w: ['Setengah lebar kelas', 'Tidak perlu ada jarak', 'Sejauh tinggi tanaman'], expert: true },
  { q: 'Kelompok yang sangat menjaga kebudayaan lama dan menolak perubahan karena khawatir nilai dan posisi sosialnya terganggu disebut kelompok apa?', a: 'Kelompok konservatif', w: ['Agent of change', 'Kelompok prodemokrasi', 'Relawan bencana'] },
  { q: 'Sampah kemasan minuman dari China yang ditemukan di Pantai Natuna menunjukkan bahwa sampah yang tidak dikelola dapat mencemari tempat yang sangat jauh.', a: 'Benar', w: ['Salah'] }
]);
