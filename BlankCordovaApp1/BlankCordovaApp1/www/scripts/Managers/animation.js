class Animation
{
    constructor(spriteSheetAssetName,position,fps,width,height)
    {
        this.spriteSheet = assetMan.getAsset(spriteSheetAssetName);
        this.position = position;
        this.currentAnimation;
        this.tickAmount = fps;
        this.tick = 0;
        this.IsLooping = true;
        this.scale = 1;
        this.isVisible = true;
        this.animationIndex = 0;
        this.displayWidth = width * this.scale;
        this.displayHeight = height + this.scale;
        this.currentAnimationName;
    }
    setCurrentAnimation(animation)
    {
        var animationArray = this.spriteSheet.jsonData.animationList;
        this.currentAnimationName = animation;
        var that = this;
        animationArray.forEach(function (element)
        {
            if (element.name === animation)
            {
                that.currentAnimation = element.spriteSheetData;
                that.animationIndex = 0;
            }
        });
       
    }
    setAnimationSpeed(speed)
    {
        this.tickAmount = speed;
    }
    getCurrentAnimationName()
    {
        return this.currentAnimationName;
    }
    setPosition(position)
    {
        this.position = position;
    }
    setScale(scale)
    {
        this.scale = scale;
    }
    draw()
    {
        if (this.IsLooping)
        {
            this.tick++;
            if (this.tick > this.tickAmount)
            {
                this.tick = 0;
                this.animationIndex++
                
                if (this.animationIndex >= this.currentAnimation.length)
                {
                    this.animationIndex = 0;
                }
            }

            if (this.currentAnimation[this.animationIndex] !== 'undefined' || this.currentAnimation[this.animationIndex] !== null)
            {
                Renderer.drawImage(this.spriteSheet.texture, this.spriteSheet.width, this.spriteSheet.height, this.currentAnimation[this.animationIndex].x,
                    this.currentAnimation[this.animationIndex].y, this.currentAnimation[this.animationIndex].width, this.currentAnimation[this.animationIndex].height,
                    this.position.x, this.position.y, this.displayWidth, this.displayHeight)
            }

        }
    }
}