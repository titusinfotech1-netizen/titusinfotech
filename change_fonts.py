import os
import glob

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    content = content.replace('font-sora', 'font-playfair')
    content = content.replace('font-jakarta', 'font-playfair')
    
    with open(filepath, 'w') as f:
        f.write(content)

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            replace_in_file(os.path.join(root, file))

# Also update index.css
with open('src/index.css', 'r') as f:
    css_content = f.read()

css_content = css_content.replace('font-family: var(--font-jakarta);', 'font-family: var(--font-playfair);')

with open('src/index.css', 'w') as f:
    f.write(css_content)

