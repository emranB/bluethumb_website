#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

command -v node >/dev/null 2>&1 || {
  echo "Node.js is required. Install it from https://nodejs.org/" >&2
  exit 1
}

command -v npm >/dev/null 2>&1 || {
  echo "npm is required. Install Node.js from https://nodejs.org/" >&2
  exit 1
}

if [[ ! -d node_modules ]]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Building site..."
npm run build

echo "Starting preview at http://localhost:9000"
npm run preview -- --host 0.0.0.0 --port 9000
