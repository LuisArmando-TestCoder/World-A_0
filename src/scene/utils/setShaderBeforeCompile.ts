export default  function setShaderBeforeCompile(
    shader,
) {
    shader.vertexShader = this.vertexShaderGlobalScope
        +
        shader.vertexShader.replace(
            "#include <fog_vertex>",
            this.vertexShaderMainScope,
        )

    this.material.userData.shader = shader
}