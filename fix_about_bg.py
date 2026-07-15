import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Make sure About Image block bottom corner box is white instead of dark grey
content = content.replace(
    'bg-white dark:bg-[#1A1A1A] p-6',
    'bg-white dark:bg-white p-6'
)

with open("src/App.tsx", "w") as f:
    f.write(content)

