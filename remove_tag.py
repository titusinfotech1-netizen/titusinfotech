import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

target = """ <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-solid border-[#D4AF37]/30 hidden md:block">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 bg-[#D4AF37]/10 flex items-center justify-center rounded-xl text-[#D4AF37]">
 <Code2 className="w-6 h-6" />
 </div>
 <div>
 <p className="font-playfair font-bold text-[#B89B5E] text-sm">Web Creation</p>
 <p className="text-[10px] text-black">Digital Engineering</p>
 </div>
 </div>
 </div>"""

if target in content:
    content = content.replace(target, '')
    with open('src/App.tsx', 'w') as f:
        f.write(content)
    print("Replaced!")
else:
    print("Not found!")

