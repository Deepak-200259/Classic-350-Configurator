export default class UIPopups {
	constructor() {}

	createControlsDescriptionPopup() {
		const backgroundOverlay = document.createElement("div");
		backgroundOverlay.id = "controls-description-overlay";

		const controlsDescriptionBody = document.createElement("div");
		controlsDescriptionBody.id = "controls-description-body";

		const controlsDescriptionContent = document.createElement("div");
		controlsDescriptionContent.id = "controls-description-content";

		const touchControlsDiv = document.createElement("div");
		touchControlsDiv.className = "touch-controls-div";

		const mouseControlsDiv = document.createElement("div");
		mouseControlsDiv.className = "mouse-controls-div";

		const touchControlsHeading = document.createElement("p");
		touchControlsHeading.id = "touch-controls-heading";
		touchControlsHeading.textContent = "Touch Controls";

		const mouseControlsHeading = document.createElement("p");
		mouseControlsHeading.id = "mouse-controls-heading";
		mouseControlsHeading.textContent = "Mouse Controls";

		touchControlsDiv.appendChild(touchControlsHeading);
		mouseControlsDiv.appendChild(mouseControlsHeading);

		const controlsDesc = [
			{
				controlName: "ROTATE",
				touchImgURL: "./static/images/Common/HandTouchIcon.png",
				mouseImgURL: "./static/images/Common/LeftClickIcon.png",
			},
			{
				controlName: "ZOOM",
				touchImgURL: "./static/images/Common/HandTouchIcon.png",
				mouseImgURL: "./static/images/Common/LeftClickIcon.png",
			},
			{
				controlName: "MOVE",
				touchImgURL: "./static/images/Common/HandTouchIcon.png",
				mouseImgURL: "./static/images/Common/LeftClickIcon.png",
			},
		];

		for (let i = 0; i < controlsDesc.length; i++) {
			const controlsDiv = document.createElement("div");
			controlsDiv.id = "controls-div";

			const controlIcon = document.createElement("img");
			controlIcon.src = controlsDesc[i].touchImgURL;
			controlIcon.alt = `${controlsDesc[i].controlName} icon`;
			controlIcon.id = "control-icon";

			const controlIconDesc = document.createElement("p");
			controlIconDesc.id = "control-icon-desc";
			controlIconDesc.textContent = controlsDesc[i].controlName;

			controlsDiv.appendChild(controlIcon);
			controlsDiv.appendChild(controlIconDesc);

			touchControlsDiv.appendChild(controlsDiv);
		}

		for (let i = 0; i < controlsDesc.length; i++) {
			const controlsDiv = document.createElement("div");
			controlsDiv.id = "controls-div";

			const controlIcon = document.createElement("img");
			controlIcon.src = controlsDesc[i].mouseImgURL;
			controlIcon.alt = `${controlsDesc[i].controlName} icon`;
			controlIcon.id = "control-icon";

			const controlIconDesc = document.createElement("p");
			controlIconDesc.id = "control-icon-desc";
			controlIconDesc.textContent = controlsDesc[i].controlName;

			controlsDiv.appendChild(controlIcon);
			controlsDiv.appendChild(controlIconDesc);

			mouseControlsDiv.appendChild(controlsDiv);
		}
		const closeButton = document.createElement("div");
		closeButton.id = "control-desc-close";
		closeButton.innerHTML = "&#10005;";

		closeButton.addEventListener("click", (event) => {
			event.stopPropagation();
			this.hidePopup(backgroundOverlay);
		});

		controlsDescriptionContent.appendChild(touchControlsDiv);
		controlsDescriptionContent.appendChild(mouseControlsDiv);

		controlsDescriptionBody.appendChild(closeButton);
		controlsDescriptionBody.appendChild(controlsDescriptionContent);

		backgroundOverlay.appendChild(controlsDescriptionBody);

		document.body.appendChild(backgroundOverlay);
	}

	createPersonalizeOnClickAlert() {
		const backgroundOverlay = document.createElement("div");
		backgroundOverlay.id = "personalize-background-overlay";

		const personalizeAlert = document.createElement("div");
		personalizeAlert.id = "personalize-alert";

		const personalizeAlertContent = document.createElement("div");
		personalizeAlertContent.id = "personalize-alert-content";

		const personalizeAlertHeading = document.createElement("h1");
		personalizeAlertHeading.id = "personalize-alert-heading";
		personalizeAlertHeading.textContent = "Alert";

		const closeButton = document.createElement("div");
		closeButton.id = "personalize-alert-close";
		closeButton.innerHTML = "&#10005;";

		closeButton.addEventListener("click", (event) => {
			event.stopPropagation();
			this.hidePopup(backgroundOverlay);
		});

		const personalizeAlertMessage = document.createElement("p");
		personalizeAlertMessage.id = "personalize-alert-message";
		personalizeAlertMessage.innerHTML =
			"Personalized Badge is available only on the purchase of seats or alloys and an additional spend of &#x20B9;4000 on accessories.";

		const okButton = document.createElement("div");
		okButton.id = "personalize-alert-ok";
		okButton.textContent = "OK";
		okButton.addEventListener("click", (event) => {
			event.stopPropagation();
			this.hidePopup(backgroundOverlay);
		});

		personalizeAlertContent.appendChild(personalizeAlertHeading);
		personalizeAlertContent.appendChild(personalizeAlertMessage);
		personalizeAlertContent.appendChild(okButton);
		personalizeAlert.appendChild(closeButton);
		personalizeAlert.appendChild(personalizeAlertContent);
		backgroundOverlay.appendChild(personalizeAlert);

		document.body.appendChild(backgroundOverlay);
	}

	hidePopup(backgroundOverlay, parent = document.body) {
		parent.removeChild(backgroundOverlay);
	}

	createInfoPopup(heading, data, img) {
		const infoPopupBackgroundOverlay = document.createElement("div");
		infoPopupBackgroundOverlay.id = "infoPopupBackgroundOverlay";

		const infoPopup = document.createElement("div");
		infoPopup.id = "infoPopup";

		const infoPopupContent = document.createElement("div");
		infoPopupContent.id = "infoPopupContent";

		const infoContentHeading = document.createElement("p");
		infoContentHeading.id = "infoContentHeading";
		infoContentHeading.innerHTML = `${heading} Information`;

		const infoItemImage = document.createElement("img");
		infoItemImage.src = img;
		infoItemImage.id = "infoItemImage";

		const infoItemData = document.createElement("div");
		infoItemData.id = "infoItemData";
		infoItemData.innerHTML = data;

		const closeButton = document.createElement("div");
		closeButton.id = "infoClose";
		closeButton.innerHTML = "&#10005;";

		closeButton.addEventListener("click", (event) => {
			event.stopPropagation();
			this.hidePopup(infoPopupBackgroundOverlay);
		});

		infoPopupContent.appendChild(infoContentHeading);
		infoPopupContent.appendChild(infoItemImage);
		infoPopupContent.appendChild(infoItemData);

		infoPopup.appendChild(closeButton);
		infoPopup.appendChild(infoPopupContent);

		infoPopupBackgroundOverlay.appendChild(infoPopup);

		document.body.appendChild(infoPopupBackgroundOverlay);
	}
}
