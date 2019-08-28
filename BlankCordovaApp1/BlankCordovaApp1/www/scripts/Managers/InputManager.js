/**
 * This is the consctuctor of the input manager class 
 * @constructor
 */
var SwipeDirection = Object.freeze({ "UP": 1, "DOWN": 2, "LEFT": 3, "RIGHT": 4 ,"NONE":5 });
class InputManager extends Invoker
{
    constructor() {
        super();
        if ('ontouchstart' in window) {
            console.log("touchable Device")
            this.touchable = true;
        }
        else {
            console.log("Not touchable")
            this.touchable = false;
        }
        /**
        * the vector position of the position on the canvas for a touch event
        * @type {vector} 
        */
        this.touchCanvasPosition = new vector(-1, -1);
        this.movingTouch = new vector(-1, -1);
        /**
        * this is a boolean is true if touching
        * @type {boolean} 
        */
        this.touching = false;

        /**
        * these are the ongoing touches we store
        * @type {array} 
        */
        this.ongoingTouches = [];

        /**
        * this is the list of all the start points we test against for swipes
        * @type {array} 
        */
        this.startTouchList = [];

        /**
        * this is the store of all the info 
        * @type {inputInfo} 
        */
        this.inputInfo;


        /**
        * the time from touch start
        * @type {number} 
        */
        this.startTouchTime;

        this.compass = navigator.compass;
        this.options = { frequency: 50 };
        this.Pitch;
        this.Roll;
        let that = this;
        this.gyroWatchID = navigator.accelerometer.watchAcceleration(passRight(this.onSuccess, that), that.onError, that.options);
        this.swipeDirection;
        this.startX;
        this.startY;
        this.distX;
        this.distY;
        this.threshold = 10; //required min distance traveled to be considered swipe
        this.restraint = 100; // maximum distance allowed at the same time in perpendicular direction
        this.allowedTime = 300; // maximum time allowed to travel that distance
        this.elapsedTime;
        this.startTime;
        this.jumpCommand = new JumpCommand(CommandState.CREATED);
        this.moveCommand = new MoveCommand(CommandState.CREATED);
        this.moving;
        this.setupTouchDevice(this);
    }

    /**
    * this is the setup Touch device method responsible for the creation
    * of the event listeners
    * @param {this} self passing the self object to access this object variables because of scope 
    * 
    */
    setupTouchDevice(self) {
        if (this.touchable) {
            document.addEventListener('touchstart', passRight(this.onTouchStart, self), { passive: false });
            document.addEventListener('touchmove', passRight(this.onTouchMove, self), { passive: false });
            document.addEventListener('touchend', passRight(this.onTouchEnd, self), { passive: false });
        }
    }
    /**
    *this resets the canvas
    */
    resetCanvas() {
        //todo reset logic if needed
    }
    getGyroscopeData(speed)
    {
       
    }
    onSuccess(accel,self)
    {
        //self.speed = speed;
        self.Roll = Math.atan2(accel.y, accel.z) * 180 / Math.PI;
        self.Pitch = Math.atan2(-accel.x, Math.sqrt(accel.y * accel.y + accel.z * accel.z)) * 180 / Math.PI;
        //document.getElementById("gyro").innerHTML = " Pitch: " + this.Pitch;
    };

    onError()
    {
        //document.getElementById("gyro").innerHTML = "error";
    };
    /**
     * this is the ontouch start event. it is called when the touch start event fires, 
     * @param {event} e this is the event passed through
     * @param {this} self this is the self object for scope
     */
    onTouchStart(e, self) {
        e.preventDefault();
        let touches = e.changedTouches[0];

        self.swipeDirection = 'none';
        self.distance = 0;
        self.startX = touches.pageX
        self.startY = touches.pageY
        self.startTime = new Date().getTime() // record time when finger first makes contact with surface
        //sets the points for single touches for buttons ect
        self.touchCanvasPosition = new vector(touches.pageX, touches.pageY);
        self.movingTouch = new vector(touches.pageX, touches.pageY);
        self.touching = true;
    }
    /**
     * this is the on touch end function, it fires whent he touch end event is called
     * @param {*} e this is the event passed through
     * @param {*} self this is the self object for scope
     */
    onTouchEnd(e, self) {
        e.preventDefault();
        let touches = e.changedTouches[0];

        self.distX = touches.pageX - self.startX // get horizontal dist traveled by finger while in contact with surface
        self.distY = touches.pageY - self.startY // get vertical dist traveled by finger while in contact with surface
        self.elapsedTime = new Date().getTime() - self.startTime // get time elapsed
        if (self.elapsedTime <= self.allowedTime) { // first condition for awipe met
            if (Math.abs(self.distX) >= self.threshold && Math.abs(self.distY) <= self.restraint) { // 2nd condition for horizontal swipe met
                self.swipeDirection = (self.distX < 0) ? SwipeDirection.LEFT : SwipeDirection.RIGHT // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(self.distY) >= self.threshold && Math.abs(self.distX) <= self.restraint) { // 2nd condition for vertical swipe met
                self.swipeDirection = (self.distY < 0) ? SwipeDirection.UP : SwipeDirection.DOWN // if dist traveled is negative, it indicates up swipe
            }
        }
        self.touchCanvasPosition = new vector(-1,-1);
        self.movingTouch = new vector(-1, -1);
        self.moving = false;
    }

    /**
     * this is the on touch move 
     * @param {event} e 
     * @param {this} self 
     */
    onTouchMove(e, self) {
        let touches = e.changedTouches[0];
        e.preventDefault();    
        self.movingTouch = new vector(touches.pageX, touches.pageY);
        self.moving = true;
    }
    /**
     * this returns the information for the touch events
     */
    getIntupInfo() {
        this.inputInfo = {};
        this.inputInfo = { position: this.touchCanvasPosition, isTouching: this.touching, swipeDirection: this.swipeDirection, movingTouches: this.movingTouch };
        return this.inputInfo;
    }
    handleInput(dt)
    {
        if (this.swipeDirection === SwipeDirection.UP)
        {
            this.swipeDirection = SwipeDirection.NONE;
            return this.jumpCommand;
        }
        else {
            this.moveCommand = new MoveCommand(CommandState.CREATED, this.speed,dt);
            return this.moveCommand;
        }

        console.log(this.moving);
        return null;
    }
    /**
     * this packages the touch events information into an dict
     * @param {touch} touch 
     */
    copyTouch(touch) {
        return { identifier: 0, pageX: touch.pageX, pageY: touch.pageY, timeStamp: Date.now() };
    }
   
    /**
     * this gets the touch index by id
     * @param {number} idToFind 
     */
    ongoingTouchIndexById(idToFind) {
        for (var i = 0; i < this.ongoingTouches.length; i++) {
            var id = this.ongoingTouches[i].identifier;
            if (id === idToFind) {
                return i;
            }
        }
        return -1;    // not found
    }
}