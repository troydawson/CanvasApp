var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="defs/mousetrap.d.ts" />
/// <reference path="defs/underscore-typed.d.ts" />
/// <reference path="defs/box2dweb.d.ts" />
/// <reference path="defs/easeljs.d.ts" />
/// <reference path="defs/toastr.d.ts" />
var dbg = toastr;
;
var Vec = (function () {
    function Vec(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    return Vec;
})();
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);

    }
    Bitmap.prototype.setPos = function (o) {
        this.x = o.x , this.y = o.y;
        return this;
    };
    Bitmap.prototype.scale = function (scale) {
        this.x *= scale , this.y *= scale;
        return this;
    };
    return Bitmap;
})(createjs.Bitmap);
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape() {
        _super.apply(this, arguments);

    }
    Shape.prototype.setPos = function (o) {
        this.x = o.x , this.y = o.y;
        return this;
    };
    Shape.prototype.scale = function (scale) {
        this.x *= scale , this.y *= scale;
        return this;
    };
    return Shape;
})(createjs.Shape);
/*
// create ground shape
var shape = new MyShape();
shape.graphics.beginFill("#F00").drawRect(0, 0, GROUND_W, GROUND_H);
shape.regX = GROUND_W / 2;
shape.regY = GROUND_H / 2;
stage.addChild(shape);

createShape() {
// create shape
var shape = new MyBitmap("resources/ball.png");  //?createjs.Bitmap("resources/ball.png");
shape.regX = CIRCLE_RADIUS / 2;
shape.regY = CIRCLE_RADIUS / 2;
stage.addChild(shape);
*/
var App = (function () {
    function App(stage) {
        this.stage = stage;
        createjs.Touch.enable(stage);
    }
    App.prototype.loadBoard = function () {
        this.stage.addChild(new Bitmap("resources/background.png"));
        this.maze = new Bitmap("resources/maze_a8.png");
        this.maze.setPos(new Vec(6, 73));
        this.stage.addChild(this.maze);
        this.maze.filters = [
            new createjs.ColorFilter(0, 0, 1, 1)
        ];
        //		this.maze.updateCache(0, 0, this.maze.image.width, this.maze.image.height);
        this.stage.addChild(this.maze);
    };
    App.prototype.tick = function () {
        this.time += 0.0166666666666;
        if(this.time > 1.0) {
            this.time = 1.0;
        }
        this.stage.update();
    };
    App.prototype.init = function () {
        this.loadBoard();
        this.stage.onMouseDown = function () {
            dbg.info("Mouse down!");
        }// = this.createShape;
        ;
        dbg.info("ready to run!");
        createjs.Ticker.addListener(this);
        createjs.Ticker.setFPS(60);
        createjs.Ticker.useRAF = true;
    };
    App.prototype.start = function () {
        this.init();
    };
    return App;
})();
//@ sourceMappingURL=app.js.map
