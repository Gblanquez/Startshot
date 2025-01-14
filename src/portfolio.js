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
            const slidesToClone = 8;

            slides.slice(-slidesToClone).forEach(slide => 
                list.insertBefore(slide.cloneNode(true), slides[0])
            );
            slides.slice(0, slidesToClone).forEach(slide => 
                list.appendChild(slide.cloneNode(true))
            );

            gsap.set(list, { x: -slideWidth * slidesToClone });

            function goToSlide(index) {
                gsap.to(list, {
                    x: -slideWidth * (slidesToClone + index),
                    duration: 0.8,
                    ease: 'expo.out',
                    onComplete: () => {
                        if (index >= slides.length) {
                            currentIndex = 0;
                            gsap.set(list, { x: -slideWidth * slidesToClone });
                        } else if (index < 0) {
                            currentIndex = slides.length - 1;
                            gsap.set(list, { x: -slideWidth * (slidesToClone + slides.length - 1) });
                        }
                    }
                });
            }

            nextButton.addEventListener('click', () => {
                console.log('Next clicked');
                currentIndex++;
                goToSlide(currentIndex);
            });

            prevButton.addEventListener('click', () => {
                console.log('Prev clicked');
                currentIndex--;
                goToSlide(currentIndex);
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
                gsap.set(list, { x: currentX + diff });
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
                gsap.set(list, { x: -slideWidth * (slidesToClone + currentIndex) });
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

