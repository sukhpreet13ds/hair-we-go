document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('heroVideo');
    const nav = document.getElementById('main-nav');

    // Slow down the video to 0.50 speed
    if (video) {
        video.playbackRate = 0.85;
    }

    // Optional: Add a glassmorphism effect to navbar on scroll
    window.addEventListener('scroll', () => {
        const logo = document.querySelector('.navbar-logo');
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.padding = '15px 50px';
            if (logo) logo.classList.add('logo-hidden');
        } else {
            nav.style.backgroundColor = 'transparent';
            nav.style.backdropFilter = 'none';
            nav.style.padding = '20px 50px';
            if (logo) logo.classList.remove('logo-hidden');
        }
    });

    // Smooth scroll for nav links (if sections were present)
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Services Marquee Scaling Effect
    const marqueeItems = document.querySelectorAll('.service-img-box');
    const servicesSection = document.querySelector('.services-section');

    if (servicesSection && marqueeItems.length > 0) {
        function updateScaling() {
            const centerX = window.innerWidth / 2;
            marqueeItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const itemCenter = rect.left + rect.width / 2;
                const distance = Math.abs(centerX - itemCenter);
                
                // Scale based on distance from center
                const maxScale = 1.35;
                const minScale = 1.0;
                const maxDistance = 500; // Distance at which scaling is minimum
                
                let scale = maxScale - (distance / maxDistance) * (maxScale - minScale);
                scale = Math.max(minScale, Math.min(maxScale, scale));
                
                // Opacity based on distance
                let opacity = 0.8 - (distance / maxDistance) * 0.5;
                opacity = Math.max(0.3, Math.min(0.8, opacity));

                item.style.transform = `scale(${scale})`;
                const img = item.querySelector('img');
                if (img) img.style.opacity = opacity;
            });
            requestAnimationFrame(updateScaling);
        }
        updateScaling();
    }
});

