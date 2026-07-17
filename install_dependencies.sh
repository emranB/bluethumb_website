#!/usr/bin/env bash
set -euo pipefail

command -v node >/dev/null 2>&1 || {
  echo "Node.js is required." >&2
  exit 1
}

command -v npm >/dev/null 2>&1 || {
  echo "npm is required." >&2
  exit 1
}

cd "$(dirname "$0")"
npm install
