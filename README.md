# EyePause site · Twenty Feet

Download and landing page for EyePause, the macOS menu bar app for the 20-20-20 rule. Next.js App Router, exported as a static site.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to out/
npm run lint && npm run typecheck && npm test
```

Locally the page uses the checked-in snapshot in `src/data/release.json`, so the macOS download shows as temporarily unavailable. To build with the real installers:

```bash
EYEPAUSE_RELEASES_TOKEN=<token> npm run fetch-release && npm run build
```

## Deploy

GitHub Pages, via `.github/workflows/pages.yml` (on push to `main`, daily, or manually). The workflow fetches the latest app release, copies the installers into `public/downloads/`, and builds with the Pages base path.

It needs the repository secret `EYEPAUSE_RELEASES_TOKEN`: a fine-grained personal access token with **Contents: read** on the private app repository.
