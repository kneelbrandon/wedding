/* ═══════════════════════════════════════════════
   js/navigation.js
   Google Maps & Waze navigation button links

   ── EDIT: Update VENUE_NAME to match your venue ──
   ── EDIT: Or use GPS coordinates for more accuracy:
      GOOGLE: "https://maps.google.com/?q=14.1234,120.9876"
      WAZE:   "https://waze.com/ul?ll=14.1234,120.9876&navigate=yes"
   ═══════════════════════════════════════════════ */

const VENUE_NAME = 'Bella Rosa Gardens Silang Cavite';

// ── EDIT: Replace with exact GPS coords if you have them ──
// const VENUE_LAT  = 14.2345;   // latitude
// const VENUE_LNG  = 120.9876;  // longitude

const GOOGLE_MAPS_URL = `https://maps.google.com/?q=${encodeURIComponent(VENUE_NAME)}`;
const WAZE_URL        = `https://waze.com/ul?q=${encodeURIComponent(VENUE_NAME)}&navigate=yes`;

// Set hrefs when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const gmBtn   = document.getElementById('google-maps-btn');
  const wazeBtn = document.getElementById('waze-btn');
  if (gmBtn)   gmBtn.href   = GOOGLE_MAPS_URL;
  if (wazeBtn) wazeBtn.href = WAZE_URL;
});
