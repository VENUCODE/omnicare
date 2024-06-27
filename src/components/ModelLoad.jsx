import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useThree, extend } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

// Extend will make OrbitControls available as a JSX element
extend({ OrbitControls });

const Model = ({ path = "", scale = 1, position = [0, 0, 0] }) => {
  const gltf = useLoader(GLTFLoader, path);
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      // Example of making the model spin
      modelRef.current.rotation.y += 0.005;
      // modelRef.current.rotation.x += 0.005
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={scale}
      position={position}
    />
  );
};

const Controls = () => {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
};

const ModelLoad = ({ path = "", scale = 1, scene = true }) => {
  return (
    <Canvas style={{ height: "400px", width: "100%" }}>
      {/* <hemisphereLight color={"red"} intensity={4} />
      {/* <ambientLight color={"red"} intensity={1} /> */}
      {/* <directionalLight
        color={"red"}
        position={[10, 0, 10]}
        castShadow={true}
        intensity={5}
      />
      <directionalLight
        color={"orange"}
        position={[0, 10, -10]}
        intensity={3}
      />
      <directionalLight color={"pink"} position={[0, -30, -30]} intensity={3} />
      <directionalLight
        color={"yellow"}
        position={[10, 200, 30]}
        intensity={3}
      />{" "} */}

      <Suspense fallback={null}>
        {scene && (
          <Environment
            background={false}
            preset="dawn"
            path="../assets"
            files={"blood.jpg"}
          />
        )}
        <Model path={path} scale={scale} />
      </Suspense>
      <Controls />
    </Canvas>
  );
};

export default ModelLoad;
