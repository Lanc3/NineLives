class animation
{
    constructor(assetName,fps)
    {
        this.image = assetManager.getAsset(assetName).image;
        this.cellWidth;
        this.cellHeight;
        this.animationData = assetManager.getAsset(assetName).jsonData;
        this.animationList = this.animationData;
        this.animationIndex = 0;
         this.tickAmount = fps;
         this.tick = 0;
         this.IsLooping = true;
         this.x = 0;
         this.y = 0;
         this.scale = 1;
         this.rotation = 0;
         this.isVisible = true;
         this.atEndFrame = false;
         this.isDead = false;
    }
    setVisibility(isVisible)
    {
        this.isVisible = isVisible;
    }
    stop()
    {
        this.IsLooping = false;
    }
    start()
    {
        this.IsLooping = true;
    }
    setPosition(newPosition)
    {
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
    setRotation(angle)
    {
        this.rotation = angle;
    }
    setScale(newScale)
    {
        this.scale = scale;
    }
    draw()
    {
        if(this.IsLooping)
	    {
		    this.tick++;
		    if(this.tick > this.tickAmount)
		    {
			    this.tick = 0;
			    this.animationIndex++
			    if(this.animationIndex === this.animationList.animationRectList.length)
			    {
				    this.atEndFrame = true;
				    this.animationIndex = 0;
			    }
			    else
			    {
				    this.atEndFrame = false;
			    }   
		    }
		    ctx.save();
	        ctx.translate(this.x, this.y);
	        ctx.rotate(this.rotation * Math.PI / 180);
	        if(this.isVisible)
	        {
	    	    ctx.drawImage(this.image, this.animationList.animationRectList[this.animationIndex].x,
	    				this.animationList.animationRectList[this.animationIndex].y, 
						this.animationList.animationRectList[this.animationIndex].width,
						this.animationList.animationRectList[this.animationIndex].height,
						-this.animationList.animationRectList[this.animationIndex].width / 2, -this.animationList.animationRectList[this.animationIndex].height / 2,
						this.animationList.animationRectList[this.animationIndex].width * this.scale,
						this.animationList.animationRectList[this.animationIndex].height * this.scale);
		    }
		    ctx.restore();
	    }
    }
    clean()
    {
        this.isDead = true;
    }
}