const MyThree = new ThreeBase();
const GROUND = new ThreeGround()

MyThree.Scene.add(GROUND.Object);

/* PHYSICS: CANNONJS IMPLEMENTATION */
const TIMESTEP = 1/60;
const LINEAR_DAMPING = 0.01;
const WORLD = new CANNON.World();
const CANNON_DEBUGGER = new THREE.CannonDebugRenderer(MyThree.Scene, WORLD);

WORLD.gravity.set(0, -9, 0);
WORLD.broadphase = new CANNON.NaiveBroadphase();
WORLD.solver.tolerance = 0.001;

/* PHYSICS: CREATE AND ADD THE GROUND */
const GROUND_SHAPE = new CANNON.Plane();
const GROUND_BODY = new CANNON.Body({mass: 0});

GROUND_BODY.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI/2);
GROUND_BODY.addShape(GROUND_SHAPE);
WORLD.addBody(GROUND_BODY);

/* PHYSICS: CREATE AND ADD AN OBJECT */
let boxBody = new CANNON.Body({mass: 2});
let boxShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));

boxBody.linearDamping = LINEAR_DAMPING;
boxBody.addShape(boxShape);
boxBody.position.set(0, 10, 0);
WORLD.addBody(boxBody);

function CreateBox() {
	const boxWidth = 2;
	const boxHeight = 2;
	const boxDepth = 2;

	let geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
	let texture = new THREE.TextureLoader().load("textures/wood.jpg");
	let material = new THREE.MeshPhongMaterial({map: texture});
	let box = new THREE.Mesh(geometry, material);

	box.position.y = +1;
	box.receiveShadow = false;
	box.castShadow = true;

	return box;
}

function CreateCone() {
	let geometry = new THREE.ConeGeometry(1, 3, 32);
	let texture = new THREE.TextureLoader().load("textures/icy.jpg");
	let material = new THREE.MeshPhongMaterial({map: texture});
	let cone = new THREE.Mesh(geometry, material);
	
	cone.position.y = +1;
	cone.position.x = +3;
	cone.receiveShadow = false;
	cone.castShadow = true;

	return cone;
}

function CreateCylinder() {
	let geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
	let texture = new THREE.TextureLoader().load("textures/ice.jpg");
	let material = new THREE.MeshBasicMaterial({map: texture});
	let cylinder = new THREE.Mesh(geometry, material);

	cylinder.position.y = +1;
	cylinder.position.x = -3;
	cylinder.receiveShadow = false;
	cylinder.castShadow = true;

	return cylinder;
}

const BOX = CreateBox();
const CONE = CreateCone()
const CYLINDER = CreateCylinder();

MyThree.Scene.add(BOX);
MyThree.Scene.add(CONE);
MyThree.Scene.add(CYLINDER);
MyThree.setDragOn([BOX, CONE, CYLINDER]);

const RAYCASTER = new THREE.Raycaster();
const MOUSE = new THREE.Vector2();
let intersects = [];
let isDragging = false;

function onMouseDown(e) {
	isDragging = true;

	/* GET INTERCEPTED OBJECT */
	intersects = RAYCASTER.intersectObjects([BOX])
	if(intersects.length > 0) {
		console.log('intersects', intersects);
	}
}

function onMouseMove(e) {
	if(isDragging) {
		MOUSE.x = (e.clientX / window.innerWidth) * 2 - 1;
		MOUSE.y = (e.clientY / window.innerHeight) * 2 + 1;

		console.log('MOUSE', MOUSE);
		console.log('BODY', boxBody.position);
	}
}

function onMouseUp(e) {
	isDragging = false;
}

function handlerRaycaster() {
	RAYCASTER.setFromCamera(MOUSE, MyThree.Camera);
}

/* ANIMATION LOOP */
function animate() {
	requestAnimationFrame(animate);
	handlerRaycaster();
	updatePhysics();
	MyThree.Renderer.render(MyThree.Scene, MyThree.Camera);
}

/* WINDOW RESIZE HANDLER */
function handleResize() {
	MyThree.Camera.aspect = window.innerWidth / window.innerHeight;
	MyThree.Camera.updateProjectionMatrix();
	MyThree.Renderer.setSize(window.innerWidth, window.innerHeight);
}

/* PHYSIC UPDATER */
function updatePhysics() {
	WORLD.step(TIMESTEP);

	CANNON_DEBUGGER.update();

	BOX.position.copy(boxBody.position);
	BOX.quaternion.copy(boxBody.quaternion);

	GROUND.Object.position.copy(GROUND_BODY.position);
	GROUND.Object.quaternion.copy(GROUND_BODY.quaternion);
}

window.addEventListener("resize", handleResize, false);
window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("mousedown", onMouseDown, false);
window.addEventListener("mouseup", onMouseUp, false);

animate();

/**
 * TO DO
 * IMPORT 3D MODEL
 */
// const LOADER = new THREE.GLTFLoader();
// const MODEL_PATH = "./models/adamHead/adamHead.gltf";

// LOADER.load(MODEL_PATH, function(gltf) {
// 	MyThree.Scene.add(gltf.scene);
// });