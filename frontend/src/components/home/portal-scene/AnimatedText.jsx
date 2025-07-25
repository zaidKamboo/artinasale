import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const AnimatedText = ( { text, className, style, isGradient = false } ) => {
    const textRef = useRef( null );

    const spanStyle = isGradient ? {
        background: 'inherit',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
    } : {};

    useLayoutEffect( () => {
        const ctx = gsap.context( () => {
            if ( !textRef.current ) return;
            const chars = Array.from( textRef.current.children );

            const entryTl = gsap.timeline();
            entryTl.set( chars, { x: 500, skewX: 180, opacity: 0 } );
            entryTl.to( chars, {
                x: 0,
                skewX: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 1.5,
                ease: 'power4.out',
            } );

            gsap.to( chars, {
                x: 19,
                stagger: {
                    each: 0.08,
                    from: 'bottom',
                    repeat: -1,
                    yoyo: true,
                },
                duration: 1,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: 1.5,
            } );

        }, textRef );

        return () => ctx.revert();

    }, [ text ] );

    return (
        <h1 ref={ textRef } className={ `${className} overflow-hidden` } style={ style }>
            { text.split( "" ).map( ( char, index ) => (
                <span
                    key={ index }
                    className="inline-block"
                    style={ spanStyle }
                >
                    { char === " " ? "\u00A0" : char }
                </span>
            ) ) }
        </h1>
    );
};

export default AnimatedText;
