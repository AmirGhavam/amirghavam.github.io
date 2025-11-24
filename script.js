    // Typing animation
    const sentences = [
        "Hi, I'm Amir Ghavam",
        "I Build Data-Driven Solutions",
        "I Create Beautiful Web Experiences",
        "I Transform Data Into Insights",
        "I Develop Full-Stack Applications"
    ];
    
    let sentenceIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;
    
    function type() {
        const typingText = document.getElementById('typingText');
        const currentSentence = sentences[sentenceIndex];
        
        if (isDeleting) {
            typingText.textContent = currentSentence.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentSentence.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentSentence.length) {
            isDeleting = true;
            setTimeout(type, pauseTime);
            return;
        }
        
        let minCharIndex = 0;
        if (sentenceIndex > 0 && currentSentence.startsWith("I ")) {
            minCharIndex = 2;
        }
        
        if (isDeleting && charIndex === minCharIndex) {
            isDeleting = false;
            sentenceIndex = (sentenceIndex + 1) % sentences.length;
        }
        
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, speed);
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(type, 500);
    });

    function toggleMenu() {
        const navLinks = document.getElementById('navLinks');
        navLinks.classList.toggle('active');
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('navLinks').classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    function copyToClipboard(elementId, label) {
        const element = document.getElementById(elementId);
        const text = element.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            showToast(`${label} copied to clipboard! 📋`);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }

    function downloadResume() {
        const resumeUrl = '/path/to/your/resume.pdf';
        
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'Amir_Ghavam_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast('Resume download started! 📄');
    }

    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Scroll reveal (mobile only)
    function initScrollReveal() {
        if (window.innerWidth > 921) return;

        const sectionOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -20px 0px'
        };

        const remainingOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -20px 0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.reveal-on-scroll');
                    if (items.length >= 1) items[0].classList.add('revealed');
                    if (items.length >= 2) items[1].classList.add('revealed');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, sectionOptions);

        const remainingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, remainingOptions);

        document.querySelectorAll('section').forEach(section => {
            const items = section.querySelectorAll('.reveal-on-scroll');
            if (items.length > 0) {
                sectionObserver.observe(section);
                items.forEach((item, index) => {
                    if (index >= 2) {
                        remainingObserver.observe(item);
                    }
                });
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initScrollReveal();
    });

    let wasMobileView = window.innerWidth <= 921;
    window.addEventListener('resize', () => {
        const isMobileNow = window.innerWidth <= 921;
        if (isMobileNow !== wasMobileView) {
            wasMobileView = isMobileNow;
            if (isMobileNow) {
                initScrollReveal();
            } else {
                document.querySelectorAll('.revealed').forEach(el => {
                    el.classList.remove('revealed');
                });
            }
        }
    });

    // Projects carousel (desktop)
    let currentSlide = 0;
    let cardsPerView = 3;
    let totalCards = 0;
    let realTotalSlides = 0;
    let isTransitioning = false;
    let isMobile = false;

    function initCarousel() {
        const carousel = document.getElementById('projectsCarousel');
        if (!carousel) return;

        const originalCards = Array.from(carousel.querySelectorAll('.project-card:not(.clone)'));
        totalCards = originalCards.length;
        
        updateCardsPerView();
        
        if (isMobile) {
            carousel.querySelectorAll('.clone').forEach(clone => clone.remove());
            return;
        }
        
        realTotalSlides = Math.ceil(totalCards / cardsPerView);
        
        carousel.querySelectorAll('.clone').forEach(clone => clone.remove());
        
        const cleanCards = Array.from(carousel.querySelectorAll('.project-card'));
        
        for (let i = 0; i < cardsPerView; i++) {
            const clone = cleanCards[i].cloneNode(true);
            clone.classList.add('clone');
            carousel.appendChild(clone);
        }
        
        for (let i = cleanCards.length - cardsPerView; i < cleanCards.length; i++) {
            const clone = cleanCards[i].cloneNode(true);
            clone.classList.add('clone');
            carousel.insertBefore(clone, carousel.firstChild);
        }
        
        currentSlide = 1;
        
        createIndicators();
        updateCarousel(false);
    }

    function updateCardsPerView() {
        const wasMobile = isMobile;
        
        if (window.innerWidth <= 921) {
            cardsPerView = 1;
            isMobile = true;
        } else if (window.innerWidth <= 1400) {
            cardsPerView = 2;
            isMobile = false;
        } else {
            cardsPerView = 3;
            isMobile = false;
        }
        
        if (wasMobile !== isMobile) {
            const carousel = document.getElementById('projectsCarousel');
            if (!carousel) return;
            carousel.querySelectorAll('.clone').forEach(clone => clone.remove());
            carousel.style.transform = 'none';
        }
    }

    function createIndicators() {
        if (isMobile) return;
        
        const indicatorsContainer = document.getElementById('carouselIndicators');
        if (!indicatorsContainer) return;

        indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < realTotalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.onclick = () => goToSlide(i + 1);
            indicatorsContainer.appendChild(indicator);
        }
    }

    function moveCarousel(direction) {
        if (isTransitioning || isMobile) return;
        
        currentSlide += direction;
        updateCarousel(true);
        
        setTimeout(() => {
            if (currentSlide > realTotalSlides) {
                isTransitioning = true;
                currentSlide = 1;
                updateCarousel(false);
                setTimeout(() => {
                    isTransitioning = false;
                }, 50);
            }
            
            if (currentSlide < 1) {
                isTransitioning = true;
                currentSlide = realTotalSlides;
                updateCarousel(false);
                setTimeout(() => {
                    isTransitioning = false;
                }, 50);
            }
        }, 500);
    }

    function goToSlide(slideIndex) {
        if (isTransitioning || isMobile) return;
        currentSlide = slideIndex;
        updateCarousel(true);
    }

    function updateCarousel(animate = true) {
        if (isMobile) return;
        
        const carousel = document.getElementById('projectsCarousel');
        if (!carousel) return;

        const indicators = document.querySelectorAll('.carousel-indicator');
        
        const carouselStyle = window.getComputedStyle(carousel);
        const gap = parseFloat(carouselStyle.gap) || 24;
        
        const firstCard = carousel.querySelector('.project-card');
        if (!firstCard) return;
        
        const cardWidth = firstCard.offsetWidth;
        const slideDistance = (cardWidth + gap) * cardsPerView;
        const translateX = -(currentSlide * slideDistance);
        
        if (!animate) {
            carousel.style.transition = 'none';
        } else {
            carousel.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }
        
        carousel.style.transform = `translateX(${translateX}px)`;
        
        if (!animate) {
            carousel.offsetHeight;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 50);
        }
        
        let realSlideIndex = currentSlide - 1;
        if (realSlideIndex < 0) realSlideIndex = realTotalSlides - 1;
        if (realSlideIndex >= realTotalSlides) realSlideIndex = 0;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === realSlideIndex);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            initCarousel();
        }, 100);
    });

    window.addEventListener('resize', () => {
        const previousCardsPerView = cardsPerView;
        const previousIsMobile = isMobile;
        updateCardsPerView();
        
        if (previousIsMobile !== isMobile || previousCardsPerView !== cardsPerView) {
            initCarousel();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (isMobile) return;
        
        if (e.key === 'ArrowLeft') {
            moveCarousel(-1);
        } else if (e.key === 'ArrowRight') {
            moveCarousel(1);
        }
    });

    // NOTES TREE TOGGLING (simple, robust, all collapsed by default)
    function initNotesTree() {
        const folderNodes = document.querySelectorAll('.notes-node.folder');

        folderNodes.forEach(li => {
            const main = li.querySelector(':scope > .notes-node-main');
            if (!main) return;

            main.addEventListener('click', (e) => {
                // Ignore clicks on file links
                if (e.target.closest('a')) return;
                li.classList.toggle('expanded');
            });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initNotesTree();
    });
