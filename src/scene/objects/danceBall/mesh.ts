import * as THREE from "three"
import setShader from "../../utils/setShader"

const frequenciesAmount = 1024

const shader = `
uniform float iTime;
uniform float iFrequencies[${frequenciesAmount}];

float noiseWave(float n, float scale) {
    return (sin(n * 2.0) + sin(n * 3.14159265359)) * scale;    
}

void main() {
    float maxFrequency = 256.0;
    float xFrequency = iFrequencies[int(mod(position.x, float(${frequenciesAmount})))] / maxFrequency;
    float yFrequency = iFrequencies[int(mod(position.y, float(${frequenciesAmount})))] / maxFrequency;
    float zFrequency = iFrequencies[int(mod(position.z, float(${frequenciesAmount})))] / maxFrequency;
    float scale = 1.0;
    float xNoise = noiseWave(position.x + iTime + xFrequency, scale);
    float yNoise = noiseWave(position.y + iTime + yFrequency, scale);
    float zNoise = noiseWave(position.z + iTime + zFrequency, scale);
    vec3 noisyPoisition = position + vec3(xNoise, yNoise, zNoise); 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(noisyPoisition, 1.0);
}
`

export default function getMesh(scene: THREE.Scene) {
    const geometry = new THREE.SphereGeometry(100, 150, 150)
    const material = new THREE.MeshStandardMaterial({
        wireframe: true,
        color: "#f44",
    })
    setShader({
        material,
        shader,
        shaderType: "vertexShader",
        uniforms: {
            iTime: { value: 0 },
            iFrequencies: { value: [...new Float32Array(frequenciesAmount)] }
        }
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    return mesh
}