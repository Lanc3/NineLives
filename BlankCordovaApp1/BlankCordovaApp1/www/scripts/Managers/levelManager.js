class levelManger
{
    constructor()
    {
        this.resetPositionValue = -Renderer.physicalScreenHeight;
        this.maxDistance = Renderer.physicalScreenHeight;
        this.firstCell = new cell("jungleBackground", new vector(0, 0));
        this.otherCell = new cell("skyBackground", new vector(0, this.resetPositionValue));
        this.arrayOfCells = [];
        this.arrayOfCells.push(this.firstCell);
        this.arrayOfCells.push(this.otherCell);
        this.speed = 0.2;
        
    }
    update(dt)
    {
        var that = this;
        this.arrayOfCells.forEach(function (element) {
            element.position.y += that.speed * dt;
            element.update(dt);
            if (element.position.y > that.maxDistance) {
                element.position.y = that.resetPositionValue;
                element.changeBackground("skyBackground");
               
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