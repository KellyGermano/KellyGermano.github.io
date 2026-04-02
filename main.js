document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return; // Ignore empty or top-links
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Reveal on Scroll (Optional but nice)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Apply reveal animation logic
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
    // Mobile Menu Toggle
    const menuTrigger = document.querySelector('.menu-trigger');
    const nav = document.querySelector('nav');
    
    if (menuTrigger && nav) {
        menuTrigger.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuTrigger.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuTrigger.textContent = '☰';
            });
        });
    }

    // Modal System
    const cards = document.querySelectorAll('.project-card');
    const modals = document.querySelectorAll('.modal-overlay');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Open Modal
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // If the click is on a link, prevent default to avoid '#' navigation
            if (e.target.closest('a')) {
                e.preventDefault();
            }
            
            const targetId = card.getAttribute('data-modal-target');
            const modal = document.getElementById(targetId);
            if (modal) {
                openModal(modal);
            }
        });
    });

    // Close Modal - X Button
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents card click if applicable
            const modal = btn.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    // Close Modal - Click Outside (Overlay)
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close Modal - Keyboard (Esc)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });

    function openModal(modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        // Small delay to allow fade-out animation before removing scroll lock
        setTimeout(() => {
            if (!document.querySelector('.modal-overlay.active')) {
                document.body.classList.remove('modal-open');
            }
        }, 300);
    }
});
