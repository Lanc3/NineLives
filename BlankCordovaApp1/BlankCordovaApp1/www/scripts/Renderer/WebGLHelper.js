class WebGLHelper
{
    constructor()
    {
        this.result = null;
        var self = this;
        
    }
    compileShader(gl,shaderSource,shaderType)
    {
        // Create the shader object
        var shader = gl.createShader(shaderType);
 
        // Set the shader source code.
        gl.shaderSource(shader, shaderSource);
 
        // Compile the shader
        gl.compileShader(shader);
        // Check if it compiled
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!success) {
            // Something went wrong during compilation; get the error
            throw "could not compile shader:" + gl.getShaderInfoLog(shader);
        }
 
        return shader;
    }
    /**
    * Creates a shader from the content of a script tag.
    *
    * @param {!WebGLRenderingContext} gl The WebGL Context.
    * @param {string} fragmentShaderPath path to fragment shader
    * @param {string} vertexShaderPath. path to the vertex shader
    * @return {!WebGLProgram} A shader program.
    */
    createProgramFromScripts(gl, fragmentShaderPath, vertexShaderPath)
    {
        this.vertexShaderSource = assetMan.getAsset("vert").shader;
        this.fragmentShaderSource = assetMan.getAsset("frag").shader;
        this.vertexShader = this.compileShader(gl , this.vertexShaderSource , gl.VERTEX_SHADER);
        this.fragmentShader = this.compileShader(gl , this.fragmentShaderSource , gl.FRAGMENT_SHADER);
        this.program = gl.createProgram();
 
        // attach the shaders.
        gl.attachShader(this.program, this.vertexShader);
        gl.attachShader(this.program, this.fragmentShader);
 
        // link the program.
        gl.linkProgram(this.program);
 
        // Check if it linked.
        this.success = gl.getProgramParameter(this.program, gl.LINK_STATUS);
        if (!this.success) {
              // something went wrong with the link
              throw ("program filed to link:" + gl.getProgramInfoLog (this.program));
        }
        return this.program;
    }

}
