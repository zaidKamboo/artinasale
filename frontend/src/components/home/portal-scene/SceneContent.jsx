import { useEffect, useRef } from "react";
import { Sparkles } from '@react-three/drei';
import AccretionDisk from "./scene-content/AccretionDisk";
import FieryRings from "./scene-content/FieryRings";
import PhotonSphere from "./scene-content/PhotonSphere";

 export default function SceneContent( { onReady } )  {
    const groupRef = useRef();
    const cameraRef = useRef();
    useEffect( () => {
        if ( onReady ) { onReady( { group: groupRef.current, camera: cameraRef.current } ); }
    }, [ onReady ] );

    return (
        <>
            <perspectiveCamera ref={ cameraRef } makeDefault fov={ 75 } position={ [ 0, 0, 10 ] } />
            <ambientLight intensity={ 0.2 } />
            <pointLight color="red" intensity={ 10 } position={ [ 0, 0, 5 ] } />
            <group ref={ groupRef }>
                <Sparkles count={ 2000 } scale={ 20 } size={ 1 } speed={ 0.5 } color="white" renderOrder={ 0 } />
                <Sparkles count={ 200 } scale={ 15 } size={ 10 } speed={ 0.2 } color="#39FF14" opacity={ 0.3 } renderOrder={ 1 } />
                <AccretionDisk />
                <FieryRings />
                <PhotonSphere />
                <mesh scale={ 1.4 } renderOrder={ 5 }>
                    <sphereGeometry args={ [ 0.7, 32, 32 ] } />
                    <meshBasicMaterial color="black" />
                </mesh>
            </group>
        </>
    );
};