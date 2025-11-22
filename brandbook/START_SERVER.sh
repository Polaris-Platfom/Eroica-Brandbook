#!/bin/bash

# Start local web server for Eroica Brandbook
# This is needed for the Mesa Logo Family interactive features to work properly

echo "🚀 Starting Eroica Brandbook Web Server..."
echo ""
echo "📂 Server will run from: $(pwd)"
echo "🌐 Open in browser: http://localhost:8080"
echo ""
echo "📄 Available pages:"
echo "   - http://localhost:8080/index.html (Full Brandbook)"
echo "   - http://localhost:8080/test-mesa-logos.html (Mesa Logos Test)"
echo ""
echo "⚠️  Press Ctrl+C to stop the server"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

python3 -m http.server 8080

