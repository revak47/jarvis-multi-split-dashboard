# Jarvis Multi-Split Dashboard

Open-source experimental Chrome/Chromium extension for a multi-pane AI workspace. Created with vibe coding.

## Security-first community edition

This public edition deliberately **does not** bypass browser frame protections, modify cookies, block service workers, or automatically open Google sign-in tabs. Some sites refuse to load inside embedded frames; that is expected browser security behavior, not a bug to bypass.

## Install

1. Download the repository and extract it.
2. Open `chrome://extensions` and enable Developer mode.
3. Choose **Load unpacked** and select this repository folder.
4. Click the extension icon to open the dashboard.

## Status

Experimental. Some embedded AI sites may not work due to their own security policies. The original local extension remains separate and disabled. This version has not undergone a complete independent security audit.

## Contributing

Issues and pull requests welcome. Please do not propose removing CSP, X-Frame-Options, or weakening cookie settings to make iframe embedding work.
