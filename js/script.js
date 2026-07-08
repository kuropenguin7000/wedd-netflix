/* ============================================================
   FIXNIKAH — interaksi & animasi
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  const gate = $("#gate");
  const app = $("#app");
  const music = $("#bg-music");
  const musicToggle = $("#music-toggle");

  document.body.style.overflow = "hidden"; // kunci scroll sampai gerbang dibuka

  /* ---------- GUEST (?to=) ---------- */
  const params = new URLSearchParams(location.search);
  const raw = params.get("to") || params.get("kepada") || "";
  const guest = raw ? decodeURIComponent(raw).replace(/[-_+]/g, " ").trim() : WEDDING.guestDefault;
  $("#gate-guest").textContent = guest;

  /* ---------- GATE setup ---------- */
  $("#gate-brand").textContent = WEDDING.brand;
  // Nama lengkap pasangan (bukan inisial) pada gerbang, dgn "&" berwarna emas
  $("#gate-emblem").innerHTML = WEDDING.couple.replace(/\s*&\s*/, ' <span>&amp;</span> ');
  $("#rail-mono").innerHTML = WEDDING.monogram;
  $("#door-left-img").style.backgroundImage = `url("${WEDDING.gateGroom}")`;
  $("#door-right-img").style.backgroundImage = `url("${WEDDING.gateBride}")`;

  /* ---------- BUILD CONTENT ---------- */
  $("#hero-bg").style.backgroundImage = `url("${WEDDING.heroImg}")`;
  $("#hero-date").textContent = WEDDING.dateText;
  $("#rail-date").textContent = WEDDING.dateText.replace(/\s+/g, " ");
  const ht = $("#hashtags");
  WEDDING.hashtags.forEach((h) => ht.appendChild(el("span", null, h)));

  $("#verse-text").textContent = WEDDING.verse.text;
  $("#verse-ref").textContent = "— " + WEDDING.verse.ref;

  $("#news-img").style.backgroundImage = `url("${WEDDING.news.img}")`;
  const nb = $("#news-body");
  WEDDING.news.paragraphs.forEach((p) => nb.appendChild(el("p", null, p)));

  function poster(target, person) {
    const f = $(target);
    const bg = el("div", "poster-bg");
    bg.style.backgroundImage = `url("${person.poster}")`;
    f.appendChild(bg);
    f.appendChild(el("figcaption", "poster-cap",
      `<div class="poster-role">${person.role}</div>
       <div class="poster-name">${person.name}</div>
       <div class="poster-parents">${person.parents}</div>
       ${person.ig ? `<span class="poster-ig">📷 ${person.ig}</span>` : ""}`));
  }
  poster("#poster-groom", WEDDING.groom);
  poster("#poster-bride", WEDDING.bride);

  const evList = $("#event-list");
  WEDDING.events.forEach((ev) => {
    const c = el("div", "event");
    c.innerHTML = `
      <div class="event-thumb" style="background-image:url('${ev.img}')"><span class="event-badge">${ev.badge}</span></div>
      <div class="event-info">
        <div class="event-date">${ev.date}</div>
        <div class="event-tags"><span>${ev.time}</span><span>${ev.tz}</span></div>
        <p class="event-venue">${ev.venue}</p>
        <a class="event-map" href="${ev.mapUrl}" target="_blank" rel="noopener">Buka Google Maps &raquo;</a>
      </div>`;
    evList.appendChild(c);
  });

  $("#gift-intro").textContent = WEDDING.gift.intro;
  const gb = $("#gift-banks");
  WEDDING.gift.banks.forEach((b, i) => {
    const row = el("div", "bank-row");
    row.innerHTML = `
      <div class="bank-logo">${b.bank}</div>
      <div class="bank-detail"><div class="bank-num" id="bank-${i}">${b.number}</div><div class="bank-holder">a.n. ${b.holder}</div></div>
      <button class="btn-copy" data-copy-target="bank-${i}">Salin Rekening</button>`;
    gb.appendChild(row);
  });
  $("#gift-address").textContent = WEDDING.gift.address;

  const sb = $("#story-body");
  WEDDING.story.forEach((p) => sb.appendChild(el("p", null, p)));

  const mrow = $("#memories-row");
  WEDDING.memories.forEach((m, i) => {
    const c = el("div", "mem-card");
    c.innerHTML = `<div class="mem-bg" style="background-image:url('${m.img}')"></div><span class="mem-rank">${i + 1}</span><span class="mem-cap">${m.caption}</span>`;
    mrow.appendChild(c);
  });

  const inv = $("#invited-list");
  WEDDING.invited.forEach((n) => inv.appendChild(el("li", null, n)));
  $("#closing-text").textContent = WEDDING.closing;

  /* ---------- GATE OPEN ---------- */
  let opened = false;
  $("#gate-btn").addEventListener("click", () => {
    if (opened) return; opened = true;
    gate.classList.add("opening");
    app.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "";
    startParticles();
    revealObserve();
    startMusic();
    setTimeout(() => gate.classList.add("done"), 1800);
  });

  /* ---------- PARTICLES ---------- */
  let particlesDone = false;
  function startParticles() {
    if (particlesDone) return; particlesDone = true;
    const box = $("#particles");
    const chars = ["✦", "✧", "♥", "•", "❤"];
    for (let i = 0; i < 16; i++) {
      const s = document.createElement("span");
      s.textContent = chars[i % chars.length];
      s.style.left = Math.random() * 100 + "%";
      s.style.fontSize = 8 + Math.random() * 16 + "px";
      s.style.animationDuration = 9 + Math.random() * 12 + "s";
      s.style.animationDelay = Math.random() * 10 + "s";
      s.style.color = Math.random() > 0.6 ? "rgba(229,9,20,0.6)" : "rgba(255,255,255,0.45)";
      box.appendChild(s);
    }
  }

  /* ---------- REVEAL + STAGGER ---------- */
  let io;
  function revealObserve() {
    if (io) return;
    io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    $$(".reveal").forEach((s) => io.observe(s));
  }

  /* ---------- ACTIVE NAV ---------- */
  const navLinks = $$(".rail-nav a");
  const navSections = ["hero", "couple", "timeline", "story", "memories", "gift", "guestbook"]
    .map((id) => document.getElementById(id)).filter(Boolean);
  function updateActiveNav() {
    const line = window.innerHeight * 0.3;   // garis pemicu 30% dari atas viewport
    let current = navSections[0];
    for (const s of navSections) { if (s.getBoundingClientRect().top <= line) current = s; }
    const href = "#" + (current && current.id);
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === href));
  }
  window.addEventListener("scroll", updateActiveNav, { passive: true });
  window.addEventListener("resize", updateActiveNav);
  updateActiveNav();

  /* ---------- TILT (desktop) ---------- */
  if (window.matchMedia("(min-width: 1000px) and (pointer: fine)").matches) {
    $$(".tilt").forEach((c) => {
      c.addEventListener("pointermove", (e) => {
        const r = c.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `perspective(700px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-4px)`;
      });
      c.addEventListener("pointerleave", () => { c.style.transform = ""; });
    });
  }

  /* ---------- COPY ---------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-copy-target]");
    if (!btn) return;
    const node = $("#" + btn.dataset.copyTarget);
    const text = (node ? node.textContent : "").trim();
    const done = () => toast("Berhasil disalin ✓");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else fallbackCopy(text, done);
  });
  function fallbackCopy(text, cb) {
    const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); cb(); } catch (e) {}
    document.body.removeChild(ta);
  }
  let toastTimer;
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2000); }

  /* ---------- COUNTDOWN ---------- */
  const target = new Date(WEDDING.date).getTime();
  const cd = { d: $("#cd-days"), h: $("#cd-hours"), m: $("#cd-mins"), s: $("#cd-secs") };
  const pad = (n) => String(n).padStart(2, "0");
  const last = {};
  function set(node, val, key) { if (last[key] !== val) { last[key] = val; node.textContent = val; node.classList.add("bump"); setTimeout(() => node.classList.remove("bump"), 300); } }
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) { cd.d.textContent = cd.h.textContent = cd.m.textContent = cd.s.textContent = "00"; return; }
    set(cd.d, String(Math.floor(diff / 86400000)), "d");
    set(cd.h, pad(Math.floor((diff / 3600000) % 24)), "h");
    set(cd.m, pad(Math.floor((diff / 60000) % 60)), "m");
    set(cd.s, pad(Math.floor((diff / 1000) % 60)), "s");
  }
  tick(); setInterval(tick, 1000);

  /* ---------- MUSIC ----------
     Tombol hanya tampil bila file musik ada & berhasil dimuat.
     Berputar hanya saat lagu diputar. Jika autoplay diblokir (mis. iOS),
     musik akan otomatis dicoba lagi pada interaksi berikutnya. */
  let musicReady = false, retryBound = false;
  music.addEventListener("error", () => { musicToggle.classList.remove("show", "playing", "paused"); });
  function markPlaying() { musicToggle.classList.add("show", "playing"); musicToggle.classList.remove("paused"); }
  function markPaused()  { musicToggle.classList.add("show"); musicToggle.classList.remove("playing"); musicToggle.classList.add("paused"); }
  function bindRetry() {
    if (retryBound) return; retryBound = true;
    const evts = ["pointerdown", "touchstart", "keydown"];
    const handler = () => {
      music.play().then(() => { markPlaying(); evts.forEach((e) => document.removeEventListener(e, handler)); }).catch(() => {});
    };
    evts.forEach((e) => document.addEventListener(e, handler));
  }
  function startMusic() {
    if (!WEDDING.music) return;             // tombol tetap tersembunyi
    if (!musicReady) { music.src = WEDDING.music; music.preload = "auto"; music.load(); musicReady = true; }
    music.play().then(markPlaying).catch(() => { markPaused(); bindRetry(); });
  }
  musicToggle.addEventListener("click", () => {
    if (music.paused) music.play().then(markPlaying).catch(() => {});
    else { music.pause(); markPaused(); }
  });

  /* ---------- BUKU TAMU / UCAPAN ---------- */
  const form = $("#wish-form");
  const wishNote = $("#wish-note");
  if (wishNote) {
    wishNote.textContent = (window.Guestbook && window.Guestbook.enabled)
      ? "Ucapan Anda akan tampil untuk semua tamu."
      : "";
  }
  if (form) form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;

    // Buku tamu Firestore aktif → simpan ke cloud, tampil realtime untuk semua tamu.
    if (window.Guestbook && window.Guestbook.enabled) {
      btn.textContent = "Mengirim…"; btn.disabled = true;
      try {
        await window.Guestbook.addWish(data);
        btn.textContent = "Terima kasih! 🎉 Ucapan terkirim"; form.reset();
      } catch (err) { console.warn(err); btn.textContent = "Gagal mengirim — coba lagi"; }
      finally { btn.disabled = false; setTimeout(() => (btn.textContent = original), 4000); }
      return;
    }

    // Tanpa buku tamu (belum dikonfigurasi): tampilkan lokal saja.
    if (data.message && data.message.trim()) addWish(data);
    form.reset();
    btn.textContent = "Terima kasih! 🎉"; setTimeout(() => (btn.textContent = original), 3000);
  });
  function addWish(data) {
    const name = esc(data.name || "Tamu");
    const w = el("div", "wish");
    w.innerHTML = `<div class="wish-avatar">${(name.trim()[0] || "?").toUpperCase()}</div>` +
      `<div class="wish-main"><div class="wish-head"><span class="wish-name">${name}</span></div>` +
      `<div class="wish-msg">${esc(data.message)}</div></div>`;
    const wall = $("#wishes"); if (wall) wall.prepend(w);
  }
  function esc(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
})();
