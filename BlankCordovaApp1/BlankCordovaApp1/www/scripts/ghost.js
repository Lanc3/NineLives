class ghost extends rectangle {
    constructor(startPosition, width, height) {
        super(startPosition.x, startPosition.y, width, height, collisionType.GHOST);
        super.setPosition(startPosition);
        this.position = startPosition;
        this.startPosition = new vector(startPosition.x, startPosition.y);
        this.isAlive = true;
        
        this.spriteSheet = new Animation("ghost", this.position, 10, width, height);
        this.spriteSheet.setCurrentAnimation("idle");
        this.speed = 0.1;
        this.distance;
        this.direction = new vector(0,0);
        this.timeToMove = 5000;
        this.timer = 0;
    }
   
    setPosition(position) {

        this.position.y += position.y
        super.setPosition(this.position);
    }
    update(dt) {
        this.timer += dt;
        if (this.isAlive && this.direction !== 'undefined') {
            if (this.direction !== 'undefined') {
                this.position.add(this.direction.multiply(this.speed * dt));
            }
        }
    }
    moveTo(position) {
            this.distance = this.position.distance(position);

            this.direction = position.subtract(this.position);
            this.direction.normalize();
            this.timer = 0;
        
    }
    draw() {
        if (this.isAlive) {
            this.spriteSheet.draw();
            super.draw();
        }
    }
}