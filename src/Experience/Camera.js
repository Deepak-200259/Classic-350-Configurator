import Experience from "./Experience.js";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default class Camera {
	constructor() {
		this.experience = new Experience();
		const { sizes, scene, domElements } = this.experience;
		this.sizes = sizes;
		this.scene = scene;
		this.canvas = domElements.canvas;
		this.bikeDiv = domElements.bikeDiv;

		this.setInstance();
		this.setControls();
	}

	/**
	 * Will create an instance of the Camera
	 */

	setInstance() {
		this.instance = new THREE.PerspectiveCamera(
			20,
			this.sizes.x / this.sizes.y,
			30,
			10000,
		);
		this.instance.position.set(0, 0, 550);
		this.instance.lookAt(0, 0, 0);
		this.scene.add(this.instance);
	}

	/**
	 * Setup Orbit Controls
	 */

	setControls() {
		this.controls = new OrbitControls(this.instance, this.canvas);
		this.controls.enableDamping = true;
		this.controls.enablePan = false;
		this.controls.dampingFactor = 1;
		this.controls.enableDamping = true;
		this.controls.maxPolarAngle = (Math.PI / 180) * 95;
		this.controls.minDistance = 150;
		this.controls.maxDistance = 750;
		this.controls.target = new THREE.Vector3(0, 50, 0);
	}

	/**
	 * Will resize the Camera
	 */

	resize() {
		this.sizes.x = this.bikeDiv.clientWidth;
		this.sizes.y = this.bikeDiv.clientHeight;
		this.instance.aspect = this.sizes.x / this.sizes.y;
		this.instance.updateProjectionMatrix();
	}

	update() {
		if (this.controls) this.controls.update();
	}
}
