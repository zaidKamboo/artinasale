import { useRef, useEffect, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLocation } from "react-router-dom"
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import AnimatedText from './portal-scene/AnimatedText';
import SceneContent from './portal-scene/SceneContent';

gsap.registerPlugin( ScrollTrigger )

export default function PortalScene( { onEnter } ) {
    const sceneElementsRef = useRef();
    const uiRef = useRef();
    const subtitleRef = useRef( null );
    const flashRef = useRef( null );
    const location = useLocation();

    useLayoutEffect( () => {
        ScrollTrigger.refresh();

        const timeout = setTimeout( () => ScrollTrigger.refresh(), 200 );
        return () => clearTimeout( timeout );

    }, [ location.pathname ] );

    useEffect( () => {
        gsap.from( subtitleRef.current, {
            opacity: 0, y: 20, delay: 1.2, duration: 1, ease: 'power3.out'
        } );
    }, [] );

    const handleEnter = () => {
        if ( !sceneElementsRef.current || !uiRef.current ) return;
        const { group, camera } = sceneElementsRef.current;
        const tl = gsap.timeline( {
        } );

        tl.to( uiRef.current, {
            opacity: 0,
            duration: 1,
            ease: 'power3.inOut'
        }, 0 )
            .to( group.scale, {
                x: 2, y: 2, z: 2,
                duration: 2.5,
                ease: 'power2.in'
            }, 0 )
            .to( camera.position, {
                z: 0.5,
                duration: 2.5,
                ease: 'power2.in'
            }, 0 )
            .to( flashRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: 'power3.inOut',
                onComplete: onEnter,
            }, "-=0.5" );
    };

    return (
        <div className="fixed inset-0">
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <SceneContent onReady={ ( elements ) => sceneElementsRef.current = elements } />
                </Canvas>
            </div>
            <div ref={ uiRef } className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-center">
                    <AnimatedText
                        text="Artisanale"
                        className="text-6xl md:text-8xl font-bold uppercase tracking-widest playfair-display text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                        isGradient={ true }
                    />
                    <p ref={ subtitleRef } className="text-white text-lg mt-2 tracking-wider">
                        The Soul of Indian Craft
                    </p>
                </div>
                <button
                    onClick={ handleEnter }
                    className="mt-12 px-8 py-4 border-2 border-purple-400 text-purple-400 uppercase tracking-widest text-xl font-bold
                               transition-all duration-300 pointer-events-auto
                               shadow-[0_0_15px_rgba(138,43,226,0.6)] 
                               hover:bg-purple-500 hover:text-white hover:shadow-[0_0_35px_rgba(138,43,226,1)] hover:cursor-pointer"
                >
                    Enter the Workshop
                </button>
            </div>
            <div
                ref={ flashRef }
                className="absolute inset-0 z-20 bg-white opacity-0 pointer-events-none"
            />
        </div>
    );
}
