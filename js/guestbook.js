/* ============================================================
   FIXNIKAH — Buku Tamu (Firestore)
   Realtime guestbook: menampilkan & menyimpan ucapan tamu.
   Aktif hanya bila WEDDING.firebase.apiKey terisi. SDK Firebase
   baru diunduh saat buku tamu benar-benar dikonfigurasi.
   ============================================================ */
const cfg = (window.WEDDING && window.WEDDING.firebase) || {};
const wishesEl = document.getElementById("wishes");
const countEl = document.getElementById("wishes-count");

if (!cfg.apiKey || !cfg.projectId) {
  // Nonaktif — form RSVP tetap jalan lewat email (lihat script.js).
  window.Guestbook = { enabled: false };
} else {
  const V = "https://www.gstatic.com/firebasejs/11.0.2";
  const { initializeApp } = await import(`${V}/firebase-app.js`);
  const {
    getFirestore, collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp
  } = await import(`${V}/firebase-firestore.js`);

  const db = getFirestore(initializeApp(cfg));
  const col = collection(db, "wishes");

  window.Guestbook = {
    enabled: true,
    addWish: (data) =>
      addDoc(col, {
        name: String(data.name || "Tamu").slice(0, 60),
        message: String(data.message || "").slice(0, 500),
        createdAt: serverTimestamp()
      })
  };

  // Dengarkan perubahan secara realtime (100 ucapan terbaru).
  onSnapshot(
    query(col, orderBy("createdAt", "desc"), limit(100)),
    (snap) => {
      if (countEl) countEl.textContent = snap.size ? "(" + snap.size + ")" : "";
      if (!wishesEl) return;
      if (snap.empty) {
        wishesEl.innerHTML = '<p class="wish-empty">Jadilah yang pertama memberikan ucapan &amp; doa 💌</p>';
        return;
      }
      let html = "";
      snap.forEach((doc) => { html += render(doc.data()); });
      wishesEl.innerHTML = html;
    },
    (err) => {
      console.warn("Guestbook:", err.message);
      if (wishesEl) wishesEl.innerHTML =
        '<p class="wish-empty">Buku tamu belum bisa dimuat. Pastikan Firestore &amp; aturan keamanannya sudah aktif (lihat README).</p>';
    }
  );

  function render(w) {
    const name = esc(w.name || "Tamu");
    const initial = (name.trim()[0] || "?").toUpperCase();
    const when = relTime(w.createdAt);
    return (
      '<div class="wish">' +
        '<div class="wish-avatar">' + initial + "</div>" +
        '<div class="wish-main">' +
          '<div class="wish-head"><span class="wish-name">' + name + "</span>" +
            (when ? '<span class="wish-time">' + when + "</span>" : "") + "</div>" +
          '<div class="wish-msg">' + esc(w.message || "") + "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function esc(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

  function relTime(ts) {
    if (!ts || !ts.toDate) return "";
    const diff = (Date.now() - ts.toDate().getTime()) / 1000;
    if (diff < 60) return "baru saja";
    if (diff < 3600) return Math.floor(diff / 60) + " menit lalu";
    if (diff < 86400) return Math.floor(diff / 3600) + " jam lalu";
    if (diff < 604800) return Math.floor(diff / 86400) + " hari lalu";
    return ts.toDate().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  }
}
