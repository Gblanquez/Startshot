import barba from '@barba/core/dist/barba.umd.js';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { restartWebflow } from '@finsweet/ts-utils';
import { initializeAllAnimations, stopAllAnimations } from './home.js';
import { startAboutAnimations, stopAboutAnimations } from './about.js';
import { startTeamAnimations, stopTeamAnimations } from './team.js';
import { initializeLaunchpadCarousel } from './launchdpad.js';
import { startLaunchPageAnimations} from './launchpage.js';
import { initializePortfolioCarousels } from './portfolio.js';
import { initializeButtonAnimations } from './button.js';
import { initFooterAnimation } from './footer.js';
import { initializeMenuAnimations } from './menu.js';
import { teamLoadAnimation } from './animations/teamAnime.js';
import { launchpadLoadAnimation } from './animations/launchPageAnime.js';
import { aboutLoadAnimation } from './animations/aboutTeamAnime.js';
import { portfolioLoadAnimation } from './animations/portfolioAnime.js';
import { contactLoadAnimation } from './animations/contactAnime.js';
import { homeLoadAnimation } from './animations/homeAnime.js';
import { initMobileMenu } from './menuMobile.js';
import { initializeArrowAnimations } from './arrowButton.js';


export default class Transition {
    constructor(options) {

        this.lenis = new Lenis()

        this.disableScroll = () =>{
            this.lenis.stop()
        }

        this.enableScroll = () =>{
            this.lenis.start()
        }

        this.initLenis();
        this.barba();
    }

    initLenis() {
        this.lenis = new Lenis({
            autoRaf: false,
        });

        this.lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            this.lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }

    barba() {

        const disableScroll = this.disableScroll;
        const enableScroll = this.enableScroll;
        const lenis = this.lenis;

        let mobileMenuInstance;

        if (!barba || typeof barba.init !== 'function') {
            console.error('Barba.js not properly initialized');
            return;
        }

            barba.init({
                debug: true,
                views: [
                    {
                    namespace: 'home',
                    beforeEnter(data) {
                        if (!data.next.html.includes('data-barba-once')) {
                            homeLoadAnimation();
                        }
                        initializeAllAnimations();
                    },
                    afterEnter(data){
                        initializeArrowAnimations()
                    },
                    beforeLeave(data) {

                    }
                },
                {
                    namespace: 'about',
                    beforeEnter(data) {
                        if (!data.next.html.includes('data-barba-once')) {
                            aboutLoadAnimation();
                        }
                        
                    },
                    afterEnter(data) {
                        startAboutAnimations();
                        // initMobileMenu();
                    },
                    beforeLeave(data) {
                        stopAboutAnimations();
                    }
                },
                {
                    namespace: 'team',
                    beforeEnter(data) {
                        if (!data.next.html.includes('data-barba-once')) {
                            teamLoadAnimation();
                        }
                    },
                    afterEnter(data) {
                        startTeamAnimations();
                        // initMobileMenu();
                    },
                    beforeLeave(data) {
                        stopTeamAnimations();
                    },
                },
                {
                    namespace: 'launchpad',
                    beforeEnter(data) {
                        if (!data.next.html.includes('data-barba-once')) {
                            launchpadLoadAnimation();
                        }
                        initializeLaunchpadCarousel();
                    },
                    afterEnter(data) {
                        startLaunchPageAnimations();
                        initializeArrowAnimations()
                    },
                    beforeLeave(data) {
                    }
                },
                {
                    namespace: 'contact',
                    beforeEnter(data) {
                        if (!data.next.html.includes('data-barba-once')) {
                            contactLoadAnimation();
                        }
                        
                    },
                    afterEnter(data){
                        // initMobileMenu();
                    },
                    beforeLeave(data) {
                        
                     
                    }
                },
                {
                    namespace: 'portfolio',
                    beforeEnter(data) {
                        if (!data.next.html.includes('data-barba-once')) {
                            portfolioLoadAnimation();
                        }
                        initializePortfolioCarousels();
                    },
                    afterEnter(data){
                        initializeArrowAnimations()
                    },
                    beforeLeave(data) {
                        // stopPortfolioCarusel();
                    }
                }
            ],
            transitions: [
                {
                    name: 'Starshot Default Transition',
                    sync: true,
                    once({ next }) {
                        console.log('First load', next.container);
                        let customEase = "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1";
                        
                        return new Promise((resolve) => {
                            // Handle team page specific animation
                            if (next.namespace === 'team') {
                                // Existing team page animation code
                                gsap.set('.team-wrap', { opacity: 0 });
                                
                                const tl = gsap.timeline({
                                    onComplete: () => {
                                        gsap.to('.team-wrap', {
                                            opacity: 1,
                                            duration: 0,
                                            ease: 'expo.out',
                                            onComplete: () => {
                                                teamLoadAnimation();
                                                resolve();
                                            }
                                        });
                                    }
                                });

                                // Initial states
                                gsap.set(next.container, {
                                    position: 'fixed',
                                    y: '110%',
                                    width: '100%',
                                    overflow: 'hidden',
                                    scale: 0.2,
                                    transformOrigin: 'center center'
                                });
                                gsap.set('.load-nmb-wrap', { display: 'flex' });
                                gsap.set('.star-name-load', { display: 'flex' });
                                gsap.set('.g-nav-wrapper', {
                                    opacity: 0,
                                    filter: 'blur(30px)'
                                });
                                gsap.set('.numb-load', { innerText: '0' });


                                tl.to('.numb-load', {
                                    innerText: 100,
                                    duration: 2,
                                    ease: customEase,
                                    snap: { innerText: 1 },
                                    onUpdate: function() {
                                        const value = Math.round(this.targets()[0].innerText);
                                        this.targets()[0].innerText = value;
                                    }
                                })

                                .to('.ln-wrap', {
                                    y: '-120%',
                                    duration: 1,
                                    ease: 'expo.out'
                                }, "+=0.1")
                                .to('.star-name-div', {
                                    y: '-120%',
                                    duration: 1,
                                    ease: 'expo.out'
                                }, "<")
                                .to(next.container, {
                                    y: '0%',
                                    width: '100%',
                                    overflow: 'visible',
                                    scale: 1,
                                    duration: 1.4,
                                    ease: 'expo.out'
                                }, '-=0.7')
                                .to('.g-nav-wrapper', {
                                    opacity: 1,
                                    filter: 'blur(0px)',
                                    duration: 1,
                                    ease: 'power2.out'
                                }, '-=1')
                                .to(next.container,{
                                    position: 'relative',
                                    top: '0',
                                })
                            } 
                            // Handle home page
                            else if (next.namespace === 'home') {
                                // Initial states
                                gsap.set('.hero-section', { opacity: 0 });
                                
                                const tl = gsap.timeline({
                                    onComplete: () => {
                                        gsap.to('.hero-section', {
                                            opacity: 1,
                                            duration: 0,
                                            ease: 'expo.out',
                                            onComplete: () => {
                                                homeLoadAnimation();
                                                resolve();
                                            }
                                        });
                                    }
                                });

                                // Initial states
                                gsap.set(next.container, {
                                    position: 'fixed',
                                    y: '110%',
                                    width: '100%',
                                    overflow: 'hidden',
                                    scale: 0.2,
                                    transformOrigin: 'center center'
                                });
                                gsap.set('.load-nmb-wrap', { display: 'flex' });
                                gsap.set('.star-name-load', { display: 'flex' });
                                gsap.set('.g-nav-wrapper', {
                                    opacity: 0,
                                    filter: 'blur(30px)'
                                });
                                gsap.set('.numb-load', { innerText: '0' });


                                tl.to('.numb-load', {
                                    innerText: 100,
                                    duration: 2,
                                    ease: customEase,
                                    snap: { innerText: 1 },
                                    onUpdate: function() {
                                        const value = Math.round(this.targets()[0].innerText);
                                        this.targets()[0].innerText = value;
                                    }
                                })

                                .to('.ln-wrap', {
                                    y: '-120%',
                                    duration: 1,
                                    ease: 'expo.out'
                                }, "+=0.1")
                                .to('.star-name-div', {
                                    y: '-120%',
                                    duration: 1,
                                    ease: 'expo.out'
                                }, "<")
                                .to(next.container, {
                                    y: '0%',
                                    width: '100%',
                                    overflow: 'visible',
                                    scale: 1,
                                    duration: 1.4,
                                    ease: 'expo.out'
                                }, '-=0.7')
                                .to('.g-nav-wrapper', {
                                    opacity: 1,
                                    filter: 'blur(0px)',
                                    duration: 1,
                                    ease: 'power2.out'
                                }, '-=1')
                                .to(next.container,{
                                    position: 'relative',
                                    top: '0',
                                })
                            }
                            // Handle about page
                            else if (next.namespace === 'about') {
                                // Initial states
                                gsap.set('.ab-p-wrap', { opacity: 0 });
                                
                                const tl = gsap.timeline({
                                    onComplete: () => {
                                        gsap.to('.ab-p-wrap', {
                                            opacity: 1,
                                            duration: 0,
                                            ease: 'expo.out',
                                            onComplete: () => {
                                                aboutLoadAnimation();
                                                resolve();
                                            }
                                        });
                                    }
                                });
                            
                                // Initial states
                                gsap.set(next.container, {
                                    position: 'fixed',
                                    y: '110%',
                                    width: '100%',
                                    overflow: 'hidden',
                                    scale: 0.2,
                                    transformOrigin: 'center center'
                                });
                                gsap.set('.load-nmb-wrap', { display: 'flex' });
                                gsap.set('.star-name-load', { display: 'flex' });
                                gsap.set('.g-nav-wrapper', {
                                    opacity: 0,
                                    filter: 'blur(30px)'
                                });
                                gsap.set('.numb-load', { innerText: '0' });


                                tl.to('.numb-load', {
                                    innerText: 100,
                                    duration: 2,
                                    ease: customEase,
                                    snap: { innerText: 1 },
                                    onUpdate: function() {
                                        const value = Math.round(this.targets()[0].innerText);
                                        this.targets()[0].innerText = value;
                                    }
                                })

                                .to('.ln-wrap', {
                                    y: '-120%',
                                    duration: 1,
                                    ease: 'expo.out'
                                }, "+=0.1")
                                .to('.star-name-div', {
                                    y: '-120%',
                                    duration: 1,
                                    ease: 'expo.out'
                                }, "<")
                                .to(next.container, {
                                    y: '0%',
                                    width: '100%',
                                    overflow: 'visible',
                                    scale: 1,
                                    duration: 1.4,
                                    ease: 'expo.out'
                                }, '-=0.7')
                                .to('.g-nav-wrapper', {
                                    opacity: 1,
                                    filter: 'blur(0px)',
                                    duration: 1,
                                    ease: 'power2.out'
                                }, '-=1')
                                .to(next.container,{
                                    position: 'relative',
                                    top: '0',
                                })
                            }
                            // Handle launchpad page
                            else if (next.namespace === 'launchpad') {
                                // Initial states
                                gsap.set('.main-c-holder', { opacity: 0 });
                                
                                const tl = gsap.timeline({
                                    onComplete: () => {
                                        gsap.to('.main-c-holder', {
                                            opacity: 1,
                                            duration: 0,
                                            ease: 'expo.out',
                                            onComplete: () => {
                                                launchpadLoadAnimation();
                                                resolve();
                                            }
                                        });
                                    }
                                });

                                // Initial states - matching other pages
                                gsap.set(next.container, {
                                    position: 'fixed',
                                    y: '110%',
                                    width: '100%',
                                    overflow: 'hidden',
                                    scale: 0.2,
                                    transformOrigin: 'center center'
                                });
                                gsap.set('.load-nmb-wrap', { display: 'flex' });
                                gsap.set('.star-name-load', { display: 'flex' });
                                gsap.set('.g-nav-wrapper', {
                                    opacity: 0,
                                    filter: 'blur(30px)'
                                });
                                gsap.set('.numb-load', { innerText: '0' });

                                tl.to('.numb-load', {
                                    innerText: 100,
                                    duration: 2,
                                    ease: customEase,
                                    snap: { innerText: 1 },
                                    onUpdate: function() {
                                        const value = Math.round(this.targets()[0].innerText);
                                        this.targets()[0].innerText = value;
                                    }
                                })
                                .to('.ln-wrap', {
                                    y: '-120%',
                                    duration: 1,
                                    ease: 'expo.out'
                                }, "+=0.1")
                                .to('.star-name-div', {
                                    y: '-120%',
                                    duration: 1,
                                    ease: 'expo.out'
                                }, "<")
                                .to(next.container, {
                                    y: '0%',
                                    width: '100%',
                                    overflow: 'visible',
                                    scale: 1,
                                    duration: 1.4,
                                    ease: 'expo.out'
                                }, '-=0.7')
                                .to('.g-nav-wrapper', {
                                    opacity: 1,
                                    filter: 'blur(0px)',
                                    duration: 1,
                                    ease: 'power2.out'
                                }, '-=1')
                                .to(next.container,{
                                    position: 'relative',
                                    top: '0',
                                });
                            }
                            // Handle portfolio page
                            else if (next.namespace === 'portfolio') {
                                // Initial states
                                gsap.set('.page-wrap', { opacity: 0 });
                                
                                const tl = gsap.timeline({
                                    onComplete: () => {
                                        gsap.to('.page-wrap', {
                                            opacity: 1,
                                            duration: 0,
                                            ease: 'expo.out',
                                            onComplete: () => {
                                                portfolioLoadAnimation();
                                                resolve();
                                            }
                                        });
                                    }
                                });

                                // Initial states
                                gsap.set(next.container, {
                                    position: 'fixed',
                                    y: '110%',
                                    width: '100%',
                                    overflow: 'hidden',
                                    scale: 0.2,
                                    transformOrigin: 'center center'
                                });
                                gsap.set('.load-nmb-wrap', { display: 'flex' });
                                gsap.set('.star-name-load', { display: 'flex' });
                                gsap.set('.g-nav-wrapper', {
                                    opacity: 0,
                                    filter: 'blur(30px)'
                                });
                                gsap.set('.numb-load', { innerText: '0' });


                                tl.to('.numb-load', {
                                    innerText: 100,
                                    duration: 2,
                                    ease: customEase,
                                    snap: { innerText: 1 },
                                    onUpdate: function() {
                                        const value = Math.round(this.targets()[0].innerText);
                                        this.targets()[0].innerText = value;
                                    }
                                })

                                .to('.ln-wrap', {
                                    y: '-120%',
                                    duration: 1,
                                    ease: 'expo.out'
                                }, "+=0.1")
                                .to('.star-name-div', {
                                    y: '-120%',
                                    duration: 1,
                                    ease: 'expo.out'
                                }, "<")
                                .to(next.container, {
                                    y: '0%',
                                    width: '100%',
                                    overflow: 'visible',
                                    scale: 1,
                                    duration: 1.4,
                                    ease: 'expo.out'
                                }, '-=0.7')
                                .to('.g-nav-wrapper', {
                                    opacity: 1,
                                    filter: 'blur(0px)',
                                    duration: 1,
                                    ease: 'power2.out'
                                }, '-=1')
                                .to(next.container,{
                                    position: 'relative',
                                    top: '0',
                                })
                            }
                            // Handle contact page
                            else if (next.namespace === 'contact') {
                                // Initial states
                                gsap.set('.contact-form-wrap', { opacity: 0 });
                                
                                const tl = gsap.timeline({
                                    onComplete: () => {
                                        gsap.to('.contact-form-wrap', {
                                            opacity: 1,
                                            duration: 0,
                                            ease: 'expo.out',
                                            onComplete: () => {
                                                contactLoadAnimation();
                                                resolve();
                                            }
                                        });
                                    }
                                });

                                // Initial states
                                gsap.set(next.container, {
                                    position: 'fixed',
                                    y: '110%',
                                    width: '100%',
                                    overflow: 'hidden',
                                    scale: 0.2,
                                    transformOrigin: 'center center'
                                });
                                gsap.set('.load-nmb-wrap', { display: 'flex' });
                                gsap.set('.star-name-load', { display: 'flex' });
                                gsap.set('.g-nav-wrapper', {
                                    opacity: 0,
                                    filter: 'blur(30px)'
                                });
                                gsap.set('.numb-load', { innerText: '0' });


                                tl.to('.numb-load', {
                                    innerText: 100,
                                    duration: 2,
                                    ease: customEase,
                                    snap: { innerText: 1 },
                                    onUpdate: function() {
                                        const value = Math.round(this.targets()[0].innerText);
                                        this.targets()[0].innerText = value;
                                    }
                                })

                                .to('.ln-wrap', {
                                    y: '-120%',
                                    duration: 1,
                                    ease: 'expo.out'
                                }, "+=0.1")
                                .to('.star-name-div', {
                                    y: '-120%',
                                    duration: 1,
                                    ease: 'expo.out'
                                }, "<")
                                .to(next.container, {
                                    y: '0%',
                                    width: '100%',
                                    overflow: 'visible',
                                    scale: 1,
                                    duration: 1.4,
                                    ease: 'expo.out'
                                }, '-=0.7')
                                .to('.g-nav-wrapper', {
                                    opacity: 1,
                                    filter: 'blur(0px)',
                                    duration: 1,
                                    ease: 'power2.out'
                                }, '-=1')
                                .to(next.container,{
                                    position: 'relative',
                                    top: '0',
                                })
                            }
                            // Default animation for any other pages
                            else {
                                const tl = gsap.timeline({
                                    onComplete: resolve
                                });
                                // Basic default animation
                                // ... will add default animation later ...
                            }
                        });
                    },
                    async leave({ current }) {

                        const isMobile = window.innerWidth <= 478;
    
                        if (isMobile) {
                            const closeTimeline = gsap.timeline({
                                onComplete: () => {
                                    lenis.start();
                                }
                            });
                            
                            closeTimeline
                                .to('.mobile_text .char', {
                                    opacity: 0,
                                    duration: 0.2,
                                    stagger: {
                                        each: 0.01,
                                        from: "random"
                                    },
                                    ease: "expo.out"
                                })
                                .to(['.mobile_links_list_wrap', '.mobile_logo_wrap'], {
                                    opacity: 0,
                                    y: '1vw',
                                    duration: 0.2,
                                    ease: 'expo.out'
                                }, '-=0.2')
                                .to('.mobile_menu_bg', {
                                    width: '18vw',
                                    height: '12vw',
                                    borderRadius: '100rem',
                                    duration: 0.2,
                                    ease: 'expo.out'
                                }, '-=0.1')
                                .to('.mobile_navbar', {
                                    height: 'auto',
                                    duration: 0.1
                                });
                    
                            await closeTimeline;
                        }

    
                        const currentContainer = current.container;
                        

                        disableScroll();
    
                        gsap.set(currentContainer, {
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            zIndex: -1,
                            opacity: 0.6,
                        });
    
                        return gsap.to(currentContainer, {
                            opacity: 0.3,
                            y: '-12%',
                            scale: 0.98,
                            duration: 2,
                            ease: 'expo.out',
                            onComplete: () => {
                            },
                        });
                    },
                    enter({ next }) {
                        window.scrollTo(0, 0);
                        lenis.scrollTo(0);
    
                        const nextContainer = next.container;

                        gsap.set(nextContainer, {
                            position: 'fixed',
                            top: '120%',
                            left: '0',
                            width: '100%',
                        });
    
                        return gsap.to(nextContainer, {
                            top: '0%',
                            duration: 1.4,
                            ease: 'expo.out',
                            onComplete: () => {
                                gsap.set(nextContainer, {
                                    position: 'relative',
                                    top: '0',
                                });
                            },
                        });
                    },
                    afterEnter(data) {
                        enableScroll();
                    }
                },
            ],
        });

        barba.hooks.enter((data) => {
            restartWebflow();
            initializeButtonAnimations();
            initFooterAnimation();
            initializeMenuAnimations();
            // initMobileMenu();
        });

        barba.hooks.afterEnter((data) => {
            if (mobileMenuInstance) {
                mobileMenuInstance.cleanup();
            }
            mobileMenuInstance = initMobileMenu();
        })

        barba.hooks.leave((data) => {
            if (mobileMenuInstance) {
                mobileMenuInstance.resetStates();
            }
        });
    }
}



