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
            entity = Crafty.e('person, goku, gokuStart, hasHealth')
                .reel("walkingRight", 500, [ // 4 sprite to walk to the right
                    [6, 5], [7, 5], [8, 5] // [x , y] positions in sprite sheet
                ])
                .reel("walkingLeft", 500, [ // sprite to go to the left
                    [6, 7], [7, 7], [8, 7]
                ]);
            entity.twoway("200");
            entity.bind('KeyDown', function (e) {// To move to left and right
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
                    if(e.key == Crafty.keys.S){
                        Crafty.e("energy").create(entity).launch();
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
                    new Crafty.polygon(10, 10, 35, 10, 35, 45, 10, 45)
                )
                .attr({x: 50, y: 300, w: 32, h: 50})
                .gravity("Floor")
                .gravityConst("900")
                //Collisions handling : when a collision occurs, velocity is changed to the opposite direction ( so goku move a little to the opposite direction)
                .onHit("oblique", function (data) {
                    this.move("n", 10);
                    this.resetHitChecks('oblique');
                })
                .bind("CheckLanding", function(ground) {
                    if (this.y + this.h > ground.y + this.dy) { // forbid landing, if player's feet are not above ground
                        this.canLand = false;
                    }
                });
            entity.bind("die", function(){
                    console.log("jsuis mort mdr");
                    Crafty.stop(true);
                    //printbutton() ;
                    //entity.destroy() ;
                })
                .setLife(10);

        };
    };
    return goku ;
});

