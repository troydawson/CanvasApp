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

interface Point { x: number; y: number; };

interface MyInterface {
	setPos(o: Point): MyInterface;
	scale(scale: number): MyInterface;
}

class MyBitmap extends createjs.Bitmap implements MyInterface {

	setPos(o: Point) { this.x = o.x, this.y = o.y; return this; }

	scale(scale: number) { this.x *= scale, this.y *= scale; return this;  }
}

class MyShape extends createjs.Shape implements MyInterface {

	setPos(o: Point) { this.x = o.x, this.y = o.y; return this; }

	scale(scale: number) { this.x *= scale, this.y *= scale; return this; }
}


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
	(<Box2D.Collision.Shapes.b2PolygonShape>fixDef.shape).SetAsBox(GROUND_W / 2 / SCALE, GROUND_H / 2 / SCALE);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
}


class App {

	constructor() { }

	 tick(): void {

	 	world.Step(1 / 60, 10, 10);

		// Box2Dの計算結果を描画に反映
	 	var bodies: Box2D.Dynamics.b2Body[]  = [world.GetBodyList()];

	 	var next: Box2D.Dynamics.b2Body;

	 	while (next = _.last(bodies).GetNext())
			bodies.push(next);

	 	_.each(bodies, (body) => {
	 		var obj: MyBitmap = body.GetUserData();
	 		if (!obj) return;

	 		var position = body.GetPosition();

	 		obj.setPos(position).scale(SCALE);
	 		obj.rotation = body.GetAngle() * 180 / Math.PI;
	 	});

		stage.update();
	 }

	createShape() {
		// create shape
		var shape = new MyBitmap("resources/ball.png");  //?createjs.Bitmap("resources/ball.png");
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
	}

	init(): void {

		stage = new createjs.Stage(<HTMLCanvasElement> document.getElementById("canvas"));
		//	createjs.Touch.enable(stage);

		GROUND_W = stage.canvas.width;

		setupPhysics();

		stage.onMouseDown = this.createShape;

		createjs.Ticker.addListener(this);
		createjs.Ticker.setFPS(60);
		createjs.Ticker.useRAF = true;
	}

	start(): void {

		this.init();
	}
}