import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

const AnimatedBox = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="orange" />
    </mesh>
  );
};

const ThreeDModel = () => {
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <AnimatedBox />
      </Canvas>
    </div>
  );
};

export default ThreeDModel;
