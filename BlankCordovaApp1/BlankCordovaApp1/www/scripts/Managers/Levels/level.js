class level {
    constructor()
    {
        this.resetPositionValue = -Renderer.physicalScreenHeight * 2;
        this.maxDistance = Renderer.physicalScreenHeight;
        this.arrayOfCells = [];  
        this.firstCell = new cell("skyLoop", new vector(0, 0));
        this.otherCell = new cell("skyLoop", new vector(0, this.resetPositionValue / 2));
        this.finalCell = new cell("skyLoop", new vector(0, this.resetPositionValue));
    }
    update(dt)
    {
        var that = this;
        this.arrayOfCells.forEach(function (element) {
            //element.position.y += that.speed * dt;
            element.update(dt);
            if (element.position.y > that.maxDistance) {
                element.position.y = that.resetPositionValue;

            }
        });
    }
    draw()
    {
        this.arrayOfCells.forEach(function (element) {
            element.draw();
        });
    }
}