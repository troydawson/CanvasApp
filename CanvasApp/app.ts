﻿/// <reference path="defs/mousetrap.d.ts" />
/// <reference path="defs/underscore-typed.d.ts" />
/// <reference path="defs/box2dweb.d.ts" />
/// <reference path="defs/easeljs.d.ts" />
/// <reference path="defs/toastr.d.ts" />

var dbg = toastr;

interface Point { x: number; y: number; };

class Vec implements Point {
	constructor(public x: number, public y: number, public z?: number) { }
}

interface Geometry {
	setPos(o: Point): Geometry;
	scale(scale: number): Geometry;
}

class Bitmap extends createjs.Bitmap implements Geometry {

	setPos(o: Point) { this.x = o.x, this.y = o.y; return this; }

	scale(scale: number) { this.x *= scale, this.y *= scale; return this;  }
}

class Shape extends createjs.Shape implements Geometry {

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

	maze: Bitmap;
	stage: createjs.Stage;
	box: createjs.Shape;

	constructor(canvas: HTMLCanvasElement) {
		this.stage = new createjs.Stage(canvas);
		createjs.Touch.enable(this.stage);
	}

	loadBoard(): void {

		this.stage.addChild(new Bitmap("resources/background.png"));

		this.maze = new Bitmap("resources/maze_a8.png");
	
		this.maze.setPos(new Vec(6, 73));

		this.stage.addChild(this.maze);
	}

	time: number = 0.0;

	tick(): void {

		this.time += 0.0166666666666;

		if (this.time > 1.0) {
			this.time = 0.0;
		}

		this.stage.update();
	}

	init(): void {

		this.loadBoard();

		this.stage.onMouseDown = () => { dbg.info("Mouse down!"); };

		dbg.info("ready to run!");

		createjs.Ticker.addListener(this);
		createjs.Ticker.setFPS(60);
		createjs.Ticker.useRAF = true;
	}

	start(): void {

		this.init();
	}
}