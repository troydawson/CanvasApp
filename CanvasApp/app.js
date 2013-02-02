/// <reference path="defs/toastr.d.ts" />
var App = (function () {
    function App() {
    }
    App.prototype.start = function () {
        toastr.success('Hello!');
    };
    return App;
})();
//@ sourceMappingURL=app.js.map
