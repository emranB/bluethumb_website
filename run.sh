#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

npm run build
npm run preview -- --host 0.0.0.0 --port 4173
