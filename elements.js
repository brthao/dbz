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
    };
    return  components ;
});