import * as THREE from "three"
import {
    GLTFLoader,
} from "three/examples/jsm/loaders/GLTFLoader"
import {
    FBXLoader
} from "three/examples/jsm/loaders/FBXLoader"

const objectLoader = { gltf, fbx, glb }
let originalTime = 0

interface Config {
    scene: THREE.Scene,
    config: {
        scale?: number,
        position?: [number, number, number],
        rotation?: [number, number, number],
        type?: string,
        timeScale?: number
    },
    name: String
}

export default function getObject3D(config: Config) {
    return objectLoader[config.config.type || "gltf"]({ ...config, ...config.config })
}

function fbx(objectProps) {
    const loader = new FBXLoader()
    loader.setCrossOrigin("anonymous")
    return new Promise((resolve) => {
        loader.load(`../../models/fbx/${objectProps.name}.fbx`, (object3D) => {
            setObject3D(object3D, objectProps)
            resolve(object3D)
        })
    })
}

function glb(objectProps) {
    const loader = new GLTFLoader()
    loader.setCrossOrigin("anonymous")
    return new Promise((resolve) => {
        const gltfPath = `../../models/glb/${objectProps.name}/scene.glb`
        loader.load(gltfPath, (gltf) => {
            const object3D = gltf.scene
            const gltfProperties = getGLTFProperties({ gltf, object3D, timeScale: objectProps.timeScale })
            setObject3D(object3D, objectProps)
            resolve(gltfProperties)
        })
    })
}

function gltf(objectProps) {
    const loader = new GLTFLoader()
    loader.setCrossOrigin("anonymous")
    return new Promise((resolve) => {
        const gltfPath = `../../models/gltf/${objectProps.name}/scene.gltf`
        loader.load(gltfPath, (gltf) => {
            const object3D = gltf.scene.children[0]
            const gltfProperties = getGLTFProperties({ gltf, object3D, objectProps })
            setObject3D(object3D, objectProps)
            resolve(gltfProperties)
        })
    })
}

function getGLTFProperties({ gltf, object3D, objectProps }) {
    const skeleton = new THREE.SkeletonHelper(object3D)
    skeleton.visible = false

    const animations = gltf.animations
    const mixer = new THREE.AnimationMixer(object3D)

    object3D.traverse((child) => {
        child.castShadow = true
        child.receiveShadow = true
    })

    return {
        object3D,
        animations,
        mixer,
        skeleton,
        update: timeScale => {
            const time = timeScale || objectProps.timeScale
            time && updateMixer(mixer, time)
        }
    }
}

function updateMixer(mixer, timeScale) {
    if (timeScale) mixer.timeScale = timeScale

    mixer.update(timeScale)
}

function setObject3D(object3D, config) {
    const {
        scale,
        position,
        rotation
    } = config
    if (scale) object3D.scale.setScalar(scale)
    if (position) object3D.position.set(...position)
    if (rotation) object3D.rotation.set(...rotation)
}