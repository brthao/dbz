/**
 * Created by aubret on 20/02/17.
 */
/*require.config({
    paths: {
        'Crafty': "https://rawgithub.com/craftyjs/Crafty/release/dist/crafty-min.js",
    },
    shim: {
        'Crafty': {
            exports: "Crafty"
        }
    }
});*/

require(['loads', 'goku'], function(assets, goku) {
    var assets=new assets() ;

    _dbz.groundY = 340;
    _dbz.maxY = 350;
    _dbz.maxX = 500;
    _dbz.structWeight = 10;

    var canvas = Crafty.init(_dbz.maxX, _dbz.maxY, document.getElementById("game"));

//entity representing the ground
    _dbz.ground = Crafty.e("Floor, 2D, Canvas, Color")
        .attr({x: 0, y: _dbz.groundY, w: _dbz.maxX, h: _dbz.structWeight})
        .color("green");
    var ceiling = Crafty.e("Floor, 2D, Canvas, Color")
        .attr({x: 0, y: 0, w: _dbz.maxX, h: _dbz.structWeight})
        .color("blue");

    var floatingGround1 = Crafty.e("Floor, 2D, Canvas, Color")
        .color("#FAC")
        .attr({x: 0, y: 250, w: 150, h: _dbz.structWeight});
    var floatingGround2 = Crafty.e("Floor, 2D, Canvas, Color")
        .color("#FAC")
        .attr({x: 150, y: 150, w: 150, h: _dbz.structWeight});
    var floatingGround3 = Crafty.e("Floor, 2D, Canvas, Color")
        .color("#FAC")
        .attr({x: 250, y: 250, w: 150, h: _dbz.structWeight});

    var leftWall = Crafty.e("LeftWall, Wall, 2D, Canvas, Color")
        .color("#FF0")
        .attr({x: 0, y: 0, w: 10, h: _dbz.maxY});

    var rightWall = Crafty.e("RightWall, Wall, 2D, Canvas, Color")
        .color("#FF0")
        .attr({x: _dbz.maxX - _dbz.structWeight, y: 0, w: 10, h: _dbz.maxY});

    var goku = new goku(_dbz);
    Crafty.load(assets.assets, goku.init);
});