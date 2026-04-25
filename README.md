# 💍 Wedding Invitation App
### Myrrah Ericka Llanera & Neil Brandon Salvador
**September 24, 2027 · Bella Rosa Gardens, Silang, Cavite**

---

## 📁 Folder Structure

```
wedding-app/
│
├── index.html              ← Main file — open this in your browser
│
├── css/
│   ├── base.css            ← Colors, variables, layout
│   ├── components.css      ← Buttons, badges, tabs, photo frame, table
│   └── pages.css           ← Invitation, countdown, dress code, RSVP form
│
├── js/
│   ├── app.js              ← Page navigation & initialization
│   ├── countdown.js        ← Live countdown timer
│   ├── navigation.js       ← Google Maps & Waze links
│   ├── photo.js            ← Couple photo upload
│   ├── rsvp.js             ← RSVP form logic
│   └── responses.js        ← Response storage, filtering, table
│
└── images/
    ├── couple/
    │   └── README.txt      ← Drop your couple photo here
    └── icons/
        ├── camera.svg
        ├── chevron.svg
        ├── map-pin.svg
        └── waze.svg
```

---

## 🚀 How to Open

Just double-click **index.html** — it opens in any browser, no server needed.

---

## ✏️ Common Edits

| What to change | Where |
|---|---|
| Couple names | `index.html` → hero section |
| Wedding date & time | `index.html` hero + `js/countdown.js` |
| Venue name | `index.html` hero + `js/navigation.js` |
| RSVP deadline | `index.html` → `.rsvp-cta` section |
| Dress code colors | `index.html` → `style="background:#hex"` on `.dress-swatch` |
| Program schedule | `index.html` → `.program-item` blocks |
| Sponsorship types | `index.html` → `#rsvp-sponsorship` select options |
| App colors / theme | `css/base.css` → `:root` CSS variables |
| Couple photo | Drop file in `images/couple/` → see README.txt |

---

## 📸 Adding the Couple Photo

**Option A — Upload in browser (temporary):**
Click the circle on the Invitation page and select a photo.

**Option B — Permanent (recommended):**
1. Copy your photo to `images/couple/photo.jpg`
2. In `index.html`, find `<img id="couple-photo">` and set:
   ```html
   <img id="couple-photo" src="images/couple/photo.jpg" style="display:block;" alt="Myrrah & Neil">
   ```
3. Delete the `<div class="photo-placeholder">` below it.

---

## 💾 How Responses Are Saved

Responses are stored in the browser's **localStorage** under the key `wedding_rsvp_v2`.
They persist between sessions on the same device/browser.

To export responses: open the browser console and run:
```js
console.log(JSON.stringify(JSON.parse(localStorage.getItem('wedding_rsvp_v2')), null, 2));
```

To clear all responses:
```js
localStorage.removeItem('wedding_rsvp_v2');
```
