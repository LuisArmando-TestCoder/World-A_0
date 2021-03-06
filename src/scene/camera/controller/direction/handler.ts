export const mouseController = {
  absoluteYSinLimit: 0.9,
  isPressed: false,
  cameraDirection: {
    x: 0,
    y: 0,
  },
  speedResistance: 250,
  lookAt: {
    x: null,
    y: null,
    z: null,
  },
  camera: null,
}

function setCameraDirection(event) {
  const {
    speedResistance,
    cameraDirection,
    absoluteYSinLimit,
  } = mouseController
  const move = {
    x: -event.movementX / speedResistance,
    y: -event.movementY / speedResistance,
  }
  cameraDirection.x += move.x
  const futureYSinValueDirection = Math.abs(Math.sin(cameraDirection.y + move.y))
  if (futureYSinValueDirection < absoluteYSinLimit) {
    cameraDirection.y += move.y
  }
}

function setCameraSight(event) {
  if (mouseController.isPressed) {
    const control = mouseController
    setCameraDirection(event)
    control.lookAt.x = control.camera.position.x + Math.sin(control.cameraDirection.x)
    control.lookAt.y = control.camera.position.y + Math.sin(control.cameraDirection.y)
    control.lookAt.z = control.camera.position.z + Math.cos(control.cameraDirection.x)
    control.camera.lookAt(
      control.lookAt.x,
      control.lookAt.y,
      control.lookAt.z,
    )
    control.camera.look = control.lookAt
  }
}

function fakeCameraSetting() {
  mouseController.isPressed = true
  setCameraSight({
    movementX: -860,
    movementY: 0,
  })
  mouseController.isPressed = false
}

export default function setFirstPersonDirectionControllers(camera, canvas) {
  mouseController.camera = camera
  canvas.addEventListener('mousedown', (event) => {
    const isLeftClick = event.which === 1
    if (isLeftClick) {
      canvas.focus()
      event.preventDefault()
      canvas.requestPointerLock = canvas.requestPointerLock // eslint-disable-line
                              || canvas.mozRequestPointerLock
      canvas.requestPointerLock()
      mouseController.isPressed = true
    }
  })
  canvas.addEventListener('mousemove', setCameraSight)
  canvas.addEventListener('mouseup', (event) => {
    event.preventDefault()
    document.exitPointerLock = document.exitPointerLock
    document.exitPointerLock()
    mouseController.isPressed = false
  })
  fakeCameraSetting()
}
