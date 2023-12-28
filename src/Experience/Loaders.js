import * as THREE from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default class Loaders {
	constructor() {
		this.setupLoaders();
	}

	setupLoaders() {
		this.textureLoader = new THREE.TextureLoader();
		this.fbxLoader = new FBXLoader();
		this.gltfLoader = new GLTFLoader();
	}

	/**
	 * Will Load Fbx model (.fbx)
	 * @param {*} url url from where model is to be loaded
	 * @returns Promise which on resolve return Model
	 */

	loadFBX = (url) => {
		return new Promise((resolve) => {
			this.fbxLoader.load(
				url,
				(fbx) => {
					resolve(fbx);
				},
				(xhr) => {
					console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
				},
				(error) => {
					console.log(error);
					resolve();
				},
			);
		});
	};

	/**
	 * Will Load GLTF model (.gltf)
	 * @param {*} url url from where model is to be loaded
	 * @returns Promise which on resolve return Model
	 */

	loadGLTF = (url) => {
		return new Promise((resolve) => {
			this.gltfLoader.load(
				url,
				(gltf) => {
					resolve(gltf);
				},
				(xhr) => {
					console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
				},
				(error) => {
					console.log(error);
					resolve();
				},
			);
		});
	};

	/**
	 * Will Load Texture (.jpg, .png, .gif etc.)
	 * @param {*} url url from where texture is to be loaded
	 * @returns Promise which on resolve return texture
	 */

	loadTexture = (url) => {
		return new Promise((resolve) => {
			this.textureLoader.load(
				url,
				(texture) => {
					resolve(texture);
				},
				(xhr) => {
					console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
				},
				(error) => {
					console.log(error);
					resolve();
				},
			);
		});
	};
}
