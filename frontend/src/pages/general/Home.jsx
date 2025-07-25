import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HomeScene from '../../components/home/HomeScene';
import FeaturedArtisans from '../../components/home/FeaturedArtisans';
import BrandStory from '../../components/home/BrandStory';
import ProcessSection from '../../components/home/ProcessSection';
import Products from '../../components/home/Products';
import Title from '../../components/common/Title';
import Hero from '../../components/home/Hero';
import { selectLoader } from '../../store/selectors';

gsap.registerPlugin( ScrollTrigger );

export default function Home() {
    const { isLoading } = useSelector( selectLoader );
    const mainRef = useRef( null );
    const modelRef = useRef( null );
    const heroRef = useRef( null );
    const processContainerRef = useRef( null );
    const showcaseRef = useRef( null );
    const artisansRef = useRef( null );
    const storyRef = useRef( null );
    const { pathname } = useLocation();

    useEffect( () => {
        if ( isLoading ) return;
        const timer = setTimeout( () => { ScrollTrigger.refresh() }, 150 );
        return () => clearTimeout( timer );
    }, [ pathname, isLoading ] );

    useLayoutEffect( () => {
        if ( isLoading ) return;

        const ctx = gsap.context( () => {
            gsap.from( heroRef.current.children, {
                opacity: 0,
                y: 40,
                duration: 1.2,
                ease: "power2.out",
                stagger: 0.2,
            } );

            if ( showcaseRef.current )
                gsap.from( showcaseRef.current.querySelectorAll( '.product-card' ), {
                    scrollTrigger: {
                        trigger: showcaseRef.current,
                        start: "top 70%",
                        toggleActions: 'play none none reverse',
                    },
                    opacity: 0,
                    y: 60,
                    duration: 1,
                    ease: 'power3.out',
                    stagger: 0.2,
                } );

            gsap.from( artisansRef.current, {
                opacity: 0,
                y: 100,
                scrollTrigger: {
                    trigger: artisansRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                }
            } );

            gsap.from( storyRef.current, {
                opacity: 0,
                y: 100,
                scrollTrigger: {
                    trigger: storyRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                }
            } );

        }, mainRef );

        return () => ctx.revert();
    }, [ isLoading ] );

    return (
        <>
            <Title title="Home" />
            <div
                ref={ mainRef }
                style={ { visibility: !isLoading ? 'visible' : 'hidden', opacity: !isLoading ? 1 : 0, transition: 'opacity 0.5s ease-in-out' } }
            >
                <div className="fixed top-0 left-0 w-full h-screen -z-10">
                    <HomeScene modelRef={ modelRef } />
                </div>

                <div ref={ heroRef } className="h-screen flex flex-col justify-center items-center text-center text-white hero-text">
                    <Hero />
                </div>

                <div ref={ processContainerRef } className="w-full">
                    <ProcessSection />
                </div>

                <div ref={ showcaseRef }>
                    <Products />
                </div>

                <div ref={ artisansRef } className="w-full flex justify-end items-center">
                    <FeaturedArtisans />
                </div>
                <div ref={ storyRef } className="w-full flex justify-start items-center">
                    <BrandStory />
                </div>
            </div>
        </>
    );
}
