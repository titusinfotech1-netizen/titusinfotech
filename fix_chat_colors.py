import re

with open("src/components/AIChat.tsx", "r") as f:
    content = f.read()

content = re.sub(r'bg-\[#F5F1EA\]', 'bg-white', content)
content = re.sub(r'bg-white dark:bg-white', 'bg-white', content)
content = re.sub(r'text-black', 'text-[#D4AF37]', content)
content = re.sub(r'text-gray-500', 'text-[#B89B5E]', content)
content = re.sub(r'text-gray-400', 'text-[#B89B5E]', content)

# Change header text from black to gold
content = re.sub(r'text-black font-sora', 'text-[#D4AF37] font-sora', content)

with open("src/components/AIChat.tsx", "w") as f:
    f.write(content)

