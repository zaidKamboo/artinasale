import React, { Suspense, forwardRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './home-scene/Model'; // Make sure this path is correct

// A new component to handle the responsive scaling and positioning of the model.
const ResponsiveModel = forwardRef( ( props, ref ) => {
    const { viewport } = useThree();

    // FIX: Instead of a fixed breakpoint, we calculate a dynamic scale factor.
    // This ensures the model scales smoothly across all screen sizes.
    const scale = Math.min( 1.2, viewport.width / 6 ); // Adjust the divisor (6) to fine-tune the scaling

    // We can also adjust the position more dynamically if needed.
    const position = viewport.width < 4 ? [ 0, -0.8, 0 ] : [ 0, 0, 0 ];

    return (
        <group ref={ ref } scale={ scale } position={ position }>
            <Model { ...props } />
        </group>
    );
} );

export default function HomeScene( { modelRef } ) {
    return (
        <Canvas camera={ { position: [ 0, 0, 5 ], fov: 60 } }>
            <ambientLight intensity={ 3 } />
            <directionalLight position={ [ 3, 5, 2 ] } intensity={ 2 } />
            <Suspense fallback={ null }>
                <ResponsiveModel ref={ modelRef } />
            </Suspense>
            <OrbitControls enableZoom={ false } enablePan={ false } />
        </Canvas>
    );
};
