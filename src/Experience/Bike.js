import * as THREE from "three";
import Experience from "./Experience.js";
import { Seats } from "./Constants.js";

export default class Bike {
	constructor() {
		this.experience = new Experience();
		const { scene, camera, loaders, intersectedObjects, uiLoader, uiPopups } =
			this.experience;
		this.scene = scene;
		this.camera = camera;
		this.loaders = loaders;
		this.uiLoader = uiLoader;
		this.intersectedObjects = intersectedObjects;
		this.uiPopups = uiPopups;
		this.seatModels = [];
		this.defaultPoint = { x: -200, y: 200, z: 200 };
		this.loadModel();
	}

	loadModel() {
		this.loaders.loadFBX("./static/models/bike.FBX").then((fbx) => {
			fbx.name = "Bike Model";
			this.setupBike(fbx);
			this.uiLoader.hideLoader();
			this.uiPopups.createControlsDescriptionPopup();
			setTimeout(() => {
				if (document.getElementById("controls-description-overlay")) {
					this.uiPopups.hidePopup(
						document.getElementById("controls-description-overlay"),
					);
				}
			}, 10000);
			this.loadSeatModels();
		});
	}

	loadSeatModels() {
		for (let i = 0; i < Seats.length; i++) {
			this.loaders.loadGLTF(Seats[i].path).then((gltf) => {
				this.seatModels[i] = { name: Seats[i].name, scene: gltf.scene };
				gltf.scene.name = Seats[i].name;
			});
		}
		console.log(this.seatModels);
	}

	setupBike(fbx) {
		this.bike = fbx;
		this.seatMeshes = [];
		this.currentSeat = null;
		this.defaultSeatGroup = new THREE.Group();
		this.defaultSeatGroup.name = "Default Seat";
		this.bike.position.set(10, -20, 0);
		this.bike.scale.set(0.1, 0.1, 0.1);
		this.bike.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.castShadow = true;
				if (
					child.name === "polySurface1" ||
					child.name === "polySurface2" ||
					child.name === "polySurface5" ||
					child.name === "stitchEasy" ||
					child.name === "stitchEasy2"
				) {
					this.seatMeshes.push(child);
				}
				if (child.material.map)
					child.material.map.colorspace = THREE.SRGBColorSpace;
				child.material.metalness = 0.1;
				child.material.shininess = 300;
				child.material.reflectivity = 1;
				this.intersectedObjects.push(child);
			}
		});

		for (let i = 0; i < this.seatMeshes.length; i++) {
			this.seatMeshes[i].parent.remove(this.seatMeshes[i]);
		}
		for (let i = 0; i < this.seatMeshes.length; i++) {
			this.defaultSeatGroup.add(this.seatMeshes[i]);
		}
		this.defaultSeatGroup.position.set(0, 370, 0);
		this.defaultSeatGroup.rotation.x = -Math.PI / 2;
		this.bike.add(this.defaultSeatGroup);
		this.scene.add(this.bike);
	}

	calculateCameraDistanceFromDefaultPoint() {
		const { x, y, z } = this.defaultPoint;

		const cameraX = this.camera.instance.position.x;
		const cameraY = this.camera.instance.position.y;
		const cameraZ = this.camera.instance.position.z;

		const dx = cameraX - x;
		const dy = cameraY - y;
		const dz = cameraZ - z;

		const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
		return distance;
	}

	switchSeats(id) {
		if (id) {
			let defaultSeatPresent = false;
			this.bike.traverse((child) => {
				if (child instanceof THREE.Group) {
					if (child.name === "Default Seat") {
						defaultSeatPresent = child;
					}
				}
			});
			if (defaultSeatPresent) this.bike.remove(defaultSeatPresent);
			if (this.currentSeat !== null) {
				this.bike.remove(this.currentSeat);
				this.currentSeat = null;
			}
			for (let i = 0; i < this.seatModels.length; i++) {
				if (id === this.seatModels[i].name) {
					this.currentSeat = this.seatModels[i].scene;
					this.bike.add(this.currentSeat);
					this.currentSeat.scale.set(1000, 1000, 1000);
					this.currentSeat.position.set(0, 0, 0);
				}
			}
		} else {
			if (this.currentSeat !== null) {
				this.bike.remove(this.currentSeat);
				this.currentSeat = null;
			}
			this.bike.add(this.defaultSeatGroup);
			this.intersectedObjects.length = 0;
			this.intersectedObjects.push(...[this.bike]);
		}
	}

	zoomAnimation(id = null) {
		this.switchSeats(id);
		const distance = this.calculateCameraDistanceFromDefaultPoint();

		const arrayofPoints = [
			new THREE.Vector3(250, 150, -250),
			new THREE.Vector3(0, 200, -500),
			new THREE.Vector3(-250, 150, -250),
			new THREE.Vector3(-500, 200, 0),
			new THREE.Vector3(-250, 150, 250),
			new THREE.Vector3(-100, 120, 120),
		];
		const curve = new THREE.CatmullRomCurve3(arrayofPoints);

		if (distance < 500) {
			const timeline = gsap.timeline();
			timeline.to(this.camera.instance.position, {
				duration: distance / 400,
				x: -80,
				y: 120,
				z: 120,
			});
		} else {
			const cameraTarget = { t: 0 };
			const timeline = gsap.timeline();
			timeline
				.to(this.camera.instance.position, {
					duration: distance / 1600,
					x: arrayofPoints[0].x,
					y: arrayofPoints[0].y,
					z: arrayofPoints[0].z,
				})
				.to(cameraTarget, {
					t: 1,
					duration: distance / 400,
					onUpdate: () => {
						const position = curve.getPointAt(cameraTarget.t);
						this.camera.instance.position.copy(position);
					},
				});
		}
		gsap.to(this.camera.controls.target, {
			duration: distance / 800,
			x: 20,
		});
	}

	update() {}
}
