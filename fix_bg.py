import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Change main background from #F5F1EA to white
content = content.replace("bg-[#F5F1EA]", "bg-white")

# Change footer background from black to white
content = content.replace(
    '<footer className="bg-[#1A1A1A] border-t border-solid border-[#D4AF37]/20 py-12 text-white">',
    '<footer className="bg-white dark:bg-[#1A1A1A] border-t border-solid border-gray-100 dark:border-white/10 py-12 text-black dark:text-white">'
)

content = content.replace(
    '<div className="font-sora font-extrabold text-sm tracking-widest text-white uppercase">',
    '<div className="font-sora font-extrabold text-sm tracking-widest text-black dark:text-white uppercase">'
)

with open("src/App.tsx", "w") as f:
    f.write(content)
