/// <reference path="defs/mousetrap.d.ts" />
/// <reference path="defs/underscore-typed.d.ts" />
/// <reference path="defs/box2dweb.d.ts" />
/// <reference path="defs/easeljs.d.ts" />
/// <reference path="defs/toastr.d.ts" />

var dbg = toastr;

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

class App {

	constructor(public stage: createjs.Stage) {
//		createjs.Touch.enable(stage);
	}

	tick(): void {}

	init(): void {

		this.stage.onMouseDown = () => { dbg.info("Mouse down!"); }; // = this.createShape;

		createjs.Ticker.addListener(this);
		createjs.Ticker.setFPS(60);
		createjs.Ticker.useRAF = true;
	}

	start(): void {

		this.init();
	}
}