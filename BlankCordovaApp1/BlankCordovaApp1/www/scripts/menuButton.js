/**
 * This is the base scene class the the others will inherit from
 * @constructor
 */
class menuButton extends rectangle {
    constructor(imageName, x, y, width, height) {
        super(x, y, width, height);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.tex = assetMan.getAsset(imageName);
    }
    /**
    * This is the update function for this button
    * here we check if a press has fired
    * @param {number} dt this is the delta time
    */
    update(dt) {

    }
    /**
    * This is the render loop for rendering the button
    */
    draw()
    {
        Renderer.drawImage(this.tex.texture, this.tex.width, this.tex.height, 0, 0, this.tex.width, this.tex.height, this.x, this.y, this.width, this.height);
    }

}