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
	"app.js"
];

$.each(script_files, function (i, script_file) {
	document.write('\x3Cscript src="'+script_file+'">\x3C/script>');
});
