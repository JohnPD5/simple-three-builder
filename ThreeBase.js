class ThreeBase {
	constructor() {
		this.FOV = 75;
		this.ASPECT = window.innerWidth / window.innerHeight;
		this.NEAR_PLANE = 0.1;
		this.FAR_PLANE = 1000;
		this.LIGHT_COLOR = 0xFFFFFF;
		this.LIGHT_INTENSITY = 5;

		this.BackgroundColor = new THREE.Color(0xB5E3FF);
		this.Scene = new THREE.Scene();
		this.Camera = new THREE.PerspectiveCamera(this.FOV, this.ASPECT, this.NEAR_PLANE, this.FAR_PLANE);
		this.Renderer = new THREE.WebGLRenderer({ antialias: true });

		this.PointLight = new THREE.PointLight(0xffffff, 1, 500);
		this.AmbientLight = new THREE.AmbientLight(0xffffff, 0.2);

		this.OrbitControls = new THREE.OrbitControls(this.Camera, this.Renderer.domElement);
		this.DragControls = null;
	
		this._init();
	}

	setDragOn(objects) {
		this.DragControls = new DragControls(objects, this.Camera, this.Renderer.domElement);
		
		this.DragControls.addEventListener('dragstart', function (event) {
			MyThree.OrbitControls.enableRotate = false;
		});
		
		this.DragControls.addEventListener('dragend', function ( event ) {
			MyThree.OrbitControls.enableRotate = true;
		});
	}

	_setRenderer() {
		this.Renderer.setSize(window.innerWidth, window.innerHeight);;
		this.Renderer.shadowMap.enabled = true;
		this.Renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		document.body.appendChild(this.Renderer.domElement);
	}

	_setLights() {
		this.PointLight.position.set(5, 10, 8);
		this.PointLight.castShadow = true;
		this.PointLight.shadow.camera.near = 0.1;
		this.PointLight.shadow.camera.far = 25;
	}

	_init() {
		this._setRenderer();
		this._setLights();

		this.Scene.background = this.BackgroundColor;
		this.Camera.position.z = 12;
		this.Camera.position.y = 10;
		this.OrbitControls.update();
		
		this.Scene.add(this.PointLight);
		this.Scene.add(this.AmbientLight);
	}
}