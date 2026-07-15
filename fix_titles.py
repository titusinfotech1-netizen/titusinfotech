import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Change h2, h3, h4 text colors from gold to black
content = re.sub(r'<h([1-6])[^>]*text-\[#D4AF37\][^>]*>', lambda m: m.group(0).replace('text-[#D4AF37]', 'text-black'), content)
content = re.sub(r'<h([1-6])[^>]*text-white[^>]*>', lambda m: m.group(0).replace('text-white', 'text-black'), content)

# Change the logo title "Titus Infotech" to black
# It's currently `<span className="font-sora font-extrabold text-sm tracking-widest text-[#D4AF37] uppercase">`
content = content.replace(
    '<span className="font-sora font-extrabold text-sm tracking-widest text-[#D4AF37] uppercase">',
    '<span className="font-sora font-extrabold text-sm tracking-widest text-black uppercase">'
)
content = content.replace(
    '<div className="font-sora font-extrabold text-sm tracking-widest text-[#D4AF37] uppercase">',
    '<div className="font-sora font-extrabold text-sm tracking-widest text-black uppercase">'
)

# And "Web Creation" in about block
content = content.replace(
    '<p className="font-sora font-bold text-[#D4AF37] text-sm">Web Creation</p>',
    '<p className="font-sora font-bold text-black text-sm">Web Creation</p>'
)

with open("src/App.tsx", "w") as f:
    f.write(content)

