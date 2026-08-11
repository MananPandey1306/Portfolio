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
       Mobile Menu Toggle
       ========================================================================== */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon between menu and close (x)
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close menu when a link is clicked
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.setAttribute('data-lucide', 'menu');
                        lucide.createIcons();
                    }
                }
            });
        });
    }

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

/* ==========================================================================
   Chatbot Logic
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('chatbot-toggle-btn');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const chatContainer = document.getElementById('chatbot-container');
    const messagesArea = document.getElementById('chatbot-messages');
    const inputField = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send-btn');

    // Toggle Chat Window
    toggleBtn.addEventListener('click', () => {
        chatContainer.classList.add('active');
        toggleBtn.classList.add('hidden');
        inputField.focus();
    });

    closeBtn.addEventListener('click', () => {
        chatContainer.classList.remove('active');
        toggleBtn.classList.remove('hidden');
    });

    // Handle Sending Messages
    const sendMessage = () => {
        const text = inputField.value.trim();
        if (!text) return;

        appendMessage('user', text);
        inputField.value = '';

        // Simulate a slight delay for realism
        setTimeout(() => {
            const response = getBotResponse(text);
            appendMessage('assistant', response);
        }, 500);
    };

    sendBtn.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    const appendMessage = (sender, text) => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-message');
        msgDiv.classList.add(sender === 'user' ? 'user-message' : 'assistant-message');
        // allow simple html like <br> in bot response
        if (sender === 'assistant') {
            msgDiv.innerHTML = text;
        } else {
            msgDiv.textContent = text;
        }
        messagesArea.appendChild(msgDiv);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    };

    // Chatbot Knowledge Base
    const getBotResponse = (input) => {
        const lowerInput = input.toLowerCase();
        
        if (/(experience|internship|work|idemia|job)/.test(lowerInput)) {
            return "Manan worked as an <strong>AI/ML Intern at IDEMIA India Pvt. Ltd.</strong> (May 2026 – Jul 2026) where he built an EmotionAI platform using TensorFlow.js and a CNN for real-time facial expression analysis in-browser. He also engineered an in-app chatbot and automated notification workflows.";
        }
        else if (/(project|portfolio|classlens|hotel|webats)/.test(lowerInput)) {
            return "Manan's key projects include:<br>• <strong>ClassLens:</strong> An AI-powered attendance system using AWS Rekognition.<br>• <strong>Hotel PG Management Portal:</strong> A Next.js/PostgreSQL portal with complex shared electricity billing logic.<br>• <strong>Employee Management System (Webats.in):</strong> An admin portal with RBAC and OAuth integration.";
        }
        else if (/(education|college|university|degree|vit|bhopal|study)/.test(lowerInput)) {
            return "Manan is currently pursuing a <strong>B.Tech in Computer Science with Artificial Intelligence & Machine Learning</strong> at VIT Bhopal University (Sep 2024 – Aug 2028).";
        }
        else if (/(skill|technology|stack|language|framework|tool)/.test(lowerInput)) {
            return "His technical skills include:<br>• <strong>Languages:</strong> Python, Java, JavaScript/TypeScript, SQL<br>• <strong>AI/ML:</strong> Generative AI, TensorFlow, CNNs, Computer Vision, AWS Rekognition<br>• <strong>Web & Cloud:</strong> REST APIs, AWS, Vercel, Firebase, React/Next.js";
        }
        else if (/(certif|course|learning)/.test(lowerInput)) {
            return "He holds certifications in:<br>• <em>Programming with Generative AI</em> (IISc Bangalore)<br>• <em>Cloud Computing</em> (IIT Kharagpur)<br>• <em>Python Programming Fundamentals</em> (Microsoft)<br>• <em>Applied Machine Learning in Python</em> (University of Michigan)";
        }
        else if (/(contact|email|phone|reach|hire|resume)/.test(lowerInput)) {
            return "You can reach Manan via email at <strong>manan.pandey1306@gmail.com</strong> or call <strong>+91 93117 93090</strong>. Feel free to download his resume from the top banner!";
        }
        else if (/(hi|hello|hey|greetings)/.test(lowerInput)) {
            return "Hello! How can I assist you with Manan's portfolio? You can ask me about his experience, projects, skills, or education.";
        }
        else {
            return "I'm not quite sure about that. But you can learn more by exploring the portfolio, or by reaching out to Manan directly at <strong>manan.pandey1306@gmail.com</strong>.";
        }
    };
});
