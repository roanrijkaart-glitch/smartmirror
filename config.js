/*
 * Smart Mirror ALA, staand scherm 300 x 530 mm.
 * De installer vraagt de agenda-link en NS-sleutel lokaal op de Pi.
 */
const GOOGLE_CALENDAR_ICAL_URL = "VUL_HIER_DE_AGENDA_ICAL_LINK_IN";
const BUS_STOP_AREA_CODE = "GdMam";
const NS_API_KEY = "VUL_HIER_DE_NS_API_SLEUTEL_IN";

const modules = [
	{
		module: "clock",
		position: "middle_center",
		config: {
			timezone: "Europe/Amsterdam",
			timeFormat: 24,
			displaySeconds: false,
			showDate: true,
			dateFormat: "dddd D MMMM",
			clockBold: false
		}
	},
	{
		module: "weather",
		position: "top_left",
		header: "Temperatuur Gouda",
		config: {
			weatherProvider: "openmeteo",
			type: "current",
			lat: 52.0116,
			lon: 4.7105,
			roundTemp: true,
			onlyTemp: true,
			updateInterval: 600000
		}
	}
];

if (GOOGLE_CALENDAR_ICAL_URL.startsWith("https://")) {
	modules.push({
		module: "calendar",
		position: "top_right",
		header: "Agenda",
		config: {
			maximumEntries: 4,
			showTimeToday: true,
			calendars: [{ symbol: "calendar-check", url: GOOGLE_CALENDAR_ICAL_URL }]
		}
	});
}

modules.push({
	module: "MMM-bustimes",
	position: "bottom_left",
	header: "Bus halte Mammoet",
	config: {
		stopAreaCode: BUS_STOP_AREA_CODE,
		displaymode: "large",
		showHeader: true,
		departures: 5,
		showTownName: true
	}
});

if (!NS_API_KEY.startsWith("VUL")) {
	modules.push({
		module: "MMM-nsdepartures",
		position: "bottom_right",
		header: "Treinen vanaf Gouda",
		config: {
			apiKey: NS_API_KEY,
			station: "Gd",
			maxEntries: 3,
			updateInterval: 60000
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

