/* ═══════════════════════════════════════════════
   js/countdown.js
   Live countdown timer to the wedding date

   ── EDIT: Change the wedding date/time below ──
   Format: 'YYYY-MM-DDTHH:MM:SS+HH:MM'
   +08:00 = Philippine Standard Time (PST)
   ═══════════════════════════════════════════════ */

const WEDDING_DATE = new Date('2027-09-24T16:00:00+08:00');

function updateCountdown() {
  const diff = WEDDING_DATE - new Date();

  if (diff <= 0) {
    // Wedding day has passed — show zeros
    ['cd-days', 'cd-hours', 'cd-mins', 'cd-secs'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '0';
    });
    return;
  }

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  const secs  = Math.floor((diff % 60000) / 1000);

  const cdDays  = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins  = document.getElementById('cd-mins');
  const cdSecs  = document.getElementById('cd-secs');

  if (cdDays)  cdDays.textContent  = days;
  if (cdHours) cdHours.textContent = hours;
  if (cdMins)  cdMins.textContent  = mins;
  if (cdSecs)  cdSecs.textContent  = secs;
}

// Run immediately, then every second
updateCountdown();
setInterval(updateCountdown, 1000);
