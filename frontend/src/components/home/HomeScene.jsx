import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './home-scene/Model';

export default function HomeScene( { modelRef } ) {
    return (
        <Canvas camera={ { position: [ 0, 0, 5 ], fov: 60 } }>
            <ambientLight intensity={ 3 } />
            <directionalLight position={ [ 3, 5, 2 ] } intensity={ 2 } />
            <Suspense fallback={ null }>
                <Model ref={ modelRef } />
            </Suspense>
            <OrbitControls enableZoom={ false } enablePan={ false } />
        </Canvas>
    );
};


