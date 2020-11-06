// import * as THREE from "three"

import setupScene from "./setupScene"
import light from "../scene/objects/light/mesh"
import character from "../scene/objects/character/mesh"
import infiniteGrigHelper from "./utils/THREE.InfiniteGridHelper"

const objects = { character: { update: null } }

function preRender({
    scene,
    // renderer
}) {
    light(scene)
    character(scene).then(update => objects.character.update = update)
    infiniteGrigHelper(scene)
}

function onAnimation({
    // scene,
    // renderer
}) {
    objects.character.update && objects.character.update()
}

export default function render() {
    setupScene({
        preRender,
        onAnimation
    })
}