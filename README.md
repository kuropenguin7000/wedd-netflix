# FIXNIKAH — A Netflix-Themed Wedding Invitation 💍🎬

A single-page, animated wedding invitation styled after Netflix, in **Indonesian**.
Plain HTML + CSS + JavaScript — no build step. Deployed with **Firebase Hosting**.

Currently themed around **Kirito & Asuna** (Sword Art Online) as temporary placeholders.

## ✨ Features

- **Opening gate** — twin doors (Kirito & Asuna) that split apart on "Buka Undangan"
- **Auto guest name** from the URL (`?to=`)
- **Two distinct layouts**: a fixed-sidebar "browse" look on desktop, a single-column immersive "reel" on mobile
- **Lots of motion**: Ken Burns hero, floating hearts, shimmering titles, card tilt, live countdown, pulsing buttons
- Sections: hero, verse, Breaking News, couple posters, event timeline, gift/e-envelope with copy buttons, love story, gallery, invited guests, closing
- **Background music** with a play/pause toggle
- **Live guestbook** ("Ucapan & Doa") powered by Firebase Firestore — guests post wishes everyone can see in realtime

## 🔗 Personalized guest links

Add `?to=` to the end of the link:

```
https://wedd-netflix.web.app/?to=Budi-Santoso
```

The name shows on the opening gate (dashes/underscores become spaces). With no
parameter it falls back to a polite default ("Bapak / Ibu / Saudara / i").

## 📝 Editing content (no coding)

All text lives in **`js/data.js`**:

- `couple`, `date`, `dateText`, `hashtags` — the essentials (`date` drives the countdown)
- `verse`, `news`, `groom`, `bride`, `events`, `gift`, `story`, `memories`, `invited`, `closing`
- `music` — background track path
- `firebase` — Firestore config for the guestbook (see below)

### Replacing the Kirito & Asuna images

> ⚠️ **Copyright note.** The files in `assets/*.webp` are *Sword Art Online* anime
> stills used **only as temporary placeholders**. They are copyrighted. **Replace them
> with your own photos before sharing the invitation publicly.**

Overwrite the files in `assets/` (e.g. `assets/kirito.webp`, `assets/asuna.webp`) with your
own, or add new files and update the paths in `js/data.js`:

- `gateGroom` / `gateBride` — the two opening-gate doors
- `groom.poster` / `bride.poster` — couple posters
- `heroImg` — the large hero background
- `events[].img`, `memories[].img` — event & gallery thumbnails

Suggested sizes: ~1080×1440 portrait for posters, ~1920px for the hero.

### Background music

`assets/music.mp3` is **"Bittersweet" by Kevin MacLeod** (incompetech.com), licensed
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — royalty-free, credit already
shown in the closing section. To use another song, overwrite `assets/music.mp3` (keep the
exact filename). If the new track isn't CC-BY, update/remove the credit line in `index.html`.
Music starts when the guest taps "Buka Undangan" (browser autoplay policy). Set `music: ""`
in `js/data.js` to disable it.

## 💬 Guestbook (Firebase Firestore)

The **"Ucapan & Doa"** section is a live wall — guests submit a name + message and
everyone sees them in realtime. Until it's configured, the form just shows messages
locally. You already added your `firebase` config to `js/data.js`; the remaining steps:

**1. Enable Firestore.** Firebase Console → **Build → Firestore Database → Create database**
→ pick a nearby location (e.g. `asia-southeast2`) → start in **Production mode**.

**2. Publish security rules.** Firestore → **Rules** tab → replace everything with the
rules below → **Publish**. *This is the step most people miss — without it, saving a wish
is rejected and the collection stays empty:*

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /wishes/{id} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasOnly(['name','message','createdAt'])
        && request.resource.data.name is string
        && request.resource.data.name.size() > 0 && request.resource.data.name.size() <= 60
        && request.resource.data.message is string
        && request.resource.data.message.size() > 0 && request.resource.data.message.size() <= 500;
      allow update, delete: if false;
    }
  }
}
```

These allow anyone to **read** and **create** a wish (with validation), but never edit or
delete. Click **Publish**.

**3. Deploy** (below). Done — you never create the `wishes` collection by hand; Firestore
creates it automatically on the first successful submission.

> The `firebaseConfig` values are public by design (safe in client code) — real security
> comes from the rules above. To moderate/remove a wish, open the **`wishes`** collection
> in the Firestore Console and delete the document.

## 🚀 Deploy (Firebase Hosting)

Config lives in `firebase.json` + `.firebaserc` (project: `wedd-netflix`).

```bash
npm install -g firebase-tools   # once
firebase login                  # once
firebase deploy --only hosting
```

Live at:
- `https://wedd-netflix.web.app`
- `https://wedd-netflix.firebaseapp.com`

Every update = re-run `firebase deploy --only hosting`.

### Custom domain

Firebase Console → **Hosting → Add custom domain**, then follow the DNS steps it shows.

## 🖥️ Local preview

```bash
npx serve -l 8080 .
# open http://localhost:8080/?to=your-guest
```

Enjoy — and see you on the big day! 🍿
