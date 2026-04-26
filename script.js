/* ===========================
   script.js — Monisha Jegadeesan Portfolio
   =========================== */

(function () {
  'use strict';

  /* ── PAGE NAVIGATION ── */
  function showPage(id) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(function (el) {
      el.classList.remove('active');
    });

    // Deactivate all nav links (desktop + mobile)
    document.querySelectorAll('.greedy-nav a, .mobile-nav a').forEach(function (el) {
      el.classList.remove('active');
    });

    // Show target section
    var section = document.getElementById('page-' + id);
    if (section) section.classList.add('active');

    // Activate matching nav links
    var desktopLink = document.getElementById('nav-' + id);
    if (desktopLink) desktopLink.classList.add('active');

    var mobileLink = document.getElementById('mnav-' + id);
    if (mobileLink) mobileLink.classList.add('active');

    // Close mobile menu
    closeMobileNav();

    // Scroll to top of content on mobile
    if (window.innerWidth <= 768) {
      var content = document.querySelector('.content');
      if (content) {
        content.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  /* ── MOBILE HAMBURGER ── */
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');

  function closeMobileNav() {
    if (hamburger) hamburger.classList.remove('open');
    if (mobileNav) mobileNav.classList.remove('open');
  }

  if (hamburger) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
  }

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (
      mobileNav &&
      mobileNav.classList.contains('open') &&
      !mobileNav.contains(e.target) &&
      e.target !== hamburger
    ) {
      closeMobileNav();
    }
  });

  /* ── NAV LINK CLICK HANDLERS ── */
  function bindNavLinks(selector, prefix) {
    document.querySelectorAll(selector).forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var id = this.id.replace(prefix, '');
        showPage(id);
      });
    });
  }

  bindNavLinks('.greedy-nav a', 'nav-');
  bindNavLinks('.mobile-nav a', 'mnav-');

  // Site title → about
  var siteTitle = document.querySelector('.site-title');
  if (siteTitle) {
    siteTitle.addEventListener('click', function (e) {
      e.preventDefault();
      showPage('about');
    });
  }

  /* ── PROFILE IMAGE FALLBACK ── */
  function setupAvatarFallback(imgId, fallbackId) {
    var img = document.getElementById(imgId);
    var fallback = document.getElementById(fallbackId);
    if (img && fallback) {
      img.addEventListener('error', function () {
        img.style.display = 'none';
        fallback.style.display = 'flex';
      });
    }
  }

  setupAvatarFallback('sidebar-avatar', 'sidebar-fallback');
  setupAvatarFallback('mobile-avatar', 'mobile-fallback');

  /* ── INIT ── */
  showPage('about');
})();

  /* ── CV PDF VIEWER ── */
  (function () {
    var fileInput  = document.getElementById('cv-file-input');
    var uploadLabel= document.querySelector('.cv-upload-label');
    var dropzone   = document.getElementById('cv-dropzone');
    var viewerWrap = document.getElementById('cv-viewer-wrap');
    var iframe     = document.getElementById('cv-iframe');
    var fileNameEl = document.getElementById('cv-file-name');
    var downloadBtn= document.getElementById('cv-download-btn');
    var removeBtn  = document.getElementById('cv-remove-btn');

    var currentObjectURL = null;

    function loadPDF(file) {
      if (!file || file.type !== 'application/pdf') return;
      if (currentObjectURL) URL.revokeObjectURL(currentObjectURL);
      currentObjectURL = URL.createObjectURL(file);
      iframe.src = currentObjectURL;
      fileNameEl.textContent = file.name;
      downloadBtn.href = currentObjectURL;
      downloadBtn.download = file.name;
      dropzone.style.display = 'none';
      viewerWrap.style.display = 'block';
    }

    function removePDF() {
      if (currentObjectURL) { URL.revokeObjectURL(currentObjectURL); currentObjectURL = null; }
      iframe.src = '';
      fileInput.value = '';
      viewerWrap.style.display = 'none';
      dropzone.style.display = 'block';
    }

    if (fileInput) fileInput.addEventListener('change', function () { loadPDF(this.files[0]); });
    if (removeBtn) removeBtn.addEventListener('click', removePDF);

    // Click dropzone → open file picker
    if (dropzone) {
      dropzone.addEventListener('click', function () { fileInput && fileInput.click(); });
      dropzone.addEventListener('dragover', function (e) { e.preventDefault(); dropzone.classList.add('drag-over'); });
      dropzone.addEventListener('dragleave', function () { dropzone.classList.remove('drag-over'); });
      dropzone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
        var file = e.dataTransfer.files[0];
        if (file) loadPDF(file);
      });
    }
  })();