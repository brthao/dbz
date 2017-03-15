/**
 * Created by aubret on 21/02/17.
 */
define([], function() {
    var components = function(_dbz){
        this.elements= {
            init: function () {
                this.addComponent("Wall, Collision");
            }
        };

        this.attack={
            init : function(){
                this.addComponent("Canvas, 2D, Motion, Collision, SpriteAnimation");
                return this ;
            },
            create : function(entity){
                this.creator = entity ;
                return this ;
            }
        };

        this.energy={
            init : function(){
                this.addComponent("attack, bigEnergy") ;
                this.width = 30 ;
                this.height = 30 ;
                return this ;
            },
            launch : function(){
                var dir = ( this.creator.direction == "r" ? 1 : -1 );
                this.attr({
                    x : this.creator.x + dir *(this.creator.w / 2),
                    y : this.creator.y + this.creator.h / 3,
                    w : this.width ,
                    h : this.height
                });
                this.vx =200*dir ;
                this.ax =500*dir ;
                this.collision([5, 16, 16, 10, 27, 16, 16, 27]) ;
                this.checkHits('Wall')
                    .bind("HitOn", function(data){
                        this.explode() ;
                    })
                    .bind("Moved", function(data){
                        if(this.x > _dbz.maxX*2){
                            this.explode();
                        }
                    });
                return this ;
            },
            explode : function() {
                Crafty.e("littleExplosion").explode(this.cbr());
                this.destroy();
            }
        };

        this.littleExplosion={
            init : function(){
                this.addComponent("2D, DOM, SpriteAnimation, explosion")
                    .reel("explode", 300, 1, 1 , 3);
                this.bind("AnimationEnd", function(){
                    this.destroy() ;
                });
            },
            explode : function(position){
                this.attr({x : position._x - 30, y : position._y - 30})
                    .animate("explode",1)
                return this ;
            }
        };

        this.person= {
            direction : undefined, // will be r for right or l for left
            init : function(){
                this.addComponent("2D, Canvas, SpriteAnimation, Twoway, Keyboard, Gravity, Collision, Motion")
                    .bind('Moved', function (from) {
                        if (from.axis == "x") {
                            if (this.hit('Wall')) {
                                this.x = from.oldValue;
                            }else if( this.x < from.oldValue){
                                if( this.direction != "l"){
                                    this.trigger("changeDirection", "l");
                                    this.direction ="l";
                                }
                            }else{
                                if( this.direction != "r"){
                                    this.trigger("changeDirection", "r");
                                    this.direction ="r";
                                }
                            }
                        } else {
                            if (this.hit('Wall')) {
                                this.vy =100 ;
                                this.y=from.oldValue ;
                            }
                            if (this.y > 500) {
                                console.log("loose");
                            }
                        }
                    });
            }


        };

        this.hasHealth = {
            life : 0 ,
            totalLife : 0,
            init : function(){
                this.addComponent("Model, SpriteAnimation") ;
                this.bind('Change[life]', function(){
                    if(this.life == 0){
                        this.trigger("die");
                    }
                })
                .onHit("attack", function( data){
                    var obj = data[0].obj ;
                    if(obj.creator == this){
                        this.attr("life", this.life-1);
                    }
                })
            },
            setLife : function(life){
                this.life = life ;
                this.totalLife = life ;
                return this ;
            }



        }

    };
    return  components ;
});