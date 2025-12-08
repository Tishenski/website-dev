/* assets/js/script.js */
document.addEventListener('DOMContentLoaded', function() {
    // Catalog toggle
    const catalogToggle = document.querySelector('.catalog-toggle');
    const catalogSidebar = document.querySelector('.cp-catalog-sidebar');
    if (catalogToggle && catalogSidebar) {
        catalogToggle.addEventListener('click', () => {
            const open = catalogSidebar.classList.toggle('open');
            catalogSidebar.setAttribute('aria-hidden', !open);
        });
    }

    // Mobile menu toggle (toggles catalog on small screens)
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle && catalogSidebar) {
        mobileToggle.addEventListener('click', () => {
            catalogSidebar.classList.toggle('open');
        });
    }

    // Simple slider (hero)
    const track = document.querySelector('.slider-track');
    if (track) {
        const slides = Array.from(track.children);
        let idx = 0;
        function show(i){
            const w = track.clientWidth;
            track.style.transform = `translateX(-${i * w}px)`;
            slides.forEach(s => s.classList.remove('active'));
            slides[i].classList.add('active');
        }
        // resize handler to keep correct offset
        window.addEventListener('resize', () => show(idx));
        setInterval(() => {
            idx = (idx + 1) % slides.length;
            show(idx);
        }, 4500);
    }

    // Add to cart animation (fly to cart)
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const img = e.currentTarget.closest('.product-card').querySelector('img');
            if (!img) return;
            const fly = img.cloneNode(true);
            const rect = img.getBoundingClientRect();
            fly.style.position = 'fixed';
            fly.style.left = rect.left + 'px';
            fly.style.top = rect.top + 'px';
            fly.style.width = rect.width + 'px';
            fly.style.height = rect.height + 'px';
            fly.style.transition = 'all .8s cubic-bezier(.2,.9,.2,1)';
            fly.style.zIndex = 9999;
            document.body.appendChild(fly);

            const cartIcon = document.querySelector('.cp-action.cart');
            const cartRect = cartIcon.getBoundingClientRect();

            requestAnimationFrame(() => {
                fly.style.left = (cartRect.left + cartRect.width/2 - rect.width/6) + 'px';
                fly.style.top = (cartRect.top + cartRect.height/2 - rect.height/6) + 'px';
                fly.style.transform = 'scale(.25)';
                fly.style.opacity = '0.6';
            });

            fly.addEventListener('transitionend', () => fly.remove());
        });
    });

});
