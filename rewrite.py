import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Replace the view type definition
content = re.sub(
    r"const \[view, setView\] = useState<[^>]+>\('home'\);",
    "const [view, setView] = useState<'contact' | 'thankyou'>('contact');",
    content
)

# Remove navigation links in header (desktop)
content = re.sub(
    r"<nav className=\"hidden lg:flex items-center gap-8.*?<\/nav>",
    "",
    content,
    flags=re.DOTALL
)

# Remove navigation links in drawer (mobile)
content = re.sub(
    r"\{\/\* Mobile responsive drawer overlay \*\/\}[\s\S]*?\{\/\* Core Layout Switcher \/ Content Area \*\/\}",
    "{/* Core Layout Switcher / Content Area */}",
    content
)

# Remove the 'Get Free Quote' button in desktop header since it's already contact page
content = re.sub(
    r"<button\s+onClick=\{\(\) => navigateTo\('contact'\)\}\s+className=\"bg-\[#D4AF37\].*?>.*?<\/button>",
    "",
    content,
    flags=re.DOTALL
)

# Strip out unused views
main_start = content.find("<main className=\"flex-1\">")
footer_start = content.find(" {/* UNIVERSAL FOOTER */}")

main_content = content[main_start:footer_start]

contact_view_start = main_content.find("{/* VIEW: CONTACT */}")
contact_view_end = main_content.find("{/* VIEW: PRIVACY POLICY */}")
thankyou_view_start = main_content.find("{/* VIEW: THANK YOU PAGE */}")
thankyou_view_end = main_content.find("{/* VIEW: ADMIN PORTAL */}")

new_main_content = '<main className="flex-1">\n' + main_content[contact_view_start:contact_view_end] + main_content[thankyou_view_start:thankyou_view_end] + '</main>\n'

content = content[:main_start] + new_main_content + content[footer_start:]

# Footer: Remove all footer links except Reach Us
footer_replacement = """
        {/* UNIVERSAL FOOTER */}
        <footer className="bg-[#1A1A1A] border-t border-solid border-[#D4AF37]/20 py-12 text-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Column 1 Branding */}
            <div className="space-y-4">
              <button 
                onClick={() => navigateTo('contact')} 
                className="flex items-center gap-2.5 text-left group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center text-black font-sora font-extrabold text-lg tracking-wider">
                  T
                </div>
                <div className="font-sora font-extrabold text-sm tracking-widest text-white uppercase">
                  Titus Infotech
                </div>
              </button>
              <p className="text-gray-400 leading-relaxed max-w-[200px]">
                Premium luxury web engineering. We build lightning-fast React architectures designed to grow high-ticket trust.
              </p>
            </div>

            {/* Column 2 Legal / Social */}
            <div className="space-y-4">
              <h4 className="font-sora font-bold text-white uppercase tracking-wider text-[11px]">Reach Us</h4>
              <div className="text-gray-400 space-y-1">
                <p>Email: <a href={`mailto:${agencySettings.email}`} className="hover:text-[#D4AF37]">{agencySettings.email}</a></p>
                <p>Phone: <a href={`tel:${agencySettings.phone}`} className="hover:text-[#D4AF37]">{agencySettings.phone}</a></p>
              </div>
              <div className="flex gap-3 text-gray-400 pt-2">
                <a href="#" onClick={(e) => { e.preventDefault(); }} className="hover:text-[#D4AF37] p-2 bg-white/5 rounded-full"><Github className="w-4 h-4" /></a>
                <a href="#" onClick={(e) => { e.preventDefault(); }} className="hover:text-[#D4AF37] p-2 bg-white/5 rounded-full"><Figma className="w-4 h-4" /></a>
              </div>
            </div>

          </div>
          <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-solid border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-gray-500 font-semibold tracking-wider uppercase">
            <p>© {new Date().getFullYear()} Titus Infotech. All Rights Reserved.</p>
          </div>
        </footer>
      </div>

      {/* AIChat Integration */}
      <AIChat 
        agencySettings={agencySettings}
        view={view as any} 
        contactForm={contactForm} 
        setContactForm={setContactForm as any} 
      />

    </div>
  );
}
"""

content = content[:content.find(" {/* UNIVERSAL FOOTER */}")] + footer_replacement

with open("src/App.tsx", "w") as f:
    f.write(content)

