#!/bin/bash
# Double-click this file to launch the slide presentation locally.
DIR="$(cd "$(dirname "$0")/Presentation slides" && pwd)"
cd "$DIR"

# Kill anything on port 8080
lsof -ti:8080 | xargs kill -9 2>/dev/null
sleep 0.2

echo "Starting local server at http://localhost:8080 ..."
python3 -m http.server 8080 &
SERVER_PID=$!
sleep 0.8

# Open the editor (or the presentation directly)
open "http://localhost:8080/editor.html"

echo ""
echo "Server running (PID $SERVER_PID)."
echo "Press Ctrl+C to stop."
wait $SERVER_PID
