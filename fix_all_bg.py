import re

# Fix index.html
with open("index.html", "r") as f:
    content = f.read()
content = content.replace('bg-[#F5F1EA]', 'bg-white')
with open("index.html", "w") as f:
    f.write(content)

# Fix AIChat.tsx
with open("src/components/AIChat.tsx", "r") as f:
    content = f.read()

# Make the chat trigger button white instead of black
content = content.replace(
    'bg-[#1A1A1A] hover:bg-[#D4AF37] text-white',
    'bg-white hover:bg-[#D4AF37] text-black border-gray-200 hover:text-white'
)

# Make the chat header white instead of black
content = content.replace(
    'bg-[#1A1A1A] dark:bg-[#1A1A1A] p-4',
    'bg-white dark:bg-white p-4'
)
content = content.replace(
    'text-white font-sora font-bold',
    'text-black font-sora font-bold'
)

# User messages
content = content.replace(
    "'bg-[#1A1A1A] text-white border-white/10'",
    "'bg-[#F5F1EA] text-black border-gray-200'"
)
content = content.replace(
    "'bg-[#1A1A1A] text-white rounded-tr-none'",
    "'bg-[#F5F1EA] text-black border border-solid border-gray-200 rounded-tr-none'"
)

with open("src/components/AIChat.tsx", "w") as f:
    f.write(content)

