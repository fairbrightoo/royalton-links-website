import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const House = ({ url, ...props }) => {
    // Load using the dynamic URL (passed from Hero.jsx)
    const { scene } = useGLTF(url);

    const ref = useRef();

    // Slow rotation
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <primitive
            ref={ref}
            object={scene}
            {...props}
        />
    );
};

export default House;
