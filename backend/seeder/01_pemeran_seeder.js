/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('pemeran').del()
  await knex('pemeran').insert([
    { 
      name: 'Reza Rahadian', 
      image: '/uploads/pemeran/reza-rahadian.jpg',
      description: 'Aktor papan atas Indonesia yang dikenal karena kemampuan aktingnya yang bunglon dan telah memenangkan berbagai penghargaan Piala Citra.',
      tanggal_lahir: '1987-03-05',
      tempat_asal: 'Bogor, Jawa Barat'
    },
    { 
      name: 'Cut Mini', 
      image: '/uploads/pemeran/cut-mini.jpg',
      description: 'Aktris senior Indonesia yang dikenal lewat peran ikoniknya sebagai Ibu Muslimah di film Laskar Pelangi.',
      tanggal_lahir: '1973-12-30',
      tempat_asal: 'Jakarta'
    },
    { 
      name: 'Raisa Anggiani', 
      image: '/uploads/pemeran/raissa-anggiani.jpg',
      description: 'Penyanyi dan penulis lagu muda berbakat Indonesia yang kini juga merambah ke dunia seni peran.',
      tanggal_lahir: '2004-02-21',
      tempat_asal: 'Jakarta'
    },
    { 
      name: 'Nicholas Saputra', 
      image: '/uploads/pemeran/nicholas-saputra.jpg',
      description: 'Aktor legendaris yang melejit lewat peran Rangga dalam Ada Apa dengan Cinta?, dikenal dengan karakter yang kuat dan karismatik.',
      tanggal_lahir: '1984-02-24',
      tempat_asal: 'Jakarta'
    },
    { 
      name: 'Dian Sastrowardoyo', 
      image: '/uploads/pemeran/dian-sastrowardoyo.jpg',
      description: 'Aktris, produser, dan ikon perfilman Indonesia yang mengawali karier sebagai Gadis Sampul sebelum mendominasi layar lebar.',
      tanggal_lahir: '1982-03-16',
      tempat_asal: 'Jakarta'
    },
    { 
      name: 'Iko Uwais', 
      image: '/uploads/pemeran/iko-uwais.jpg',
      description: 'Aktor laga dan atlet pencak silat Indonesia yang berhasil menembus industri perfilman Hollywood lewat aksi memukaunya di The Raid.',
      tanggal_lahir: '1983-02-12',
      tempat_asal: 'Jakarta'
    },
    { 
      name: 'Bunga Citra Lestari', 
      image: '/uploads/pemeran/bunga-citra-lestari.jpg',
      description: 'Dikenal juga sebagai BCL, seorang penyanyi dan aktris berbakat yang sukses membintangi berbagai film komedi romantis dan drama.',
      tanggal_lahir: '1983-03-22',
      tempat_asal: 'Jakarta'
    },
    { 
      name: 'Joe Taslim', 
      image: '/uploads/pemeran/joe-taslim.jpg',
      description: 'Mantan atlet judo nasional yang sukses menjadi aktor laga internasional, membintangi film seperti Fast & Furious 6 dan Mortal Kombat.',
      tanggal_lahir: '1981-06-23',
      tempat_asal: 'Palembang, Sumatera Selatan'
    },
    { 
      name: 'Prisia Nasution', 
      image: '/uploads/pemeran/prisia-nasution.jpg',
      description: 'Aktris dan model yang meraih penghargaan Aktris Terbaik Piala Citra lewat debutnya di film Sang Penari.',
      tanggal_lahir: '1984-06-01',
      tempat_asal: 'Jakarta'
    },
    { 
      name: 'Lukman Sardi', 
      image: '/uploads/pemeran/lukman-sardi.jpg',
      description: 'Aktor watak senior dan sutradara yang telah membintangi puluhan film berkualitas tinggi di Indonesia.',
      tanggal_lahir: '1971-07-14',
      tempat_asal: 'Jakarta'
    }
  ]);
};
