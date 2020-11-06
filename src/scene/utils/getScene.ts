import * as THREE from "three"

export const near = 10
export const far = 600
export const color = "#f0f0f0"

export default function getScene() {
  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(color, near, far)
  return scene
}
