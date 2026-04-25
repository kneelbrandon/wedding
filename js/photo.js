/* ═══════════════════════════════════════════════
   js/photo.js
   Couple photo upload handler

   ── EDIT: To use a static photo instead of
      uploading, set the src directly in index.html:
      <img id="couple-photo" src="images/couple/photo.jpg">
      and remove the photo-placeholder div.
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const input       = document.getElementById('photo-input');
  const photoImg    = document.getElementById('couple-photo');
  const placeholder = document.getElementById('photo-placeholder');

  if (!input || !photoImg) return;

  input.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    // Validate it's an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      photoImg.src = e.target.result;
      photoImg.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
    };
    reader.readAsDataURL(file);
  });
});
