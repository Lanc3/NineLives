class CollisionManager {
    constructor() {

    }
    getHorizontalIntersectionDepth(a, b) {
        this.halfWidthA = a.width / 2;
        this.halfWidthB = b.width / 2;

        this.centerA = a.x + this.halfWidthA;
        this.centerB = b.x + this.halfWidthB;

        this.distanceX = this.centerA - this.centerB;
        this.minDistanceX = this.halfWidthA + this.halfWidthB;

        if (Math.abs(this.distanceX) >= this.minDistanceX) {
            return 0;
        }

        if (this.distanceX > 0) {
            return this.minDistanceX - this.distanceX;
        }
        else {
            return -this.minDistanceX - this.distanceX;
        }
    }
    getVirticalIntersectionDepth(a, b) {
        this.halfHeightA = a.height / 2;
        this.halfHeightB = b.height / 2;

        this.centerA = a.y + this.halfHeightA;
        this.centerB = b.y + this.halfHeightB;

        this.distanceY = this.centerA - this.centerB;
        this.minDistanceY = this.halfHeightA + this.halfHeightB;

        if (Math.abs(this.distanceY) >= this.minDistanceY) {
            return 0;
        }

        if (this.distanceY > 0) {
            return this.minDistanceY - this.distanceY;
        }
        else {
            return -this.minDistanceY - this.distanceY;
        }
    }
}