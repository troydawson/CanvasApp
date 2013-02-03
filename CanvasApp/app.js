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
var MyBitmap = (function (_super) {
    __extends(MyBitmap, _super);
    function MyBitmap() {
        _super.apply(this, arguments);

    }
    MyBitmap.prototype.setPos = function (o) {
        this.x = o.x , this.y = o.y;
        return this;
    };
    MyBitmap.prototype.scale = function (scale) {
        this.x *= scale , this.y *= scale;
        return this;
    };
    return MyBitmap;
})(createjs.Bitmap);
var MyShape = (function (_super) {
    __extends(MyShape, _super);
    function MyShape() {
        _super.apply(this, arguments);

    }
    MyShape.prototype.setPos = function (o) {
        this.x = o.x , this.y = o.y;
        return this;
    };
    MyShape.prototype.scale = function (scale) {
        this.x *= scale , this.y *= scale;
        return this;
    };
    return MyShape;
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
        //		createjs.Touch.enable(stage);
            }
    App.prototype.tick = function () {
    };
    App.prototype.init = function () {
        this.stage.onMouseDown = function () {
            dbg.info("Mouse down!");
        }// = this.createShape;
        ;
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
