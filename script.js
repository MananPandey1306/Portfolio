document.addEventListener("DOMContentLoaded", () => {
    /* ==========================================================================
       Intersection Observer for Scroll Reveal Animations
       ========================================================================== */
    const revealElements = document.querySelectorAll(".reveal, .reveal-right, .reveal-stagger");

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before the element enters
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("active");
                // Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* ==========================================================================
       Navbar Scroll Logic (Hide on scroll down, show on scroll up)
       ========================================================================== */
    const nav = document.querySelector(".nav-container");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            if (window.scrollY > lastScrollY) {
                // Scrolling down
                nav.classList.add("hide");
            } else {
                // Scrolling up
                nav.classList.remove("hide");
            }
        } else {
            // At top of page
            nav.classList.remove("hide");
        }
        lastScrollY = window.scrollY;
    });

    /* ==========================================================================
       Smooth Scrolling for Anchor Links (Fallback & Enhanced)
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for navbar height
                const navHeight = nav.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
