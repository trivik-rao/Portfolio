/* @author Trivik Kemisoft */

document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------- */
    /* MOBILE NAVIGATION                                   */
    /* -------------------------------------------------- */
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    function closeMobileNav() {
        navLinks.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-xmark', isOpen);
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });
    }

    /* -------------------------------------------------- */
    /* NAVBAR SCROLL SHADOW                                */
    /* -------------------------------------------------- */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.borderBottomColor = 'rgba(245, 158, 11, 0.15)';
        } else {
            navbar.style.borderBottomColor = '';
        }
    }, { passive: true });

    /* -------------------------------------------------- */
    /* ACTIVE NAV LINK ON SCROLL                           */
    /* -------------------------------------------------- */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navAnchors.forEach(anchor => {
                    anchor.classList.remove('nav-active');
                    if (anchor.getAttribute('href') === '#' + entry.target.id) {
                        anchor.classList.add('nav-active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    /* -------------------------------------------------- */
    /* SCROLL REVEAL: subtle fade-in for cards             */
    /* -------------------------------------------------- */
    const revealTargets = document.querySelectorAll(
        '.card, .work-card, .cert-card, .stat-card, .th-metric-box'
    );

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealTargets.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(16px)';
            el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
            revealObserver.observe(el);
        });
    }

});
