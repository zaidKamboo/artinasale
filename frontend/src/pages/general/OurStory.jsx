import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin( ScrollTrigger );


// --- Placeholder Components ---

const Title = ( { title } ) => {
    useEffect( () => {
        document.title = `Artisanale | ${title}`;
    }, [ title ] );
    return null;
};

const StoryScene = () => (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 to-black"></div>
);


// --- Main Our Story Component ---

export default function OurStory() {
    const storyRef = useRef( null );

    // Use GSAP for scroll-triggered animations
    useLayoutEffect( () => {
        const ctx = gsap.context( () => {
            const tl = gsap.timeline( {
                scrollTrigger: {
                    trigger: storyRef.current,
                    start: 'top 70%', // Animation starts when 70% of the section is visible
                    toggleActions: 'play none none reverse',
                }
            } );

            // Staggered animation for the text content
            tl.from( '.story-title', { opacity: 0, x: -50, duration: 0.8, ease: 'power3.out' } )
                .from( '.story-paragraph', {
                    opacity: 0,
                    x: -50,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: 'power3.out'
                }, "-=0.5" );

            // Animate the image in parallel with the text
            gsap.from( '.story-image', {
                scrollTrigger: {
                    trigger: storyRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 0,
                scale: 0.9,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.2
            } );

        }, storyRef );

        return () => ctx.revert(); // Cleanup GSAP animations
    }, [] );

    return (
        <>
            <Title title="Our Story" />
            <section
                ref={ storyRef }
                className="w-full text-white py-24 px-4 sm:px-8 bg-black relative overflow-hidden"
            >
                <div className="absolute inset-0 -z-10">
                    <div className="absolute -top-1/3 -left-1/3 w-[600px] h-[600px] bg-purple-900/30 rounded-full filter blur-[150px] opacity-60 animate-pulse"></div>
                    <div className="absolute -bottom-1/3 -right-1/3 w-[600px] h-[600px] bg-pink-900/30 rounded-full filter blur-[150px] opacity-60 animate-pulse delay-1000"></div>
                    <StoryScene />
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Story Content */ }
                    <div className="text-center lg:text-left">
                        <h1 className="story-title text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-6" style={ { fontFamily: "'Playfair Display', serif" } }>
                            Our Story
                        </h1>
                        <div className="space-y-4 text-gray-300 text-lg max-w-xl mx-auto lg:mx-0">
                            <p className="story-paragraph">
                                Artisanale was born from a desire to bridge the gap between timeless traditions and the modern world. We journeyed through the vibrant landscapes of India, discovering hidden villages where artisans have been perfecting their craft for generations.
                            </p>
                            <p className="story-paragraph">
                                Each piece in our collection tells a story—of a skilled hand, a rich culture, and a legacy of artistry. We believe in preserving these invaluable skills by bringing them to a global audience that appreciates the beauty of the unique and the handcrafted.
                            </p>
                            <p className="story-paragraph">
                                We are more than just a marketplace; we are a community dedicated to celebrating and sustaining the art of craftsmanship.
                            </p>
                        </div>
                    </div>

                    {/* Image */ }
                    <div className="story-image relative">
                        <div className="aspect-w-1 aspect-h-1">
                            <img
                                src="https://placehold.co/800x800/ec4899/ffffff?text=Our+Journey"
                                alt="A collage representing the journey of Artisanale"
                                className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-pink-500/20"
                                onError={ ( e ) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x800/1f2937/ffffff?text=Image+Not+Found'; } }
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
