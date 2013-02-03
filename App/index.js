var dbg = { info: console.log, warning: console.log, notice: console.log };

// Load EaselJS and required patches to to both EaselJS and Ejecta, so they can play nice.

var script_files =
[
	"lib/underscore.js",
	"lib/Box2dWeb-2.1.a.3.min.js",
	"lib/easeljs-0.5.0.min.js",
	"lib/filters/BoxBlurFilter.js",
	"lib/filters/ColorMatrixFilter.js",
	"lib/filters/ColorMatrix.js",
	"lib/filters/ColorFilter.js",
	"lib/filters/AlphaMaskFilter.js",
	"lib/filters/AlphaMapFilter.js",
	"ejecta-heart-createjs.js"
];
	
script_files.forEach(function(script_file) { ejecta.include(script_file) });

ejecta.include("app.js");

var ctx = window.canvas.getContext('2d');

ctx.fillStyle = '#505050';
ctx.fillRect(0, 0, canvas.width, canvas.height);

new App().start();

