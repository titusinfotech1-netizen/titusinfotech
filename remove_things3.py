import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# remove Moon
content = re.sub(r'<button\s*onClick=\{\(\) => setIsDarkMode\(!isDarkMode\)\}[^>]*>.*?<\/button>', '', content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)
