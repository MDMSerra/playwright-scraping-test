from bs4 import BeautifulSoup
import re
import os
import json

HTML_DIR = 'html-scrap'
MD_DIR = 'markdown-files'
INDEX_PATH = 'policies/html_index.json'

os.makedirs(MD_DIR, exist_ok=True)

if not os.path.exists(INDEX_PATH):
    raise Exception("No se encontró el archivo html_index.json")

with open(INDEX_PATH, 'r', encoding='utf-8') as f:
    html_files = json.load(f)

if not html_files:
    raise Exception("html_index.json está vacío")

for filename in html_files:
    filepath = os.path.join(HTML_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    output = []
    for elem in soup.body.descendants:
        if elem.name is None:
            continue
        text = elem.get_text(strip=True)
        if not text:
            continue
        if elem.name == 'h1':
            output.append(f'# {text}\n')
        elif elem.name == 'h2':
            output.append(f'## {text}\n')
        elif elem.name == 'h3':
            output.append(f'### {text}\n')
        elif elem.name == 'p':
            output.append(f'{text}\n')
        elif elem.name in ['strong', 'b']:
            output.append(f'**{text}**')
        elif elem.name == 'ul':
            for li in elem.find_all('li', recursive=False):
                output.append(f'- {li.get_text(strip=True)}')
        elif elem.name == 'ol':
            for i, li in enumerate(elem.find_all('li', recursive=False), start=1):
                output.append(f'{i}. {li.get_text(strip=True)}')

    md = '\n'.join(output)
    md = re.sub(r'\n{3,}', '\n\n', md)

    md_filename = os.path.join(MD_DIR, filename.replace('.html', '.md'))
    with open(md_filename, 'w', encoding='utf-8') as f:
        f.write(md)

    print(f"Markdown generado: {md_filename}")