class cell {
    constructor(image, position) {
        this.backgroundImage = assetMan.getAsset(image);
        this.position = position;
        this.platformList = [];
        this.screenHalfWidth = Renderer.physicalScreenWidth / 2;
        this.platformList.push(new platform(new vector(this.screenHalfWidth, this.position.y + 200), 80, 50,"platform"));
        this.yPositionAdjust = 5;
    }
    draw()
    {
        Renderer.drawImage(this.backgroundImage.texture, this.backgroundImage.width, this.backgroundImage.height, 0, 0,
            this.backgroundImage.width, this.backgroundImage.height, this.position.x, this.position.y, Renderer.physicalScreenWidth, Renderer.physicalScreenHeight + this.yPositionAdjust);

        this.platformList.forEach(function (element) {
            element.draw();
        });
    }
    addPlatform(position, width, height,image)
    {
        this.platformList.push(new platform(position, width, height, image));
    }
    replacePlatforms()
    {

    }
    update(dt)
    {
        var that = this;
        this.platformList.forEach(function (element) {
            //element.setPosition();// = new vector(that.screenHalfWidth, that.position.y + 200);
        });
    }
    changeBackground(image)
    {
        this.backgroundImage = assetMan.getAsset(image);
    }
}