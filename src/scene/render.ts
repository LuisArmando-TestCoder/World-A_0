// import * as THREE from "three"

import setupScene from "./setupScene"
import getLight from "./objects/light/mesh"
import getCharacter from "./objects/character/mesh"
import getInfiniteGrigHelper from "./utils/THREE.InfiniteGridHelper"
import getDanceBall from "./objects/danceBall/mesh"
import getAudioFrequencies from "./utils/getAudioFrequencies"

const objects = { character: { update: null } }
let danceBall

function preRender({ scene }) {
    getLight(scene)
    // getCharacter(scene).then(update => objects.character.update = update)
    // getInfiniteGrigHelper(scene)
    danceBall = getDanceBall(scene)
}

function onAnimation() {
    updateCharacter()
    updateDanceBallShader()
}

export default function render() {
    setupScene({
        preRender,
        onAnimation
    })
}

function updateCharacter() {
    // objects.character.update && objects.character.update(0.1)
}

function updateDanceBallShader() {
    const danceBallShader = danceBall.material.userData.shader
    if (danceBallShader) {
        const iTime = danceBallShader.uniforms.iTime
        if(iTime) iTime.value = performance.now() / 1000

        const iFrequencies = danceBallShader.uniforms.iFrequencies
        getAudioFrequencies('mp3/Harlem River.mp3')
        .then(frequencies => {
            if(iFrequencies) iFrequencies.value = frequencies
        })
    }

}