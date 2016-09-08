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
	// http://doc.babylonjs.com/tutorials/how_to_use_assetsmanager
	// http://www.babylonjs-playground.com/#28QGCJ#1
	window.addEventListener('DOMContentLoaded', function () {
	    // get the canvas DOM element
	    var canvas = document.getElementById('renderCanvas');
	    // load the 3D engine
	    var engine = new BABYLON.Engine(canvas, true);
	    // the canvas/window resize event handler
	    window.addEventListener('resize', function () {
	        engine.resize();
	    });
	    // createScene function that creates and return the scene
	    var createScene = function () {
	        // This creates a basic Babylon Scene object (non-mesh)
	        var scene = new BABYLON.Scene(engine);
	        // Change the scene background color to green.
	        scene.clearColor = new BABYLON.Color3(1, 1, 1);
	        // This creates and positions a free camera (non-mesh)
	        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0, -2), scene);
	        // This targets the camera to scene origin
	        camera.setTarget(BABYLON.Vector3.Zero());
	        // Fix the camera view
	        camera.inertia = 0;
	        camera.angularSensibility = 1000000;
	        // This attaches the camera to the canvas
	        camera.attachControl(canvas, true);
	        // Reduce antialiasing
	        camera.attachPostProcess(new BABYLON.FxaaPostProcess("fxaa", 1.0, camera, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false));
	        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
	        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
	        var assetsManager = new BABYLON.AssetsManager(scene);
	        var mesh = BABYLON.Mesh.CreatePlane('plane', 1.5, scene);
	        mesh.scaling.y = 1;
	        var material = new BABYLON.StandardMaterial('material', scene);
	        var textureTask = assetsManager.addTextureTask('image task', 'parts/tool_base.png');
	        //var textureTask = assetsManager.addTextureTask('image task', 'http://i.imgur.com/Ni1IqYJ.jpg');
	        textureTask.onSuccess = function (task) {
	            material.diffuseTexture = task.texture;
	            material.ambientColor = BABYLON.Color3.White();
	            material.diffuseTexture.hasAlpha = true;
	            material.diffuseColor = BABYLON.Color3.White();
	            material.specularColor = BABYLON.Color3.White();
	            mesh.material = material;
	        };
	        assetsManager.useDefaultLoadingScreen = false;
	        assetsManager.load();
	        return scene;
	    };
	    // call the createScene function
	    var scene = createScene();
	    // Register a render loop to repeatedly render the scene
	    engine.runRenderLoop(function () {
	        scene.render();
	    });
	});


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map