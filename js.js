var transformSVGPathExposed;

var width =  window.innerWidth
var height = window.innerHeight
console.log(width);
console.log(height);


// D3 data ophal/en  
// -------------------

var data = d3.json('landen.json', function(err, data) {
  //Define map projection
  var projection = d3.geo.mercator()
    .center([30,40])  
    .translate([width/2, height/2])
    .scale(width/4);  
  //Define path generator
  var path = d3.geo.path()
    .projection(projection);
  return(data);
});



// Scene opzetten 
var init = function(){
  
  // Camera attributes
  var vieuw_angle = 45;
  var aspect = width/height
  var near = 1;
  var far = 1000;

  // Create scene
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( vieuw_angle, aspect, near, far );
  var renderer = new THREE.WebGLRenderer();
  
  // renderer to dom
  renderer.setSize( width, height );
  renderer.setClearColor(0x000);
  document.body.appendChild( renderer.domElement );

  // Camera position
  scene.add(camera);
  camera.position.z = 140;
  camera.position.x = 0;
  camera.position.y = -700;
  camera.lookAt( scene.position );

  // controls
  controls = new THREE.OrbitControls( camera );
  controls.addEventListener( 'change', render );


  // add a light at a specific position
  var pointLight = new THREE.PointLight(0xFFFFFF);
  scene.add(pointLight);
  pointLight.position.x = 800;
  pointLight.position.y = 800;
  pointLight.position.z = 800;

  // add a base plane on which we'll render our map
  var planeGeo = new THREE.PlaneGeometry(500, 500, 10, 10);
  var planeMat = new THREE.MeshLambertMaterial({color: 0x666699});
  var plane = new THREE.Mesh(planeGeo, planeMat);

  // // creating object
  var geometry = new THREE.BoxGeometry( 100, 100, 100 );
  var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );
  
  scene.add( plane );
  scene.add(cube);
  // camera.position.z = 5;

  // reder all
  function render() {
    // plane.rotation.x += 0.1;
    // plane.rotation.y += 0.1;
    requestAnimationFrame( render );
    renderer.render( scene, camera );
 
  }
  render();


};

function animate() {

  requestAnimationFrame( animate );
  controls.update();

}



// D3 data naar three shape 



// geons.geoConfig = function() {
//     this.TRANSLATE_0 = appConstants.TRANSLATE_0;
//     this.TRANSLATE_1 = appConstants.TRANSLATE_1;
//     this.SCALE = appConstants.SCALE;
 
//     this.mercator = d3.geo.mercator();
//     this.path = d3.geo.path().projection(this.mercator);
 
//     this.setupGeo = function() {
//         var translate = this.mercator.translate();
//         translate[0] = this.TRANSLATE_0;
//         translate[1] = this.TRANSLATE_1;
 
//         this.mercator.translate(translate);
//         this.mercator.scale(this.SCALE);
//     }
// }




// function addGeoObject() {
//           // keep track of rendered objects
//           var meshes = [];
//           var averageValues = [];
//           var totalValues = [];
          

//           var maxValueAverage = 0;
//           var minValueAverage = -1;


//          // convert to mesh and calculate values
//           for (var i = 0 ; i < data.features.length ; i++) {
//               var geoFeature = data.features[i]
//               var feature = geo.path(geoFeature);
//               // we only need to convert it to a three.js path
//               var mesh = transformSVGPathExposed(feature);
//               // add to array
//               meshes.push(mesh);

//           // we get a property from the json object and use it
//           // to determine the color later on
//           var value = parseInt(geoFeature.properties.pop_year);
//           if (value > maxValueAverage) maxValueAverage = value;
//           if (value < minValueAverage || minValueAverage == -1) minValueAverage = value;
//           averageValues.push(value);

//           // and we get the max values to determine height later on.
//           value = parseInt(geoFeature.properties.pop_year);
//           if (value > maxValueTotal) maxValueTotal = value;
//           if (value < minValueTotal || minValueTotal == -1) minValueTotal = value;

//           totalValues.push(value);
//           }
//           // we've got our paths now extrude them to a height and add a color
//           for (var i = 0 ; i < averageValues.length ; i++) {
 
//               // create material color based on average
//               var scale = ((averageValues[i] - minValueAverage) / (maxValueAverage - minValueAverage)) * 255;
//               var mathColor = gradient(Math.round(scale),255);
//               var material = new THREE.MeshLambertMaterial({
//                   color: mathColor
//               });
 
//               // create extrude based on total
//               var extrude = ((totalValues[i] - minValueTotal) / (maxValueTotal - minValueTotal)) * 100;
//               var shape3d = meshes[i].extrude({amount: Math.round(extrude), bevelEnabled: false});
 
//               // create a mesh based on material and extruded shape
//               var toAdd = new THREE.Mesh(shape3d, material);
 
//               // rotate and position the elements nicely in the center
//               toAdd.rotation.x = Math.PI/2;
//               toAdd.translateX(-490);
//               toAdd.translateZ(50);
//               toAdd.translateY(extrude/2);
 
//               // add to scene
//               scene.add(toAdd);
//             }
//             // simple gradient function
//         function gradient(length, maxLength) {
 
//             var i = (length * 255 / maxLength);
//             var r = i;
//             var g = 255-(i);
//             var b = 0;
 
//             var rgb = b | (g << 8) | (r << 16);
//             return rgb;
//           }
// };

// renderer.render( scene, camera );