import barba from '@barba/core';
import gsap from 'gsap'

export default class Transition {
    constructor(options) {
        this.barba();
    }

    barba() {
        barba.init({
            debug: true,
            views: [
                {
                    namespace: 'home',
                    beforeEnter(data) {},
                    beforeLeave(data) {}
                },
                {
                    namespace: 'about',
                    beforeEnter(data) {},
                    beforeLeave(data) {}
                },
                {
                    namespace: 'team',
                    beforeEnter(data) {},
                    beforeLeave(data) {}
                },
                {
                    namespace: 'launchpad',
                    beforeEnter(data) {},
                    beforeLeave(data) {}
                },
                {
                    namespace: 'contact',
                    beforeEnter(data) {},
                    beforeLeave(data) {}
                }
            ],
            transitions: [
                {
                    name: 'basic-transition',
                    sync: true,
                    once({ next }) {
                        console.log('First load');
                    },
                    leave({ current }) {
                        console.log(`Leaving ${current.namespace}`);
    
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
                            opacity: 0.4,
                            y: '50%',
                            scale: 0.96,
                            duration: 1.6,
                            ease: 'expo.out',
                            onComplete: () => {
                                console.log('Leave animation complete');
                            },
                        });
                    },
                    enter({ next }) {
                        console.log(`Entering ${next.namespace}`);
    
                        const nextContainer = next.container;
    
                        // Set initial position for the next container
                        gsap.set(nextContainer, {
                            position: 'fixed',
                            top: '110%',
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
                                console.log('Enter animation complete');
                            },
                        });
                    },
                },
            ],
        });
    }
}