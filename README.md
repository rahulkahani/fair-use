# fair-use

An open skill for examining copyright, licenses, and fair-use arguments in images, designs, and remixes—made with AI, Canva, a camera, or by hand.

**Assess a use. Understand the evidence. Choose a next step.**

Give the assistant your work, relevant sources, jurisdiction, and intended use. It explains the strongest available basis, concerns, missing evidence, and practical options. It does not certify that an image is “copyright safe” or determine liability from appearance alone.

Version 0.1.0 · Sources reviewed September 7, 2026 · MIT licensed

## Start in a chat

Download **fair-use-chat.md** from the [latest release](https://github.com/rahulkahani/fair-use/releases/latest), attach it to a ChatGPT or Claude conversation, and write:

> Follow the attached fair-use assessment instructions. I'm using this in [country/countries] for [specific purpose]. Here is my finished work and its source material, if any. I made it by [process], and this is the permission or license evidence I have. Assess the copyright basis, any fair-use arguments, and what remains uncertain.

Then attach the artwork and relevant evidence you are comfortable sharing with that host. The chat file contains the complete workflow and references; if Markdown attachments are unavailable, paste its contents instead. This is an attachment-based workflow; it does not install a persistent skill in every chat or enable browsing/vision that the host lacks. Choose a host with image inspection and web access for the fullest assessment.

## Install as a skill

### Claude

Download **fair-use.zip** from the [latest release](https://github.com/rahulkahani/fair-use/releases/latest). In Claude's supported skill interface, open **Customize → Skills → + → Create skill → Upload a skill**, upload the ZIP, and enable it. Then ask “Use the fair-use skill to assess this proposed use.” Availability and controls depend on the host/account. See [Claude's official instructions](https://support.claude.com/en/articles/12512180-use-skills-in-claude).

The ZIP contains one top-level `fair-use/` folder with `SKILL.md` and its resources, following the [documented package structure](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills). Upload behavior should be checked in your account; this release is not a claim of tested compatibility with every client.

### Codex

Copy the `skills/fair-use/` folder to your personal `~/.agents/skills/` directory, or to a project's `.agents/skills/` directory. Avoid overwriting a customized existing installation. Then invoke:

```text
Use $fair-use to assess this image and its proposed use.
```

Codex CLI/IDE also provide `/skills` for selection. Native skill interfaces differ by host; `$fair-use` is not a universal slash command for every chat application. [Official OpenAI skill documentation](https://learn.chatgpt.com/docs/build-skills)

### Other compatible hosts

Use the folder containing [SKILL.md](skills/fair-use/SKILL.md) with a host that supports the agent-skill format, or use the chat attachment workflow above. There are no executable runtime scripts, API keys, accounts, telemetry, or external tool dependencies in the skill. Analysis uses your host's available capabilities and data-handling settings.

## What you receive

- A clearly scoped preliminary assessment for a specified use and jurisdiction.
- A component-by-component check of ownership, licenses, public-domain claims, and potentially borrowed expression.
- A balanced US four-factor analysis when fair use is actually relevant.
- Evidence and assumptions separated, with current primary citations when browsing is available.
- The facts that could change the conclusion and concrete next steps.

It can conclude that permission appears supported, the fair-use argument is stronger, mixed, or weaker, information is insufficient, or another jurisdiction needs analysis. Those descriptions are not numerical probabilities, legal clearance, or a finding that someone infringed copyright.

## Examples of useful requests

| Request | What the skill investigates |
|---|---|
| “I restyled a photographer's image with AI and want to sell prints.” | Retained expression, the specific commercial use, source rights, all four factors |
| “My essay critiques this poster. Can I reproduce it?” | Relationship to actual criticism, amount/presentation needed, source and market context |
| “I made a Canva template with several assets.” | Each asset's provenance, actual license and intended distribution |
| “I generated this with no reference image.” | Known sources/process, identifiable borrowing if any, limits of an originality claim, separate human-authorship question |
| “My work is in a famous artist's style.” | General technique versus specific borrowed expression and any relevant separate rights |
| “I only have the final image.” | What can be inspected, what cannot be inferred, and which missing facts matter |

AI generation and manual editing use the same evidence-first workflow. The skill does not assume that all AI outputs infringe or that all AI outputs are free to use.

## Scope and limits

Version 1 contains a detailed **US fair-use framework**, with **Canadian and UK routing notes**. It asks about jurisdiction rather than applying US law worldwide. Other local exceptions require current research. A commercial dispute, legal deadline, or consequential uncertain use may warrant a qualified lawyer in the relevant jurisdiction.

Fair use concerns a specific use, not an intrinsic label attached to an image. Copyrightability of your contributions, possible infringement of another work, platform terms, and model-training disputes are separate questions. The skill can explain them; it cannot search every protected work or promise what a court or platform will decide.

Read [Understanding fair use](docs/understanding-fair-use.md), the [source register](skills/fair-use/references/sources.md), and [evaluation method](evals/README.md).

## Development

Requires Python 3.10+ for repository checks and packaging only; ordinary skill use has no Python requirement.

```sh
python3 scripts/check.py
python3 scripts/package.py
```

Generated files appear in `dist/`: the skill ZIP, the standalone chat instructions, and checksums. Packaging uses an explicit allowlist and excludes user assessments, Git history, and development files. Generated files should be regenerated after changes to the skill.

Structural checks establish package integrity, not legal accuracy. See [validation status](docs/validation.md) for exactly what was tested. Contributions that improve legal precision, source freshness, or observed behavior are welcome; see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

The repository's original code, instructions and examples are available under the [MIT License](LICENSE). That license does not license linked third-party material, artwork submitted to an assistant, or anyone else's copyright. No third-party artwork is included in the release.
