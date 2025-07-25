import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

const BrandStory = React.forwardRef( ( _, ref ) => {
    const componentRef = useRef( null );

    useLayoutEffect( () => {
        const ctx = gsap.context( () => {
            const image = componentRef.current.querySelector( 'img' );
            const content = componentRef.current.querySelector( '.brand-story-content' );

            const tl = gsap.timeline( {
                scrollTrigger: {
                    trigger: componentRef.current,
                    start: 'top 80%',
                    end: 'bottom 40%',
                    scrub: 1,
                },
            } );

            tl.from( image, {
                yPercent: -10,
                opacity: 0.5,
                scale: 1.1,
                ease: 'power2.out',
            }, 0 )
                .from( content.children, {
                    opacity: 0,
                    y: 40,
                    stagger: 0.2,
                    ease: 'power3.out',
                }, 0.1 );

        }, componentRef );

        return () => ctx.revert();
    }, [] );

    return (
        <div ref={ componentRef } className="bg-black/80 text-white py-20 sm:py-28 overflow-hidden">
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">

                    <div className="lg:order-last">
                        <img
                            src="/artisanale-process/artisan-creation.webp"
                            alt="Artisanal creation process"
                            className="rounded-3xl shadow-2xl shadow-purple-900/20 w-full h-auto object-cover aspect-[4/3]"
                        />
                    </div>

                    <div className="lg:order-first">
                        <div className="text-base leading-7 text-gray-400 brand-story-content">
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r playfair-display from-purple-400 to-pink-600 uppercase">
                                Our Philosophy
                            </h2>
                            <p className="text-xl lg:text-2xl font-semibold text-white">From Heritage to Your Home</p>
                            <div className="mt-6 max-w-xl space-y-4 text-base sm:text-lg">
                                <p>
                                    Artisanale was born from a desire to bridge the timeless beauty of Indian craftsmanship with the aesthetics of modern living. We travel to the heart of India to connect with skilled artisans, preserving ancient techniques passed down through generations.
                                </p>
                                <p>
                                    Each piece in our collection is more than just an object; it's a narrative of culture, a testament to skill, and a celebration of the human spirit. We believe in fair trade, sustainability, and in bringing you not just a product, but a piece of art with a soul.
                                </p>
                                <button className="hover:cursor-pointer mt-6 px-8 py-3 border-2 border-purple-400 text-purple-400 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(138,43,226,0.6)] hover:shadow-[0_0_25px_rgba(138,43,226,1)]">
                                    Discover Our Story
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} );

export default BrandStory;
