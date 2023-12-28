import * as THREE from "three";
import Bike from "./Bike.js";
import RaycasterManager from "./RaycasterManager.js";
import UICategories from "./UI/UICategories.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import Loaders from "./Loaders.js";
import Lights from "./Lights.js";
import Ground from "./Ground.js";
import UILoader from "./UI/UILoader.js";
import UIPopups from "./UI/UIPopups.js";

let _instance = null;
export default class Experience {
	constructor() {
		if (_instance) {
			return _instance;
		}
		_instance = this;
		// Scene
		this.scene = new THREE.Scene();

		// Scene Properties
		this.scene.fog = new THREE.Fog("#fcfbf7", 500, 1500);
		this.scene.background = new THREE.Color("#fcfbf7");
		// this.scene.backgroundIntensity = 100;

		//Dom Elements
		this.domElements = {
			canvas: document.getElementById("webgl"),
			categories: document.getElementById("categories-section"),
			items: document.getElementById("items-section"),
			bikeDiv: document.getElementById("bike-section"),
		};
		// Sizes
		this.sizes = {
			x: this.domElements.bikeDiv.clientWidth,
			y: this.domElements.bikeDiv.clientHeight,
		};

		this.intersectedObjects = []; // Push those objects with whom you want to check intersection with mouse.

		this.camera = new Camera();
		this.renderer = new Renderer();
		this.loaders = new Loaders();
		this.uiLoader = new UILoader();
		this.uiPopups = new UIPopups();
		this.lights = new Lights();
		this.ground = new Ground();
		this.bike = new Bike();
		this.uiCategories = new UICategories();
		this.raycasterManager = new RaycasterManager();

		window.addEventListener("resize", () => {
			this.resize();
		});

		this.update();
	}

	resize() {
		this.camera.resize();
		this.renderer.resize();
	}

	update() {
		if (this.camera) this.camera.update();
		if (this.bike) this.bike.update();
		if (this.renderer) this.renderer.update();
		window.requestAnimationFrame(() => {
			this.update();
		});
	}
}
