export default class UILoader {
	constructor() {
		this.showLoader();
	}

	showLoader() {
		const loaderDiv = document.getElementById("loaderDiv");
		loaderDiv.style.display = "flex";
	}

	hideLoader() {
		const loaderDiv = document.getElementById("loaderDiv");
		loaderDiv.style.display = "none";
	}
}
