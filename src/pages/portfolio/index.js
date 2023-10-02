import React, { useRef, useState, useMemo, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";
import * as THREE from "three";
// import { MathUtils } from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Zoom } from "react-awesome-reveal";
import {
  Image,
  ScrollControls,
  Scroll,
  useScroll,
  Html,
  BBAnchor,
  Center,
  Float,
  Sparkles,
  Billboard,
  Select,
} from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";
import { LayerMaterial, Depth } from "lamina";
import { Center as CCenter } from "@chakra-ui/react";

export const Portfolio = () => {
  const damp = THREE.MathUtils.damp;
  const material = new THREE.LineBasicMaterial({ color: "white" });
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, -0.5, 0),
    new THREE.Vector3(0, 0.5, 0),
  ]);
  const [selected, setSelected] = useState([]);
  const state = proxy({
    clicked: null,
    urls: [
      {
        img: "/0.png",
        link: "https://www.kondux.io/",
        description:
          "Web3 app that features NFT minting, crypto staking, and an innovative viewport that helps you interact with NFTs like never before. (Private Repo)",
        tech: "React JS / Chakra UI / Three.JS / Ethers.js / web3.js / WAGMI / WalletConnect / Moralis / Solidity / MongoDB / AWS",
      },
      {
        img: "/1.png",
        link: "https://www.kondux.io/viewport",
        description: "Web browser NFT Minting app. (Private Repo)",
        tech: "React JS / Chakra UI / Ethers.js / web3.js / Moralis / Solidity / MongoDB ",
      },
      { img: "/2.png", link: "https://www.kondux.io/rewards" },
      { img: "/3.png", link: "https://www.kondux.io/knft_mint" },
      { img: "/4.png", link: "https://portfolio-will.vercel.app" },
      { img: "/5.png", link: "https://seentence2.web.app/" },
      { img: "/6.png", link: "https://www.newgrounds.com/portal/view/640245" },
      { img: "/7.png", link: "https://www.newgrounds.com/portal/view/640824" },
      { img: "/8.png", link: "https://www.newgrounds.com/portal/view/641062" },
      { img: "/9.png", link: "https://kratoselect.com/" },
      { img: "/10.png", link: "https://kondux.info/" },
      { img: "/11.png", link: "NONE" },
      { img: "/12.png", link: "https://realpowertechnologies.com/" },
      { img: "/13.png", link: "https://covid19tracker-5585e.web.app/" },
      { img: "/14.png", link: "NONE" },
      { img: "/15.png", link: "https://zealous-poincare-b92bd3.netlify.app/" },
      { img: "/16.png", link: "https://speakincog.com/landing" },
      { img: "/17.png", link: "https://dreamindroom.netlify.app/" },
    ],
  });

  // const Glow = ({ color, scale = 0.5, near = -2, far = 1.4 }) => (
  //   <Billboard>
  //     <mesh>
  //       <circleGeometry args={[2 * scale, 16]} />
  //       <LayerMaterial
  //         transparent
  //         depthWrite={false}
  //         blending={THREE.CustomBlending}
  //         blendEquation={THREE.AddEquation}
  //         blendSrc={THREE.SrcAlphaFactor}
  //         blendDst={THREE.DstAlphaFactor}
  //       >
  //         <Depth
  //           colorA={color}
  //           colorB="black"
  //           alpha={1}
  //           mode="normal"
  //           near={near * scale}
  //           far={far * scale}
  //           origin={[0, 0, 0]}
  //         />
  //         {/* <Depth
  //           colorA={color}
  //           colorB="black"
  //           alpha={0.5}
  //           mode="add"
  //           near={-40 * scale}
  //           far={far * 1.2 * scale}
  //           origin={[0, 0, 0]}
  //         /> */}
  //         <Depth
  //           colorA={color}
  //           colorB="black"
  //           alpha={1}
  //           mode="add"
  //           near={-15 * scale}
  //           far={far * 0.7 * scale}
  //           origin={[0, 0, 0]}
  //         />
  //         {/* <Depth
  //           colorA={color}
  //           colorB="black"
  //           alpha={1}
  //           mode="add"
  //           near={-10 * scale}
  //           far={far * 0.68 * scale}
  //           origin={[0, 0, 0]}
  //         /> */}
  //       </LayerMaterial>
  //     </mesh>
  //   </Billboard>
  // );

  // function Minimap() {
  //   const ref = useRef();
  //   const scroll = useScroll();
  //   const { urls } = useSnapshot(state);
  //   const { height } = useThree((state) => state.viewport);
  //   useFrame((state, delta) => {
  //     ref.current.children.forEach((child, index) => {
  //       // Give me a value between 0 and 1
  //       //   starting at the position of my item
  //       //   ranging across 4 / total length
  //       //   make it a sine, so the value goes from 0 to 1 to 0.
  //       const y = scroll.curve(
  //         index / urls.length - 1.5 / urls.length,
  //         4 / urls.length
  //       );
  //       child.scale.y = damp(child.scale.y, 0.1 + y / 6, 8, 8, delta);
  //     });
  //   });
  //   return (
  //     <group ref={ref}>
  //       {urls.map((_, i) => (
  //         <line
  //           key={i}
  //           geometry={geometry}
  //           material={material}
  //           position={[i * 0.06 - urls.length * 0.03, -height / 2 + 0.6, 0]}
  //         />
  //       ))}
  //     </group>
  //   );
  // }

  // function Item({ index, position, scale, c = new THREE.Color(), ...props }) {
  //   const ref = useRef();
  //   const scroll = useScroll();
  //   const { clicked, urls } = useSnapshot(state);
  //   const [hovered, hover] = useState(false);
  //   const click = () => (state.clicked = index === clicked ? null : index);
  //   const over = () => hover(true);
  //   const out = () => hover(false);
  //   useFrame((state, delta) => {
  //     const y = scroll.curve(
  //       index / urls.length - 1.5 / urls.length,
  //       4 / urls.length
  //     );
  //     ref.current.material.scale[1] = ref.current.scale.y = damp(
  //       ref.current.scale.y,
  //       clicked === index ? 5 : 4 + y,
  //       8,
  //       delta
  //     );
  //     ref.current.material.scale[0] = ref.current.scale.x = damp(
  //       ref.current.scale.x,
  //       clicked === index ? 5.7 : scale[0],
  //       6,
  //       delta
  //     );
  //     if (clicked !== null && index < clicked)
  //       ref.current.position.x = damp(
  //         ref.current.position.x,
  //         position[0] - 2,
  //         6,
  //         delta
  //       );
  //     if (clicked !== null && index > clicked)
  //       ref.current.position.x = damp(
  //         ref.current.position.x,
  //         position[0] + 2,
  //         6,
  //         delta
  //       );
  //     if (clicked === null || clicked === index)
  //       ref.current.position.x = damp(
  //         ref.current.position.x,
  //         position[0],
  //         6,
  //         delta
  //       );
  //     ref.current.material.grayscale = damp(
  //       ref.current.material.grayscale,
  //       hovered || clicked === index ? 0 : Math.max(0, 1 - y),
  //       6,
  //       delta
  //     );
  //     ref.current.material.color.lerp(
  //       c.set(hovered || clicked === index ? "white" : "#aaa"),
  //       hovered ? 0.3 : 0.1
  //     );
  //   });

  //   console.log(clicked);

  //   return (
  //     <>
  //       <Image
  //         ref={ref}
  //         {...props}
  //         position={position}
  //         scale={scale}
  //         onClick={click}
  //         onPointerOver={over}
  //         onPointerOut={out}
  //       >
  //         {clicked >= 0 && clicked != null && clicked == index ? (
  //           <>
  //             <BBAnchor anchor={[0, 0, 0]}>
  //               <Center>
  //                 <Html center>
  //                   <div
  //                     style={{
  //                       border: "1px solid red",
  //                       height: "100px",
  //                       width: "100px",
  //                     }}
  //                   >
  //                     <a
  //                       title="embed"
  //                       width={700}
  //                       height={500}
  //                       target="blank"
  //                       href={urls[clicked].link}
  //                       frameBorder={0}
  //                     >
  //                       <button>CLICK HERE TO VIEW PROJECT</button>
  //                     </a>
  //                   </div>
  //                 </Html>
  //               </Center>
  //             </BBAnchor>
  //           </>
  //         ) : (
  //           <></>
  //         )}
  //       </Image>
  //     </>
  //   );
  // }

  // function Items({ w = 0.7, gap = 0.15 }) {
  //   const { urls } = useSnapshot(state);
  //   const { width } = useThree((state) => state.viewport);
  //   const xW = w + gap;
  //   // console.log(urls);
  //   return (
  //     <ScrollControls
  //       horizontal
  //       damping={0.1}
  //       pages={(width - xW + urls.length * xW) / width}
  //     >
  //       <Minimap />
  //       <Scroll>
  //         {urls.map((url, i) => (
  //           <Item
  //             key={i}
  //             index={i}
  //             position={[i * xW, 0, 0]}
  //             scale={[w, 4, 1]}
  //             url={url.img}
  //             link={url.link}
  //           />
  //         ))}
  //       </Scroll>
  //     </ScrollControls>
  //   );
  // }

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Portfolio | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Portfolio </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>

        <div className="mb-5 po_items_ho">
          {dataportfolio.map((data, i) => {
            return (
              <Zoom key={i}>
                <div key={i} className="po_item">
                  <CCenter>
                    <img src={data.img} alt="portfolio image" />
                  </CCenter>

                  <div className="content">
                    <p>{data.description}</p>
                    <p>
                      <small>{data.tech}</small>
                    </p>
                    {data.link === "NONE" ? (
                      <>
                        <p>
                          <small>App is no longer hosted.</small>
                        </p>
                      </>
                    ) : (
                      <>
                        <a target="_blank" href={data.link}>
                          View Project
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </Zoom>
            );
          })}
        </div>

        {/* <Canvas
          style={{ height: "25vw" }}
          gl={{ antialias: false }}
          dpr={[1, 1.5]}
          onPointerMissed={() => (state.clicked = null)}
        >
          <Select multiple box onChange={setSelected}>
            <Items />
          </Select>

        </Canvas> */}
      </Container>
    </HelmetProvider>
  );
};
