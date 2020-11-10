import analyseAudio from "canvas-preset/functions/analyseAudio"
import setAudioToggle from "canvas-preset/functions/setAudioToggle"

export const frequencies = {}

export default function getAudioFrequencies(audioPath: string) {
    return new Promise(resolve => {
        let analyzer;
        if (!frequencies[audioPath]) {
            frequencies[audioPath] = {
                getFrequencies: () => new Float32Array(1024)
            }
            setAudioToggle({
                src: `../../audios/${audioPath}`,
                toggler: window,
                triggerBy: 'mousedown',
                audio: null
            }, audio => {
                if (!analyzer) {
                    analyzer = analyseAudio(audio)
                    frequencies[audioPath] = analyzer
                }
                audio.pause()
            })
        }
        resolve(frequencies[audioPath].getFrequencies())
    })
}