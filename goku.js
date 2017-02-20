/**
 * Created by aubret on 20/02/17.
 */
define([], function() {
    var goku = function(_dbz) {
        this.init = function () {
            Crafty.e('2D, Canvas, gokuStart, SpriteAnimation, Twoway, Keyboard, Gravity, Collision')
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
                })
                .bind('KeyUp', function (e) {
                    if (this.isDown(Crafty.keys.RIGHT_ARROW)) { //use for debug
                        this.animate("walkingRight", -1);
                    } else if (this.isDown(Crafty.keys.LEFT_ARROW)) {
                        this.animate("walkingLeft", -1);
                    } else {
                        this.pauseAnimation();
                    }
                })
                .attr({x: _dbz.maxX / 2, y: _dbz.maxY - _dbz.ground.h, w: 50, h: 50})
                .gravity("Floor")
                .gravityConst("900")
                //Collisions handling : when a collision occurs, velocity is changed to the opposite direction ( so goku move a little to the opposite direction)
                .onHit("Floor", function (evt) {
                    this.vy = 200;
                }).onHit("RightWall", function (evt) {
                    this.vx = -200;
                })
                .onHit("LeftWall", function (evt) {
                    this.vx = 200;
                });
        }
    };
    return goku ;
});

