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
[[ -f "${MIRROR_DIR}/package.json" ]] || { echo "MagicMirror ontbreekt. Voer eerst install-on-pi.sh uit."; exit 1; }
mkdir -p "${MIRROR_DIR}/config" "${MIRROR_DIR}/modules/MMM-nsdepartures"
OLD_CONFIG="${MIRROR_DIR}/config/config.js"
BACKUP="${OLD_CONFIG}.backup.$(date +%Y%m%d-%H%M%S)"
[[ ! -f "$OLD_CONFIG" ]] || cp "$OLD_CONFIG" "$BACKUP"
cp "${SOURCE_DIR}/config.js" "$OLD_CONFIG"
cp "${SOURCE_DIR}/custom.css" "${MIRROR_DIR}/config/custom.css"
cp "${SOURCE_DIR}/modules/MMM-nsdepartures/"* "${MIRROR_DIR}/modules/MMM-nsdepartures/"
read -r -p "Agenda iCal-link (leeg = huidige waarde behouden): " CALENDAR_URL
read -r -p "NS API-sleutel (leeg = huidige waarde behouden): " NS_API_KEY
CALENDAR_URL="$CALENDAR_URL" NS_API_KEY="$NS_API_KEY" OLD_CONFIG="$BACKUP" node - "$OLD_CONFIG" <<'NODE'
const fs = require("node:fs");
const target = process.argv[2];
let text = fs.readFileSync(target, "utf8");
const oldFile = process.env.OLD_CONFIG;
let old = "";
try { old = fs.readFileSync(oldFile, "utf8"); } catch {}
function value(src, name) {
  return src.match(new RegExp(`const ${name} = ("(?:[^"\\\\]|\\\\.)*");`))?.[1];
}
function put(name, env, placeholder) {
  const incoming = process.env[env];
  const val = incoming || value(old, name);
  if (val) text = text.replace(JSON.stringify(placeholder), incoming ? JSON.stringify(incoming) : val);
}
put("GOOGLE_CALENDAR_ICAL_URL", "CALENDAR_URL", "VUL_HIER_DE_AGENDA_ICAL_LINK_IN");
put("NS_API_KEY", "NS_API_KEY", "VUL_HIER_DE_NS_API_SLEUTEL_IN");
fs.writeFileSync(target, text);
NODE
node --check "$OLD_CONFIG"
cd "$MIRROR_DIR"
exec node --run start
