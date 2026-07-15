import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Remove all dark: classes
content = re.sub(r'dark:[^\s"\'<>]+', '', content)
# Fix double spaces caused by removal
content = re.sub(r'\s+', ' ', content)

# But wait, this would remove all newlines! That's bad.
