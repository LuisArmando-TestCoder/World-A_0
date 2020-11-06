import React, { useEffect } from "react"
import render from "../scene/render"
import "./canvas.scss"

const canvas = () => {
    useEffect(render, [])
    return <canvas contentEditable/>
}

export default canvas
