import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

target = """ <div className="flex gap-3 text-black pt-2">
 <a href="#" onClick={(e) => { e.preventDefault(); }} className="hover:text-[#D4AF37] p-2 bg-white/5 rounded-full"><Github className="w-4 h-4" /></a>
 <a href="#" onClick={(e) => { e.preventDefault(); }} className="hover:text-[#D4AF37] p-2 bg-white/5 rounded-full"><Figma className="w-4 h-4" /></a>
 </div>"""

whatsapp_svg = """<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="none" className="w-4 h-4"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.062-.301-.15-1.265-.466-2.403-1.485-.888-.79-1.484-1.761-1.658-2.059-.173-.301-.018-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.502.097-.206.05-.389-.025-.539-.071-.15-.674-1.62-.922-2.206-.24-.579-.492-.501-.673-.51l-.573-.01c-.198 0-.52.074-.792.359-.271.285-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.21 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>"""

replacement = f""" <div className="flex gap-3 text-black pt-2">
 <a href={{`https://wa.me/${{agencySettings.phone.replace(/\\D/g, '')}}`}} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] p-2 bg-white/5 rounded-full transition-colors flex items-center justify-center">
 {whatsapp_svg}
 </a>
 </div>"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/App.tsx', 'w') as f:
        f.write(content)
    print("Replaced!")
else:
    print("Not found!")

