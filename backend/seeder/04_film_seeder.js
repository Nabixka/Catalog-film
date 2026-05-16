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
      tanggal_rilis: '2008-09-25 00:00:00'
    },
    {
      title: 'Pengabdi Setan',
      image: '/uploads/film/pengabdi-setan.jpg',
      description: 'Sebuah keluarga mengalami serangkaian teror mengerikan setelah ibu mereka meninggal dunia secara misterius setelah menderita sakit bertahun-tahun.',
      tanggal_rilis: '2017-09-28 00:00:00'
    },
    {
      title: 'Dilan 1990',
      image: '/uploads/film/dilan-1990.jpg',
      description: 'Pertemuan Milea dengan Dilan, seorang anggota geng motor yang memiliki cara unik dan romantis dalam mendekati wanita di Bandung era 90-an.',
      tanggal_rilis: '2018-01-25 00:00:00'
    },
    {
      title: 'Agak Laen',
      image: '/uploads/film/agak-laen.jpg',
      description: 'Empat sekawan penjaga rumah hantu di pasar malam mencoba menyelamatkan usaha mereka, namun situasi menjadi kacau ketika seorang pengunjung mati jantungan di dalamnya.',
      tanggal_rilis: '2024-02-01 00:00:00'
    },
    {
      title: 'The Raid: Redemption',
      image: '/uploads/film/the-raid.jpg',
      description: 'Serbuan pasukan khusus polisi ke sebuah apartemen kumuh yang menjadi markas rahasia para gembong narkoba dan pembunuh paling berbahaya.',
      tanggal_rilis: '2012-03-23 00:00:00'
    },
    {
      title: 'Ada Apa dengan Cinta?',
      image: '/uploads/film/aadc.jpg',
      description: 'Kisah cinta remaja SMA antara Cinta yang populer dan Rangga, seorang siswa pendiam yang gemar membaca puisi sastra.',
      tanggal_rilis: '2002-02-07 00:00:00'
    },
    {
      title: 'Mencuri Raden Saleh',
      image: '/uploads/film/mencuri-raden-saleh.jpg',
      description: 'Sekelompok mahasiswa merencanakan pencurian terbesar abad ini, yaitu mencuri lukisan legendaris "Penangkapan Pangeran Diponegoro" karya Raden Saleh.',
      tanggal_rilis: '2022-08-25 00:00:00'
    },
    {
      title: 'KKN di Desa Penari',
      image: '/uploads/film/kkn-desa-penari.jpg',
      description: 'Enam mahasiswa yang melaksanakan kuliah kerja nyata di desa terpencil harus menghadapi teror mistis akibat melanggar aturan adat tempat tersebut.',
      tanggal_rilis: '2022-04-30 00:00:00'
    },
    {
      title: 'Nanti Kita Cerita tentang Hari Ini',
      image: '/uploads/film/nkcthi.jpg',
      description: 'Potret dinamika keluarga kelas menengah yang terlihat bahagia namun menyimpan rahasia besar dan trauma masa lalu yang belum terselesaikan.',
      tanggal_rilis: '2020-01-02 00:00:00'
    },
    {
      title: 'Gundala',
      image: '/uploads/film/gundala.jpg',
      description: 'Sancaka, seorang pria yang hidup di jalanan keras, harus memilih antara memikirkan keselamatannya sendiri atau bangkit menjadi pahlawan bagi rakyat yang tertindas.',
      tanggal_rilis: '2019-08-29 00:00:00'
    }
  ]);
};
