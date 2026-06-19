/* @author Trivik Kemisoft */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------- */
  /* ACTIVE NAV ON SCROLL                                */
  /* -------------------------------------------------- */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.snav a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + entry.target.id) {
            a.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));

  /* -------------------------------------------------- */
  /* BADGE LIGHTBOX                                      */
  /* -------------------------------------------------- */
  const lightbox    = document.getElementById('lightbox');
  const lbImg       = document.getElementById('lightbox-img');
  const lbName      = document.getElementById('lightbox-name');
  const lbClose     = document.getElementById('lightbox-close');
  const lbBackdrop  = document.getElementById('lightbox-backdrop');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt;
    lbName.textContent = alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    // Clear src after transition so it does not flash on reopen
    setTimeout(() => { lbImg.src = ''; }, 260);
  }

  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.cert-badge');
      if (img) openLightbox(img.src, img.alt);
    });
    // Keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const img = card.querySelector('.cert-badge');
        if (img) openLightbox(img.src, img.alt);
      }
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* -------------------------------------------------- */
  /* MOBILE NAV (sidebar collapses on small screens)    */
  /* -------------------------------------------------- */
  document.querySelectorAll('.snav a').forEach(link => {
    link.addEventListener('click', () => {
      // On mobile the sidebar is static so no toggle needed,
      // but smooth scroll is handled by CSS scroll-behavior.
    });
  });

  /* -------------------------------------------------- */
  /* SCROLL REVEAL                                       */
  /* -------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.witem, .cert-card, .exp .item, .cc').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      revealObs.observe(el);
    });
  }

});
