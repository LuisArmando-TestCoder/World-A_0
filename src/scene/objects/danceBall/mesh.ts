import * as THREE from "three"
import setShader from "../../utils/setShader"

const shader = `
uniform float iTime;

float noiseWave(float n, float scale) {
    return (sin(n * 2.0) + sin(n * 3.14159265359)) * scale;    
}

void main() {
    float scale = 1.5;
    float xNoise = noiseWave(position.x + iTime, scale);
    float yNoise = noiseWave(position.y + iTime, scale);
    float zNoise = noiseWave(position.z + iTime, scale);
    vec3 noisyPoisition = position + vec3(xNoise, yNoise, zNoise); 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(noisyPoisition, 1.0);
}
`

export default function getMesh(scene: THREE.Scene) {
    const geometry = new THREE.SphereGeometry(150, 150, 150)
    const material = new THREE.MeshStandardMaterial({
        wireframe: true,
        color: "#f44",
    })
    setShader({
        material,
        shader,
        shaderType: "vertexShader",
        uniforms: {
            iTime: { value: 0 }
        }
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    return mesh
}