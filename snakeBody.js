class Snake {
    constructor() {

        this.x = 0;
        this.y = 0;
        this.xSpeed = 1;
        this.ySpeed = 0;

        this.dir = function (x, y) {
            this.xSpeed = x;
            this.ySpeed = y;
        }

        this.getDir = function(){
            return{
                xSpeed: this.xSpeed,
                ySpeed: this.ySpeed  
            }
        } 

        this.update = function () {
            this.x = this.x + (this.xSpeed * scl);
            this.y = this.y + (this.ySpeed * scl);
            //console.log(this.x);
            if (this.x >= 400) {
                this.x = 0;
            }
            if (this.y >= 400) {
                this.y = 0;
            }
            if (this.y < 0) {
                this.y = 400;
            }
            if (this.x < 0) {
                this.x = 400;
            }

        };

        this.showIt = function () {

            fill(200);
            rect(this.x, this.y, scl, scl);            
        };
    }
}