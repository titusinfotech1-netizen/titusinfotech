import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace("import AIChat from './components/AIChat';\n", "")

with open('src/App.tsx', 'w') as f:
    f.write(content)
