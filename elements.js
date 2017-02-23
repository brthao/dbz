/**
 * Created by aubret on 21/02/17.
 */
define([], function() {
    var components = function(){
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
                this.ignoreHits("goku");
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
                this.attr({
                    x : this.creator.x + this.creator.w,
                    y : this.creator.y + this.creator.h / 3,
                    w : this.width ,
                    h : this.height
                });
                this.vx = 200 ;
                this.ax =500 ;
                this.collision([5, 16, 16, 10, 27, 16, 16, 27]) ;
                this.checkHits('Wall').bind("HitOn", function(data){
                    Crafty.e("littleExplosion").explode(this.cbr());
                    this.destroy() ;
                });
                return this ;
            }
        },
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
            }
        }

    };
    return  components ;
});