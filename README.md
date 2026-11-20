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

## Validation

Run `node tests/smoke.cjs` to verify manifest restrictions, dashboard opening, AI message dispatch and absence of cookie-rewrite requests. Syntax: `node --check dashboard.js`. The browser-based visual smoke test is still pending; headless Chrome terminated before its debugging endpoint became available on the author's Windows machine.


## Browser smoke test (2026-11-19)

The extension was loaded in an isolated Microsoft Edge 157 profile via Playwright. Its Manifest V3 service worker started, dashboard.html opened, and six iframe tiles were present. This confirms basic UI loading, not successful embedding or login to every third-party AI site. Google Chrome isolated test did not expose an extension service worker in this environment. Existing browser sessions were not used.

## Final UI checks (2026-11-20)

Isolated Edge/Playwright test: dashboard loaded six iframe elements; layout buttons 2x2, 3 columns, and Focus were clickable; all six configured AI URLs were present; no page-level JavaScript errors were captured. This does **not** guarantee third-party iframe rendering or authentication, because sites can block embedding. The local original extension was not enabled for testing.
