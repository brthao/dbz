/**
 * Created by aubret on 20/02/17.
 */

require(['loads', 'goku', 'TiledMapBuilder-master/WebContent/tiledmapbuilder','resources/maps/map1/map','elements'],
    function(assets, goku, tiledmapbuilder, firstMap, components ) {


    _dbz.groundY = 400;
    _dbz.maxY = 480;
    _dbz.maxX = 800;
    _dbz.structWeight = 10;

    var canvas = Crafty.init(_dbz.maxX, _dbz.maxY, document.getElementById("game"));
    Crafty.background('url(resources/bg.png) center center');

    var callback = function() {
        Crafty.c("energy",components.energy) ;
        goku.init();
        Crafty.viewport.clampToEntities = false;
        Crafty.viewport.mouselook(false);
        Crafty.one("CameraAnimationDone", function () {
            Crafty.viewport.follow(goku.getEntity(), 0, 0);
        });
        Crafty.viewport.centerOn(goku.getEntity(), 500);
    };

    var goku = new goku(_dbz);
    var assets=new assets() ;
    var components= new components() ;
    var mapComponent = tiledmapbuilder;
    var map = firstMap;
    Crafty.c("elements", components.elements);
    Crafty.c("attack",components.attack) ;
    Crafty.c("littleExplosion",components.littleExplosion);
    Crafty.c("TiledMapBuilder",mapComponent) ;
    Crafty.e("2D, DOM, TiledMapBuilder").setMapDataSource(map)
        .createWorld(function (tiledmap) {
            for(var i=0; i < tiledmap.getEntitiesInLayer("ground").length ; i++){
                var entity = tiledmap.getEntitiesInLayer("ground")[i];
                entity.addComponent("Floor, Collision, Wall");
            }
            for(var i=0; i < tiledmap.getEntitiesInLayer("decor").length ; i++){
                var entity = tiledmap.getEntitiesInLayer("decor")[i];
                entity.addComponent("elements");
            }
            for(var i=0; i < tiledmap.getEntitiesInLayer("echelle").length ; i++){
                var entity = tiledmap.getEntitiesInLayer("echelle")[i];
                entity.addComponent("ladder");
            }
            for(var i=0; i < tiledmap.getEntitiesInLayer("oblique").length ; i++){
                var entity = tiledmap.getEntitiesInLayer("oblique")[i];
                entity.addComponent("oblique, Collision");
                entity.collision( new Crafty.polygon(32,32,0,32,32,0) )
            }

            Crafty.load(assets.assets, callback);
        });
});