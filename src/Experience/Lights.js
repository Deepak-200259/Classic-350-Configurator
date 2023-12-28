import * as THREE from "three";
import Experience from "./Experience.js";

export default class Lights {
	constructor() {
		this.experience = new Experience();
		this.setupLightsGroup();
		this.setupAmbientLight(0xffffff, 15);
		this.setupDirectionalLight(
			0xffffff,
			30,
			new THREE.Vector3(0, 400, 0),
			true,
		);
	}

	/**
	 * Will create a lights group in the scene
	 */

	setupLightsGroup() {
		this.lightsGroup = new THREE.Group();
		this.lightsGroup.name = "Lights Group";
		this.experience.scene.add(this.lightsGroup);
	}

	/**
	 * Will add an Ambient Light in the scene
	 * @param {*} color color of ambient light - color hex code value
	 * @param {*} intensity intensity of light - number
	 */

	setupAmbientLight(color = 0xffffff, intensity = 1) {
		this.ambientLight = new THREE.AmbientLight(color, intensity);
		this.lightsGroup.add(this.ambientLight);
	}

	/**
	 * Will add directional Light in the scene
	 * @param {*} color color of the directional light - color hex code value, Default 0xffffff
	 * @param {*} intensity intensity of the directional light - number, Default 1
	 * @param {*} position position of the directional light - vector3, Default x=0,y=0,z=0
	 * @param {*} castShadow whether light will result in casting Shadow - boolean value, Default false
	 */

	setupDirectionalLight(
		color = 0xffffff,
		intensity = 1,
		position = new THREE.Vector3(0, 0, 0),
		castShadow = false,
	) {
		this.directionalLight = new THREE.DirectionalLight(color, intensity);
		this.directionalLight.castShadow = castShadow;
		this.directionalLight.shadow.mapSize.set(2048, 2048);
		this.directionalLight.shadow.camera.left = -500;
		this.directionalLight.shadow.camera.right = 500;
		this.directionalLight.shadow.camera.top = 500;
		this.directionalLight.shadow.camera.bottom = -500;
		this.directionalLight.shadow.camera.far = 1000;
		this.directionalLight.shadow.normalBias = 0.001;
		this.directionalLight.position.set(position.x, position.y, position.z);
		this.lightsGroup.add(this.directionalLight);
	}

	/**
	 * Will add a Rect Area Light in the scene
	 * @param {*} color color of the Rect Area light - color hex code value, Default 0xffffff
	 * @param {*} intensity intensity of the Rect Area light - number, Default 1
	 * @param {*} width width of the Rect Area Light - number, default 10
	 * @param {*} height height of the Rect Area Light - number, default 10
	 * @param {*} position postion of the Rect Area Light - Vector3, default x=0,y=0,z=0
	 */

	setupRectAreaLight(
		color = 0xffffff,
		intensity = 1,
		width = 10,
		height = 10,
		position = new THREE.Vector3(0, 0, 0),
	) {
		this.rectAreaLight = new THREE.RectAreaLight(
			color,
			intensity,
			width,
			height,
		);
		this.rectAreaLight.position.set(position.x, position.y, position.z);
		this.lightsGroup.add(this.rectAreaLight);
	}

	/**
	 * Creates a new SpotLight and adds it to the scene.
	 * @param {*} color Hexadecimal color of the light. Default 0xffffff (white).
	 * @param {*} intensity Numeric value of the light's strength/intensity. Expects a Float. Default 1.
	 * @param {*} distance Maximum range of the light. Default is 0 (no limit). Expects a Float.
	 * @param {*} angle Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2.
	 * @param {*} penumbra Percent of the SpotLight cone that is attenuated due to penumbra. Takes values between zero and 1. Expects a Float. Default 0.
	 * @param {*} decay The amount the light dims along the distance of the light. Expects a Float. Default 2.
	 * @param {*} position Position where the spotlight is to be placed. Expects a Vector3. Default x=0,y=0,z=0.
	 */

	setupSpotLight(
		color = 0xffffff,
		intensity = 1,
		distance = 1,
		angle = (Math.PI / 180) * 30,
		penumbra = 0,
		decay = 2,
		position = new THREE.Vector3(0, 0, 0),
	) {
		this.spotLight = new THREE.SpotLight(
			color,
			intensity,
			distance,
			angle,
			penumbra,
			decay,
		);
		this.spotLight.position.set(position.x, position.y, position.z);
		this.lightsGroup.add(this.spotLight);
	}
}
