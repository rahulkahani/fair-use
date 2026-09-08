# Landing page setup

The public page is `index.html` with `landing.css`. It explains the skill and links to the released chat instructions. It has no AI runtime, upload form, recording controls, analytics, or browser storage. The former `reel.html` address redirects to the landing page.

## Open locally

Open `docs/index.html` in a modern browser, or run this from the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory docs
```

Visit `http://127.0.0.1:8765`. Keep the terminal running while viewing or recording. Press Ctrl+C when finished. The server is bound to this computer.

## Public hosting

A maintainer can enable GitHub Pages in **Settings → Pages**, choose **Deploy from a branch**, and select **main /docs**. Wait for the build and use the URL GitHub reports. This publishes the documentation folder; keep private material out of it. Once enabled, future changes to that folder publish automatically. See [GitHub’s official instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Using the skill

The primary button links to the released `fair-use-chat.md` attachment. Visitors add that file to a compatible AI chat or paste its contents. They supply their work, sources, intended use, relevant countries, and any permissions. Image inspection and current-source research depend on the chosen assistant’s capabilities. The host’s data policies apply; the website receives no artwork.

Native skill installation is an optional path through the repository and release page, not a prerequisite to the attachment workflow.
