import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Force main container bg to white
content = re.sub(r'bg-\[#F5F1EA\] dark:bg-\[#0F0F0D\]', 'bg-white', content)
content = re.sub(r'bg-white dark:bg-\[#0F0F0D\]', 'bg-white', content)

# Change text colors
# Headings / strong text
content = re.sub(r'text-black dark:text-white', 'text-[#D4AF37]', content)
content = re.sub(r'text-\[#1A1A1A\] dark:text-white', 'text-[#D4AF37]', content)
content = re.sub(r'text-\[#1A1A1A\] dark:text-gray-100', 'text-[#D4AF37]', content)

# Body text
content = re.sub(r'text-gray-500 dark:text-gray-400', 'text-[#B89B5E]', content)
content = re.sub(r'text-gray-500', 'text-[#B89B5E]', content)
content = re.sub(r'text-gray-400', 'text-[#B89B5E]', content)
content = re.sub(r'text-gray-600 dark:text-gray-300', 'text-[#D4AF37]', content)

# Backgrounds for inner containers
content = re.sub(r'bg-white dark:bg-\[#121210\]', 'bg-white', content)
content = re.sub(r'bg-gray-50 dark:bg-\[#121210\]', 'bg-[#F5F1EA]/30', content)
content = re.sub(r'bg-gray-50 dark:bg-black/40', 'bg-white', content)
content = re.sub(r'bg-\[#1A1A1A\]', 'bg-white', content)

# Borders
content = re.sub(r'border-gray-100 dark:border-white/5', 'border-[#D4AF37]/30', content)
content = re.sub(r'border-gray-100 dark:border-white/10', 'border-[#D4AF37]/30', content)

# Header
content = re.sub(r'bg-\[#F5F1EA\]/80 dark:bg-\[#0F0F0D\]/80', 'bg-white/90', content)

with open("src/App.tsx", "w") as f:
    f.write(content)

