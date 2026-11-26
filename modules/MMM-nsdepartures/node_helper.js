const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
	async socketNotificationReceived(notification, config) {
		if (notification !== "NS_GET_DEPARTURES") return;
		if (!config.apiKey) {
			this.sendSocketNotification("NS_DEPARTURES_RESULT", { error: "NS API-sleutel ontbreekt." });
			return;
		}

		try {
			const url = new URL("https://gateway.apiportal.ns.nl/timetable-api/v2/departures");
			url.searchParams.set("station", config.station || "Gd");
			url.searchParams.set("maxJourneys", String(config.maxEntries || 3));
			const response = await fetch(url, {
				headers: {
					"Accept": "application/json",
					"Ocp-Apim-Subscription-Key": config.apiKey
				},
				signal: AbortSignal.timeout(12000)
			});
			if (!response.ok) throw new Error(`NS API antwoordde met status ${response.status}.`);
			const data = await response.json();
			const root = data.payload || data;
			const departures = root.departures || root.payload?.departures || [];
			if (!Array.isArray(departures)) throw new Error("De NS API stuurde geen vertrektijden terug.");
			this.sendSocketNotification("NS_DEPARTURES_RESULT", { departures, error: "" });
		} catch (error) {
			this.sendSocketNotification("NS_DEPARTURES_RESULT", {
				departures: [],
				error: error.name === "TimeoutError" ? "NS reageert niet op tijd." : error.message
			});
		}
	}
});

