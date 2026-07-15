import re
import glob

def swap_colors(filepath):
    with open(filepath, "r") as f:
        content = f.read()
    
    # We will use a temporary placeholder to avoid double swapping
    content = content.replace('text-black', 'TEXT_TEMP_BLACK')
    content = content.replace('text-[#B89B5E]', 'text-black')
    content = content.replace('TEXT_TEMP_BLACK', 'text-[#B89B5E]')
    
    # There are also dark:text-black that became dark:TEXT_TEMP_BLACK, which now is dark:text-[#B89B5E]
    # But we previously removed all dark: classes. Let's just be safe.
    
    with open(filepath, "w") as f:
        f.write(content)

swap_colors("src/App.tsx")
swap_colors("src/components/AdminDashboard.tsx")
swap_colors("src/components/AIChat.tsx")
