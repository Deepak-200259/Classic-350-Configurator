import Experience from "./Experience.js";
import * as THREE from "three";

export default class RaycasterManager {
	constructor() {
		this.experience = new Experience();
		const { domElements, sizes, camera, intersectedObjects, bike } =
			this.experience;
		this.canvas = domElements.canvas;
		this.sizes = sizes;
		this.camera = camera.instance;
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();
		this.bike = bike;

		// Will store the Objects which will trigger the click events for rayacaster
		this.intersectedObjects = intersectedObjects;

		this.setupEventListeners();
	}

	/**
	 * Setting up event Listeners for Triggering events
	 */

	setupEventListeners() {
		// For getting current mouse position
		this.canvas.addEventListener("mousemove", (e) => {
			this.mouseMove(e);
		});

		this.canvas.addEventListener("click", (e) => {
			this.mouseClick(e);
		});
	}

	// calibrating the mouse according to the canvas size
	mouseMove = (event) => {
		// Use the actual canvas size instead of the full screen size
		const canvasBoundingRect = this.canvas.getBoundingClientRect();

		// Calculate normalized device coordinates based on the canvas size and position
		this.mouse.x =
			((event.clientX - canvasBoundingRect.left) / canvasBoundingRect.width) *
				2 -
			1;
		this.mouse.y =
			-((event.clientY - canvasBoundingRect.top) / canvasBoundingRect.height) *
				2 +
			1;
	};

	// Handling click on objects

	mouseClick() {
		this.raycaster.setFromCamera(this.mouse, this.camera);
		/**
		 * Will check for intersection with objects that are stored the
		 * intersectedObjects and return an Array of objects intersected with
		 */
		const intersects = this.raycaster.intersectObjects(this.intersectedObjects);
		console.log(intersects);

		if (intersects.length > 0) {
			// this.bike.zoomAnimation(intersects[0]);
			/**
			 * Currently only one triggering is needed, so directly working
			 * For multiple triggerings, use if else or switch and handle accordingly here only.
			 */
		}
	}
}
