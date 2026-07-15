import re

with open("src/components/AdminDashboard.tsx", "r") as f:
    content = f.read()

# Force white backgrounds
content = re.sub(r'bg-white dark:bg-\[#121210\]', 'bg-white', content)
content = re.sub(r'bg-gray-50 dark:bg-\[#121210\]', 'bg-white', content)
content = re.sub(r'bg-\[#0F0F0D\]', 'bg-white', content)
content = re.sub(r'bg-\[#1A1A1A\]', 'bg-white', content)
content = re.sub(r'dark:bg-[^\s"\'<>]+', '', content)
content = re.sub(r'dark:border-[^\s"\'<>]+', '', content)

# Text colors
content = re.sub(r'text-black dark:text-white', 'text-[#D4AF37]', content)
content = re.sub(r'text-black', 'text-[#D4AF37]', content)
content = re.sub(r'text-white', 'text-[#B89B5E]', content)
content = re.sub(r'text-gray-500', 'text-[#B89B5E]', content)
content = re.sub(r'text-gray-400', 'text-[#B89B5E]', content)

with open("src/components/AdminDashboard.tsx", "w") as f:
    f.write(content)

