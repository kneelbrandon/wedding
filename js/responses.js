/* ═══════════════════════════════════════════════
   js/responses.js
   Response storage, filtering, table rendering,
   stats, and delete

   ── EDIT: Change STORAGE_KEY if you want a
      fresh start (clears all saved responses) ──
   ═══════════════════════════════════════════════ */

const STORAGE_KEY = 'wedding_rsvp_v2';

/* Load saved responses from localStorage */
let responses = [];
try {
  responses = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
} catch (e) {
  responses = [];
}

/* Save responses to localStorage */
function saveResponses() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
  } catch (e) {
    console.error('Could not save responses:', e);
  }
}

/* Current active filter */
let currentFilter = 'all';

/* Set active filter and re-render */
function setFilter(f, el) {
  currentFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  renderResponses();
}

/* Delete a response by id */
function deleteEntry(id) {
  if (!confirm('Remove this response?')) return;
  responses = responses.filter(r => r.id !== id);
  saveResponses();
  renderResponses();
}

/* Render the responses table and stats */
function renderResponses() {
  const filtered = responses.filter(r => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'yes' || currentFilter === 'no') return r.attend === currentFilter;
    return r.type === currentFilter;
  });

  const tbody      = document.getElementById('resp-tbody');
  const emptyState = document.getElementById('empty-state');
  const statsRow   = document.getElementById('stats-row');

  if (!tbody) return;

  tbody.innerHTML = '';
  if (emptyState) emptyState.style.display = filtered.length ? 'none' : 'block';

  filtered.forEach(r => {
    const tr = document.createElement('tr');

    const extra = (r.type === 'sponsor' && r.company)
      ? `<br><span style="font-size:10px;color:var(--text-tertiary);">${r.company} · ${r.sponsorship}</span>`
      : '';

    const attendLabel = r.attend === 'yes' ? 'Attending' : 'Declined';

    tr.innerHTML = `
      <td>
        <span style="font-weight:500;">${r.name}</span>${extra}
        <br><span style="font-size:10px;color:var(--text-tertiary);">${r.date}</span>
      </td>
      <td><span class="badge badge-${r.type}">${r.type}</span></td>
      <td><span class="badge badge-${r.attend}">${attendLabel}</span></td>
      <td style="color:var(--text-secondary);font-size:12px;max-width:140px;">${r.msg || '—'}</td>
      <td><button class="del-btn" onclick="deleteEntry(${r.id})" title="Remove">×</button></td>
    `;
    tbody.appendChild(tr);
  });

  /* Update stats */
  if (statsRow) {
    const yes      = responses.filter(r => r.attend === 'yes').length;
    const no       = responses.filter(r => r.attend === 'no').length;
    const sponsors = responses.filter(r => r.type === 'sponsor').length;
    statsRow.innerHTML = `
      <div class="stat-pill"><strong>${responses.length}</strong> total</div>
      <div class="stat-pill"><strong>${yes}</strong> attending</div>
      <div class="stat-pill"><strong>${no}</strong> declined</div>
      <div class="stat-pill"><strong>${sponsors}</strong> sponsors</div>
    `;
  }
}
