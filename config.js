/*
 * Magic Mirror voor de ALA
 * Staande indeling voor een monitor van 300 mm breed x 530 mm hoog.
 * Vul geheime waarden alleen lokaal in op de Pi.
 */
const GOOGLE_CALENDAR_ICAL_URL = "VUL_HIER_DE_SECRET_ICAL_LINK_IN";
const BUS_TIMING_POINT_CODE = "53514170";
const NS_API_KEY = "VUL_HIER_DE_NS_API_SLEUTEL_IN";

const modules = [
	{
		module: "clock",
		position: "top_bar",
		config: { timezone: "Europe/Amsterdam", timeFormat: 24 }
	},
	{
		module: "weather",
		position: "upper_third",
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
		position: "middle_center",
		header: "Verwachting",
		config: {
			weatherProvider: "openmeteo",
			type: "forecast",
			lat: 52.0116,
			lon: 4.7105,
			maxNumberOfDays: 2
		}
	}
];

if (GOOGLE_CALENDAR_ICAL_URL.startsWith("https://")) {
	modules.push({
		module: "calendar",
		position: "lower_third",
		header: "Agenda",
		config: {
			maximumEntries: 3,
			showTimeToday: true,
			calendars: [{ symbol: "calendar-check", url: GOOGLE_CALENDAR_ICAL_URL }]
		}
	});
}

if (BUS_TIMING_POINT_CODE !== "") {
	modules.push({
		module: "MMM-bustimes",
		position: "bottom_bar",
		header: "Bus Blommesteinsingel",
		config: {
			timingPointCode: BUS_TIMING_POINT_CODE,
			displaymode: "medium",
			departures: 2,
			showTownName: true
		}
	});
}

if (!NS_API_KEY.startsWith("VUL")) {
	modules.push({
		module: "nstreinen",
		position: "bottom_bar",
		header: "Treinen vanaf Gouda",
		config: {
			apiKey: NS_API_KEY,
			fromStation: "GD",
			maxEntries: 3,
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
