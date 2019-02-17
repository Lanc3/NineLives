
class audioManager {
    constructor() {
       
    }
    playSound(name, looping) {
         //retrieve the buffer we stored earlier
        this.sound = assetMan.getAsset(name);
        if (this.sound === undefined) {
            console.log("Sound doesn't exist or hasn't been loaded")
            return;
        }
        //create a buffer source - used to play once and then a new one must be made
        this.source = assetMan.audioContext.createBufferSource();
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
}