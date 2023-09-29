// import React, { useState, useRef, useEffect } from "react";
// import { Stats, OrbitControls, Circle } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// export default function App() {
//   const canvasRef = useRef();
//   const [projects, setProjects] = useState([
//     // Add your projects here as objects with a `name` and `modelPath` property
//     {
//       name: "Project 1",
//       modelPath: "/che.glb",
//       position: [0, 2, 0],
//       scale: 1,
//     },
//     {
//       name: "Project 2",
//       modelPath: "/xeno.glb",
//       position: [0, 1, 0],
//       scale: 1,
//     },
//     {
//       name: "Project 3",
//       modelPath: "/holo.glb",
//       position: [0, 1, 0],
//       scale: 1.5,
//     },
//   ]);
//   const [index, setIndex] = useState(0);
//   const [modelP, setModelP] = useState("/che.glb");
//   const [currentModel, setCurrentModel] = useState(null);

//   const gltfLoader = new GLTFLoader();

//   const loadModel = async (modelPath) => {
//     const model = await gltfLoader.loadAsync(modelP);
//     setCurrentModel(model);
//     console.log(currentModel);
//   };

//   useEffect(() => {
//     loadModel(modelP);
//   }, []);

//   useEffect(() => {
//     let path = projects[index].modelPath;
//     // console.log(path);
//     setModelP(path);
//     loadModel(modelP);
//     // console.log(modelP);
//   }, [index]);

//   // const handleButtonClick = (modelP) => {
//   //   loadModel(modelP);
//   // };

//   return (
//     <>
//       <Canvas camera={{ position: [-0.5, 1, 2] }} shadows>
//         <directionalLight
//           position={[3.3, 1.0, 4.4]}
//           castShadow
//           intensity={Math.PI * 2}
//         />

//         {currentModel !== null ? (
//           <>
//             <primitive
//               object={currentModel.scene}
//               position={projects[index].position}
//               scale={projects[index].scale}
//               children-0-castShadow
//             />
//           </>
//         ) : null}

//         <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
//           <meshStandardMaterial />
//         </Circle>
//         <OrbitControls target={[0, 1, 0]} />
//         <axesHelper args={[5]} />
//         {/* <Stats /> */}
//       </Canvas>

//       {projects.map((project, index) => (
//         <button key={project.name} onClick={() => setIndex(index)}>
//           {project.name}
//         </button>
//       ))}
//     </>
//   );
// }

import { Canvas, useLoader } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  OrbitControls,
  MeshTransmissionMaterial,
  useGLTF,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  LUT,
  BrightnessContrast,
  HueSaturation,
} from "@react-three/postprocessing";
import { LUTCubeLoader } from "postprocessing";
import Model from "./Heart";
import Overlay from "./Overlay";

// function Model(props) {
//   const { nodes } = useGLTF("/heart_in_glass.glb");
//   return (
//     <group {...props} dispose={null}>
//       <mesh geometry={nodes.petals.geometry}>
//         <MeshTransmissionMaterial
//           backside
//           backsideThickness={1}
//           samples={16}
//           thickness={0.2}
//           anisotropicBlur={0.1}
//           iridescence={1}
//           iridescenceIOR={1}
//           iridescenceThicknessRange={[0, 1400]}
//           clearcoat={1}
//           envMapIntensity={0.5}
//         />
//         <mesh geometry={nodes.Sphere.geometry}>
//           <MeshTransmissionMaterial
//             samples={6}
//             resolution={512}
//             thickness={-1}
//             anisotropy={0.25}
//           />
//         </mesh>
//       </mesh>
//       <mesh geometry={nodes.Sphere001.geometry}>
//         <meshStandardMaterial
//           toneMapped={false}
//           emissive="hotpink"
//           color="red"
//           emissiveIntensity={2}
//         />
//       </mesh>
//     </group>
//   );
// }

export default function App() {
  const texture = useLoader(LUTCubeLoader, "/F-6800-STD.cube");
  return (
    <>
      <Canvas
        gl={{ logarithmicDepthBuffer: true, antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.5, 2], fov: 35 }}
      >
        <color attach="background" args={["#151520"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Model position={[0, -0.25, 0]} />
        <OrbitControls autoRotate />
        <Environment
          files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/blue_photo_studio_1k.hdr"
          resolution={512}
        >
          <group rotation={[0, 0, 1]}>
            <Lightformer
              form="circle"
              intensity={10}
              position={[0, 10, -10]}
              scale={20}
              onUpdate={(self) => self.lookAt(0, 0, 0)}
            />
            <Lightformer
              intensity={0.1}
              onUpdate={(self) => self.lookAt(0, 0, 0)}
              position={[-5, 1, -1]}
              rotation-y={Math.PI / 2}
              scale={[50, 10, 1]}
            />
            <Lightformer
              intensity={0.1}
              onUpdate={(self) => self.lookAt(0, 0, 0)}
              position={[10, 1, 0]}
              rotation-y={-Math.PI / 2}
              scale={[50, 10, 1]}
            />
            <Lightformer
              color="white"
              intensity={0.2}
              onUpdate={(self) => self.lookAt(0, 0, 0)}
              position={[0, 1, 0]}
              scale={[10, 100, 1]}
            />
          </group>
        </Environment>
        <EffectComposer disableNormalPass>
          <Bloom mipmapBlur luminanceThreshold={1} />
          <LUT lut={texture} />
          <BrightnessContrast brightness={0} contrast={0.1} />
          <HueSaturation hue={0} saturation={-0.25} />
        </EffectComposer>
      </Canvas>

      <Overlay />
    </>
  );
}
