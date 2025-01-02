import barba from '@barba/core';
import gsap from 'gsap'
import Lenis from 'lenis'
import { restartWebflow } from '@finsweet/ts-utils';
import { initializeAllAnimations, stopAllAnimations } from './home.js';
import { startAboutAnimations, stopAboutAnimations } from './about.js';
import { startTeamAnimations, stopTeamAnimations } from './team.js';
import { initializeLaunchpadCarousel } from './launchdpad.js';

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

        barba.init({
            // debug: true,
            views: [
                {
                    namespace: 'home',
                    beforeEnter(data) {
                        initializeAllAnimations();
                        enableScroll();
                    },
                    beforeLeave(data) {
                        stopAllAnimations();
                        disableScroll();
                    }
                },
                {
                    namespace: 'about',
                    beforeEnter(data) {
                        startAboutAnimations();
                        enableScroll();

                    },
                    beforeLeave(data) {
                        stopAboutAnimations();
                        disableScroll();
                    }
                },
                {
                    namespace: 'team',
                    beforeEnter(data) {
                        startTeamAnimations();
                        enableScroll();
                       
                    },
                    beforeLeave(data) {
                        stopTeamAnimations();
                        disableScroll();
                    },

                },
                {
                    namespace: 'launchpad',
                    beforeEnter(data) {
                        enableScroll();
                        initializeLaunchpadCarousel();
                        console.log('this is an test on launchdpad');
                        const wrapper = document.querySelectorAll('.swiper-slide.is-launchdpad');
                        console.log(wrapper);
                    },
                    beforeLeave(data) {
                        disableScroll();
                    }
                },
                {
                    namespace: 'contact',
                    afterEnter(data) {
                        enableScroll();
                    },
                    beforeLeave(data) {
                        disableScroll();
                    }
                },
                {
                    namespace: 'portfolio',
                    afterEnter(data) {
                        enableScroll();
                    },
                    beforeLeave(data) {
                        disableScroll();
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
                    leave({ current }) {
                        // console.log(`Leaving ${current.namespace}`);

                        disableScroll();
    
                        const currentContainer = current.container;
    
                        // Set current container to absolute with z-index and reduced opacity
                        gsap.set(currentContainer, {
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            zIndex: -1,
                            opacity: 0.7,
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
                        // console.log(`Entering ${next.namespace}`);

                        enableScroll();
                        
                        window.scrollTo(0, 0);
                        lenis.scrollTo(0, { immediate: true });


    
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
            hooks: {
                beforeEnter: () => {
                    restartWebflow();
                    console.log('restarting webflow');
                }
            }
        });
    }

    
    
}



