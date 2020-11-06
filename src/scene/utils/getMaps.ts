import * as THREE from "three"

const loader = new THREE.TextureLoader()

export default function getMaps({
  path,
  names = { map: "albedo.png" }, // map, aoMap, metalnessMap, roughMap, bumbMap
  dimensions = [1, 1], // (3, 1)
  repeat = 1,
  canWrap = true
}) {
  const maps = {}
  Object.keys(names).forEach((mapName) => {
    const map = loader.load(`${path}${names[mapName]}`)
    if (canWrap) {
      map.wrapS = map.wrapT = THREE.RepeatWrapping // eslint-disable-line
      map.repeat.set(dimensions[0], dimensions[1]).multiplyScalar(repeat)
    }
    maps[mapName] = map
  })
  return maps
}
