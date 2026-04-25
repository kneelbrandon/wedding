/* ═══════════════════════════════════════════════
   js/app.js
   App entry point: page navigation, init
   ═══════════════════════════════════════════════ */

/* Switch between Invitation / RSVP / Responses tabs */
function showPage(p) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));

  const page = document.getElementById('page-' + p);
  if (page) page.classList.add('active');

  const tabOrder = ['invite', 'rsvp', 'responses'];
  const tabIdx   = tabOrder.indexOf(p);
  const tabs     = document.querySelectorAll('.tab');
  if (tabs[tabIdx]) tabs[tabIdx].classList.add('active');

  // Re-render table when switching to responses
  if (p === 'responses') renderResponses();
}

/* Toggle collapsible info block (Dress Code / Program) */
function toggleInfo(header) {
  header.classList.toggle('open');
  const body = header.nextElementSibling;
  if (body) body.classList.toggle('open');
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  renderResponses(); // Load saved responses on start
});
