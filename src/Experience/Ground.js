import * as THREE from "three";
import Experience from "./Experience.js";

export default class Ground {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.setupCircularGround(10000, 64, 0xfcfbf7, true);
	}
	/**
	 * Creates a circular plane ground
	 * @param {*} radius radius of the circular ground - number
	 * @param {*} segments number of segments it would require to create a circle - number
	 * @param {*} color color of the ground - color hex code
	 * @param {*} receiveShadow whether ground would recieve shadows or not - boolean value
	 */
	setupCircularGround(radius, segments, color, receiveShadow) {
		const ground = new THREE.Mesh(
			new THREE.CircleGeometry(radius, segments),
			new THREE.MeshStandardMaterial({ color: color }),
		);
		ground.receiveShadow = receiveShadow;
		console.log(ground);
		ground.position.y = -20.1;
		ground.rotation.x = (-Math.PI / 180) * 90;
		this.scene.add(ground);
	}
}
