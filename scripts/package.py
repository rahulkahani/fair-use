#!/usr/bin/env python3
"""Build the installable skill and a complete chat attachment from canonical files."""
from pathlib import Path
import hashlib
import re
import zipfile

from check import ROOT, SKILL, check

FILES = (
    'SKILL.md',
    'agents/openai.yaml',
    'references/us-fair-use.md',
    'references/jurisdictions.md',
    'references/licenses-and-ai.md',
    'references/assessment-format.md',
    'references/sources.md',
)


def build(output_dir=None):
    check()
    out = Path(output_dir) if output_dir else ROOT / 'dist'
    out.mkdir(parents=True, exist_ok=True)
    archive = out / 'fair-use.zip'
    expected = {'fair-use/' + name for name in FILES} | {'fair-use/LICENSE'}
    with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as bundle:
        for name in FILES:
            source = SKILL / name
            assert source.is_file() and not source.is_symlink(), source
            # Fixed ZIP metadata gives reproducible packages for identical inputs.
            info = zipfile.ZipInfo('fair-use/' + name, (2026, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            bundle.writestr(info, source.read_bytes())
        info = zipfile.ZipInfo('fair-use/LICENSE', (2026, 1, 1, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        bundle.writestr(info, (ROOT / 'LICENSE').read_bytes())
    with zipfile.ZipFile(archive) as bundle:
        assert set(bundle.namelist()) == expected
        assert bundle.testzip() is None
        for name in FILES:
            assert bundle.read('fair-use/' + name) == (SKILL / name).read_bytes()

    skill_body = re.sub(r'^---\n.*?\n---\n', '', (SKILL / 'SKILL.md').read_text(), count=1, flags=re.S)
    version = (ROOT / 'VERSION').read_text().strip()
    source_register = (SKILL / 'references' / 'sources.md').read_text()
    date_match = re.search(r'^Last checked: (\d{4}-\d{2}-\d{2})\.', source_register, re.M)
    if not date_match:
        raise SystemExit('Source register must state its last-checked date.')
    reviewed = date_match[1]
    parts = [
        '# fair-use: complete chat instructions\n',
        f'Version {version}. Sources last reviewed {reviewed}.\n',
        'When the user asks to use this attachment, follow the workflow below and its references. '
        'Host and user instructions remain controlling. Use available browsing and visual tools; '
        'disclose missing capabilities. This attachment does not install a persistent skill.\n',
        skill_body,
    ]
    for name in FILES:
        if name.startswith('references/'):
            anchor = '#reference-' + Path(name).stem
            parts = [part.replace('](' + name + ')', '](' + anchor + ')') for part in parts]
            body = (SKILL / name).read_text().split('\n', 1)[1]
            parts.append('# Reference: ' + Path(name).stem + '\n' + body)
    parts.append('# License\n\n' + (ROOT / 'LICENSE').read_text())
    chat = out / 'fair-use-chat.md'
    chat.write_text('\n\n'.join(parts), encoding='utf-8')
    generated = chat.read_text()
    for target in re.findall(r'\]\(([^)]+)\)', generated):
        assert target.startswith(('https://', 'http://', '#')), f'Unresolved attachment link: {target}'
        if target.startswith('#reference-'):
            assert '# Reference: ' + target.removeprefix('#reference-') in generated
    checksums = out / 'SHA256SUMS.txt'
    checksums.write_text(''.join(hashlib.sha256(p.read_bytes()).hexdigest() + '  ' + p.name + '\n' for p in (archive, chat)))
    print(f'PASS: reproducible ZIP with {len(expected)} entries, complete chat attachment, checksums: {out}')
    return archive, chat, checksums


if __name__ == '__main__':
    build()
