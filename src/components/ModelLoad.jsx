import React, { Suspense, useRef, useState, useEffect } from "react";
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
  extend,
} from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Environment } from "@react-three/drei";
import TempCard from "./TempCard";

extend({ OrbitControls });

// Create a cache object
const modelCache = {};

// Custom hook to load a model with caching
const useCachedGLTF = (url) => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    if (modelCache[url]) {
      setModel(modelCache[url]);
    } else {
      const loader = new GLTFLoader();
      loader.load(url, (gltf) => {
        modelCache[url] = gltf;
        setModel(gltf);
      });
    }
  }, [url]);

  return model;
};

const Model = React.memo(
  ({
    path = "",
    scale = 1,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    animation,
  }) => {
    const model = useCachedGLTF(path);
    const modelRef = useRef();

    useFrame(() => {
      if (modelRef.current && animation) {
        modelRef.current.rotation.y += 0.005;
      }
    });

    return model ? (
      <primitive
        ref={modelRef}
        object={model.scene}
        rotation={rotation}
        scale={scale}
        position={position}
      />
    ) : null;
  }
);

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
    <Suspense fallback={<TempCard count={1} />}>
      <Canvas
        style={{
          height: "300px",
          width: "100%",
          ...props,
        }}
      >
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
