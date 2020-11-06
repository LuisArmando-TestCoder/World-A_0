import * as THREE from "three"
import preset from "canvas-preset"
import {
  setFirstPersonPositionControllers,
  updateFirstPersonPosition,
} from "./camera/controller/position/handler"
import setFirstPersonDirectionControllers from "./camera/controller/direction/handler"
import handleWindowResize from "./utils/handleWindowResize"
import getRenderer from "./utils/getRenderer"
import getCamera from "./utils/getCamera"
import getScene from "./utils/getScene"

function setupScene({
  preRender = (info: Object) => {},
  onAnimation = (info: Object) => {},
}) {
  const { draw, c: canvas, size, onMouseMove } = preset(null, "canvas", null)
  size()

  const renderer = getRenderer(canvas)
  const camera = getCamera()
  const scene = getScene()

  renderer.setClearColor("#101010", 1)

  camera.lookAt(new THREE.Vector3())

  handleWindowResize(camera, renderer)

  onMouseMove()
  canvas.focus()

  const sceneInfo = {
    c: canvas,
    scene,
    camera,
    renderer,
  }

  preRender(sceneInfo)

  setFirstPersonPositionControllers(canvas)
  setFirstPersonDirectionControllers(camera, canvas)
  draw(() => {
    updateFirstPersonPosition()
    onAnimation(sceneInfo)
    renderer.render(scene, camera)
  })
}

export default setupScene
