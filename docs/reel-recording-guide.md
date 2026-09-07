# Directed Reel recording

Open [the recording studio](reel.html), or use `http://127.0.0.1:8765/reel.html` while the local server described in the [demo guide](demo-guide.md) is running. It also works by opening `reel.html` directly alongside its CSS and JavaScript files, or under the same GitHub Pages setup as the main demo.

This is an orchestrated product walkthrough and retrospective of the build. The skill excerpt is real; the project, displayed prompt, response, and brief example are authored. The page does not simulate live coding, research, uploads, model inference, or file creation. It does not record a video, generate narration, or export MP4. Use your screen recorder and your own voiceover.

## The recording setup

1. Rehearse with the director’s desk visible. Each scene has a narration cue and an action note.
2. Start your screen recorder. Select or later crop to the portrait canvas; the canvas has a 9:16 aspect ratio. Record at a size where the smallest text is legible. The app uses scalable text and CSS graphics, but it cannot increase the resolution of a small screen capture after recording.
3. Choose **Clean recording view** or press **C**. This hides the desk and fits the portrait canvas to the window. It does not hide the disclosure or start the recorder. Sidebars may remain outside the portrait crop in a wide window.
4. Press **R** to reset. Use **Right Arrow** to reveal each scene with your narration. This is the recommended method if you want the sequence to feel naturally paced.
5. For an automatic take, use **Record view + play from start**, or press **Space** while focused on the clean canvas. The prepared sequence is 64 seconds; use manual pacing or adjust durations in `reel.js` if your narration needs more time.
6. Stop your recorder after the final scene. The sequence does not loop. **Escape**, **C**, or a tap on the clean canvas restores the controls. Retake a scene individually with the scene list, previous/next, and reset controls.

The clean canvas is the recording view, not browser fullscreen. You can separately use your browser or operating system’s fullscreen controls. Hide browser chrome in your recording or crop it in editing as desired. Keep the “Scripted demo · no live AI” and educational footer inside the published crop.

Keyboard shortcuts do not run inside editable inputs or with Control/Command/Alt modifiers. Space retains its normal activation behavior on focused buttons; in the clean canvas it plays or pauses the sequence. Playback pauses when the tab becomes hidden. Reduced-motion settings disable entrance animations. Pausing playback freezes the scene timeline; brief entrance animations may finish.

## The 64-second story

| Time | Visual | Suggested narration |
|---|---|---|
| 0–6s | “I made a remix. Now what?” | “You’ve made a remix. Now you have a copyright question. That’s the problem I wanted this skill to help people understand.” |
| 6–14s | Actual skill excerpt and reference structure | “I built an open skill around a structured workflow and reference material. The instructions explicitly define it as educational support, not legal advice.” |
| 14–22s | Four intake questions | “First it asks for the relevant country, what was borrowed, the intended use, and any permission. Unknown facts should stay unknown.” |
| 22–31s | Schematic source and Photoshop remix | “Here’s a fictional Photoshop example. Assume someone kept an illustrator’s distinctive character, but changed the background, colors, and typography. These visuals are placeholders.” |
| 31–40s | Prepared prompt | “The prepared example says: I want to sell fifty posters in the US, and I don’t have permission. What should I understand and ask a lawyer?” |
| 40–49s | Authored example considerations | “This prewritten response illustrates how the workflow considers purpose, the source, significant borrowing, and market effects together. It also names the missing evidence.” |
| 49–57s | Preparation-brief example | “The useful outcome is an organized brief: what you know, what’s missing, and questions to take to a qualified lawyer.” |
| 57–64s | Project name and GitHub address | “It’s called Fair Use. The skill is open source on GitHub, for copyright education and review preparation. It’s not a substitute for professional legal review.” |

These timings are editable production choices, not a claim about platform limits or model response speed. Rehearse the narration; hold scenes longer if needed. Captions can be added in your video editor without covering the disclosure or main content.

## If you want actual build footage

Record the existing `skills/fair-use/SKILL.md`, the repository reference files, and the published commit history in a real editor or browser. Narrate what each choice does. Call any staged recreation a recreation; do not portray a prepared file or simulated terminal output as a fresh live build. The studio itself shows a real excerpt rather than invented coding activity.

For an actual model demonstration, switch to an assistant with the full skill loaded, supply authorized materials, and record its real response and limitations. Clearly distinguish that segment from this scripted product walkthrough. The studio does not establish legal accuracy or reproducibility across models.

## Suggested caption

> I built an open skill to help creators understand copyright questions and prepare for informed legal review. Here’s the workflow I designed: gather the facts, surface uncertainty, and organize questions for a qualified lawyer.
>
> This is a directed, scripted walkthrough with a fictional example—not live AI analysis. Educational information only, not legal advice or a substitute for professional review.
>
> Explore the skill: https://github.com/rahulkahani/fair-use

## Scope and sources

The brief US example is adapted from the main demo and is conditional on its hypothetical facts. It is not a finding of infringement or legal clearance. Read the [Copyright Office overview](https://www.copyright.gov/fair-use/more-info.html), [US statute §107](https://www.copyright.gov/title17/92chap1.html#107), and [the main demo’s scope and disclaimer](index.html). Source review: September 7, 2026; no new legal validation is implied by recording the walkthrough.

## Verification

September 7, 2026: JavaScript syntax, repository links, skill packaging, and whitespace checks passed. The in-app browser exercised all eight scenes, checked content against the portrait footer boundary, ran the complete 64-second automatic sequence to its final hold, and verified manual navigation, keyboard play/pause/reset, clean-view entry/exit, and the playback label after selecting an earlier scene following completion. Same-scene retakes visibly replayed the opening entrance animation. A focused independent code review found two playback defects, which were fixed and re-reviewed without remaining blockers.

Actual video recording/export, other browsers, mobile touch interaction, assistive-technology testing, and public hosting were not exercised. The studio is a screen-recording surface, not an MP4 export tool. Engineering checks do not validate the illustrative legal analysis.
