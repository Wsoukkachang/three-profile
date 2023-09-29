import React, { useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Scene = () => {
  const gltfLoader = new GLTFLoader();
  const [model, setModel] = useState(null);

  React.useEffect(() => {
    const gltf = useLoader(GLTFLoader, "/Poimandres.gltf");
    return <primitive object={gltf.scene} />;
  }, []);

  //   if (!model) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <mesh>
      <geometry attach="geometry" {...model.scene.children[0].geometry} />
      <material attach="material" {...model.scene.children[0].material} />
    </mesh>
  );
};

export default Scene;
