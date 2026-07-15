import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Remove theme button 1
target1 = """              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className="p-2.5 rounded-xl hover:bg-gray-200 border border-solid border-transparent hover:border-gray-200 text-black hover:text-[#B89B5E] transition-all cursor-pointer active:scale-95"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4 text-[#D4AF37]" />}
              </button>"""
content = content.replace(target1, "")

# Remove theme button 2
target2 = """                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)} 
                  className="p-2 rounded-xl bg-gray-100 text-black"
                  aria-label="Toggle Dark Mode"
                >
                  {isDarkMode ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4 text-[#D4AF37]" />}
                </button>"""
content = content.replace(target2, "")

# Remove AIChat
target3 = """      {/* AIChat Integration */}
      <AIChat 
        agencySettings={agencySettings}
        view={view as any} 
        contactForm={contactForm} 
        setContactForm={setContactForm as any} 
      />"""
content = content.replace(target3, "")

with open('src/App.tsx', 'w') as f:
    f.write(content)
