/**
 * Created by aubret on 20/02/17.
 */
define([], function() {
    var goku = function(_dbz) {
        var entity = 0 ;
        this.getEntity=function(){
            return entity ;
        };
        this.init = function () {
            entity = Crafty.e('2D, Canvas, gokuStart, SpriteAnimation, Twoway, Keyboard, Gravity, Collision, Motion, SolidHitBox')
                .reel("walkingRight", 500, [ // 4 sprite to walk to the right
                    [6, 5], [7, 5], [8, 5] // [x , y] positions in sprite sheet
                ])
                .reel("walkingLeft", 500, [ // sprite to go to the left
                    [6, 7], [7, 7], [8, 7]
                ])
                .twoway("200")
                .bind('KeyDown', function (e) {// To move to left and right
                    if (this.isDown(Crafty.keys.RIGHT_ARROW) && this.isDown(Crafty.keys.LEFT_ARROW)) {
                        this.pauseAnimation();
                        return;
                    }
                    if (e.key == Crafty.keys.LEFT_ARROW) { // Start the sprite to go left
                        if (!this.isDown(Crafty.keys.RIGHT_ARROW))
                            this.animate("walkingLeft", -1);
                    } else if (e.key == Crafty.keys.RIGHT_ARROW) { // Start the sprite to go right
                        if (!this.isDown(Crafty.keys.LEFT_ARROW))
                            this.animate("walkingRight", -1);
                    }
                    if (e != undefined && e.originalEvent != undefined)
                        e.originalEvent.preventDefault();
                })
                .bind('KeyUp', function (e) {
                    if (this.isDown(Crafty.keys.RIGHT_ARROW)) { //use for debug
                        this.animate("walkingRight", -1);
                    } else if (this.isDown(Crafty.keys.LEFT_ARROW)) {
                        this.animate("walkingLeft", -1);
                    } else {
                        this.pauseAnimation();
                    }
                    if (e != undefined && e.originalEvent != undefined)
                        e.originalEvent.preventDefault();
                })
                .collision(
                    new Crafty.polygon(5, 5, 40, 5, 40, 45, 5, 45)
                )
                .attr({x: 50, y: 300, w: 50, h: 50})
                .gravity("Floor")
                .gravityConst("900")
                //Collisions handling : when a collision occurs, velocity is changed to the opposite direction ( so goku move a little to the opposite direction)
                .bind('Moved', function (from) {
                    if (from.axis == "x") {
                        if (this.hit('Wall')) {
                            this.x = from.oldValue;
                        }
                    } else {
                        if (this.hit('Wall')) {
                            //this.vy += -200 ;
                            //this.y=from.oldValue ;
                            console.log("hit y");
                        }
                        if (this.y > 500) {
                            console.log("loose");
                        }
                    }
                }).onHit("oblique", function (data) {
                    var obj = data[0].obj;
                    this.move("n", 5);
                    this.resetHitChecks('oblique');
                })

        };
    };
    return goku ;
});

