class ThreeGround {
	constructor() {
		this.groundWidth = 15;
		this.groundHeight = 15;

		this.Geometry = new THREE.PlaneBufferGeometry(this.groundWidth, this.groundHeight);
		this.Texture = new THREE.TextureLoader().load("textures/marble.jpg");
		this.Material = new THREE.MeshPhongMaterial({map: this.Texture, side: THREE.DoubleSide});
		this.Object = new THREE.Mesh(this.Geometry, this.Material);

		this._init();
	}

	_init() {
		// To understand why i don't have to rotate
		// the ground anymore after implenting cannon.js
		// this.Object.rotation.y -= Math.PI / 2;
		// this.Object.position.y = -2;
		this.Object.receiveShadow = true;
	}
}