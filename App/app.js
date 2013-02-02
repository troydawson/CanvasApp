/// <reference path="defs/easeljs.d.ts" />
/// <reference path="defs/toastr.d.ts" />
var stage;
var Board = (function () {
    function Board(name) {
        stage = new createjs.Stage(document.getElementById("canvas"));
        var back = new createjs.Shape();
        back.graphics.beginFill("#FF0000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        stage.addChild(back);
        var txt = new createjs.Text("", "14px Joystix", "#FFF");
        txt.text = "This text is rendered in canvas using the Text Object:\n\n";
        txt.text += "The API is loosely based on Flash's display list, and should be easy to pick up for both JS and AS3 developers. The key classes are:\n\n";
        txt.text += "DisplayObject\nAbstract base class for all display elements in Easel. Exposes all of the display properties (ex. x, y, rotation, scaleX, scaleY, alpha, shadow, etc) that are common to all display objects.\n\n";
        txt.text += "Stage\nThe root level display container for display elements. Each time tick() is called on Stage, it will update and render the display list to its associated canvas.\n\n";
        txt.text += "Container\nA nestable display container, which lets you aggregate display objects and manipulate them as a group.\n\n";
        txt.text += "Text\nRenders text in the context of the display list.";
        txt.lineWidth = 800;
        txt.textBaseline = "top";
        txt.textAlign = "left";
        txt.y = 50;
        txt.x = 30;
        stage.addChild(txt);
        // use lineWidth and getMeasuredHeight to dynamically draw a background for our text:
        var pad = 10;
        var bg = new createjs.Shape();
        bg.graphics.beginFill("#114").drawRect(txt.x - pad, txt.y - pad, txt.lineWidth + pad * 2, txt.getMeasuredHeight() + pad * 2);
        stage.addChildAt(bg, 1);
        stage.update();
    }
    return Board;
})();
var App = (function () {
    function App() {
    }
    App.prototype.start = function () {
        new Board("original");
//!        toastr.success('Hello!');
    };
    return App;
})();
//@ sourceMappingURL=app.js.map
