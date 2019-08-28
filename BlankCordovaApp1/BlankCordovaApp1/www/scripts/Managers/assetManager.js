class assetManager
{
    constructor()
    {
        this.successCount = 0;
        this.errorCount = 0;
        this.percentComplete = 0;
        this.assetCache = {};
        this.assetQueue = [];
        this.assetSuccessCount = 0;
        this.assetErrorCount = 0;
        this.jsonData;

        this.gl = Renderer.gl;
        if(!this.gl)
        {
            console.log("webGL not supported");
        }
        this.downloadCallback;

        //It is setup in unlock()
        this.audioContext;
        this.self = this;
        this.unlock();
        this.finishedEvent = new CustomEvent("AssetsLoadedEvent");
    }
    unlock() {
        try {
            // Fix up for prefixing
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();

        }
        catch (e) {
            alert('Web Audio API is not supported in this browser');
        }

        // create empty buffer
        var buffer = this.audioContext.createBuffer(1, 1, 22050);
        var source = this.audioContext.createBufferSource();
        source.buffer = buffer;

        // connect to output (your speakers)
        source.connect(this.audioContext.destination);

        source.onended = function () {
            this.callback;
        }
        source.start ? source.start(0) : source.noteOn(0);

    }
    
    soundLoaded(name) {

        for (var i = 0; i < this.queue.length; i++) {
            if (name == this.queue[i].name) {
                this.queue.splice(i, 1);
            }
        }


        if (this.queue.length == 0) {
            this.downloadCallback;
        }
    }

    syncStream(node) { // should be done by api itself. and hopefully will.

        var buf8 = new Uint8Array(node.buf);
        buf8.indexOf = Array.prototype.indexOf;
        var i = node.sync, b = buf8;
        while (1) {
            node.retry++;
            i = b.indexOf(0xFF, i); if (i == -1 || (b[i + 1] & 0xE0 == 0xE0)) break;
            i++;
        }
        if (i != -1) {
            var tmp = node.buf.slice(i); //carefull there it returns copy
            delete (node.buf); node.buf = null;
            node.buf = tmp;
            node.sync = i;
            return true;
        }
        return false;
    }
    queueAssetForDownload(type,sourcePath,assetName,jsonData)
    {
        this.assetQueue.push({ type: type, sourcePath: sourcePath, assetName: assetName, jsonData: jsonData });
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
                var json = this.assetQueue[i].jsonData;
                if (type === "Texture2D")
                {
                    this.createWebGLTexture(path, name, type);
                }
                else if (type === "Shader")
                {
                    this.createShaderFile(path, name, type, this);
                }
                else if (type === "Audio")
                {
                    this.createAudioFile(path,name, type);
                }
                else if (type === "Animation")
                {
                    this.createJsonAsset(path, name, type,json);
                }
                
            }
        }
    }
    createJsonAsset(path, name, type,json)
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
        img.onload = function () {
            textureInfo.width = img.width;
            textureInfo.height = img.height;
            that.jsonData = that.readJson(json);
            that.gl.bindTexture(that.gl.TEXTURE_2D, textureInfo.texture);
            that.gl.texImage2D(that.gl.TEXTURE_2D, 0, that.gl.RGBA, that.gl.RGBA, that.gl.UNSIGNED_BYTE, img);
            that.assetCache[name] = new SpriteSheetData(type, path, name, textureInfo.texture, textureInfo.width, textureInfo.height, that.jsonData);
            that.percentage(that.assetSuccessCount, that.assetQueue.length);
            that.assetSuccessCount += 1;

        }
        img.src = path;

        return textureInfo;
    }
    createAudioFile(url,name,type)
    {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        var that = this;
        xhr.onload = function (e) {
            //buffer containing sound returned by xhr
            var arrayBuffer = this.response;
            that.decode({ buf: arrayBuffer }, url,name,type);

        };
        //send the xhr request to download the sound file
        xhr.send();
    }
    decode(node, url,name,type) {
        var that = this;
        try {
            this.audioContext.decodeAudioData(node.buf,
                function (decoded) {

                    node.source = that.audioContext.createBufferSource();
                    node.source.connect(that.audioContext.destination);
                    that.assetCache[name] = new Audio(type, url, name, decoded);
                    that.percentage(that.assetSuccessCount, that.assetQueue.length);
                    that.assetSuccessCount += 1;
                },
                function () { // only on error attempt to sync on frame boundary
                    console.log("err")
                    if (syncStream(node)) decode(node, name);
                });


        }
        catch (e) {
            console.log('decode exception', e.message);
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
            that.assetCache[name] = new Texture(type, url,name, textureInfo.texture, textureInfo.width, textureInfo.height);
            that.percentage(that.assetSuccessCount, that.assetQueue.length);
            that.assetSuccessCount += 1;
            
        }
        img.src = url;

        return textureInfo;
    }

    createShaderFile(url,name,type,that)
    {
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        // Hook the event that gets called as the request progresses
        request.onload = function ()
        {
            // If the request is "DONE" (completed or failed)
            if (request.readyState == 4 && request.status == 200) 
            {
                that.assetCache[name] = new Shader(type, url, name, request.responseText);
                that.percentage(that.assetSuccessCount, that.assetQueue.length);
                that.assetSuccessCount += 1;
            }
        }
        request.send(null); 
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


    areAssetsDone()
    {
        var count = this.assetSuccessCount + this.assetErrorCount;
        var complete = (this.assetQueue.length === count);
        return complete;
    }
    getAsset(name)
    {
        return this.assetCache[name];
    }
    percentage(current, max)
    {
        var percentComplete = ((current + 1) * 100) / max;
        var elem = document.getElementById("myBar");
        var width = 1;
        width = percentComplete;
        elem.style.width = width + '%'
        if (percentComplete === 100)
        {
            document.body.dispatchEvent(this.finishedEvent);
        }
    }
}