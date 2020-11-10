import * as THREE from "three"

interface ShaderSetter {
    material: THREE.Material | THREE.MeshStandardMaterial | THREE.MeshBasicMaterial | THREE.ShaderMaterial,
    shader: string,
    shaderType: "vertexShader" | "fragmentShader",
    uniforms?: object
}

export default function setShader(shaderSetter: ShaderSetter) {
    shaderSetter.material.onBeforeCompile = setShaderBeforeCompile.bind(shaderSetter);
}

function setShaderBeforeCompile(shaderFromMaterial) {
    const {material, shader, shaderType, uniforms} = this
    const pivotInclude = `#include <fog_${shaderType == "vertexShader" ? "vertex" : "fragment"}>`

    const {globalScope, mainScope} = getShaderScopes(shader)
    shaderFromMaterial[shaderType] = globalScope
      +
    shaderFromMaterial[shaderType].replace(pivotInclude, `${pivotInclude}\n${mainScope}`)
    material.userData.shader = shaderFromMaterial

    if (uniforms) {
        assignObjectKeys(shaderFromMaterial.uniforms, uniforms)
        material.userData.shader = shaderFromMaterial
    }
}

function getShaderScopes(shader) {
    const reg = /(.*)void main.*{(.*)}/gmi
    const flatStringShader = shader.replace(/\n/g, "¬")
    const exec = reg.exec(flatStringShader)
    const [_, globalScope, mainScope] = exec.map(line => line.replace(/¬/g, "\n"))
    return {
        globalScope: `${globalScope}\n`,
        mainScope: `${mainScope}\n`
    }
}

function assignObjectKeys(object1, object2) {
    for (const key in object2) {
        object1[key] = object2[key]
    }
}