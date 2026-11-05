// Bab 1 — A.1.c Dampak Persebaran Nenek Moyang, A.1.d Aktivitas Kehidupan Nenek Moyang bagi Bangsa Indonesia
// IMAGE NEEDED: img/u1-sangiran.jpg = book page 33, Gambar 1.27 "Sangiran Dome" (Widianto & Iwan, 2014)
// IMAGE NEEDED: img/u1-maros.jpg = book page 39, Gambar 1.31 "Lukisan dinding gua di Geopark Maros-Pangkep, Sulawesi Selatan"
// IMAGE NEEDED: img/u1-bengkel.jpg = book page 36, Gambar 1.28 "Distribusi situs-situs perbengkelan neolitik dan paleometalik di pesisir selatan Jawa" (Noerwidi, 2017)
LESSON(1, {
  id: 2, em: '🤝', title: 'Dampak dan Aktivitas Nenek Moyang',
  missions: [
    {
      id: 'kemajemukan', type: 'read', em: '📖', t: 'Dampak Persebaran', d: 'Masyarakat majemuk, bahasa, agama, budaya, dan pariwisata',
      pages: [
        { h: 'Jejak perjalanan panjang',
          t: 'Ribuan tahun lalu nenek moyang bangsa Indonesia memulai perjalanan panjang menemukan wilayah baru hingga melintasi benua. Mereka menyeberangi lautan dan beradaptasi dengan iklim yang beragam. Setiap langkah meninggalkan jejak hasil kebudayaan dan dampak besar hingga saat ini.<br><br><b>Dampak positif</b>: kemajemukan masyarakat Indonesia, pengayaan identitas nasional, peningkatan ekonomi bidang pariwisata dan industri kreatif, serta memperkuat persatuan dan kesatuan.<br><b>Dampak negatif</b>: konflik sosial dan disintegrasi.' },
        { h: '1) Kemajemukan masyarakat Indonesia',
          t: 'Migrasi berlangsung sangat lama dan memunculkan percampuran antarras asli dan pendatang, serta pendatang dengan pendatang lainnya. Percampuran ini membentuk bangsa yang majemuk. Hasilnya berupa suku bangsa dan kebudayaan (bahasa, agama, kepercayaan, dan tradisi).<br><br><b>Suku bangsa</b> adalah kelompok etnis dan budaya masyarakat yang terbentuk secara turun-temurun. Umumnya suku bangsa di Indonesia mengikuti garis <b>paternalistik</b> (ayah atau laki-laki), misalnya suku Jawa dan Batak. Ada juga yang mengikuti garis <b>maternalistik</b> (ibu atau perempuan), misalnya suku Minangkabau di Sumatra Barat. Jumlah suku bangsa di Indonesia tercatat <b>1.340</b>.' },
        { h: 'Bahasa dan agama',
          t: 'Ada tiga kelompok bahasa di Indonesia: bahasa Indonesia, bahasa daerah, dan bahasa asing. Bahasa daerah paling beragam, sekitar <b>805</b> jenis, belum termasuk bahasa asing seperti Arab, Mandarin (Tionghoa), dan Hindi (India). Contoh bahasa daerah yang banyak dikenal: Jawa, Sunda, Madura, dan Minangkabau.<br><br>Nenek moyang sudah menganut agama leluhur yang hingga kini masih dipraktikkan sebagian masyarakat, seperti <b>Kejawen, Sunda Wiwitan, Marapu</b>, dan kepercayaan lain. Kemudian masyarakat Indonesia mendapat pengaruh agama Hindu, Buddha, Islam, dan Kristen.' },
        { h: 'Budaya, tradisi, dan nilai sosial',
          t: 'Budaya dan tradisi masuk kategori entitas data kebudayaan: <b>Objek Pemajuan Kebudayaan (OPK)</b> dan <b>Objek Diduga Cagar Budaya (ODCB)</b>.<ul><li>OPK: adat istiadat, bahasa, manuskrip, olahraga tradisional, pengetahuan tradisional, permainan rakyat, ritus, seni, teknologi tradisional, dan tradisi lisan.</li><li>ODCB: benda, struktur, bangunan, situs, dan kawasan.</li></ul>Keduanya kini tercatat <b>84.511</b> jenis.<br><br><b>Sistem nilai sosial</b> adalah nilai atau prinsip yang dijunjung tinggi masyarakat dan menjadi pedoman bertingkah laku. Contohnya gotong royong, musyawarah mufakat, toleransi antaragama dan budaya, adat istiadat, kekerabatan dan solidaritas.' },
        { h: '2) Pariwisata dan industri kreatif',
          t: 'Keragaman masyarakat menghasilkan budaya lokal yang indah dan menjadi daya tarik wisata. Wisatawan mancanegara datang menikmati makanan khas, musik dan tarian tradisional, upacara adat, tradisi lokal, dan membeli kerajinan daerah. Pariwisata menjadi sumber devisa.<br><br>Contoh peningkatan ekonomi: homestay atau hotel milik warga, jasa transportasi, usaha kuliner dan suvenir, pemandu wisata, dan industri kreatif lainnya.<br><br>Menurut Laporan Neraca Pembayaran Indonesia Triwulan IV Tahun 2024 dari Bank Indonesia, penerimaan devisa pariwisata tahun 2024 mencapai <b>16,71 miliar USD</b>. Peluang usaha dan lapangan kerja mengurangi pengangguran dan kemiskinan.' }
      ]
    },
    {
      id: 'dampakpos', type: 'pick', em: '✅', t: 'Dampak Positif', d: 'Pilih semua dampak positif persebaran nenek moyang',
      prompt: 'Manakah yang merupakan dampak positif dari persebaran nenek moyang bangsa Indonesia?', scene: '🇮🇩🤝🎭', win: '🎉',
      options: [
        { t: 'Kemajemukan masyarakat Indonesia', ok: true },
        { t: 'Pengayaan identitas nasional', ok: true },
        { t: 'Peningkatan ekonomi bidang pariwisata dan industri kreatif', ok: true },
        { t: 'Memperkuat persatuan dan kesatuan', ok: true },
        { t: 'Konflik sosial' },
        { t: 'Disintegrasi' }
      ]
    },
    {
      id: 'tabelpulau', type: 'mapInfo', em: '🗺️', t: 'Suku dan Ras per Pulau', d: 'Tabel 1.1 penggolongan suku berdasarkan ras',
      map: 'nusantara', pointNames: true,
      guide: 'Klik setiap pulau untuk melihat suku, kategori ras, dan bahasa daerahnya menurut Tabel 1.1, lalu jawab pertanyaannya.',
      points: [
        { p: 'sumatra', ll: [99.5, 1.5], name: 'Sumatra', em: '🌋',
          info: 'Suku Aceh, Batak (Toba, Karo, Simalungun, Mandailing, Pakpak, Angkola), Minangkabau, Melayu, Lampung, Palembang, Rejang, Nias, Mentawai, Gayo, dan Alas termasuk ras Mongoloid.',
          q: 'Suku Batak, Minangkabau, dan Aceh termasuk kategori ras apa?', ans: 'Mongoloid', w: ['Austro-Melanesoid', 'Weddoid'],
          more: 'Bahasa daerah: Aceh, Gayo, Batak, Minangkabau, Melayu, Nias, Mentawai, Lampung, Komering, Basemah, Rejang, dan lain-lain.' },
        { p: 'jambiriau', ll: [102.8, -1.6], name: 'Jambi dan Riau', em: '🏕️',
          info: 'Suku Anak Dalam (Jambi) dan Suku Sakai (Riau) termasuk ras Weddoid, sub-ras Austro-Melanesoid.',
          q: 'Suku Anak Dalam dan Suku Sakai termasuk ras apa?', ans: 'Weddoid', w: ['Mongoloid', 'Kaukasoid'], expert: true },
        { p: 'jawa', ll: [110.0, -7.3], name: 'Jawa', em: '🏯',
          info: 'Suku Jawa, Sunda, Betawi, Madura, Tengger, Osing, dan Baduy termasuk ras Mongoloid. Bahasa daerahnya antara lain bahasa Jawa, Sunda, Betawi, dan Madura.',
          q: 'Suku Tengger, Osing, dan Baduy berasal dari pulau mana?', ans: 'Jawa', w: ['Papua', 'Maluku'] },
        { p: 'kalimantan', ll: [113.5, 0.0], name: 'Kalimantan', em: '🌳',
          info: 'Suku Dayak (Iban, Ngaju, Kenyah, Bahau, Maanyan, Tunjung, dan lain-lain) dan Melayu Kalimantan termasuk ras Mongoloid. Bahasanya bahasa Dayak, Banjar, Melayu, dan lain-lain.',
          q: 'Iban, Ngaju, dan Kenyah adalah bagian dari suku apa?', ans: 'Suku Dayak', w: ['Suku Batak', 'Suku Bugis'] },
        { p: 'sulawesi', ll: [120.5, -1.5], name: 'Sulawesi', em: '⛵',
          info: 'Suku Bugis, Makassar, Toraja, Mandar, Minahasa, Gorontalo, Kaili, Tolaki, Muna, dan Buton termasuk ras Mongoloid.',
          q: 'Suku Bugis, Makassar, dan Toraja termasuk ras apa?', ans: 'Mongoloid', w: ['Austro-Melanesoid', 'Negroid'],
          more: 'Bahasa daerah Sulawesi: Bugis, Makassar, Mandar, Toraja, Konjo, Massenrempulu, Rampi, Seko, Wotu, Bajo, Bonerate, Laiyolo, Lemolang, Kaili, Bada, Balaesang, Banggai, Besoa, Bungku, Buol, Dondo, Kulawi, Lauje, Malala, Pamona, Pipikoro, Saluan, Taa, Totoli, Sangihe Talaud, Tombulu, Tondano, Tonsawang, Tonsea, Totembon, dan lain-lain.' },
        { p: 'toala', ll: [119.8, -4.8], name: 'Toala (Sulawesi)', em: '🔬',
          info: 'Di Sulawesi juga ada suku Toala yang termasuk ras Weddoid.',
          q: 'Suku Toala di Sulawesi termasuk ras apa?', ans: 'Weddoid', w: ['Mongoloid', 'Kaukasoid'], expert: true },
        { p: 'bali', ll: [115.1, -8.4], name: 'Bali', em: '🛕',
          info: 'Suku Bali termasuk ras Mongoloid. Bahasanya bahasa Bali (Aga dan dataran).',
          q: 'Bahasa Bali dibagi menjadi bahasa Bali Aga dan bahasa Bali ...', ans: 'Dataran', w: ['Pegunungan', 'Pesisir'], expert: true },
        { p: 'ntb', ll: [117.4, -8.6], name: 'Nusa Tenggara Barat', em: '🐎',
          info: 'Suku Sasak, Bima, dan Sumbawa termasuk ras Mongoloid.',
          q: 'Suku Sasak, Bima, dan Sumbawa termasuk ras apa?', ans: 'Mongoloid', w: ['Austro-Melanesoid', 'Weddoid'],
          more: 'Bahasa Nusa Tenggara: Sasak, Samawa, Mbojo, Dewan, Manggarai, Kambara, Rote, Abui, Alor, Lamaholot, Sikka, Lio, Mamboru, dan lain-lain.' },
        { p: 'ntt', ll: [122.0, -8.7], name: 'Nusa Tenggara Timur', em: '🏝️',
          info: 'Suku Flores, Timor, dan Alor termasuk ras Austro-Melanesoid.',
          q: 'Suku Flores, Timor, dan Alor termasuk ras apa?', ans: 'Austro-Melanesoid', w: ['Mongoloid', 'Kaukasoid'] },
        { p: 'maluku', ll: [128.5, -3.3], name: 'Maluku', em: '🌶️',
          info: 'Suku Ambon, Ternate, Tidore, Seram, Buru, Aru, Kei, dan Tanimbar termasuk ras Austro-Melanesoid.',
          q: 'Suku Ternate dan Tidore termasuk ras apa?', ans: 'Austro-Melanesoid', w: ['Mongoloid', 'Weddoid'],
          more: 'Bahasa daerah Maluku: Alune, Ambalau, Asilulu, Banda, Buru, Kei, Luhu, Ternate, Tobelo, dan lain-lain.' },
        { p: 'papua', ll: [138.5, -4.0], name: 'Papua', em: '🪶',
          info: 'Hampir seluruh suku asli Papua, seperti Asmat, Dani, Korowai, Fayate, Mee, Amungme, Arfak, Biak, Yali, Lani, Tobati, Sentani, Nduga, dan Komoro, termasuk ras Austro-Melanesoid.',
          q: 'Hampir seluruh suku asli Papua termasuk ras apa?', ans: 'Austro-Melanesoid', w: ['Mongoloid', 'Kaukasoid'],
          more: 'Bahasa daerah Papua: Biak, Sentani, Dani, Asmat, Mee, Kamoro, Tobati, dan lain-lain.' }
      ]
    },
    {
      id: 'opkodcb', type: 'sort', em: '🏛️', t: 'OPK, ODCB, atau Nilai Sosial?', d: 'Kelompokkan kekayaan budaya Indonesia',
      zones: [{ id: 'o', label: 'Objek Pemajuan Kebudayaan (OPK)' }, { id: 'c', label: 'Objek Diduga Cagar Budaya (ODCB)' }, { id: 'n', label: 'Sistem nilai sosial' }],
      items: [
        ['Manuskrip', 'o'], ['Olahraga tradisional', 'o'], ['Permainan rakyat', 'o'], ['Ritus', 'o', 'x'], ['Tradisi lisan', 'o'],
        ['Pengetahuan dan teknologi tradisional', 'o', 'x'], ['Seni', 'o'], ['Bahasa daerah', 'o', 'x'],
        ['Benda', 'c'], ['Struktur', 'c', 'x'], ['Bangunan', 'c'], ['Situs', 'c'], ['Kawasan', 'c', 'x'],
        ['Gotong royong', 'n'], ['Musyawarah mufakat', 'n'], ['Toleransi antaragama dan budaya', 'n'], ['Kekerabatan dan solidaritas', 'n', 'x']
      ],
      facts: { 'Manuskrip': 'OPK dan ODCB bersama-sama tercatat berjumlah 84.511 jenis.', 'Gotong royong': 'Adat istiadat juga termasuk OPK sekaligus contoh sistem nilai sosial.' }
    },
    {
      id: 'konflik', type: 'read', em: '⚡', t: 'Konflik Sosial', d: 'Pengertian, bentuk, penyebab, dan dampaknya',
      pages: [
        { h: '3) Konflik sosial',
          t: 'Keragaman memberi banyak dampak positif, tetapi juga bisa menimbulkan dampak negatif. Kita perlu mempelajari latar belakang, faktor pendorong, cara mengantisipasi, dan cara mengatasinya, karena kalian generasi penerus. Salah satu dampak negatif yang sangat penting diantisipasi adalah konflik sosial, yang menjadi faktor penyebab disintegrasi.' },
        { h: 'a) Pengertian konflik sosial',
          t: '<ul><li><b>Coser (1964)</b>: konflik adalah upaya atau perjuangan individu atau kelompok untuk memperebutkan nilai-nilai, status, kekuasaan, dan sumber daya yang langka, serta bertujuan mengontrol atau menghilangkan lawannya.</li><li><b>Soekanto (2012)</b>: proses sosial ketika individu atau kelompok berusaha memenuhi tujuannya dengan menentang pihak lawan disertai ancaman dan kekerasan. Contoh di sekolah: pertengkaran antarteman karena memperebutkan buku atau tempat duduk.</li><li><b>Duane Ruth-Heffelbower</b> (Sarlito dan Sarwono, 2009): situasi ketika dua pihak atau lebih menganggap ada perbedaan posisi yang tidak selaras dan salah satu pihak mencoba menghalangi, mencampuri, atau membuat tujuan pihak lain tidak berhasil.</li></ul>' },
        { h: 'b) Bentuk konflik sosial (Soekanto, 2012)',
          t: 'Konflik pribadi, konflik politik, konflik rasial, konflik antarkelas sosial, dan konflik internasional.<br><br><b>Konflik pribadi</b> ada dua. <b>Intrapersonal</b>: pertentangan batin dalam diri antara keinginan, nilai, tujuan, dan kebutuhan; dampaknya kecemasan, stres, dan kebingungan. Contoh: calon mahasiswa ingin jurusan sejarah, tetapi orang tuanya menginginkan jurusan lain, sehingga ia bingung dan bimbang. <b>Interpersonal</b>: dua individu atau lebih bertentangan tentang tujuan, nilai, kebutuhan, dan persepsi. Contoh: perselisihan dalam rumah tangga akibat kesalahpahaman.' },
        { h: 'Bentuk konflik lainnya',
          t: '<ul><li><b>Konflik politik</b>: individu atau kelompok dalam partai politik, pemerintahan, atau negara berbeda pandangan dan tujuan politik, memperebutkan pengaruh dan memaksakan kehendak. Contoh: konflik politik tahun 1998.</li><li><b>Konflik rasial</b>: kelompok berbeda ras, suku, atau etnis; muncul karena satu ras atau etnis merasa lebih unggul dalam perebutan kepentingan atau sumber daya. Contoh: konflik kulit hitam dan putih akibat diskriminasi ras di Amerika Serikat.</li><li><b>Konflik antarkelas sosial</b>: lapisan elite melawan lapisan rendah; Karl Marx dan Friedrich Engels (1888) menyebutnya pertentangan kaum borjuis (pemilik modal) dan proletar (buruh). Contoh: pimpinan perusahaan dengan buruh yang menuntut kenaikan upah.</li><li><b>Konflik internasional</b>: dua negara atau lebih dengan kepentingan politik, ekonomi, teritorial, dan ideologi berbeda, melibatkan kekuatan militer. Contoh: Indonesia dan Tiongkok terkait polemik Laut Natuna Utara.</li></ul>' },
        { h: 'c) Faktor penyebab konflik (Kartono, 2009)',
          t: '<ul><li><b>Perbedaan kepentingan</b> (ekonomi, sosial, politik): perusahaan menekan biaya dengan mengurangi upah, padahal kerja makin berat, sehingga karyawan membentuk serikat buruh dan berdemonstrasi.</li><li><b>Perbedaan nilai dan norma</b>, dipengaruhi kebudayaan: murid yang menjaga kebersihan berkonflik dengan murid yang membuang sampah sembarangan.</li><li><b>Kesenjangan sosial</b>, karena ketidakadilan distribusi sumber daya, kekayaan, dan kesempatan: fasilitas kesehatan di pusat jauh lebih lengkap daripada di daerah.</li><li><b>Kurangnya komunikasi</b>, yang menimbulkan perbedaan interpretasi, prasangka, dan salah paham: pimpinan memberi instruksi kerja tidak jelas sehingga tugas karyawan tidak sesuai harapan.</li></ul>Faktor ini menjadi bekal agar kita bisa menghindari konflik.' },
        { h: 'd) Dampak konflik sosial',
          t: 'Dampak negatif: perpecahan antarkelompok, suku, hingga bangsa; kekerasan hingga korban jiwa; rusaknya hubungan sosial (Gillin dan Gillin, 1948). Contoh di Indonesia yang menimbulkan perpecahan dan korban jiwa: kerusuhan akibat krisis ekonomi tahun 1998, konflik Poso tahun 1998 hingga 2001, dan konflik Sampit tahun 2001 antara suku Dayak dan suku Madura.<br><br>Dampak positif jika dikelola baik: perubahan sosial yang konstruktif. Contoh: kemacetan dan polusi di kota besar memicu protes dan demonstrasi. Pemerintah mendengarkan keluhan, melakukan kajian, dan melibatkan ahli, hingga muncul inovasi transportasi publik ramah lingkungan yang meningkatkan kualitas hidup dan menjadi tren naik transportasi umum.' },
        { h: 'e) Pencegahan konflik sosial',
          t: '<ul><li><b>Membangun kepercayaan dan kohesi sosial</b>: pendidikan dan kesadaran budaya tentang keragaman agar muncul toleransi dan hilang stereotipe serta prasangka (Lederach, 1997); jaringan sosial inklusif yang mendorong interaksi antarkelompok (Putnam, 2000), misalnya komunitas seni, musik, atau olahraga.</li><li><b>Keadilan sosial dan ekonomi</b>: menghapus ketidaksetaraan distribusi sumber daya, akses fasilitas sosial, dan kesempatan ekonomi; pengentasan kemiskinan yang efektif.</li><li><b>Tata kelola yang baik (good governance)</b>: partisipasi inklusif, transparansi dan akuntabilitas pemerintah, serta lembaga resolusi konflik.</li><li><b>Pengelolaan isu identitas dan kerentanan</b>: pengakuan dan perlindungan hak minoritas (Kymlicka, 1995), dialog antarkelompok (Lederach, 1997), dan rekonsiliasi pascakonflik (Boutros-Ghali, 1992).</li></ul>' },
        { h: 'Solusi penyelesaian konflik',
          t: 'Konflik masih bisa terjadi karena masyarakat bergerak dinamis. Upaya penyelesaiannya:<ul><li><b>Mediasi</b>: ada pihak ketiga yang netral. Contoh: guru Bimbingan Konseling atau kepala sekolah menjadi mediator pertengkaran antarmurid.</li><li><b>Negosiasi</b>: dua pihak atau lebih yang awalnya berbeda pemikiran akhirnya mencapai kesepakatan. Contoh: negosiasi tarif antara Indonesia dan Amerika.</li><li><b>Arbitrase</b>: keputusan ditentukan pihak ketiga yang berwenang dan mengikat secara hukum. Contoh: Badan Arbitrase Nasional Indonesia (BANI) untuk sengketa bisnis dan perdagangan.</li><li><b>Kompromi</b>: para pihak saling memberi dan menerima hingga menemukan jalan tengah. Contoh: sengketa hasil penghitungan suara pemilu, demi stabilitas keamanan.</li></ul>' }
      ]
    },
    {
      id: 'bentuk', type: 'match', em: '🔗', t: 'Bentuk Konflik dan Contohnya', d: 'Pasangkan bentuk konflik dengan contohnya', youngCount: 5,
      pairs: [
        ['Konflik intrapersonal', 'Calon mahasiswa bimbang karena ingin jurusan sejarah, orang tua ingin jurusan lain'],
        ['Konflik interpersonal', 'Perselisihan dalam rumah tangga akibat kesalahpahaman'],
        ['Konflik politik', 'Konflik politik yang terjadi tahun 1998'],
        ['Konflik rasial', 'Konflik kulit hitam dan putih akibat diskriminasi ras di Amerika Serikat'],
        ['Konflik antarkelas sosial', 'Pimpinan perusahaan dengan buruh yang menuntut kenaikan upah'],
        ['Konflik internasional', 'Indonesia dan Tiongkok terkait polemik Laut Natuna Utara'],
        ['Borjuis dan proletar', 'Istilah Karl Marx dan Friedrich Engels (1888) untuk pemilik modal dan buruh'],
        ['Coser (1964)', 'Konflik adalah perjuangan memperebutkan nilai, status, kekuasaan, dan sumber daya langka']
      ]
    },
    {
      id: 'penyebab', type: 'sort', em: '🧨', t: 'Apa Penyebabnya?', d: 'Faktor penyebab konflik sosial menurut Kartono (2009)',
      zones: [{ id: 'k', label: 'Perbedaan kepentingan' }, { id: 'n', label: 'Perbedaan nilai dan norma' }, { id: 's', label: 'Kesenjangan sosial' }, { id: 'm', label: 'Kurangnya komunikasi' }],
      items: [
        ['Perusahaan mengurangi upah demi keuntungan lebih besar', 'k'],
        ['Buruh membentuk serikat dan berdemonstrasi menuntut upah', 'k', 'x'],
        ['Ada murid yang suka membuang sampah sembarangan', 'n'],
        ['Kebiasaan yang dipengaruhi kebudayaan masyarakat berbeda', 'n', 'x'],
        ['Fasilitas kesehatan di pusat lebih lengkap daripada di daerah', 's'],
        ['Distribusi sumber daya, kekayaan, dan kesempatan tidak adil', 's', 'x'],
        ['Pimpinan memberi instruksi kerja yang tidak jelas', 'm'],
        ['Perbedaan interpretasi menimbulkan prasangka', 'm', 'x']
      ]
    },
    {
      id: 'cegahatasi', type: 'sort', em: '🕊️', t: 'Mencegah atau Menyelesaikan?', d: 'Upaya pencegahan dan solusi penyelesaian konflik',
      zones: [{ id: 'c', label: 'Pencegahan konflik' }, { id: 's', label: 'Solusi penyelesaian konflik' }],
      items: [
        ['Membangun kepercayaan dan kohesi sosial', 'c'],
        ['Keadilan sosial dan ekonomi', 'c'],
        ['Tata kelola yang baik (good governance)', 'c'],
        ['Pengelolaan isu identitas dan kerentanan', 'c', 'x'],
        ['Komunitas seni, musik, dan olahraga yang inklusif', 'c', 'x'],
        ['Mediasi dengan pihak ketiga yang netral', 's'],
        ['Negosiasi hingga mencapai kesepakatan', 's'],
        ['Arbitrase lewat BANI', 's'],
        ['Kompromi mencari jalan tengah', 's'],
        ['Guru BK menjadi mediator pertengkaran murid', 's', 'x']
      ],
      facts: {
        'Membangun kepercayaan dan kohesi sosial': 'Melalui pendidikan dan kesadaran budaya (Lederach, 1997) serta jaringan sosial inklusif (Putnam, 2000).',
        'Pengelolaan isu identitas dan kerentanan': 'Perlindungan hak minoritas (Kymlicka, 1995), dialog antarkelompok (Lederach, 1997), rekonsiliasi pascakonflik (Boutros-Ghali, 1992).',
        'Arbitrase lewat BANI': 'Keputusan arbitrase mengikat secara hukum.'
      }
    },
    {
      id: 'jejak', type: 'sort', em: '⛏️', t: 'Artefak, Ekofak, atau Fitur?', d: 'Bukti arkeologis jejak nenek moyang',
      guide: 'Artefak adalah benda yang dimodifikasi manusia. Ekofak adalah benda alam yang berkaitan dengan kebudayaan. Fitur adalah tinggalan yang tidak dapat dipindahkan. Seret setiap benda ke kelompoknya.',
      zones: [{ id: 'a', label: 'Artefak' }, { id: 'e', label: 'Ekofak' }, { id: 'f', label: 'Fitur' }],
      items: [
        ['Kapak perimbas', 'a'], ['Kapak lonjong', 'a'], ['Kapak genggam', 'a'], ['Gerabah', 'a'], ['Perhiasan', 'a', 'x'],
        ['Tulang hewan', 'e'], ['Biji-bijian', 'e'], ['Sisa tumbuhan', 'e', 'x'], ['Kayu', 'e', 'x'],
        ['Situs Sangiran Dome (Kubah Sangiran)', 'f'], ['Situs prasejarah yang tidak dapat dipindahkan', 'f']
      ],
      facts: {
        'Kapak perimbas': 'Artefak adalah benda yang telah dimodifikasi dan merupakan hasil aktivitas manusia masa lampau (Renfrew dan Bahn, 2013).',
        'Tulang hewan': 'Ekofak adalah benda dari alam yang berkaitan dengan kebudayaan (Sharer dan Ashmore, 1979).',
        'Situs Sangiran Dome (Kubah Sangiran)': 'Fitur adalah lingkungan tinggalan arkeologi yang tidak dapat dipindahkan (Grant et al., 2015). Sangiran memberi banyak informasi tentang habitat, pola hidup, dan binatang di sekitar manusia purba.'
      }
    },
    {
      id: 'pengaruh', type: 'cards', em: '🧬', t: 'Pengaruh Aktivitas Nenek Moyang', d: 'Aspek genetika, ekonomi, dan sosial',
      cards: [
        { em: '🧬', f: 'Genetika: gen campuran', b: 'Ciri fisik manusia Indonesia sangat beragam. Para ahli percaya gen masyarakatnya campuran (Tumonggor et al., 2013), dibuktikan penelitian DNA. Genetika adalah ilmu tentang gen dan pewarisan sifatnya.' },
        { em: '🚶', f: 'Genetika: akibat migrasi', b: 'Selama migrasi yang sangat lama, nenek moyang bertemu manusia lain yang berbeda DNA. Percampuran DNA menghasilkan gen baru yang terus bermigrasi hingga ke Indonesia (Kayser et al., 2000; Oppenheimer, 2003).', expert: true },
        { em: '☀️', f: 'Genetika: adaptasi lingkungan', b: 'Nina G. Jablonski (2012) mencontohkan adaptasi genetik berupa pigmen kulit lebih gelap. Penelitian Melandri Vlok et al. (2021) di Asia Tenggara menunjukkan gen tertentu memberi ketahanan terhadap penyakit endemik.', expert: true },
        { em: '🌾', f: 'Ekonomi: pertanian dan peternakan', b: 'Bukti alat pertanian: kapak lonjong dan kapak persegi (Notosusanto, 2008). Bukti peternakan lebih banyak dari penelitian linguistik (Simanjuntak et al., 2012). Hingga kini Indonesia masyarakat agraris dan permukiman dekat lahan pertanian.' },
        { em: '⛵', f: 'Ekonomi: maritim', b: 'Pelayaran diperkirakan sejak zaman neolitikum, sekitar 6000 tahun lalu (Bellwood, 2007). Bukti: obsidian Talasea (Melanesia) di Bukit Tengkorak, Sabah (Simanjuntak et al., 2012), dan kosakata proto-Austronesia kano untuk perahu.' },
        { em: '🛶', f: 'Pelaut ulung', b: 'Edwin Doran Jr (1981) meneliti berbagai jenis perahu penutur Austronesia. Nenek moyang dikenal sebagai pelaut ulung; pelayaran menjadi fondasi jalur perdagangan antarpulau dan tradisi maritim hingga kini.', expert: true },
        { em: '💱', f: 'Ekonomi: perdagangan', b: 'Sejak neolitikum dengan sistem barter dan uang manik-manik atau bead money (Francis, 2002). Bukti: kapak beliung atau kapak persegi, gelang batu, dan mata panah di bengkel kapak batu situs prasejarah.' },
        { em: '🌶️', f: 'Rempah dan pelabuhan', b: 'Perdagangan dan pelayaran membentuk jalur perdagangan. Komoditas unggulan adalah rempah-rempah. Hal ini memengaruhi terbentuknya pelabuhan masa Hindu-Buddha dan masuknya Islam. Kini masih ada sistem ekonomi tradisional berbasis komunal di beberapa suku.', expert: true },
        { em: '👥', f: 'Sosial: perubahan cara hidup', b: 'Berburu (food gathering), meramu, bercocok tanam (food producing), dari nomaden hingga menetap, sejak Paleolitikum hingga Neolitikum menunjukkan perubahan sosial.' },
        { em: '⚱️', f: 'Sosial: pembagian kerja dan lapisan', b: 'Gerabah, perhiasan manik-manik batu, dan bengkel perkakas batu menunjukkan spesialisasi pekerjaan, yang memunculkan diferensiasi sosial. Sarkofagus menunjukkan nenek moyang mengenal lapisan sosial. Kelompok dipimpin kepala suku atau ketua adat, dan gotong royong berkembang.' }
      ]
    },
    {
      id: 'unsur', type: 'match', em: '🎨', t: 'Tujuh Unsur Kebudayaan', d: 'Pasangkan unsur budaya dengan buktinya', youngCount: 5,
      pairs: [
        ['Bahasa', 'Migrasi menyebarkan bahasa Austronesia; kini ada 805 bahasa daerah'],
        ['Sistem pengetahuan', 'Bercocok tanam, kalender pranata mangsa, dan pengobatan jamu'],
        ['Sistem peralatan hidup dan teknologi', 'Situs bengkel alat batu, seperti Situs Baksoka di Pacitan'],
        ['Sistem mata pencaharian', 'Lukisan gua mirip babi di Geopark Maros-Pangkep, bukti peternakan'],
        ['Organisasi sosial', 'Kelompok kecil dengan pemimpin, anggota, dan pembagian kerja'],
        ['Religi', 'Menhir, dolmen, dan kubur batu; animisme dan dinamisme'],
        ['Kesenian', 'Lukisan gua cap telapak tangan, pola hias gerabah, dan manik-manik'],
        ['Animisme', 'Percaya pada roh halus yang mendiami benda-benda'],
        ['Dinamisme', 'Percaya pada kekuatan gaib pada benda atau makhluk hidup']
      ]
    },
    {
      id: 'lima', type: 'match', em: '🖐️', t: 'Kata "Lima" Austronesia', d: 'Pasangkan bahasa dengan kata untuk angka lima', youngCount: 5,
      guide: 'Banyak bahasa serumpun Austronesia punya kata yang mirip untuk angka lima. Pasangkan bahasa dengan kosakatanya.',
      pairs: [
        ['Batak, Sunda, Bali, Tagalog, Fiji, Samoa', 'Lima'],
        ['Aceh', 'Limong'],
        ['Gayo', 'Lime'],
        ['Minangkabau dan Lampung', 'Limo'],
        ['Jawa', 'Gangsal atau Limo'],
        ['Madura', 'Lema'],
        ['Malagasi (Madagaskar)', 'Dimy'],
        ['Tahiti', 'Pae']
      ]
    },
    {
      id: 'warisan', type: 'read', em: '🏺', t: 'Bukti Budaya dan Aktivitas', d: 'Jejak budaya dan Aktivitas 1.3 serta 1.4',
      pages: [
        { h: 'Aktivitas kehidupan nenek moyang',
          t: 'Aktivitas nenek moyang sulit diketahui karena terjadi ribuan tahun lalu, tetapi bisa dipelajari dari jejak yang tersebar di Indonesia, yaitu bukti arkeologis berupa artefak, ekofak, dan fitur. Contoh fitur adalah Sangiran Dome atau Kubah Sangiran, situs prasejarah yang memberi banyak informasi tentang kehidupan manusia purba, habitat, pola hidup, dan binatang di sekitarnya. Aktivitas nenek moyang memengaruhi kehidupan hingga kini dalam aspek genetika, ekonomi, dan sosial-budaya.',
          img: 'img/u1-sangiran.jpg' },
        { h: 'Bengkel kapak di pesisir selatan Jawa',
          t: 'Gambar 1.28 menunjukkan distribusi situs perbengkelan dari periode neolitik (kuning) dan paleometalik (hijau) di sepanjang pesisir pantai selatan Jawa, yang menunjukkan adanya aktivitas perdagangan (Noerwidi, 2017).',
          img: 'img/u1-bengkel.jpg', expert: true },
        { h: '4) Pengaruh pada aspek budaya',
          t: 'Temuan arkeologis: peralatan berburu dan pertanian dari batu, perhiasan dari batu dan logam, lukisan gua, serta peninggalan megalitik seperti kubur batu, menhir, dolmen, dan punden berundak (Soekmono, 1995). Unsur kebudayaan: bahasa, sistem pengetahuan, sistem teknologi, sistem mata pencaharian, organisasi sosial, religi, dan kesenian.<br><br>Bahasa: belum ada bukti arkeologis langsung, tetapi menurut ahli linguistik migrasi menyebarkan bahasa Austronesia. Bahasa daerah Indonesia, bahasa di Filipina (Cebu, Ilonggo, Iloko, Tagalog), Fiji, Malaysia (Melayu), Samoa, Madagaskar, dan Tahiti termasuk rumpun Austronesia, terbukti dari kemiripan kosakata. Kata lima dalam Proto-Austronesia, Batak, Sunda, Bali, Cebu, Ilonggo, Iloko, Tagalog, Fiji, dan Samoa adalah Lima.' },
        { h: 'Lukisan gua Maros-Pangkep dan menhir',
          t: 'Lukisan dinding gua di Geopark Maros-Pangkep, Sulawesi Selatan, menyerupai hewan babi. Ini menunjukkan nenek moyang sudah mengenal domestikasi hewan dan bermata pencaharian sebagai peternak. Hingga kini di Papua peternakan babi masih menjadi mata pencaharian utama.<br><br>Sistem kepercayaan nenek moyang ditunjukkan oleh menhir, dolmen, dan kubur batu, misalnya menhir koleksi Museum Sonobudoyo, Yogyakarta. Kepercayaan itu adalah animisme dan dinamisme (Koentjaraningrat, 1990), dan masih ada yang menganutnya hingga kini. Kesenian berupa lukisan gua (cap telapak tangan, binatang, manusia, bentuk geometris), pola hias gerabah, dan manik-manik.',
          img: 'img/u1-maros.jpg' },
        { h: 'Aktivitas 1.3 (Kelompok): Ayo, Amati Bersama',
          t: 'Kemajemukan suku, agama, budaya, dan bahasa membawa dampak positif dan negatif.<ul><li>1. Buat kelompok 3 sampai 5 orang.</li><li>2. Amati kondisi masyarakat sekitar (sekolah, rumah, atau berita) yang mencerminkan kemajemukan.</li><li>3. Diskusikan: a) dampak negatif kemajemukan; b) faktor penyebabnya; c) solusi yang sudah dilakukan masyarakat, sekolah, atau pemerintah; d) solusi kreatif versi kelompokmu.</li><li>4. Tulis di tabel: dampak negatif, faktor penyebab, solusi yang sudah ada, solusi dari kelompok.</li><li>5. Presentasikan dan bandingkan dengan kelompok lain.</li></ul>' },
        { h: 'Aktivitas 1.4 (Kelompok): Ayo, Amati Lingkungan Sekitarmu',
          t: 'Banyak kebiasaan, tradisi, dan nilai yang masih kita lakukan merupakan warisan nenek moyang.<ul><li>1. Buat kelompok 3 sampai 5 orang.</li><li>2. Amati lingkungan rumah, sekolah, atau masyarakat, dan temukan benda, tradisi, nilai, norma, atau kesenian yang masih bertahan.</li><li>3. Jelaskan mengapa itu warisan atau pengaruh nenek moyang.</li><li>4. Tentukan kategorinya: sosial, ekonomi, atau budaya.</li><li>5. Tulis di tabel: nama benda atau tradisi, penjelasan, dan kategori pengaruh.</li><li>6. Presentasikan dan bandingkan dengan kelompok lain.</li></ul>' }
      ]
    },
    {
      id: 'kuis', type: 'quiz', em: '🏆', t: 'Kuis Dampak dan Aktivitas', d: 'Uji pemahamanmu tentang dampak dan aktivitas nenek moyang', qid: 'l2', limit: [8, 12],
      questions: [
        { q: 'Berapa jumlah suku bangsa di Indonesia menurut buku?', a: '1.340 suku', w: ['805 suku', '84.511 suku', '300 suku'] },
        { q: 'Suku bangsa yang mengikuti garis keturunan ibu atau maternalistik adalah ...', a: 'Suku Minangkabau', w: ['Suku Jawa', 'Suku Batak', 'Suku Bugis'] },
        { q: 'Berapa jenis bahasa daerah di Indonesia?', a: 'Sekitar 805 jenis', w: ['Sekitar 1.340 jenis', 'Sekitar 50 jenis', 'Sekitar 84.511 jenis'] },
        { q: 'Manakah yang termasuk agama leluhur yang masih dipraktikkan sebagian masyarakat Indonesia?', a: 'Kejawen, Sunda Wiwitan, dan Marapu', w: ['Hindu, Buddha, dan Islam', 'Kristen dan Katolik', 'Konghucu dan Shinto'] },
        { q: 'Situs, kawasan, dan bangunan termasuk entitas data kebudayaan apa?', a: 'Objek Diduga Cagar Budaya (ODCB)', w: ['Objek Pemajuan Kebudayaan (OPK)', 'Sistem nilai sosial', 'Tradisi lisan'], expert: true },
        { q: 'Berapa penerimaan devisa sektor pariwisata Indonesia tahun 2024 menurut Bank Indonesia?', a: '16,71 miliar USD', w: ['1,671 miliar USD', '84,511 miliar USD', '167,1 miliar USD'], expert: true },
        { q: 'Menurut Soekanto (2012), konflik sosial adalah proses sosial ketika individu atau kelompok memenuhi tujuannya dengan ...', a: 'Menentang pihak lawan disertai ancaman dan kekerasan', w: ['Bekerja sama dengan pihak lain', 'Bermusyawarah sampai mufakat', 'Berdagang secara barter'] },
        { q: 'Konflik intrapersonal biasanya berdampak ...', a: 'Kecemasan, stres, dan kebingungan', w: ['Kenaikan upah', 'Perang antarnegara', 'Inovasi transportasi'], expert: true },
        { q: 'Karl Marx dan Friedrich Engels menyebut konflik antarkelas sebagai pertentangan antara ...', a: 'Kaum borjuis dan proletar', w: ['Kaum petani dan nelayan', 'Kaum Proto dan Deutro Melayu', 'Kaum guru dan murid'] },
        { q: 'Polemik Laut Natuna Utara antara Indonesia dan Tiongkok adalah contoh konflik ...', a: 'Internasional', w: ['Pribadi', 'Antarkelas sosial', 'Intrapersonal'] },
        { q: 'Konflik Sampit tahun 2001 terjadi antara suku ...', a: 'Dayak dan Madura', w: ['Jawa dan Sunda', 'Batak dan Minangkabau', 'Bugis dan Makassar'] },
        { q: 'Konflik Poso berlangsung dari tahun ...', a: '1998 hingga 2001', w: ['1945 hingga 1949', '2010 hingga 2015', '1965 hingga 1966'], expert: true },
        { q: 'Penyelesaian konflik oleh pihak ketiga yang keputusannya mengikat secara hukum, seperti BANI, disebut ...', a: 'Arbitrase', w: ['Mediasi', 'Kompromi', 'Negosiasi'] },
        { q: 'Guru Bimbingan Konseling yang menjadi pihak ketiga netral dalam pertengkaran murid adalah contoh ...', a: 'Mediasi', w: ['Arbitrase', 'Negosiasi', 'Konflik politik'] },
        { q: 'Pengakuan dan perlindungan hak minoritas dikemukakan oleh siapa?', a: 'Kymlicka (1995)', w: ['Putnam (2000)', 'Boutros-Ghali (1992)', 'Coser (1964)'], expert: true },
        { q: 'Tulang hewan, biji-bijian, dan sisa tumbuhan termasuk bukti arkeologis apa?', a: 'Ekofak', w: ['Artefak', 'Fitur', 'Prasasti'] },
        { q: 'Kapan aktivitas pelayaran nenek moyang diperkirakan dimulai?', a: 'Zaman neolitikum, sekitar 6000 tahun lalu', w: ['Abad ke-15 Masehi', 'Sekitar 1 juta tahun lalu', 'Masa penjajahan Belanda'], expert: true },
        { q: 'Uang yang terbuat dari manik-manik disebut ...', a: 'Bead money', w: ['Barter', 'Kano', 'Obsidian'] },
        { q: 'Kalender bercocok tanam warisan nenek moyang disebut ...', a: 'Pranata mangsa', w: ['Punden berundak', 'Abris sous roches', 'Sarkofagus'] },
        { q: 'Situs bengkel alat batu yang masih bisa dikunjungi di Pacitan adalah ...', a: 'Situs Baksoka', w: ['Situs Sangiran', 'Situs Trinil', 'Situs Maros-Pangkep'], expert: true },
        { q: 'Dalam bahasa Malagasi di Madagaskar, angka lima disebut ...', a: 'Dimy', w: ['Lima', 'Pae', 'Limong'], expert: true },
        { q: 'Temuan arkeologis apa yang menunjukkan nenek moyang sudah mengenal lapisan sosial?', a: 'Sarkofagus', w: ['Biji-bijian', 'Lukisan babi', 'Kayu'] }
      ]
    }
  ]
});
