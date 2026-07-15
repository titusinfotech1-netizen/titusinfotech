import re

with open("src/components/AdminDashboard.tsx", "r") as f:
    content = f.read()

# Change h2, h3, h4 text colors from gold to black
content = re.sub(r'<h([1-6])[^>]*text-\[#D4AF37\][^>]*>', lambda m: m.group(0).replace('text-[#D4AF37]', 'text-black'), content)
content = re.sub(r'<h([1-6])[^>]*text-white[^>]*>', lambda m: m.group(0).replace('text-white', 'text-black'), content)

with open("src/components/AdminDashboard.tsx", "w") as f:
    f.write(content)

