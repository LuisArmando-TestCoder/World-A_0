import * as THREE from "three"

import getObject3D from "../../utils/getObject3D"

export default function mesh(scene: THREE.Scene) {
    return new Promise((resolve) => {
        getObject3D({
            scene,
            config: {
                scale: 10,
                rotation: [0, -Math.PI / 2, 0],
                position: [0, 0, 0],
                type: 'glb',
                timeScale: 0.1
            },
            name: "Xbot"
        }).then(({ object3D, animations, mixer, update }) => {
    
            const clip = THREE.AnimationClip.findByName(animations, 'run')
            const action = mixer.clipAction(clip)

            action.play()
    
            scene.add(object3D)
            
            resolve(update)
        })
    })
}