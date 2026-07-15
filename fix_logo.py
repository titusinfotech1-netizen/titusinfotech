import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Replace bg-black logo background with bg-[#F5F1EA]
content = content.replace(
    'bg-black dark:bg-[#D4AF37]',
    'bg-[#F5F1EA] dark:bg-[#D4AF37]'
)

with open("src/App.tsx", "w") as f:
    f.write(content)

