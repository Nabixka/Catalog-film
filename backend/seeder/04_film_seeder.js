/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('film').del()
  await knex('film').insert([
    {
      title: 'Laskar Pelangi',
      image: '/uploads/film/laskar-pelangi.jpg',
      description: 'Kisah perjuangan sepuluh anak daerah pedalaman di Belitung yang penuh keterbatasan namun tetap semangat mengejar mimpi lewat pendidikan.',
      tanggal_rilis: '2008-09-25 00:00:00',
    },
    {
      title: 'The Raid',
      image: '/uploads/film/the-raid.jpg',
      description: 'Seorang polisi muda terjebak dalam gedung apartemen yang dikuasai gembong narkoba dan harus berjuang bertahan hidup sendirian.',
      tanggal_rilis: '2011-09-14 00:00:00',
    },
    {
      title: 'Ada Apa dengan Cinta?',
      image: '/uploads/film/aadc.jpg',
      description: 'Kisah cinta remaja antara Cinta, gadis populer di sekolah, dengan Rangga, pemuda pendiam dan misterius yang menyukai puisi.',
      tanggal_rilis: '2002-02-07 00:00:00',
    },
    {
      title: 'Pengabdi Setan',
      image: '/uploads/film/pengabdi-setan.jpg',
      description: 'Sebuah keluarga dihantui oleh arwah ibu mereka yang baru saja meninggal, dan teror semakin mencekam ketika rahasia kelam terungkap.',
      tanggal_rilis: '2017-09-28 00:00:00',
    },
    {
      title: 'Habibie & Ainun',
      image: '/uploads/film/habibie-ainun.jpg',
      description: 'Kisah cinta sejati Presiden ke-3 RI, B.J. Habibie, dan istrinya Ainun, dari masa muda hingga akhir hayat sang istri.',
      tanggal_rilis: '2012-12-20 00:00:00',
    },
    {
      title: 'Comic 8',
      image: '/uploads/film/comic-8.jpg',
      description: 'Delapan komika yang secara tidak sengaja terlibat dalam perampokan bank dan harus menggunakan kelucuan mereka untuk keluar dari situasi kacau.',
      tanggal_rilis: '2014-01-30 00:00:00',
    },
    {
      title: 'Nanti Kita Cerita Tentang Hari Ini',
      image: '/uploads/film/nkcthi.jpg',
      description: 'Drama keluarga tentang tiga bersaudara yang masing-masing menyimpan luka dan rahasia, serta bagaimana mereka menghadapi realita kehidupan.',
      tanggal_rilis: '2020-01-02 00:00:00',
    },
    {
      title: 'Susi Susanti: Love All',
      image: '/uploads/film/susi-susanti.jpg',
      description: 'Film biografi perjuangan legenda bulutangkis Indonesia, Susi Susanti, dalam meraih medali emas Olimpiade Barcelona 1992.',
      tanggal_rilis: '2019-11-07 00:00:00',
    },
    {
      title: 'Dilan 1990',
      image: '/uploads/film/dilan-1990.jpg',
      description: 'Kisah cinta remaja di Bandung tahun 1990 antara Dilan, pria motor yang jenaka, dengan Milea, gadis cantik pindahan dari Jakarta.',
      tanggal_rilis: '2018-01-25 00:00:00',
    },
    {
      title: 'Gundala',
      image: '/uploads/film/gundala.jpg',
      description: 'Seorang pria biasa yang memiliki kekuatan super akibat sambaran petir bangkit menjadi pahlawan untuk melawan kejahatan yang mengancam rakyat kecil.',
      tanggal_rilis: '2019-08-29 00:00:00',
    },
  ]);
};
