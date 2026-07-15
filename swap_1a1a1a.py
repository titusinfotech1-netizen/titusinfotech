import re
import glob

def swap_colors(filepath):
    with open(filepath, "r") as f:
        content = f.read()
    
    # We will use a temporary placeholder to avoid double swapping
    content = content.replace('text-[#1A1A1A]', 'TEXT_TEMP_1A1A1A')
    # They should become beige, but since they were originally black...
    content = content.replace('TEXT_TEMP_1A1A1A', 'text-[#B89B5E]')
    
    with open(filepath, "w") as f:
        f.write(content)

swap_colors("src/components/AdminDashboard.tsx")
swap_colors("src/components/AIChat.tsx")
