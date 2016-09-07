/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/// <reference path="../../lib/typings/index.d.ts" />
	window.addEventListener('DOMContentLoaded', function () {
	    // get the canvas DOM element
	    var canvas = document.getElementById('renderCanvas');
	    // load the 3D engine
	    var engine = new BABYLON.Engine(canvas, true);
	    // createScene function that creates and return the scene
	    var createScene = function () {
	        // create a basic BJS Scene object
	        var scene = new BABYLON.Scene(engine);
	        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
	        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
	        // target the camera to scene origin
	        camera.setTarget(BABYLON.Vector3.Zero());
	        // attach the camera to the canvas
	        camera.attachControl(canvas, false);
	        // create a basic light, aiming 0,1,0 - meaning, to the sky
	        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
	        // create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
	        var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
	        // move the sphere upward 1/2 of its height
	        sphere.position.y = 1;
	        // create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
	        var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);
	        // return the created scene
	        return scene;
	    };
	    // call the createScene function
	    var scene = createScene();
	    // run the render loop
	    engine.runRenderLoop(function () {
	        scene.render();
	    });
	    // the canvas/window resize event handler
	    window.addEventListener('resize', function () {
	        engine.resize();
	    });
	});


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map