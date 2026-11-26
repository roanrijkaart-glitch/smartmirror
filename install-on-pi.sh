#!/usr/bin/env bash
set -euo pipefail

REPO_RAW="https://raw.githubusercontent.com/roanrijkaart-glitch/smartmirror/main"
SOURCE_DIR="$(mktemp -d)"
trap 'rm -rf "$SOURCE_DIR"' EXIT
mkdir -p "$SOURCE_DIR/modules/MMM-nsdepartures"
for FILE in config.js custom.css modules/MMM-nsdepartures/MMM-nsdepartures.js modules/MMM-nsdepartures/node_helper.js modules/MMM-nsdepartures/MMM-nsdepartures.css; do
  curl -fsSL "${REPO_RAW}/${FILE}" -o "${SOURCE_DIR}/${FILE}"
done
MIRROR_DIR="$HOME/MagicMirror"
NODE_VERSION="v22.23.5"
NODE_ROOT="/opt/node-${NODE_VERSION}"

echo "Smart Mirror installeren op deze Raspberry Pi."
read -r -p "Google Agenda iCal-link (Enter = later invullen): " CALENDAR_URL
printf '\n'
read -r -p "NS API-sleutel (Enter = later invullen): " NS_API_KEY
printf '\n'

if ! command -v git >/dev/null || ! command -v curl >/dev/null || ! command -v xz >/dev/null; then
	command -v sudo >/dev/null || { echo "sudo ontbreekt."; exit 1; }
	sudo apt-get update
	sudo apt-get install -y git curl xz-utils ca-certificates
fi

case "$(dpkg --print-architecture)" in
	arm64) NODE_ARCH="arm64" ;;
	armhf) NODE_ARCH="armv7l" ;;
	*) echo "Deze installer ondersteunt Raspberry Pi arm64 en armhf."; exit 1 ;;
esac

if [[ ! -x "${NODE_ROOT}/bin/node" ]]; then
	NODE_ARCHIVE="node-${NODE_VERSION}-linux-${NODE_ARCH}.tar.xz"
	NODE_URL="https://nodejs.org/dist/${NODE_VERSION}"
	curl -fsSL "${NODE_URL}/${NODE_ARCHIVE}" -o "/tmp/${NODE_ARCHIVE}"
	curl -fsSL "${NODE_URL}/SHASUMS256.txt" -o "/tmp/node-${NODE_VERSION}-SHASUMS256.txt"
	grep -E " ${NODE_ARCHIVE}$" "/tmp/node-${NODE_VERSION}-SHASUMS256.txt" | (cd /tmp && sha256sum -c -)
	sudo mkdir -p "${NODE_ROOT}"
	sudo tar -xJf "/tmp/${NODE_ARCHIVE}" -C "${NODE_ROOT}" --strip-components=1
fi

PROFILE_LINE="export PATH=${NODE_ROOT}/bin:\$PATH"
touch "$HOME/.profile"
grep -qxF "$PROFILE_LINE" "$HOME/.profile" || printf '%s\n' "$PROFILE_LINE" >> "$HOME/.profile"
export PATH="${NODE_ROOT}/bin:${PATH}"
hash -r
echo "Node.js $(node --version) is klaar."

if [[ ! -f "${MIRROR_DIR}/package.json" ]]; then
	if [[ -e "${MIRROR_DIR}" ]]; then
		echo "${MIRROR_DIR} bestaat al, maar bevat geen MagicMirror-installatie. Ik overschrijf die map niet."
		exit 1
	fi
	git clone --depth 1 https://github.com/MagicMirrorOrg/MagicMirror.git "${MIRROR_DIR}"
fi

cd "${MIRROR_DIR}"
node --run install-mm

mkdir -p "${MIRROR_DIR}/modules"
if [[ ! -d "${MIRROR_DIR}/modules/MMM-bustimes" ]]; then
	git clone --depth 1 https://github.com/73cirdan/MMM-bustimes.git "${MIRROR_DIR}/modules/MMM-bustimes"
fi
(cd "${MIRROR_DIR}/modules/MMM-bustimes" && npm install --no-audit --no-fund)

NS_MODULE_DIR="${MIRROR_DIR}/modules/MMM-nsdepartures"
mkdir -p "${NS_MODULE_DIR}"
cp "${SOURCE_DIR}/modules/MMM-nsdepartures/"* "${NS_MODULE_DIR}/"

mkdir -p "${MIRROR_DIR}/config"
if [[ -f "${MIRROR_DIR}/config/config.js" ]]; then
	BACKUP="${MIRROR_DIR}/config/config.js.backup.$(date +%Y%m%d-%H%M%S)"
	cp "${MIRROR_DIR}/config/config.js" "${BACKUP}"
	printf 'Reservekopie gemaakt: %s\n' "${BACKUP}"
fi
cp "${SOURCE_DIR}/config.js" "${MIRROR_DIR}/config/config.js"
cp "${SOURCE_DIR}/custom.css" "${MIRROR_DIR}/config/custom.css"

CALENDAR_URL="${CALENDAR_URL}" NS_API_KEY="${NS_API_KEY}" node - "${MIRROR_DIR}/config/config.js" <<'NODE'
const fs = require("node:fs");
const file = process.argv[2];
let config = fs.readFileSync(file, "utf8");
const calendarUrl = process.env.CALENDAR_URL || "";
const apiKey = process.env.NS_API_KEY || "";
if (calendarUrl) config = config.replace("VUL_HIER_DE_AGENDA_ICAL_LINK_IN", JSON.stringify(calendarUrl));
if (apiKey) config = config.replace("VUL_HIER_DE_NS_API_SLEUTEL_IN", JSON.stringify(apiKey));
fs.writeFileSync(file, config);
NODE

node --check "${MIRROR_DIR}/config/config.js"
echo "Installatie klaar. MagicMirror start nu."
exec node --run start

