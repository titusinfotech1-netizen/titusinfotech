import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# remove AIChat
content = re.sub(r'\{\/\* AIChat Integration \*\/\}.*?<AIChat[^>]*\/>', '', content, flags=re.DOTALL)

# remove Moon
# Find <button ... > {isDarkMode ? <Sun ... /> : <Moon ... />} </button>
content = re.sub(r'<button[^>]*>\s*\{isDarkMode \? <Sun[^>]*\/> : <Moon[^>]*\/>\}\s*<\/button>', '', content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)

