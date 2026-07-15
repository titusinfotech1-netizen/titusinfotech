import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add import
import_stmt = "import { FadeIn } from './components/FadeIn';\n"
if "FadeIn" not in content:
    content = content.replace("import AIChat from './components/AIChat';\n", "import AIChat from './components/AIChat';\n" + import_stmt)

# Let's wrap section contents or wrap sections in FadeIn
# Section 1: Hero Section. Usually we don't fade-in-on-scroll the hero section, it should just be there.
# Let's check sections 2 and 3.

# Let's do a simple regex to replace specific sections with FadeIn wrap.

content = content.replace('<section className="max-w-7xl mx-auto px-6">', '<FadeIn><section className="max-w-7xl mx-auto px-6">')
content = content.replace('</section>\n\n        {/* CONTACT SECTION */}', '</section></FadeIn>\n\n        {/* CONTACT SECTION */}')

content = content.replace('<section id="contact-form-section" className="max-w-7xl mx-auto px-6 space-y-16">', '<FadeIn><section id="contact-form-section" className="max-w-7xl mx-auto px-6 space-y-16">')
content = content.replace('</section>\n      </div>', '</section></FadeIn>\n      </div>')

# Fix if we missed anything
with open('src/App.tsx', 'w') as f:
    f.write(content)

print("done")
