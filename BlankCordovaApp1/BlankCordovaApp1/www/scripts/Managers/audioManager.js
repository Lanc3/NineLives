
class audioManager {
    constructor() {
        // Create a gain node.
        
        this.source;
    }
    playSound(name, looping) {
         //retrieve the buffer we stored earlier
        this.sound = assetMan.getAsset(name).audio;
        if (this.sound === undefined) {
            console.log("Sound doesn't exist or hasn't been loaded")
            return;
        }
        
        //create a buffer source - used to play once and then a new one must be made
        this.source = assetMan.audioContext.createBufferSource();
        // Connect the source to the gain node.
        this.gainNode = assetMan.audioContext.createGain();
        this.gainNode.value = 0;
        
        // Connect the gain node to the destination.
        this.gainNode.connect(assetMan.audioContext.destination);
        this.source.connect(this.gainNode);
        this.source.buffer = this.sound;
        this.source.loop = false;
        this.source.connect(assetMan.audioContext.destination);
        this.source.start ? this.source.start(0) : this.source.noteOn(0); // Play immediately.
        var that = this;
        if (looping) {
            this.source.onended = function () {
                that.playSound(name, looping);
            }
        }
    }
    stopSound()
    {
        //this.source.stop;
    }
    setVolume(value)
    {
        //this.gainNode.value = value;
    }
}