class renderer
{
    constructor(assetManager)
    {
        this.canvas;
        this.gl;
        this.physicalScreenWidth = window.screen.width;
        this.physicalScreenHeight = window.screen.height;
        this.webglHelper = new WebGLHelper(assetManager);
        this.initCanvas(this.physicalScreenWidth, this.physicalScreenHeight)
        if(!this.gl)
        {
            console.log("webGL not supported");
        }


        
        //this.createWebGLProgram();
    }
    initCanvas(width, height) {
        // Use the document object to create a new element canvas.
        this.canvas = document.createElement("canvas");
        // We want this to be a 2D canvas.
        this.gl = this.canvas.getContext("webgl");
        this.canvas.width = width;
        this.canvas.height = height;

        // Width-height-ratio of game resolution
        this.game_ratio = this.canvas.width / this.canvas.height;
        // Make div full height of browser and keep the ratio of game resolution
        this.div = document.getElementById('game-app');
        this.div.style.width = (window.innerHeight * this.game_ratio) + 'px';
        this.div.style.height = window.innerHeight + 'px';

        this.dpi_w = (parseInt(this.div.style.width) / this.canvas.width);
        this.dpi_h = (parseInt(this.div.style.height) / this.canvas.height);

        this.height = window.innerHeight * (this.dpi_w / this.dpi_h);
        this.width = this.height * this.game_ratio;

        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        this.div.appendChild(this.canvas);
    }

    createWebGLProgram()
    {
        this.shaderProgram = this.webglHelper.createProgramFromScripts(this.gl,'Shaders/fragment.shader','Shaders/vertex.shader');
        // look up where the vertex data needs to go.
        this.positionLocation = this.gl.getAttribLocation(this.shaderProgram, "a_position");
        this.texcoordLocation = this.gl.getAttribLocation(this.shaderProgram, "a_texcoord");

        // lookup uniforms
        this.matrixLocation = this.gl.getUniformLocation(this.shaderProgram, "u_matrix");
        this.textureMatrixLocation = this.gl.getUniformLocation(this.shaderProgram, "u_textureMatrix");
        this.textureLocation = this.gl.getUniformLocation(this.shaderProgram, "u_texture");

        // Create a buffer.
        this.positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

        // Put a unit quad in the buffer
        this.positions = [
                    0, 0,
                    0, 1,
                    1, 0,
                    1, 0,
                    0, 1,
                    1, 1,]

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);

        // Create a buffer for texture coords
        this.texcoordBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordBuffer);

        // Put texcoords in the buffer
        this.texcoords = [
                0, 0,
                0, 1,
                1, 0,
                1, 0,
                0, 1,
                1, 1,]

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.texcoords), this.gl.STATIC_DRAW);
    }
    getCTX()
    {
        return this.ctx;
    }
    drawImage(texture,textureWidth,textureHeight, sourceX,sourceY,soureceWidth,sourceHeight,dstX,dstY,dstWidth,dstHeight)
    {
        //allows the function to take null values and keep a desired effect
        if (dstX === undefined) 
        {
            dstX = sourceX;
            sourceX = 0;
        }
        if (dstY === undefined) 
        {
            dstY = sourceY;
            sourceY = 0;
        }
        if (soureceWidth === undefined) 
        {
            soureceWidth = textureWidth;
        }
        if (sourceHeight === undefined) 
        {
            sourceHeight = textureHeight;
        }
        if (dstWidth === undefined) 
        {
            dstWidth = soureceWidth;
            soureceWidth = textureWidth;
        }
        if (dstHeight === undefined) 
        {
            dstHeight = sourceHeight;
            sourceHeight = textureHeight;
        }

        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

        // Tell WebGL to use our shader program pair
        this.gl.useProgram(this.shaderProgram);

        // Setup the attributes to pull data from our buffers
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.enableVertexAttribArray(this.positionLocation);
        this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordBuffer);
        this.gl.enableVertexAttribArray(this.texcoordLocation);
        this.gl.vertexAttribPointer(this.texcoordLocation, 2, this.gl.FLOAT, false, 0, 0);

        // this matirx will convert from pixels to clip space
        var matrix = m4.orthographic(0, this.gl.canvas.width, this.gl.canvas.height, 0, -1, 1);

        // this matrix will translate our quad to dstX, dstY
        matrix = m4.translate(matrix, dstX, dstY, 0);

        // this matrix will scale our 1 unit quad
        // from 1 unit to texWidth, texHeight units
        matrix = m4.scale(matrix, dstWidth, dstHeight, 1);

        // Set the matrix.
        this.gl.uniformMatrix4fv(this.matrixLocation, false, matrix);

        // Because texture coordinates go from 0 to 1
        // and because our texture coordinates are already a unit quad
        // we can select an area of the texture by scaling the unit quad
        // down
        var texMatrix = m4.translation(sourceX / textureWidth, sourceY / textureHeight, 0);
        texMatrix = m4.scale(texMatrix, soureceWidth / textureWidth, sourceHeight / textureHeight, 1);

        // Set the texture matrix.
        this.gl.uniformMatrix4fv(this.textureMatrixLocation, false, texMatrix);

        // Tell the shader to get the texture from texture unit 0
        this.gl.uniform1i(this.textureLocation, 0);

        // draw the quad (2 triangles, 6 vertices)
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }

}