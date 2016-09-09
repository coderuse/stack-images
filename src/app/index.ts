/// <reference path="../../lib/typings/index.d.ts" />

// http://doc.babylonjs.com/tutorials/how_to_use_assetsmanager
// http://www.babylonjs-playground.com/#28QGCJ#1

window.addEventListener('DOMContentLoaded', () => {
  // get the canvas DOM element
  var canvas = <HTMLCanvasElement>document.getElementById('renderCanvas');

  // load the 3D engine
  var engine = new BABYLON.Engine(canvas, true);

  // the canvas/window resize event handler
  window.addEventListener('resize', () => {
    engine.resize();
  });

  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);

  // Change the scene background color to green.
  scene.clearColor = new BABYLON.Color3(1, 1, 1);

  // This creates and positions a free camera (non-mesh)
  var camera = new BABYLON.ArcRotateCamera('camera1', 1, 0.8, 50, new BABYLON.Vector3(0, 0, 0), scene);

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.setPosition(new BABYLON.Vector3(0, 0, -30));

  // Fix the camera view
  //camera.inertia = 0;
  //camera.angularSensibility = 1000000;

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // Reduce antialiasing
  camera.attachPostProcess(new BABYLON.FxaaPostProcess("fxaa", 1.0, camera,
    BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, true));

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

  var assetsManager = new BABYLON.AssetsManager(scene);

  var base = BABYLON.Mesh.CreatePlane('plane', 25, scene);
  var material = new BABYLON.StandardMaterial('material', scene);
  var textureTask = assetsManager.addTextureTask('image task', 'parts/tool_base.png');
  //var textureTask = assetsManager.addTextureTask('image task', 'http://i.imgur.com/Ni1IqYJ.jpg');
  textureTask.onSuccess = function (task: BABYLON.TextureAssetTask) {
    material.diffuseTexture = task.texture;
    material.ambientColor = BABYLON.Color3.White();
    material.diffuseTexture.hasAlpha = true;
    material.diffuseColor = BABYLON.Color3.White();
    material.specularColor = BABYLON.Color3.White();
    base.material = material;
  }

  var part1 = BABYLON.Mesh.CreatePlane('part1', 25, scene);
  part1.scaling.x = .25;
  part1.scaling.y = .65;
  part1.actionManager = new BABYLON.ActionManager(scene);

  var part1DisplacedAnimationBox = new BABYLON.Animation('part1_translation',
    'position', 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
  // An array with all animation keys
  var part1DisplacedKeys = [];

  //At the animation key 0, the value of scaling is "1"
  part1DisplacedKeys.push({
    frame: 0,
    value: new BABYLON.Vector3(-8.9, -3, 0)
  });

  //At the animation key 100, the value of scaling is "1"
  part1DisplacedKeys.push({
    frame: 100,
    value: new BABYLON.Vector3(-10, -4, 0)
  });
  part1DisplacedAnimationBox.setKeys(part1DisplacedKeys);

  var part1OriginalAnimationBox = new BABYLON.Animation('part1_translation',
    'position', 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
  // An array with all animation keys
  var part1OriginalKeys = [];

  //At the animation key 0, the value of scaling is "1"
  part1OriginalKeys.push({
    frame: 0,
    value: new BABYLON.Vector3(-10, -4, 0)
  });

  //At the animation key 100, the value of scaling is "1"
  part1OriginalKeys.push({
    frame: 100,
    value: new BABYLON.Vector3(-8.9, -3, 0)
  });
  part1OriginalAnimationBox.setKeys(part1OriginalKeys);

var toggle = true;
  part1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
    BABYLON.ActionManager.OnPickTrigger, function () {      
      if (toggle) {
        toggle = false;
        part1.animations.push(part1DisplacedAnimationBox);
        scene.beginAnimation(part1, 0, 100, false, 1, () => {
          part1.animations.splice(-1,1);
        });
      }
      else {
        toggle = true;
        part1.animations.push(part1OriginalAnimationBox);
        scene.beginAnimation(part1, 0, 100, false, 1, () => {
          part1.animations.splice(-1,1);
        });
      }
    }));
  var part1Material = new BABYLON.StandardMaterial('part1Material', scene);
  var part1TextureTask = assetsManager.addTextureTask('part1TextureTask', 'parts/tool_part1.png');
  part1TextureTask.onSuccess = function (task: BABYLON.TextureAssetTask) {
    part1Material.diffuseTexture = task.texture;
    part1Material.ambientColor = BABYLON.Color3.White();
    part1Material.diffuseTexture.hasAlpha = true;
    part1Material.diffuseColor = BABYLON.Color3.White();
    part1Material.specularColor = BABYLON.Color3.White();
    part1.material = part1Material;
    part1.position = new BABYLON.Vector3(-8.9, -3, 0);
  }

  // Register a render loop to repeatedly render the scene
  // engine.runRenderLoop(function () {
  //   scene.render();
  // });

  assetsManager.onFinish = function (tasks) {
    engine.runRenderLoop(function () {
      scene.render();
    });
  };

  //assetsManager.useDefaultLoadingScreen = false;
  assetsManager.load();
});