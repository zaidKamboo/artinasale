import React, { useRef, useImperativeHandle } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// React.forwardRef ka istemal taaki parent component isko control kar sake
export const Model = React.forwardRef( ( props, ref ) => {
    // Naye model ka path
    const { nodes, materials } = useGLTF( '/rider.glb' );

    // Ye ref ab poore model ke group ko point karega
    const modelGroupRef = useRef();

    // Parent component (Hero.jsx) ko is group ka control do
    useImperativeHandle( ref, () => modelGroupRef.current );

    // Poore model ke liye halka sa rotation animation
    useFrame( () => {
        if ( modelGroupRef.current ) {
            modelGroupRef.current.rotation.y -= 0.008;
        }
    } );

    // Naye model mein kai hisse (meshes) hain.
    // Hum un sabko ek group ke andar render kar rahe hain.
    return (
        <group ref={ modelGroupRef } { ...props } dispose={ null }>
            {/* UPDATED: Rotation add kiya gaya hai taaki model seedha khada ho. */ }
            {/* Position ko adjust kiya gaya hai taaki model vertically center mein rahe. */ }
            <group scale={ 0.1 } position={ [ 3.3, -1.4, 0 ] } rotation={ [ -Math.PI / 1, 2, 0 ] }>
                {/* Model ke saare parts ko render kiya ja raha hai */ }
                <mesh geometry={ nodes.Object_2.geometry } material={ nodes.Object_2.material } />
                <mesh geometry={ nodes.Object_3.geometry } material={ nodes.Object_3.material } />
                <mesh geometry={ nodes.Object_4.geometry } material={ nodes.Object_4.material } />
                <mesh geometry={ nodes.Object_5.geometry } material={ nodes.Object_5.material } />
                <mesh geometry={ nodes.Object_6.geometry } material={ nodes.Object_6.material } />
                <mesh geometry={ nodes.Object_7.geometry } material={ nodes.Object_7.material } />
                <mesh geometry={ nodes.Object_8.geometry } material={ nodes.Object_8.material } />
            </group>
        </group>
    );
} );

// Naye model ko preload karna
useGLTF.preload( '/rider.glb' );
