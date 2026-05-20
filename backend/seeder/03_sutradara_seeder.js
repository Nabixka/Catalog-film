/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('sutradara').del()
  await knex('sutradara').insert([
    { 
      name: 'Riri Riza', 
      image: '/uploads/sutradara/riri-riza.jpg',
      description: 'Sutradara, penulis skenario, dan produser ternama yang sukses melahirkan film ikonik seperti Petualangan Sherina dan Laskar Pelangi.',
      tanggal_lahir: '1970-10-02',
      tempat_asal: 'Makassar, Sulawesi Selatan'
    },
    { 
      name: 'Hanung Bramantyo', 
      image: '/uploads/sutradara/hanung-bramantyo.jpg',
      description: 'Sutradara produktif yang dikenal lewat film-film bertema religi, sejarah, dan sosial seperti Ayat-Ayat Cinta dan Bumi Manusia.',
      tanggal_lahir: '1975-10-01',
      tempat_asal: 'Yogyakarta'
    },
    { 
      name: 'Gareth Evans', 
      image: '/uploads/sutradara/gareth-evans.jpg',
      description: 'Sutradara asal Wales yang sukses mengangkat seni bela diri pencak silat ke dunia internasional melalui film Merantau dan seri The Raid.',
      tanggal_lahir: '1980-04-16',
      tempat_asal: 'Cymmer, Wales'
    },
    { 
      name: 'Joko Anwar', 
      image: '/uploads/sutradara/joko-anwar.jpg',
      description: 'Sutradara dan penulis skenario spesialis genre horor dan thriller psikologis yang sukses menggebrak lewat Pengabdi Setan dan Modus Anomali.',
      tanggal_lahir: '1976-01-03',
      tempat_asal: 'Medan, Sumatera Utara'
    },
    { 
      name: 'Mira Lesmana', 
      image: '/uploads/sutradara/mira-lesmana.jpg',
      description: 'Produser dan sutradara legendaris pendiri Miles Films yang menjadi salah satu tokoh utama kebangkitan sinema modern Indonesia.',
      tanggal_lahir: '1964-08-08',
      tempat_asal: 'Jakarta'
    },
    { 
      name: 'Raditya Dika', 
      image: '/uploads/sutradara/raditya-dika.jpg',
      description: 'Penulis, komedian, dan sutradara yang memelopori genre komedi adaptasi buku harian di Indonesia seperti Kambing Jantan dan Single.',
      tanggal_lahir: '1984-12-28',
      tempat_asal: 'Jakarta'
    },
    { 
      name: 'Ernest Prakasa', 
      image: '/uploads/sutradara/ernest-prakasa.jpg',
      description: 'Komika yang sukses beralih menjadi sutradara dan penulis skenario spesialis drama komedi keluarga yang hangat dan relevan seperti Cek Toko Sebelah.',
      tanggal_lahir: '1982-01-29',
      tempat_asal: 'Jakarta'
    },
    { 
      name: 'Edwin', 
      image: '/uploads/sutradara/edwin.jpg',
      description: 'Sutradara art-house Indonesia pertama yang berhasil memenangkan penghargaan Golden Leopard di Locarno International Film Festival lewat film Seperti Dendam, Rindu Harus Dibayar Tuntas.',
      tanggal_lahir: '1978-04-24',
      tempat_asal: 'Surabaya, Jawa Timur'
    },
    { 
      name: 'Angga Dwimas Sasongko', 
      image: '/uploads/sutradara/angga-dwimas-sasongko.jpg',
      description: 'Pendiri Visinema Pictures yang dikenal lewat visi penyutradaraannya yang modern dan dinamis dalam film seperti Filosofi Kopi dan Mencuri Raden Saleh.',
      tanggal_lahir: '1985-01-11',
      tempat_asal: 'Jakarta'
    },
    { 
      name: 'Ifa Isfansyah', 
      image: '/uploads/sutradara/ifa-isfansyah.jpg',
      description: 'Sutradara berbakat yang sukses menggarap film Sang Penari dan aktif mengedukasi sineas muda melalui Jogja-NETPAC Asian Film Festival.',
      tanggal_lahir: '1977-12-16',
      tempat_asal: 'Yogyakarta'
    }
  ]);
};
