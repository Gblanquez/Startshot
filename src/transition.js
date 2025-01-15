import barba from '@barba/core/dist/barba.umd.js';
import gsap from 'gsap'
import Lenis from 'lenis'
import { restartWebflow } from '@finsweet/ts-utils';
import { initializeAllAnimations, stopAllAnimations } from './home.js';
import { startAboutAnimations, stopAboutAnimations } from './about.js';
import { startTeamAnimations, stopTeamAnimations } from './team.js';
import { initializeLaunchpadCarousel } from './launchdpad.js';
import { startLaunchPageAnimations} from './launchpage.js';
import { initializePortfolioCarousels } from './portfolio.js';

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
        function raf(time) {
            this.lenis.raf(time)
            requestAnimationFrame(raf.bind(this))
        }
        requestAnimationFrame(raf.bind(this))
    }

    barba() {

        const disableScroll = this.disableScroll;
        const enableScroll = this.enableScroll;
        const lenis = this.lenis;

        if (!barba || typeof barba.init !== 'function') {
            console.error('Barba.js not properly initialized');
            return;
        }

            barba.init({
                views: [
                    {
                    namespace: 'home',
                    beforeEnter(data) {
                        initializeAllAnimations();
                    },
                    beforeLeave(data) {
                        stopAllAnimations();
                    }
                },
                {
                    namespace: 'about',
                    beforeEnter(data) {
                        startAboutAnimations();

                    },
                    beforeLeave(data) {
                        stopAboutAnimations();
                    }
                },
                {
                    namespace: 'team',
                    beforeEnter(data) {
                        startTeamAnimations();
                       
                    },
                    beforeLeave(data) {
                        stopTeamAnimations();
                    },

                },
                {
                    namespace: 'launchpad',
                    beforeEnter(data) {
                        initializeLaunchpadCarousel();
                        startLaunchPageAnimations();
                    },
                    beforeLeave(data) {
                    }
                },
                {
                    namespace: 'contact',
                    beforeEnter(data) {
                        

                    },
                    beforeLeave(data) {
                     
                    }
                },
                {
                    namespace: 'portfolio',
                    beforeEnter(data) {
                        initializePortfolioCarousels();
                    },
                    beforeLeave(data) {
                        stopPortfolioCarousel();
                    }
                }
            ],
            transitions: [
                {
                    name: 'Starshot Default Transition',
                    sync: true,
                    once({ next }) {
                        // console.log('First load');
                    },
                    async leave({ current }) {

                        const isMobile = window.innerWidth <= 478;
    
                        if (isMobile) {
                            // Always run close animation on mobile during transition
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
                    
                            // Wait for menu close animation to complete
                            await closeTimeline;
                        }

    
                        const currentContainer = current.container;
    
                        // Set current container to absolute with z-index and reduced opacity
                        gsap.set(currentContainer, {
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            zIndex: -1,
                            opacity: 0.6,
                        });
    
                        // Animate the opacity fade out for a smoother transition
                        return gsap.to(currentContainer, {
                            opacity: 0.3,
                            y: '-12%',
                            scale: 0.98,
                            duration: 2,
                            ease: 'expo.out',
                            onComplete: () => {
                                // console.log('Leave animation complete');
                            },
                        });
                    },
                    enter({ next }) {

                        window.scrollTo(0, 0);
                        lenis.scrollTo(0);


    
                        const nextContainer = next.container;

    
                        // Set initial position for the next container
                        gsap.set(nextContainer, {
                            position: 'fixed',
                            top: '120%',
                            left: '0',
                            width: '100%',
                        });
    
                        // Animate the next container to slide into view
                        return gsap.to(nextContainer, {
                            top: '0%',
                            duration: 1.4,
                            ease: 'expo.out',
                            onComplete: () => {
                                // Reset next container to static after animation
                                gsap.set(nextContainer, {
                                    position: 'relative',
                                    top: '0',
                                });

                            },
                        });
                    },
                },
            ],
        });

        barba.hooks.enter((data) => {
            enableScroll();
            restartWebflow();
            // console.log('restarting webflow', restartWebflow, lenis);
          });

        barba.hooks.leave((data) => {
            disableScroll();
            // console.log('global hook leaving', lenis);
          });
    }



    
    
}



