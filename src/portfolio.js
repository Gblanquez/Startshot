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

    // console.log('Found elements:', elements);

    // Add reference to the "View All" link
    const viewAllLink = document.querySelector('.dp-link.viewall');
    
    // Initially hide the "View All" link
    if (viewAllLink) {
        viewAllLink.style.display = 'none';
    }

    function setupCarousel({ wrapper, list, nextButton, prevButton }) {
        if (wrapper && list && nextButton && prevButton) {
            let currentIndex = 0;
            let slides = Array.from(list.children);
            let slideWidth = slides[0].offsetWidth;
            let visibleSlides = 4;
            let maxIndex = Math.max(0, slides.length - visibleSlides);

            // Add filter functionality
            const categoryLinks = document.querySelectorAll('.dp-link');
            let activeCategory = null;

            function updateArrowsVisibility(visibleSlidesCount) {
                const parentContainer = list.closest('.p-item-container');
                if (parentContainer) {
                    // First check if we should show arrows at all
                    if (visibleSlidesCount <= 4) {
                        prevButton.style.opacity = '0';
                        nextButton.style.opacity = '0';
                        return;
                    }

                    // Then handle position-based visibility
                    prevButton.style.opacity = currentIndex === 0 ? '0' : '1';
                    nextButton.style.opacity = currentIndex >= maxIndex ? '0' : '1';
                }
            }

            // Initialize arrow visibility immediately
            prevButton.style.opacity = '0'; // Always hide backward arrow initially
            nextButton.style.opacity = slides.length <= 4 ? '0' : '1'; // Show forward arrow only if needed

            function filterSlides(category) {
                // First, reset ALL slides to visible state
                slides = Array.from(list.children);
                slides.forEach(slide => {
                    slide.style.display = 'block';
                    slide.style.opacity = '1';
                });

                const parentContainer = list.closest('.p-item-container');
                
                // Update active category
                activeCategory = category;

                if (category) {
                    let hasVisibleSlides = false;
                    let visibleSlidesCount = 0;
                    
                    slides.forEach(slide => {
                        const categoryText = slide.querySelector('.ct-txt')?.textContent.trim();
                        if (categoryText !== category) {
                            slide.style.display = 'none';
                            slide.style.opacity = '0';
                        } else {
                            hasVisibleSlides = true;
                            visibleSlidesCount++;
                        }
                    });

                    // Hide parent container if no visible slides
                    if (parentContainer) {
                        if (!hasVisibleSlides) {
                            parentContainer.style.display = 'none';
                            parentContainer.style.opacity = '0';
                        } else {
                            parentContainer.style.display = 'flex';
                            parentContainer.style.opacity = '1';
                            updateArrowsVisibility(visibleSlidesCount);
                        }
                    }

                    // Update slides array to only include visible slides
                    slides = Array.from(list.children).filter(slide => slide.style.display !== 'none');
                    maxIndex = Math.max(0, slides.length - visibleSlides);

                    // Show "View All" link when a category is selected
                    if (viewAllLink) {
                        viewAllLink.style.display = 'block';
                    }

                    // Set opacity of all category links to 0.5
                    categoryLinks.forEach(link => {
                        if (link.textContent.trim() !== category) {
                            link.style.opacity = '0.5';
                        }
                    });
                } else {
                    // Reset opacity of all category links to 1
                    categoryLinks.forEach(link => {
                        link.style.opacity = '1';
                    });

                    // Show parent container when showing all slides
                    if (parentContainer) {
                        parentContainer.style.display = 'flex';
                        parentContainer.style.opacity = '1';
                        updateArrowsVisibility(slides.length);
                    }
                    
                    // Reset to original slides array when showing all
                    slides = Array.from(list.children);
                    maxIndex = Math.max(0, slides.length - visibleSlides);
                    
                    // Hide "View All" link when showing all categories
                    if (viewAllLink) {
                        viewAllLink.style.display = 'none';
                    }
                }

                // Reset position and update carousel
                currentIndex = 0;
                goToSlide(0);
            }

            // Initial arrow visibility check after everything is set up
            updateArrowsVisibility(slides.length);

            // Add click listeners to category links
            categoryLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const category = link.textContent.trim();
                    
                    // Remove active class from all links and reset opacity
                    categoryLinks.forEach(l => {
                        l.classList.remove('active');
                        l.style.opacity = '0.5'; // Set all to 0.5
                    });

                    // If clicking the same category again, show all
                    if (category === activeCategory) {
                        activeCategory = null;
                        filterSlides(null);
                    } else {
                        // Add active class to clicked link and set its opacity to 1
                        link.classList.add('active');
                        link.style.opacity = '1'; // Set selected category to 1
                        activeCategory = category;
                        filterSlides(category);
                    }
                });
            });

            // Add click listener for "View All" link
            if (viewAllLink) {
                viewAllLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Hide "View All" link and show all categories
                    filterSlides(null);
                });
            }

            function goToSlide(index) {
                // Ensure index stays within bounds
                currentIndex = Math.max(0, Math.min(index, maxIndex));
                
                gsap.to(list, {
                    x: -slideWidth * currentIndex,
                    duration: 0.8,
                    ease: 'expo.out',
                    onComplete: () => {
                        // Update arrows visibility after animation
                        updateArrowsVisibility(slides.length);
                    }
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

