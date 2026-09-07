#!/usr/bin/env python3
"""Check release structure and local references. Does not validate legal conclusions."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / 'skills' / 'fair-use'


def check():
    if not __debug__:
        raise SystemExit('Run without -O/PYTHONOPTIMIZE so validation cannot be disabled.')
    text = (SKILL / 'SKILL.md').read_text(encoding='utf-8')
    match = re.match(r'^---\n(.*?)\n---\n', text, re.S)
    assert match, 'Missing frontmatter'
    # This package deliberately uses simple scalar YAML frontmatter.
    fields = dict(line.split(': ', 1) for line in match[1].splitlines())
    assert fields['name'] == 'fair-use'
    assert 0 < len(fields['description']) <= 200
    assert fields['license'] == 'MIT'
    assert re.fullmatch(r'\d+\.\d+\.\d+', (ROOT / 'VERSION').read_text().strip())
    files = [ROOT / 'README.md', ROOT / 'CONTRIBUTING.md']
    files += list((ROOT / 'docs').glob('*.md'))
    files += list((ROOT / 'evals').glob('*.md'))
    files += list(SKILL.rglob('*.md'))
    checked = 0
    for file in files:
        assert not file.is_symlink(), f'Symlink not supported: {file}'
        body = file.read_text(encoding='utf-8')
        for target in re.findall(r'\]\(([^)]+)\)', body):
            if target.startswith(('https://', 'http://', '#')):
                continue
            local = (file.parent / target.split('#')[0]).resolve()
            assert local.is_relative_to(ROOT), f'Link escapes repository: {file}: {target}'
            assert local.exists(), f'Broken local link: {file}: {target}'
            checked += 1
    cases = json.loads((ROOT / 'evals' / 'cases.json').read_text())
    assert len(cases) == len({case['id'] for case in cases}), 'Duplicate case IDs'
    for case in cases:
        assert case['prompt'] and case['expect'], f'Empty evaluation case: {case}'
    assert '$fair-use' in (SKILL / 'agents' / 'openai.yaml').read_text()
    assert 'MIT License' in (ROOT / 'LICENSE').read_text()
    print(f'PASS: frontmatter, {checked} local links, {len(cases)} case definitions, license and metadata')


if __name__ == '__main__':
    check()
