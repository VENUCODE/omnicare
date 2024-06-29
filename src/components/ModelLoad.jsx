import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useThree, extend } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
extend({ OrbitControls });

const Model = ({
  path = "",
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  animation,
}) => {
  const gltf = useLoader(GLTFLoader, path);
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current && animation) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      rotation={rotation}
      scale={scale}
      position={position}
    />
  );
};

const Controls = () => {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} enableZoom={false} />;
};

const ModelLoad = ({
  path = "",
  scale = 1,
  scene = true,
  imagepath = "",
  rotation,
  position,
  env,
  animation = true,
  ...props
}) => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={imagepath}
            alt="Loading..."
            className="img-fluid"
            style={{ height: "300px", width: "300px", objectFit: "contain" }}
          />
        </div>
      }
    >
      <Canvas style={{ height: "300px", width: "100%", ...props }}>
        <Environment
          background={scene}
          backgroundBlurriness={0.08}
          files={env ? "/env.hdr" : "/medow.hdr"}
        />

        <Model
          path={path}
          position={position}
          scale={scale}
          rotation={rotation}
          animation={animation}
        />

        <Controls />
      </Canvas>
    </Suspense>
  );
};

export default ModelLoad;
