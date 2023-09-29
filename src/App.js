import React, { useRef, useState } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { ChakraProvider, Box } from "@chakra-ui/react";
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
import useScrollTrigger from "react-scroll-trigger";

const App = () => {
  const canvasRef = useRef();
  const [scene, setScene] = useState(null);
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      name: "Landing Page",
      content: <Box>Landing Page Content</Box>,
    },
    {
      name: "Most Recent Project",
      content: <Box>Most Recent Project Content</Box>,
    },
    {
      name: "About Me",
      content: <Box>About Me Content</Box>,
    },
    {
      name: "Other Projects",
      content: <Box>Other Projects Content</Box>,
    },
    {
      name: "Contact Me",
      content: <Box>Contact Me Content</Box>,
    },
  ];

  const handleScrollTrigger = (sectionIndex) => {
    setActiveSection(sectionIndex);
  };

  const currentSection = sections[activeSection];

  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    // Get a random number between 0 and 1
    const randomNumber = Math.random();

    // If the random number is greater than 0.5, rotate the scene
    if (randomNumber > 0.5) {
      scene.rotation.y += 0.01;
    }

    // Otherwise, scale the scene
    else {
      scene.scale.x += 0.01;
      scene.scale.y += 0.01;
      scene.scale.z += 0.01;
    }
  };

  window.addEventListener("scroll", handleScroll);

  const texture = useLoader(LUTCubeLoader, "/F-6800-STD.cube");

  return (
    <ChakraProvider>
      <Box className="app">
        <Box className="canvas-container">
          <Canvas
            ref={canvasRef}
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
        </Box>
        {sections.map((section, index) => (
          <Box
            key={section.name}
            className="section"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: activeSection === index ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <useScrollTrigger
              onTrigger={() => handleScrollTrigger(index)}
              onUntrigger={() => handleScrollTrigger(null)}
            />
            {section.content}
          </Box>
        ))}
      </Box>
    </ChakraProvider>
  );
};

export default App;
