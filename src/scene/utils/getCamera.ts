import * as THREE from "three"

function getAspectRatio() {
  return window.innerWidth / window.innerHeight
}

export default function getCamera() {
  const camera = new THREE.PerspectiveCamera(32, getAspectRatio(), 1, 500)
  camera.lookAt(new THREE.Vector3())
  return camera
}
