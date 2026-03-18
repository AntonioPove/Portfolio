/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    /* Reveal de proyectos: debe ir ANTES que ScrollSpy. Si ScrollSpy lanza error,
       antes se cortaba todo el script y los .reveal quedaban en opacity:0 (invisibles
       pero clicables) — típico al desplegar en GitHub Pages si algo falla al inicio. */
    const revealEls = document.querySelectorAll('.projects-strips .reveal');
    const markAllRevealsVisible = () => {
        revealEls.forEach((el) => el.classList.add('visible'));
    };
    if (revealEls.length) {
        if ('IntersectionObserver' in window) {
            const revObs = new IntersectionObserver((entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('visible');
                        revObs.unobserve(e.target);
                    }
                });
            }, { root: null, rootMargin: '0px 0px 12% 0px', threshold: 0.01 });
            revealEls.forEach((el) => revObs.observe(el));
            /* Visibles al instante si ya están en pantalla (evita parpadeo / observer tardío) */
            const revealIfInView = () => {
                revealEls.forEach((el) => {
                    const r = el.getBoundingClientRect();
                    if (r.top < window.innerHeight + 80 && r.bottom > -80) {
                        el.classList.add('visible');
                    }
                });
            };
            requestAnimationFrame(() => requestAnimationFrame(revealIfInView));
            /* Respaldo: por si el observer no dispara (viewport, iframes, bugs móvil) */
            window.setTimeout(() => {
                revealEls.forEach((el) => {
                    if (!el.classList.contains('visible')) el.classList.add('visible');
                });
            }, 2500);
        } else {
            markAllRevealsVisible();
        }
    }

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav && typeof bootstrap !== 'undefined' && bootstrap.ScrollSpy) {
        try {
            new bootstrap.ScrollSpy(document.body, {
                target: '#mainNav',
                rootMargin: '0px 0px -40%',
            });
        } catch (err) {
            console.warn('ScrollSpy:', err);
        }
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
