/* global Module */
Module.register("MMM-nsdepartures", {
	defaults: {
		apiKey: "",
		station: "Gd",
		maxEntries: 3,
		updateInterval: 60000
	},

	start() {
		this.departures = [];
		this.error = "Vertrektijden laden…";
		this.sendSocketNotification("NS_GET_DEPARTURES", {
			apiKey: this.config.apiKey,
			station: this.config.station,
			maxEntries: this.config.maxEntries
		});
		this.updateTimer = setInterval(() => this.requestDepartures(), this.config.updateInterval);
	},

	requestDepartures() {
		this.sendSocketNotification("NS_GET_DEPARTURES", {
			apiKey: this.config.apiKey,
			station: this.config.station,
			maxEntries: this.config.maxEntries
		});
	},

	socketNotificationReceived(notification, payload) {
		if (notification !== "NS_DEPARTURES_RESULT") return;
		this.departures = payload.departures || [];
		this.error = payload.error || "";
		this.updateDom(300);
	},

	getDom() {
		const wrapper = document.createElement("div");
		wrapper.className = "nsdepartures";
		if (this.error) {
			const status = document.createElement("div");
			status.className = "dimmed small";
			status.textContent = this.error;
			wrapper.appendChild(status);
			if (!this.departures.length) return wrapper;
		}

		const table = document.createElement("table");
		table.className = "small";
		const head = document.createElement("thead");
		const headRow = document.createElement("tr");
		["Tijd", "Trein", "Richting", "Spoor"].forEach((label) => {
			const cell = document.createElement("th");
			cell.textContent = label;
			headRow.appendChild(cell);
		});
		head.appendChild(headRow);
		table.appendChild(head);

		const body = document.createElement("tbody");
		this.departures.slice(0, this.config.maxEntries).forEach((departure) => {
			const row = document.createElement("tr");
			const cancelled = departure.cancelled === true || /cancel/i.test(departure.departureStatus || "");
			const dateValue = departure.actualDateTime || departure.plannedDateTime;
			const time = dateValue
				? new Intl.DateTimeFormat("nl-NL", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Amsterdam" }).format(new Date(dateValue))
				: "—";
			const product = departure.product || {};
			const values = [
				cancelled ? "Vervallen" : time,
				product.shortCategoryName || product.categoryCode || departure.trainCategory || product.displayName || "Trein",
				departure.direction || departure.destination || departure.name || "—",
				departure.actualTrack || departure.plannedTrack || "—"
			];
			values.forEach((value, index) => {
				const cell = document.createElement("td");
				cell.textContent = value;
				if (index === 0) cell.className = "ns-time";
				row.appendChild(cell);
			});
			body.appendChild(row);
		});
		table.appendChild(body);
		wrapper.appendChild(table);
		return wrapper;
	},

	getStyles() {
		return ["MMM-nsdepartures.css"];
	},

	stop() {
		if (this.updateTimer) clearInterval(this.updateTimer);
	}
});

