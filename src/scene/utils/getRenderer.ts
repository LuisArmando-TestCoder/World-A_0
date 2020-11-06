import * as THREE from "three"

export default function getRenderer(canvas) {
  return new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
}
