# Browser demo

This is a portable static web app: `index.html`, `demo.css`, and `demo.js`. It demonstrates the fair-use workflow with authored educational scenarios, and helps a visitor prepare their own project brief. It is not a live AI wrapper, legal service, or demonstration of measured model accuracy.

## Open locally

Open `docs/index.html` directly in a modern browser. Alternatively, from the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory docs
```

Visit `http://127.0.0.1:8765`. Keep the terminal running during a recording, then press Ctrl+C when finished. The server is bound to this computer, not the local network. All asset paths are relative so the same folder can work under a repository subpath.

## Publish with GitHub Pages

The source is ready for GitHub Pages; committing these files does not enable hosting on its own. A repository maintainer can enable it when ready to make the demo available at a public URL:

1. Open the repository’s **Settings → Pages**.
2. Choose **Deploy from a branch**.
3. Select **main** and **/docs**, then save.
4. Wait for the Pages build to finish and use the URL GitHub reports. Verify the rendered page, three examples, and brief download before sharing it.

The `.nojekyll` file makes this a plain static site. Files under `docs/` become public site content. Keep private client work and generated user briefs out of the repository. Future commits to the configured folder publish automatically once branch-based hosting is enabled. See [GitHub’s official publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## What visitors can do

- Switch among three fictional scenarios and open the explanation of each consideration.
- Enter their project’s sources, process, intended use, relevant countries, and permission evidence.
- Select optional PNG, JPEG, or WebP images for a local preview (10 MB per file maximum).
- Download a Markdown brief with their supplied text, image filenames, unknowns, and questions for professional review. A selectable text fallback is also shown for browsers that do not save downloads; regenerate it after changing entries.
- Download the actual skill separately and deliberately share the brief and images with a compatible assistant, or take the facts to a qualified lawyer.

The images are not analyzed or embedded in the brief. The page does not call a model, perform legal research, submit entries to a server, use analytics, or save entries to browser storage. Selected files are displayed through temporary browser object URLs. Use **Clear entries & images** to remove the page’s working entries; any brief already downloaded remains on the visitor’s device. Browsers may restore form entries during navigation despite autocomplete being disabled. Browser extensions, browser session features, operating-system behavior, and the hosting provider’s ordinary page-request logs are outside the app’s control. A hosting provider can see page requests, but this app does not send the form contents or selected images to it.

No disclaimer should be presented as a guarantee of legal compliance or liability protection. Have a qualified lawyer review the product behavior, public claims, and disclaimer together for the relevant jurisdiction before relying on them for professional use.

## A later live-AI version

A live version is a separate feature with a different privacy and operating model. It would need a server that invokes a selected model using the canonical skill instructions, supported image inspection and current-source retrieval, protected server-side credentials, clear consent for file transfers, retention/deletion controls, abuse and cost limits, and evaluations against representative cases. Never embed a provider API key in browser JavaScript or treat the authored examples as generated results.

Keep the educational preparation scope and the visibility of missing evidence. A model connection does not turn the output into professional legal review.

## Demo verification

September 7, 2026: JavaScript syntax, repository reference checks, reproducible skill packaging, and whitespace checks passed. In the Codex in-app browser, the three authored scenario states, brief mode, empty-form guard, populated text brief, unknown-field handling, and Clear behavior were exercised. The visible brief matched the supplied fictional facts and contained no embedded images. The narrow in-app layout was visually inspected.

The in-app browser did not report a completed download event, so file-save behavior is not confirmed in that browser; the selectable text fallback was verified. Image selection/error paths, other browsers, a full responsive/accessibility audit, and public GitHub Pages deployment were not exercised. A focused independent AI code review found two issues around browser-restored state; both were fixed and re-reviewed without remaining blockers. This is engineering verification, not attorney validation or evidence of model/legal accuracy.
