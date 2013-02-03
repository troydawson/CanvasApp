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
var box2d = {
    b2Vec2: Box2D.Common.Math.b2Vec2,
    b2BodyDef: Box2D.Dynamics.b2BodyDef,
    b2Body: Box2D.Dynamics.b2Body,
    b2FixtureDef: Box2D.Dynamics.b2FixtureDef,
    b2Fixture: Box2D.Dynamics.b2Fixture,
    b2World: Box2D.Dynamics.b2World,
    b2MassData: Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape: Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape: Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw: Box2D.Dynamics.b2DebugDraw
};
;
var MyBitmap = (function (_super) {
    __extends(MyBitmap, _super);
    function MyBitmap() {
        _super.apply(this, arguments);

    }
    MyBitmap.prototype.setPos = function (o) {
        this.x = o.x , this.y = o.y;
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
    };
    return MyShape;
})(createjs.Shape);
var SCALE = 30;
var stage, world;
var GROUND_W = 800;
var GROUND_H = 20;
var CIRCLE_RADIUS = 32;
function setupPhysics() {
    world = new box2d.b2World(new box2d.b2Vec2(0, 100), true);
    // create ground shape
    var shape = new MyShape();
    shape.graphics.beginFill("#F00").drawRect(0, 0, GROUND_W, GROUND_H);
    shape.regX = GROUND_W / 2;
    shape.regY = GROUND_H / 2;
    stage.addChild(shape);
    // create ground
    var fixDef = new box2d.b2FixtureDef();
    fixDef.density = 1;
    fixDef.friction = 0.5;
    var bodyDef = new box2d.b2BodyDef();
    bodyDef.type = box2d.b2Body.b2_staticBody;
    bodyDef.position.x = GROUND_W / 2 / SCALE;
    bodyDef.position.y = (stage.canvas.height - GROUND_H) / SCALE;
    bodyDef.userData = shape;
    fixDef.shape = new box2d.b2PolygonShape();
    (fixDef.shape).SetAsBox(GROUND_W / 2 / SCALE, GROUND_H / 2 / SCALE);
    world.CreateBody(bodyDef).CreateFixture(fixDef);
}
var App = (function () {
    function App() {
    }
    App.prototype.tick = function () {
        world.Step(1 / 60, 10, 10);
        // Box2Dの計算結果を描画に反映
        var bodies = [
            world.GetBodyList()
        ];
        var next;
        while(next = _.last(bodies).GetNext()) {
            bodies.push(next);
        }
        _.each(bodies, function (body) {
            var obj = body.GetUserData();
            if(!obj) {
                return;
            }
            var position = body.GetPosition();
            obj.setPos(position);
            obj.x *= SCALE , obj.y *= SCALE;
            //	 		obj.x = position.x * SCALE;
            //	 		obj.y = position.y * SCALE;
            obj.rotation = body.GetAngle() * 180 / Math.PI;
        });
        stage.update();
    };
    App.prototype.createShape = function () {
        // create shape
        var shape = new MyBitmap("resources/ball.png");//?createjs.Bitmap("resources/ball.png");
        
        shape.regX = CIRCLE_RADIUS / 2;
        shape.regY = CIRCLE_RADIUS / 2;
        stage.addChild(shape);
        // create ground
        var fixDef = new box2d.b2FixtureDef();
        fixDef.density = 1;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.5;
        var bodyDef = new box2d.b2BodyDef();
        bodyDef.type = box2d.b2Body.b2_dynamicBody;
        bodyDef.position.x = Math.random() * GROUND_W / SCALE;
        bodyDef.position.y = 0 / SCALE;
        bodyDef.userData = shape;
        fixDef.shape = new box2d.b2CircleShape(CIRCLE_RADIUS / 2 / SCALE);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
    };
    App.prototype.init = function () {
        stage = new createjs.Stage(document.getElementById("canvas"));
        //	createjs.Touch.enable(stage);
        GROUND_W = stage.canvas.width;
        setupPhysics();
        stage.onMouseDown = this.createShape;
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
