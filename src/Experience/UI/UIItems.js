import { items } from "../Constants.js";
import Experience from "../Experience.js";
export default class UIItems {
	constructor() {
		this.experience = new Experience();
		this.uiPopups = this.experience.uiPopups;
		this.uiItems = this.experience.domElements.items;

		const activeElement = document.getElementById("active-category");
		console.log(items);
		for (let key in items) {
			if (key === activeElement.textContent)
				this.createItemsSection(items[activeElement.textContent]);
		}
	}

	createItemsSection(key) {
		this.uiItems.innerHTML = "";
		this.bike = this.experience.bike;
		this.uiPopups = this.experience.uiPopups;
		for (let i = 0; i < key.length; i++) {
			const dropdownContainer = document.createElement("div");
			dropdownContainer.id = "dropdown";
			const dropdownHeadingDiv = document.createElement("div");
			dropdownHeadingDiv.id = "dropdown-heading";

			const dropdownHeadingName = document.createElement("span");
			dropdownHeadingName.className = "dropdown-heading-name";

			const dropdownToggle = document.createElement("img");
			dropdownToggle.id = "dropdown-toggle";
			dropdownToggle.src = "./static/images/Common/DownIcon.png";

			dropdownHeadingName.innerHTML = key[i].name;
			dropdownHeadingDiv.appendChild(dropdownHeadingName);
			dropdownHeadingDiv.appendChild(dropdownToggle);

			dropdownHeadingDiv.addEventListener("click", () => {
				dropdownContent.style.display =
					dropdownContent.style.display === "block" ? "none" : "block";
				dropdownToggle.style.rotate =
					dropdownToggle.style.rotate === `180deg` ? `0deg` : `180deg`;
				const computedColor =
					window.getComputedStyle(dropdownHeadingName).color;
				dropdownHeadingName.style.color =
					computedColor === "rgb(255, 255, 255)" ? "#666666" : "#ffffff";
			});

			// Create dropdown content
			const dropdownContent = document.createElement("div");
			dropdownContent.id = "dropdown-content";

			// Create items in dropdown content
			for (let j = 0; j < key[i].types.length; j++) {
				if (key[i].name === "COLOURS") {
					dropdownContent.style.display = "block";
					dropdownToggle.style.rotate = `180deg`;
					dropdownHeadingName.style.color = "#ffffff";
				}
				const item = document.createElement("div");
				item.className = "item";
				const img = document.createElement("img");
				img.id = "itemImage";
				img.src = key[i].types[j].imgUrl;

				const itemName = document.createElement("p");
				itemName.id = "itemName";
				itemName.textContent = key[i].types[j].name;

				if (key[i].types[j].infoNeeded) {
					const infoIcon = document.createElement("img");
					infoIcon.id = "infoIcon";
					infoIcon.src = "./static/images/Common/InfoIcon.png";
					infoIcon.addEventListener("click", (event) => {
						event.stopPropagation();
						this.uiPopups.createInfoPopup(
							key[i].types[j].name,
							key[i].types[j].info,
							key[i].types[j].imgUrl,
						);
					});
					itemName.appendChild(infoIcon);
				}
				if (key[i].types[j].is3dPreviewAvailable) {
					item.addEventListener("click", () => {
						if (key[i].types[j].isSwitchable && item.id !== "isItemSelected") {
							for (let k = 0; k < dropdownContent.childNodes.length; k++) {
								dropdownContent.children[k].removeAttribute("id");
							}
							item.id = "isItemSelected";
							if (itemName.textContent === "Low Seat, Rider, Black") {
								this.bike.zoomAnimation(key[i].types[j].id);
							}
							if (itemName.textContent === "Low Seat, Rider, Brown") {
								this.bike.zoomAnimation(key[i].types[j].id);
							}
						} else {
							item.removeAttribute("id");
							this.bike.zoomAnimation();
						}
					});
				}
				if (!key[i].types[j].is3dPreviewAvailable) {
					const isRotatableDiv = document.createElement("div");
					isRotatableDiv.id = "isRotatableDiv";

					const rotatable = document.createElement("img");
					rotatable.id = "rotatable-img";
					rotatable.src = "./static/images/Common/Rotatable.png";

					isRotatableDiv.appendChild(rotatable);
					item.appendChild(isRotatableDiv);

					isRotatableDiv.addEventListener("mouseover", (event) => {
						event.stopPropagation();
						const hoverDiv = document.createElement("div");
						hoverDiv.id = "hoverDiv";
						hoverDiv.textContent =
							"This part is currently not available to view on the Motorcycle.";
						hoverDiv.style.display = "block";
						hoverDiv.style.position = "absolute";
						hoverDiv.style.left = 10 + "%";
						hoverDiv.style.top = event.clientY + 10 + "px";
						document.body.appendChild(hoverDiv);
					});

					isRotatableDiv.addEventListener("mouseout", (event) => {
						const hoverDiv = document.getElementById("hoverDiv");
						if (hoverDiv) {
							document.body.removeChild(hoverDiv);
						}
					});
				}
				item.appendChild(img);
				item.appendChild(itemName);
				if (key[i].name !== "COLOURS") {
					const itemPrice = document.createElement("h6");
					itemPrice.id = "itemPrice";
					itemPrice.innerHTML = key[i].types[j].price;
					item.appendChild(itemPrice);
				}
				dropdownContent.appendChild(item);
			}

			dropdownContainer.appendChild(dropdownHeadingDiv);
			dropdownContainer.appendChild(dropdownContent);
			this.uiItems.appendChild(dropdownContainer);
		}
	}

	handleToggle() {
		for (let i = 0; i < keys.length; i++) {}
	}
}
