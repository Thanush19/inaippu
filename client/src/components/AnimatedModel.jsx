import React, { useRef } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei"; // Import from "@react-three/drei" instead of "drei"

extend({ GLTFLoader });

const Model = ({ url }) => {
  const mesh = useRef();
  const { nodes, materials } = useLoader(GLTFLoader, url); // Use GLTFLoader from correct path

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={mesh}>
      <primitive object={nodes["<node_name>"]} />
    </group>
  );
};

const AnimatedModel = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls />
      <Model url="./ani.glb" />
    </Canvas>
  );
};

export default AnimatedModel;
