/* ============================================================
   FIXNIKAH — Undangan Pernikahan bertema Netflix
   Ubah semua isi di sini. Ganti gambar dengan menaruh file di
   /assets lalu perbarui path-nya (mis. "assets/foto.jpg").
   ============================================================ */

const WEDDING = {
  brand: "FIXNIKAH",
  couple: "Kirito & Asuna",
  monogram: "K &amp; A",
  groomShort: "Kirito",
  brideShort: "Asuna",
  guestDefault: "Bapak / Ibu / Saudara / i",   // dipakai hanya bila URL tidak memuat ?to=

  date: "2026-12-12T09:00:00",
  dateText: "12 Desember 2026",
  hashtags: ["#LinkStartForever", "#KiritoAsuna2026", "#SwordArtWedding", "#SampaiJumpaDiAincrad"],

  /* Gambar untuk pintu gerbang pembuka */
  gateGroom: "assets/kirito.webp",
  gateBride: "assets/asuna.webp",
  heroImg:   "assets/hero.webp",

  verse: {
    ref: "Ar-Rum 21",
    text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
  },

  news: {
    img: "assets/hero.webp",
    paragraphs: [
      "Halo semuanya! Ada kabar bahagia nih — kami akhirnya menekan tombol “Start” untuk petualangan seumur hidup: kami akan segera menikah! 🎉",
      "Setelah menuntaskan banyak quest bersama, kami memutuskan untuk melanjutkan permainan ini sebagai satu party selamanya.",
      "Merupakan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu di hari istimewa kami.",
      "Salam hangat,\nKirito & Asuna"
    ]
  },

  groom: {
    role: "Mempelai Pria",
    name: "Kazuto “Kirito” Kirigaya",
    poster: "assets/kirito.webp",
    parents: "Putra dari Bapak Minetaka Kirigaya & Ibu Midori Kirigaya",
    ig: "@kirito"
  },
  bride: {
    role: "Mempelai Wanita",
    name: "Asuna Yuuki",
    poster: "assets/asuna.webp",
    parents: "Putri dari Bapak Shouzou Yuuki & Ibu Kyouko Yuuki",
    ig: "@asuna"
  },

  events: [
    {
      badge: "Akad Nikah",
      img: "assets/kirito2.webp",
      date: "12 Desember 2026",
      time: "09.00 s.d 10.00",
      tz: "#WIB",
      venue: "Aincrad Grand Hall — Jl. Floor 22 No.1, Distrik Coral, Kota Bandung, Jawa Barat 40227",
      mapUrl: "https://maps.google.com/?q=Bandung"
    },
    {
      badge: "Resepsi",
      img: "assets/asuna2.webp",
      date: "12 Desember 2026",
      time: "11.00 s.d 13.30",
      tz: "#WIB",
      venue: "Aincrad Grand Hall — Jl. Floor 22 No.1, Distrik Coral, Kota Bandung, Jawa Barat 40227",
      mapUrl: "https://maps.google.com/?q=Bandung"
    }
  ],

  gift: {
    intro: "Terima kasih telah menambah semangat kegembiraan pernikahan kami dengan kehadiran dan hadiah indah Anda.",
    banks: [
      { bank: "BCA", number: "1390922112", holder: "Asuna Yuuki" },
      { bank: "CIMB Niaga", number: "762668205300", holder: "Kazuto Kirigaya" }
    ],
    address: "Kp. Aincrad RT.01 RW.16 No.15, Ds. Coral, Kec. Floor 22, Kota Bandung"
  },

  story: [
    "Semua bermula dari sebuah pertemuan tak sengaja di dunia yang sama pada awal tahun 2024. Dua pemain yang awalnya berjalan sendiri-sendiri, dipertemukan oleh satu quest yang sama.",
    "Percakapan mengalir begitu mudah karena kami memiliki banyak kesamaan — mulai dari selera, tujuan, hingga cara memandang dunia. Tanpa direncanakan, kami selalu berakhir di tempat yang sama.",
    "Seiring waktu, party kecil kami tumbuh menjadi sesuatu yang lebih dalam. Kami saling menjaga, saling menguatkan di setiap boss battle kehidupan, dan menyadari bahwa rumah bukanlah sebuah tempat, melainkan seseorang.",
    "Pada akhirnya, dengan niat yang sama untuk membangun rumah tangga, kami memberanikan diri melangkah bersama menuju jenjang pernikahan.",
    "Dengan penuh rasa syukur, kami mempersiapkan hari bahagia ini untuk memulai lembaran baru — sebagai satu party, selamanya."
  ],

  memories: [
    { img: "assets/kirito.webp",  caption: "Awal Pertemuan" },
    { img: "assets/asuna.webp",   caption: "Quest Pertama" },
    { img: "assets/kirito2.webp", caption: "Perjalanan Kami" },
    { img: "assets/asuna2.webp",  caption: "Sang Pujaan" },
    { img: "assets/hero.webp",    caption: "Menuju Selamanya" }
  ],

  invited: [
    "Keluarga Besar Kirigaya",
    "Keluarga Besar Yuuki",
    "Rekan-rekan Guild Knights of the Blood",
    "Sahabat-sahabat seperjuangan"
  ],

  closing: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kedua mempelai. Atas kehadiran dan doa restunya, kami ucapkan terima kasih.",

  rsvpEmail: "kirito.asuna@example.com",
  formspreeEndpoint: "",
  music: "assets/music.mp3",

  /* ---- Buku Tamu / Ucapan (Firebase Firestore) ------------
     Tempel konfigurasi Web App dari Firebase Console →
     Project settings → Your apps → Web (</>) → firebaseConfig.
     Selama apiKey masih kosong, buku tamu nonaktif dan form
     RSVP tetap memakai email seperti biasa. Lihat README. */
  firebase: {
    apiKey: "AIzaSyDhHqdxXOiAbHefzAG4gFJoDg9mJSXPO8M",
    authDomain: "wedd-netflix.firebaseapp.com",
    projectId: "wedd-netflix",
    storageBucket: "wedd-netflix.firebasestorage.app",
    messagingSenderId: "974519452987",
    appId: "1:974519452987:web:481eadbff0e3bbb6eba31e"
  }
};

// Agar dapat diakses oleh modul buku tamu (js/guestbook.js)
window.WEDDING = WEDDING;
