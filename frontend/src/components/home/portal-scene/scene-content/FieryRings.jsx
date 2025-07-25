import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from 'three'

export default function FieryRings() {
    const groupRef = useRef();
    const shaderMaterial = useMemo( () => new THREE.ShaderMaterial( {
        uniforms: {
            u_time: { value: 0 },
            u_color: { value: new THREE.Color( '#FACC2E' ) },
        },
        vertexShader: `varying vec2 v_uv; void main() { v_uv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `
            uniform float u_time;
            uniform vec3 u_color;
            varying vec2 v_uv;
            void main() {
                float strip = pow(sin(v_uv.x * 20.0 - u_time * 2.0) * 0.5 + 0.5, 2.0);
                float falloff = smoothstep(0.0, 0.2, v_uv.x) * smoothstep(1.0, 0.8, v_uv.x);
                float alpha = strip * falloff;
                gl_FragColor = vec4(u_color, alpha);
            }
        `,
        transparent: true, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    } ), [] );
    useFrame( ( { clock } ) => {
        if ( groupRef.current )
            groupRef.current.rotation.z += 0.005;

        shaderMaterial.uniforms.u_time.value = clock.getElapsedTime();
    } );
    return (
        <group ref={ groupRef } rotation-x={ Math.PI * 0.5 } renderOrder={ 3 }>
            <mesh scale={ 3.0 }>
                <ringGeometry args={ [ 1, 1.02, 128 ] } />
                <primitive object={ shaderMaterial } />
            </mesh>
            <mesh scale={ 3.2 } rotation-z={ 3 }>
                <ringGeometry args={ [ 1, 1.01, 128 ] } />
                <primitive object={ shaderMaterial } />
            </mesh>
        </group>
    );
};