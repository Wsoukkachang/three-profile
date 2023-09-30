import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  Suspense,
} from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import ME from "../../assets/images/ME.jpg";
import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { Stars, Sky, Text3D } from "@react-three/drei";
import { Canvas, extend, useLoader, useFrame } from "@react-three/fiber";
import {
  Image,
  Box,
  Center,
  Spacer,
  Tooltip,
  useColorMode,
  Svg,
} from "@chakra-ui/react";
import * as THREE from "three";
import glsl from "babel-plugin-glsl/macro";
import NvidiaWhite from "./LogoWhite.svg";
import NvidiaBlack from "./LogoBlack.svg";
import Nvidia from "./nvidia.png";
import fontUrl from "./Tomatoes_Regular.json";

import {
  Environment,
  Lightformer,
  OrbitControls,
  MeshTransmissionMaterial,
  useGLTF,
  Loader,
  Center as DCenter,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  LUT,
  BrightnessContrast,
  HueSaturation,
} from "@react-three/postprocessing";
import { LUTCubeLoader } from "postprocessing";
import Model from "../../Heart";

export const Home = () => {
  const canvasRef = useRef();
  const texture = useLoader(LUTCubeLoader, "/F-6800-STD.cube");
  // const [music, setMusic] = useState(localStorage.getItem("music"));
  // const [isPlaying, setIsPlaying] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);

  const handleHover = () => {
    setIsOpen(true);
  };

  // useEffect(() => {
  //   localStorage.setItem("music", music);
  //   console.log(isPlaying);
  // }, []);

  // useEffect(() => {
  //   let musicState = music;
  //   console.log(musicState);
  //   if (musicState === true) {
  //     setIsPlaying(true);
  //   } else {
  //     setIsPlaying(false);
  //   }
  // }, [document.documentElement.getAttribute("data-music")]);

  class FireMaterial extends THREE.ShaderMaterial {
    constructor() {
      super({
        defines: { ITERATIONS: "15", OCTIVES: "3" },
        uniforms: {
          fireTex: { type: "t", value: null },
          color: { type: "c", value: null },
          time: { type: "f", value: 0.0 },
          seed: { type: "f", value: 0.0 },
          invModelMatrix: { type: "m4", value: null },
          scale: { type: "v3", value: null },
          noiseScale: { type: "v4", value: new THREE.Vector4(1, 2, 1, 0.3) },
          magnitude: { type: "f", value: 2.5 },
          lacunarity: { type: "f", value: 3.0 },
          gain: { type: "f", value: 0.6 },
        },
        vertexShader: `
          varying vec3 vWorldPos;
          void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          }`,
        fragmentShader: glsl`
          #pragma glslify: snoise = require(glsl-noise/simplex/3d.glsl) 
  
          uniform vec3 color;
          uniform float time;
          uniform float seed;
          uniform mat4 invModelMatrix;
          uniform vec3 scale;
          uniform vec4 noiseScale;
          uniform float magnitude;
          uniform float lacunarity;
          uniform float gain;
          uniform sampler2D fireTex;
          varying vec3 vWorldPos;              
  
          float turbulence(vec3 p) {
            float sum = 0.0;
            float freq = 1.0;
            float amp = 1.0;
            for(int i = 0; i < OCTIVES; i++) {
              sum += abs(snoise(p * freq)) * amp;
              freq *= lacunarity;
              amp *= gain;
            }
            return sum;
          }
  
          vec4 samplerFire (vec3 p, vec4 scale) {
            vec2 st = vec2(sqrt(dot(p.xz, p.xz)), p.y);
            if(st.x <= 0.0 || st.x >= 1.0 || st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);
            p.y -= (seed + time) * scale.w;
            p *= scale.xyz;
            st.y += sqrt(st.y) * magnitude * turbulence(p);
            if(st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);
            return texture2D(fireTex, st);
          }
  
          vec3 localize(vec3 p) {
            return (invModelMatrix * vec4(p, 1.0)).xyz;
          }
  
          void main() {
            vec3 rayPos = vWorldPos;
            vec3 rayDir = normalize(rayPos - cameraPosition);
            float rayLen = 0.0288 * length(scale.xyz);
            vec4 col = vec4(0.0);
            for(int i = 0; i < ITERATIONS; i++) {
              rayPos += rayDir * rayLen;
              vec3 lp = localize(rayPos);
              lp.y += 0.5;
              lp.xz *= 2.0;
              col += samplerFire(lp, noiseScale);
            }
            col.a = col.r;
            gl_FragColor = col;
          }`,
      });
    }
  }

  extend({ FireMaterial });

  function Fire({ color, ...props }) {
    const ref = useRef();
    const texture = useLoader(THREE.TextureLoader, "/fire.png");
    useFrame((state) => {
      const invModelMatrix = ref.current.material.uniforms.invModelMatrix.value;
      ref.current.updateMatrixWorld();
      invModelMatrix.copy(ref.current.matrixWorld).invert();
      ref.current.material.uniforms.time.value = state.clock.elapsedTime;
      ref.current.material.uniforms.invModelMatrix.value = invModelMatrix;
      ref.current.material.uniforms.scale.value = ref.current.scale;
    });
    useLayoutEffect(() => {
      texture.magFilter = texture.minFilter = THREE.LinearFilter;
      texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
      ref.current.material.uniforms.fireTex.value = texture;
      ref.current.material.uniforms.color.value =
        color || new THREE.Color(0xeeeeee);
      ref.current.material.uniforms.invModelMatrix.value = new THREE.Matrix4();
      ref.current.material.uniforms.scale.value = new THREE.Vector3(1, 1, 1);
      ref.current.material.uniforms.seed.value = Math.random() * 19.19;
    }, []);
    return (
      <mesh ref={ref} {...props}>
        <boxGeometry />
        <fireMaterial transparent depthWrite={false} depthTest={false} />
      </mesh>
    );
  }

  // function Track({
  //   url,
  //   y = 1000,
  //   space = 1.8,
  //   width = 0.01,
  //   height = 0.05,
  //   obj = new THREE.Object3D(),
  //   ...props
  // }) {
  //   const ref = useRef();
  //   // suspend-react is the library that r3f uses internally for useLoader. It caches promises and
  //   // integrates them with React suspense. You can use it as-is with or without r3f.
  //   const { gain, context, update, data } = suspend(
  //     () => createAudio(url),
  //     [url]
  //   );
  //   useEffect(() => {
  //     // Connect the gain node, which plays the audio
  //     gain.connect(context.destination);
  //     // Disconnect it on unmount
  //     return () => gain.disconnect();
  //   }, [gain, context]);

  //   useFrame((state) => {
  //     let avg = update();
  //     // Distribute the instanced planes according to the frequency daza
  //     for (let i = 0; i < data.length; i++) {
  //       obj.position.set(
  //         i * width * space - (data.length * width * space) / 2,
  //         data[i] / y,
  //         0
  //       );
  //       obj.updateMatrix();
  //       ref.current.setMatrixAt(i, obj.matrix);
  //     }
  //     // Set the hue according to the frequency average
  //     ref.current.material.color.setHSL(avg / 50, 1, 1);
  //     ref.current.instanceMatrix.needsUpdate = true;
  //   });
  //   return (
  //     <instancedMesh
  //       castShadow
  //       ref={ref}
  //       args={[null, null, data.length]}
  //       {...props}
  //     >
  //       <planeGeometry args={[width, height]} />
  //       <meshBasicMaterial toneMapped={false} />
  //     </instancedMesh>
  //   );
  // }

  // async function createAudio(url) {
  //   // Fetch audio data and create a buffer source
  //   const res = await fetch(url);
  //   const buffer = await res.arrayBuffer();
  //   const context = new (window.AudioContext || window.webkitAudioContext)();
  //   const source = context.createBufferSource();
  //   source.buffer = await new Promise((res) =>
  //     context.decodeAudioData(buffer, res)
  //   );
  //   source.loop = true;
  //   // This is why it doesn't run in Safari 🍏🐛. Start has to be called in an onClick event
  //   // which makes it too awkward for a little demo since you need to load the async data first
  //   source.start(0);
  //   // Create gain node and an analyser
  //   const gain = context.createGain();
  //   const analyser = context.createAnalyser();
  //   analyser.fftSize = 64;
  //   source.connect(analyser);
  //   analyser.connect(gain);
  //   // The data array receive the audio frequencies
  //   const data = new Uint8Array(analyser.frequencyBinCount);
  //   return {
  //     context,
  //     source,
  //     gain,
  //     data,
  //     // This function gets called every frame per audio source
  //     update: () => {
  //       analyser.getByteFrequencyData(data);
  //       // Calculate a frequency average
  //       return (data.avg = data.reduce(
  //         (prev, cur) => prev + cur / data.length,
  //         0
  //       ));
  //     },
  //   };
  // }

  return (
    <HelmetProvider>
      <section
        id="home"
        className="home"
        // style={{
        //   backgroundImage: `url(${introdata.your_img_url})`,
        //   backgroundSize: "cover",
        // }}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title> 🔥FIRE DEV | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="intro_sec d-block d-lg-flex align-items-center ">
          <div className="h_bg-image order-1 order-lg-2 ">
            <Suspense fallback={<Loader />}>
              <Canvas
                ref={canvasRef}
                gl={{
                  preserveDrawingBuffer: true,
                  logarithmicDepthBuffer: true,
                  antialias: false,
                  alpha: true,
                  failIfMajorPerformanceCaveat: true,
                  powerPreference: "high-performance",
                }}
                dpr={[1, 1.5]}
                camera={{ position: [0, -0.5, 7], fov: 40 }}
              >
                <color attach="background" args={["#151520"]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Model position={[0, -0.2, 0]} scale={1.5} />

                <Text3D font={fontUrl} scale={0.5} position={[-1.5, 1.6, 0]}>
                  Inspire
                </Text3D>

                <Fire scale={7} position={[0, -0.3, 0]} />
                {/* {isPlaying === true ? (
                    <Track
                      castShadow
                      scale={10}
                      // position-x={1.25}
                      // position-y={1}
                      // position-z={-10}
                      url={Summon}
                    />
                  ) : null} */}
                {colorMode === "dark" ? (
                  <>
                    {/* <Environment
                        background={false} // Whether to affect scene.background
                        files={"satara_night_2k.hdr"} // Array of cubemap files OR single equirectangular file
                        path={"/"} // Path to the above file(s)
                        preset={null} // Preset string (overrides files and path)
                        scene={undefined} // adds the ability to pass a custom THREE.Scene
                      /> */}
                    <Stars />
                  </>
                ) : (
                  <>
                    {/* <Environment
                        background={false} // Whether to affect scene.background
                        files={"lilienstein_2k.hdr"} // Array of cubemap files OR single equirectangular file
                        path={"/"} // Path to the above file(s)
                        preset={null} // Preset string (overrides files and path)
                        scene={undefined} // adds the ability to pass a custom THREE.Scene
                      /> */}
                    <Sky sunPosition={[100, 15, 100]} />
                  </>
                )}

                <OrbitControls autoRotateSpeed={0.0777} autoRotate />
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
            </Suspense>
          </div>

          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center">
              <div className="intro mx-auto">
                {window.innerWidth < 991.98 ? (
                  <>
                    <Box p={2}>
                      <Center>
                        <div className="about_me">
                          <Box>
                            <Tooltip
                              fontSize="xl"
                              bg="gray.300"
                              label="Think outside the b0x."
                              // isOpen={isOpen}
                              hasArrow
                              arrowSize={15}
                              placement="bottom"
                              closeDelay={1000}
                              shouldWrapChildren={true}
                            >
                              <div className="about_me-image">
                                <Image
                                  src={ME}
                                  alt="About image"
                                  onMouseEnter={() => handleHover}
                                  onMouseLeave={() => setIsOpen(false)}
                                  style={{
                                    transform: "rotate(-7deg)",
                                  }}
                                />
                              </div>
                            </Tooltip>
                          </Box>
                        </div>
                      </Center>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box p={2}>
                      <Center>
                        <div className="about_me">
                          <Box>
                            <Tooltip
                              fontSize="xl"
                              bg="gray.300"
                              label="Think outside the b0x."
                              // isOpen={isOpen}
                              hasArrow
                              arrowSize={15}
                              placement="right"
                              closeDelay={1000}
                              shouldWrapChildren={true}
                            >
                              <div className="about_me-image">
                                <Image
                                  src={ME}
                                  alt="About image"
                                  onMouseEnter={() => handleHover}
                                  onMouseLeave={() => setIsOpen(false)}
                                  style={{
                                    transform: "rotate(-7deg)",
                                  }}
                                />
                              </div>
                            </Tooltip>
                          </Box>
                        </div>
                      </Center>
                    </Box>
                  </>
                )}

                <Spacer p={2} />
                <h2 className="mb-1x">{introdata.title} 🤝</h2>
                <Spacer p={2} />

                <div className="about_content">
                  <div className="about_cards">
                    <Link to="/about">
                      <article className="about_card">
                        <FaAward className="about_icon" />
                        <h5>Experience</h5>
                        <small>5+ Years Experience</small>
                      </article>
                    </Link>

                    {/* 
                    <article className="about_card">
                      <FiUsers className="about_icon" />
                      <h5>Clients</h5>
                      <small>20+ Clients</small>
                    </article> */}

                    <Link to="videos">
                      <article className="about_card">
                        <VscFolderLibrary className="about_icon" />

                        <h5>Projects</h5>
                        <small>10+ Projects</small>
                      </article>
                    </Link>

                    <div className="intro_btn-action pb-5">
                      <Link to="/portfolio" className="text_2">
                        <div id="button_p" className="ac_btn btn ">
                          My Portfolio
                          <div className="ring one"></div>
                          <div className="ring two"></div>
                          <div className="ring three"></div>
                        </div>
                      </Link>
                      <Spacer p={4} />
                      <Link to="/contact">
                        <div id="button_h" className="ac_btn btn">
                          Contact
                          <div className="ring one"></div>
                          <div className="ring two"></div>
                          <div className="ring three"></div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                <h2 className="mb-1x quote">"{introdata.quote}"</h2>

                <Spacer p={2} />

                <h1 className="fluidz-64 mb-1x">
                  <Typewriter
                    options={{
                      strings: [
                        introdata.animated.zero,
                        introdata.animated.first,
                        introdata.animated.second,
                        introdata.animated.third,
                        introdata.animated.fourth,
                        introdata.animated.fifth,
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                      pauseFor: 2000,
                    }}
                  />
                </h1>

                <p className="mb-1x">{introdata.description}</p>

                <Spacer p={1} />

                <Image
                  className="logo-Nvidia"
                  maxWidth="210px"
                  // minHeight="70px"
                  // boxSize="150px"
                  // objectFit="cover"
                  zIndex="5"
                  src={`${Nvidia}`}
                  // m={2}
                />

                <Spacer p={3} />

                <p className="mb-1x">{introdata.description2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
