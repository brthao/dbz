/**
 * Created by aubret on 20/02/17.
 */
define([], function() {
    var assets =  function () {
        Crafty.paths({audio: "resources/", images: "resources/", sprites: "resources/"});
        this.assets = {
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
            },
            "images" : {

            }
        };
    };
    return assets ;
});