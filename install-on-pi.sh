#!/usr/bin/env bash
set -e

MIRROR_DIR="$HOME/MagicMirror"
MODULES_DIR="$MIRROR_DIR/modules"
CONFIG_URL="https://raw.githubusercontent.com/roanrijkaart-glitch/smartmirror/main/config.js"

if [ ! -d "$MIRROR_DIR" ]; then
  echo "MagicMirror staat niet in $MIRROR_DIR. Installeer MagicMirror eerst."
  exit 1
fi

mkdir -p "$MODULES_DIR"

if [ ! -d "$MODULES_DIR/MMM-bustimes/.git" ]; then
  git clone https://github.com/73cirdan/MMM-bustimes.git "$MODULES_DIR/MMM-bustimes"
fi
if [ -f "$MODULES_DIR/MMM-bustimes/package.json" ]; then
  (cd "$MODULES_DIR/MMM-bustimes" && npm install)
fi

if [ ! -d "$MODULES_DIR/nstreinen/.git" ]; then
  git clone https://github.com/qistoph/MMM-nstreinen.git "$MODULES_DIR/nstreinen"
fi
if [ -f "$MODULES_DIR/nstreinen/package.json" ]; then
  (cd "$MODULES_DIR/nstreinen" && npm install)
fi

if [ -f "$MIRROR_DIR/config/config.js" ]; then
  cp "$MIRROR_DIR/config/config.js" "$MIRROR_DIR/config/config.js.backup"
fi

curl -fsSL "$CONFIG_URL" -o "$MIRROR_DIR/config/config.js"
cd "$MIRROR_DIR"
node --check config/config.js
echo "Configuratie geplaatst. MagicMirror start nu."
npm start
