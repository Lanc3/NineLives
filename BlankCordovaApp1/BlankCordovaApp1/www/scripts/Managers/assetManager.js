class assetManager
{
    constructor()
    {
        this.successCount = 0;
        this.errorCount = 0;
        this.downloadQueue = [];
        //this.self = this;
        this.shaderQueue = [];
        this.shaderSuccessCount = 0;
        this.shaderErrorCount = 0;
        this.shaderCache = {};
        var shaderData = null;
        this.percentComplete = 0;
        this.assetCache = {};
        this.assetQueue = [];
        this.assetSuccessCount = 0;
        this.assetErrorCount = 0;
       

        this.gl = Renderer.gl;
        if(!this.gl)
        {
            console.log("webGL not supported");
        }
    }
    queueAssetForDownload(type,sourcePath,assetName)
    {
        this.assetQueue.push({type:type,sourcePath:sourcePath,assetName:assetName});
    }

    queueShaderDownload(name,path)
    {
        this.shaderQueue.push({name:name, path:path});
    }

    queueDownload(name,imagePath,json)
    {
        this.downloadQueue.push({name:name, imagePath:imagePath, json:json});
    }

    downloadAssets(callback)
    {
        //Scenario this if block deals with:
        //if the asset manager doesn’t have any assets queued up for download? 
        //The isDone method is never triggered, and the game never starts.  
        if (this.assetQueue.length === 0) 
        {
           callback(true);
        }
        if (this.assetQueue.length > 0) 
        {
            

            for (var i = 0; i < this.assetQueue.length; i++) 
            {
                var path = this.assetQueue[i].sourcePath;
                var name = this.assetQueue[i].assetName;
                var type = this.assetQueue[i].type;
                var webGLTexture = this.createWebGLTexture(path,name,type);
            }
        }
    }
    createWebGLTexture(url,name,type)
    {
        var tex = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
        // Fill the texture with a 1x1 blue pixel.
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE,
            new Uint8Array([0, 0, 255, 255]));
        // let's assume all images are not a power of 2
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        var textureInfo = {
            width: 1,   // we don't know the size until it loads
            height: 1,
            texture: tex,
        };
        var that = this;
        var img = new Image();
        img.onload = function ()
        {
            textureInfo.width = img.width;
            textureInfo.height = img.height;

            that.gl.bindTexture(that.gl.TEXTURE_2D, textureInfo.texture);
            that.gl.texImage2D(that.gl.TEXTURE_2D, 0, that.gl.RGBA, that.gl.RGBA, that.gl.UNSIGNED_BYTE, img);
            that.assetCache[name] = new Texture(type, url, textureInfo.texture, textureInfo.width, textureInfo.height);
            that.percentage(that.assetSuccessCount, that.assetQueue.length);
            that.assetSuccessCount += 1;
            
        }
        img.src = url;

        return textureInfo;
    }

    readShaderFile(url,self)
    {
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        var that = this;
        // Hook the event that gets called as the request progresses
        request.onload = function ()
        {
            // If the request is "DONE" (completed or failed)
            if (request.readyState == 4 && request.status == 200) 
            {
                self.shaderData = request.responseText;
                 
            }
        }
        request.send(null); 
        return self.shaderData;
    }

    readJson(filename)
    {
        this.animationData = null;
        var jsonfile = new XMLHttpRequest();   
        jsonfile.open("GET", filename, false);
        var self = this;
        jsonfile.onload = function() 
        {
            if (jsonfile.readyState == 4 && jsonfile.status == 200) 
            {
                self.animationData = JSON.parse(jsonfile.responseText); //data now contains the data from your json file#
  
            }
        }    
        //This sends the request
        jsonfile.send(null);
        return self.animationData;
    }

    downloadAllShaders(callback)
    {
         //Scenario this if block deals with:
        //if the asset manager doesn’t have any assets queued up for download? 
        //The isDone method is never triggered, and the game never starts.  
        if (this.shaderQueue.length === 0) 
        {
           callback(true);
        }
        if (this.shaderQueue.length > 0) 
        {
            for (var i = 0; i < this.shaderQueue.length; i++) 
            {
                var path = this.shaderQueue[i].path;
                var assetName = this.shaderQueue[i].name;
                var shader =  this.readShaderFile(path,this);
                this.shaderSuccessCount ++;
                this.shaderCache[assetName] = {text:shader};
            }
            if(this.isShaderDone)
            {
                callback;
            }
        }
    }

    downloadAll(callback)
    {
        //Scenario this if block deals with:
        //if the asset manager doesn’t have any assets queued up for download? 
        //The isDone method is never triggered, and the game never starts.  
        if (this.downloadQueue.length === 0) 
        {
           callback(true);
        }
        if (this.downloadQueue.length > 0) 
        {
            for (var i = 0; i < this.downloadQueue.length; i++) 
            {
                var path = this.downloadQueue[i].imagePath;
                var assetName = this.downloadQueue[i].name;
                var json =  this.readJSON(this.downloadQueue[0].json);
                var img = new Image();
                var that = this;

                img.onload =  function() 
                {
                    that.successCount += 1;
                    if (that.isDone()) 
                    {
                        
                    callback;
                    }
                }

                img.onerror = function() 
                {
                    that.errorCount += 1;
                    if (that.isDone()) 
                    {
                    callback;
                    }
                }
                img.src = path;
                this.cache[assetName] = {image:img,jsonData:json};
            }
        }
    }

    isDone()
    {
        var count = this.successCount + this.errorCount;
        var complete = (this.downloadQueue.length == count);
        return complete;
    }
    isShaderDone()
    {
        var count = this.shaderSuccessCount + this.shaderErrorCount;
        var complete = (this.shaderQueue.length == count);
        return complete;
    }
    areAssetsDone()
    {
        var count = this.assetSuccessCount + this.assetErrorCount;
        var complete = (this.assetQueue.length == count);
        return complete;
    }
    getShader(name)
    {
        return this.shaderCache[name];
    }
    
    getAsset(name)
    {
        return this.assetCache[name];
    }
    percentage(current, max)
    {
        var percentComplete = (current * 100) / max;
        var elem = document.getElementById("myBar");
        var width = 1;
        var id = setInterval(frame, 100);
        var that = this;
        function frame() {
            if (width >= 100) {
                clearInterval(id);
            } else {
                width = percentComplete;
                elem.style.width = width + '%';
            }
        }
    }
}