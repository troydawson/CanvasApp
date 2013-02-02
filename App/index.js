// Load EaselJS and required patches to to both EaselJS and Ejecta, so they can play nice.

ejecta.include("lib/easeljs-0.5.0.min.js");
//ejecta.include("lib/tweenjs-0.3.0.min.js");
ejecta.include("ejecta-heart-createjs.js");

ejecta.include("app.js");

new App().start();

