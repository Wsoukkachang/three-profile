/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 heart.glb --transform 
Files: heart.glb [13.53MB] > heart-transformed.glb [1.17MB] (91%)
Author: lukinu (https://sketchfab.com/lukinu)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/heart-in-glass-1dacc91d294141658633cce0a79ecd97
Title: Heart in glass
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/heart.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.defaultMaterial.geometry}
        material={materials.Coeur1}
      />
      <mesh
        geometry={nodes.defaultMaterial_1.geometry}
        material={materials.Crystal}
      />
    </group>
  );
}

useGLTF.preload("/heart.glb");
