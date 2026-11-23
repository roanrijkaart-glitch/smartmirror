/*
 * Magic Mirror voor de ALA
 * Basis: klok/datum en weer voor Gouda.
 * Vul geheime waarden alleen lokaal in op de Pi.
 */
const GOOGLE_CALENDAR_ICAL_URL = "VUL_HIER_DE_SECRET_ICAL_LINK_IN";
const BUS_STOP_AREA_CODE = "VUL_HIER_DE_STOPAREA_CODE_VAN_BLOMMESTEINSINGEL_IN";
const NS_API_KEY = "VUL_HIER_DE_NS_API_SLEUTEL_IN";

const modules = [
	{
		module: "clock",
		position: "top_left",
		config: { timezone: "Europe/Amsterdam", timeFormat: 24 }
	},
	{
		module: "weather",
		position: "top_right",
		header: "Weer in Gouda",
		config: {
			weatherProvider: "openmeteo",
			type: "current",
			lat: 52.0116,
			lon: 4.7105,
			showFeelsLike: true,
			showHumidity: true,
			showWind: true
		}
	},
	{
		module: "weather",
		position: "bottom_right",
		header: "Verwachting",
		config: {
			weatherProvider: "openmeteo",
			type: "forecast",
			lat: 52.0116,
			lon: 4.7105,
			maxNumberOfDays: 3
		}
	}
];

if (GOOGLE_CALENDAR_ICAL_URL.startsWith("https://")) {
	modules.push({
		module: "calendar",
		position: "top_left",
		config: {
			maximumEntries: 5,
			showTimeToday: true,
			calendars: [{ symbol: "calendar-check", url: GOOGLE_CALENDAR_ICAL_URL }]
		}
	});
}

if (!BUS_STOP_AREA_CODE.startsWith("VUL")) {
	modules.push({
		module: "MMM-bustimes",
		position: "bottom_left",
		header: "Bus Blommesteinsingel",
		config: {
			stopAreaCode: BUS_STOP_AREA_CODE,
			displaymode: "medium",
			departures: 3,
			showTownName: true
		}
	});
}

if (!NS_API_KEY.startsWith("VUL")) {
	modules.push({
		module: "nstreinen",
		position: "bottom_center",
		header: "Treinen vanaf Gouda",
		config: {
			apiKey: NS_API_KEY,
			fromStation: "GD",
			maxEntries: 4,
			reloadInterval: 300000
		}
	});
}

const config = {
	address: "localhost",
	port: 8080,
	basePath: "/",
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],
	language: "nl",
	locale: "nl-NL",
	timeFormat: 24,
	units: "metric",
	modules
};

if (typeof module !== "undefined") module.exports = config;
