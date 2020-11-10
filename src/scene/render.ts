// import * as THREE from "three"

import setupScene from "./setupScene"
import getLight from "./objects/light/mesh"
import getCharacter from "./objects/character/mesh"
import getInfiniteGrigHelper from "./utils/THREE.InfiniteGridHelper"
import getDanceBall from "./objects/danceBall/mesh"

const objects = { character: { update: null } }
let danceBall

function preRender({ scene }) {
    getLight(scene)
    getCharacter(scene).then(update => objects.character.update = update)
    // getInfiniteGrigHelper(scene)
    danceBall = getDanceBall(scene)
}

function onAnimation() {
    objects.character.update && objects.character.update(0.1)
    const danceBallShader = danceBall.material.userData.shader
    if (danceBallShader) {
        const iTime = danceBallShader.uniforms.iTime
        if(iTime) iTime.value = performance.now() / 1000
    }
}

export default function render() {
    setupScene({
        preRender,
        onAnimation
    })
}