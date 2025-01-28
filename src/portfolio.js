import gsap from 'gsap';

export function initializePortfolioCarousels() {
    console.log('Portfolio Carousels Initializing...');

    // Basic check for elements
    const elements = {
        launch: {
            wrapper: document.querySelector('.cl-launch-wrapper'),
            list: document.querySelector('.cl-launch-list'),
            nextButton: document.querySelector('.arrow-forward.is-portfolio.launchpad'),
            prevButton: document.querySelector('.arrow-backward.is-portfolio.launchpad')
        },
        direct: {
            wrapper: document.querySelector('.cl-direct-wrapper'),
            list: document.querySelector('.cl-direct-list'),
            nextButton: document.querySelector('.arrow-forward.is-portfolio.direct'),
            prevButton: document.querySelector('.arrow-backward.is-portfolio.direct')
        },
        fund: {
            wrapper: document.querySelector('.cl-fund-wrapper'),
            list: document.querySelector('.cl-fund-list'),
            nextButton: document.querySelector('.arrow-forward.is-portfolio.fund'),
            prevButton: document.querySelector('.arrow-backward.is-portfolio.fund')
        },
        realstate: {
            wrapper: document.querySelector('.cl-realstate-wrapper'),
            list: document.querySelector('.cl-realstate-list'),
            nextButton: document.querySelector('.arrow-forward.is-portfolio.realstate'),
            prevButton: document.querySelector('.arrow-backward.is-portfolio.realstate')
        }
    };

    console.log('Found elements:', elements);

    function setupCarousel({ wrapper, list, nextButton, prevButton }) {
        if (wrapper && list && nextButton && prevButton) {
            let currentIndex = 0;
            const slides = Array.from(list.children);
            let slideWidth = slides[0].offsetWidth;
            const visibleSlides = 4;
            const maxIndex = Math.max(0, slides.length - visibleSlides); // Stop at last 4 items

            function goToSlide(index) {
                // Ensure index stays within bounds
                currentIndex = Math.max(0, Math.min(index, maxIndex));
                
                gsap.to(list, {
                    x: -slideWidth * currentIndex,
                    duration: 0.8,
                    ease: 'expo.out'
                });
            }

            nextButton.addEventListener('click', () => {
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    goToSlide(currentIndex);
                }
            });

            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    goToSlide(currentIndex);
                }
            });

            // Touch controls
            let startX, isDragging = false, currentX;

            wrapper.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
                currentX = gsap.getProperty(list, "x");
            });

            wrapper.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                const diff = e.touches[0].clientX - startX;
                const newX = currentX + diff;
                // Add bounds to prevent overscrolling
                const maxX = 0;
                const minX = -slideWidth * maxIndex;
                gsap.set(list, { x: Math.max(minX, Math.min(maxX, newX)) });
            });

            wrapper.addEventListener('touchend', (e) => {
                isDragging = false;
                const diff = e.changedTouches[0].clientX - startX;
                
                if (Math.abs(diff) > 50) {
                    currentIndex += diff > 0 ? -1 : 1;
                    goToSlide(currentIndex);
                } else {
                    goToSlide(currentIndex);
                }
            });

            // Handle resize
            window.addEventListener('resize', () => {
                slideWidth = slides[0].offsetWidth;
                gsap.set(list, { x: -slideWidth * currentIndex });
            });
        }
    }

    // Initialize all carousels
    Object.values(elements).forEach(setupCarousel);
}

export function stopPortfolioCarousels() {
    const lists = [
        '.cl-launch-list',
        '.cl-direct-list',
        '.cl-fund-list',
        '.cl-realstate-list'
    ];
    
    lists.forEach(selector => {
        const list = document.querySelector(selector);
        if (list) gsap.killTweensOf(list);
    });
}

