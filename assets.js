/**
 * Created by aubret on 20/02/17.
 */
beginning= function(){
    Crafty.paths({ audio: "resources/", images: "resources/", sprites:"resources/" });
    var assetsObj = {
        /*"audio": {
         "beep": ["beep.wav", "beep.mp3", "beep.ogg"],
         "boop": "boop.wav",
         "slash": "slash.wav"
         },*/
        //"images": ["badguy.bmp", "goodguy.png"],
        "sprites": {
            "goku-transparent.png": {
                // This is the width of each image in pixels
                tile: 71, //23,
                // The height of each image
                tileh: 95, //38,
                // We give names to three individual images
                map: {
                    gokuStart: [6, 6],
                    gokuMiddle: [6, 7],
                    gokuEnd: [7, 7]
                }
            }
        }
    };
    /*var actual_size = Crafty.e("2D, Canvas, gokuStart")
        .attr({x: 10, y:10});*/

    var go  = function () {
        console.log("lets go");
        var walker = Crafty.e('2D, Canvas, gokuStart, SpriteAnimation, Twoway, Keyboard')
            .reel("walkingRight", 500, [
                [6, 5], [7,5], [8, 5]
            ])
            .reel("walkingLeft", 500, [
                [6, 7], [7,7], [8, 7]
            ])
            .twoway("200");
            //.animate("walking", 1);
        walker.bind('KeyDown', function(e) {
            if(this.isDown(Crafty.keys.RIGHT_ARROW) && this.isDown(Crafty.keys.LEFT_ARROW)) {
                this.pauseAnimation();
                return ;
            }
            if (e.key == Crafty.keys.LEFT_ARROW) {
                if(!this.isDown(Crafty.keys.RIGHT_ARROW))
                    this.animate("walkingLeft", -1);
            } else if (e.key == Crafty.keys.RIGHT_ARROW) {
                if(!this.isDown(Crafty.keys.LEFT_ARROW))
                    this.animate("walkingRight", -1);
            }

        }).bind('KeyUp', function(e){
            if(this.isDown(Crafty.keys.RIGHT_ARROW)){
                this.animate("walkingRight", -1);
            }else if(this.isDown(Crafty.keys.LEFT_ARROW)) {
                this.animate("walkingLeft", -1);
            }else{
                this.pauseAnimation() ;
            }
        });
    };

    Crafty.load(assetsObj, // preload assets
        go,
        function(e) { //progress
            console.log("progress");
        },
        function(e) { //uh oh, error loading
            console.log("error loading");
        }
    )
}