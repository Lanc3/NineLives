/**
 * This is the consctuctor of the player class 
 * @param {vector} startPosition this is the starts position of the player
 * @param {number} width this is the widthn of the player
 * @param {number} speed this is the speed of the player
 * @param {color} startColor this is the color of the player
 * @constructor
 */
const playerState = {
    IDLE: 'idle',
    JUMPING: 'jumping',
    FALLING: 'falling',
    LEFT: 'left',
    RIGHT: 'right'
}
class Player extends rectangle
{
    constructor(startPosition, width, height, speed, inputController)
    {
        super(startPosition.x, startPosition.y, width, height);
        this.position = startPosition;
        this.direction = new vector(0,0);
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.inputControlller = inputController;
        this.spriteSheet = new Animation("playerOne",this.position, 10, width, height);
        this.spriteSheet.setCurrentAnimation("Left");
        this.collisionManager = new CollisionManager();
        this.collisionObjects;
        this.self = this;
        this.currentPlayerState = playerState.IDLE;
        this.gravity = 0.5;
        this.standing = false;
        this.jumpHeight = 0;
        this.jumpSpeed = 1;
        
    }
    /**
    * Function to to update the local position and the rects position
    */
    update(dt)
    {
        this.handleInput(dt);


        this.jumpHeight -= 0.006 *dt;
        if (this.jumpHeight <= 0)
        {
            this.jumpHeight = 0;
        }
        this.position.y += (this.gravity - this.jumpHeight) * dt;
        
        
        this.spriteSheet.position = this.position;
        super.setPosition(this.position)
        this.wrapPlayerInScreen();

        this.calculateCollisions();
       
       
    }
    jump()
    {
        
        if (this.standing) {
            this.standing = false;
            this.jumpHeight = 2.5;
            if (this.spriteSheet.currentAnimationName !== "Jump") {
                this.spriteSheet.setCurrentAnimation("Jump");
                this.spriteSheet.setAnimationSpeed(5);
            }
        }
    }
    moveTo(point,dt)
    {
        let distance = Math.abs(point.x - this.position.x);
        if (point.x !== -1) {
            if (point.x > this.position.x) {
                this.position.x += this.speed * dt;
            }
            if (point.x < this.position.x) {
                this.position.x -= this.speed * dt;
            }
        }
    }
    calculateCollisions()
    {
        var that = this;
        if (this.collisionObjects !== 'undefined' || this.collisionObjects !== null) {
            this.collisionObjects.forEach(function (element) {
                var arrayOfPlatforms = element.platformList;
                arrayOfPlatforms.forEach(function (platform) {
                    if (that.intersects(platform)) {
                        
                        var offsetX = that.collisionManager.getHorizontalIntersectionDepth(that, platform);
                        var offsetY = that.collisionManager.getVirticalIntersectionDepth(that, platform);
    
                        if (Math.abs(offsetX) > Math.abs(offsetY)) {
                            that.position.y += offsetY;
                            that.standing = true;
                        }
                        else {
                            that.position.x += offsetX;
                        }
                    }

                    
                });
            });
        }
    }
    wrapPlayerInScreen()
    {
        if (this.position.x >= Renderer.physicalScreenWidth)
        {
            this.position.x = 5;
        }
        else if (this.position.x <= -this.width)
        {
            this.position.x = Renderer.physicalScreenWidth;
        }

        if (this.position.y >= Renderer.physicalScreenHeight)
        {
            this.reset();
        }
    }
    reset()
    {
        this.position = new vector(200, 50);
    }

    handleInput(dt)
    {
        let command = this.inputControlller.handleInput(dt);
        if (command)
        {
            command.execute(this);
        }
       
    }
    setCollisionObjects(objectList)
    {
        this.collisionObjects = objectList;
    }
    intersects(object)
    {
        return super.intersects(object);
    }

    /**
    * Function that sets a new position for the player
    * @param {vector} newPosition new position for the player
    */
    setPosition(newPosition)
    {
        this.position = newPosition;
    }
    /**
    * Draws the rectangle shape
    */
    draw()
    {
        this.spriteSheet.draw();
    }
}