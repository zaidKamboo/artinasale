import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from 'three'

export default function PhotonSphere() {
    const meshRef = useRef();
    const shaderMaterial = useMemo( () => new THREE.ShaderMaterial( {
        uniforms: { u_time: { value: 0 } },
        vertexShader: `varying vec3 v_normal; void main() { v_normal = normal; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `
            uniform float u_time; 
            varying vec3 v_normal; 
            void main() { 
                float intensity = pow(0.4 - dot(v_normal, vec3(0.0, 0.0, 1.0)), 3.0); 
                float flicker = 0.9 + 0.1 * sin(u_time * 10.0 + v_normal.x * 10.0); 
                gl_FragColor = vec4(vec3(0.8, 0.1, 1.0) * intensity * flicker, 1.0);

            }
        `,
        blending: THREE.NoToneMapping, side: THREE.BackSide,
    } ), [] );
    useFrame( ( { clock } ) => {
        shaderMaterial.uniforms.u_time.value = clock.getElapsedTime();
    } );
    return (
        <mesh ref={ meshRef } scale={ 1.6 } renderOrder={ 4 }>
            <sphereGeometry args={ [ 0.8, 64, 64 ] } />
            <primitive object={ shaderMaterial } />
        </mesh>
    );
};