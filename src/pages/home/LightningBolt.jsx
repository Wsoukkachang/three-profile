import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import * as THREE from "three";

const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0.0 },
    seed: { value: 0.0 },
  },
  vertexShader: `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  fragmentShader: `
  uniform float time;
  uniform float seed;

  varying vec2 vUv;

  float turbulence(vec2 p) {
    float f = 2.0 * sin(p.x + p.y + seed);
    f += 0.5 * sin(2.0 * p.x + 2.0 * p.y + seed);
    f += 0.25 * sin(4.0 * p.x + 4.0 * p.y + seed);
    f += 0.125 * sin(8.0 * p.x + 8.0 * p.y + seed);
    f += 0.0625 * sin(16.0 * p.x + 16.0 * p.y + seed);
    return f;
  }

  void main() {
    vec2 uv = vUv;
    float noise = turbulence(uv * time);
    float brightness = noise * 0.5 + 0.5;
    gl_FragColor = vec4(brightness, brightness, brightness, 1.0);
  }
  `,
});

const geometry = new LineGeometry(
  new Float32Array([0.0, 0.0, 0.0, 1.0, 0.0, 0.0]),
  2
);

const mesh = new THREE.Mesh(geometry, shaderMaterial);

const scene = new THREE.Scene();
scene.add(mesh);

function LightningBolt() {
  const useFrame = () => {
    shaderMaterial.uniforms.time.value = performance.now() / 1000.0;
    return null;
  };

  return (
    <>
      <mesh ref={mesh}>
        <geometry ref={geometry} />
        <shaderMaterial ref={shaderMaterial} />
      </mesh>
    </>
  );
}

export default LightningBolt;
