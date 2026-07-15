import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# 1. Update Hero section
hero_target = """{/* HERO SECTION */}
 <section className="relative pt-24 pb-32 flex flex-col items-center justify-center min-h-[60vh] overflow-hidden text-center px-6">
 <div className="absolute inset-0 bg-[#F5F1EA]/50"></div>"""

hero_replacement = """{/* HERO SECTION */}
 <section className="relative pt-24 pb-32 flex flex-col items-center justify-center min-h-[60vh] overflow-hidden text-center px-6">
 <div className="absolute inset-0 bg-[#fefdfb] z-[-2]"></div>
 <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" alt="Hero background" className="absolute inset-0 w-full h-full object-cover opacity-[0.03] z-[-1] pointer-events-none" />"""

if hero_target in content:
    content = content.replace(hero_target, hero_replacement)
    print("Replaced Hero")
else:
    print("Hero target not found")

# 2. Update the wrapper and sections
wrapper_target = """<div className="space-y-24 py-16">
 {/* ABOUT SECTION */}
 <FadeIn><section className="max-w-7xl mx-auto px-6">"""

wrapper_replacement = """<div className="flex flex-col">
 {/* ABOUT SECTION */}
 <section className="relative py-24 px-6 overflow-hidden">
 <div className="absolute inset-0 bg-[#fdfbf7] z-[-2]"></div>
 <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000" alt="About background" className="absolute inset-0 w-full h-full object-cover opacity-[0.04] z-[-1] pointer-events-none" />
 <FadeIn><div className="max-w-7xl mx-auto">"""

if wrapper_target in content:
    content = content.replace(wrapper_target, wrapper_replacement)
    print("Replaced Wrapper")
else:
    print("Wrapper target not found")

# 3. Update end of about section + start of services
services_target = """ </div>
 </div>
 </div>
 </section></FadeIn>
 {/* SERVICES SECTION */}
 <FadeIn>
 <section className="max-w-7xl mx-auto px-6 py-16 space-y-16">"""

services_replacement = """ </div>
 </div>
 </div>
 </div></FadeIn>
 </section>
 {/* SERVICES SECTION */}
 <section className="relative py-24 px-6 overflow-hidden">
 <div className="absolute inset-0 bg-[#f8f9fa] z-[-2]"></div>
 <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000" alt="Services background" className="absolute inset-0 w-full h-full object-cover opacity-[0.04] z-[-1] pointer-events-none" />
 <FadeIn>
 <div className="max-w-7xl mx-auto space-y-16">"""

if services_target in content:
    content = content.replace(services_target, services_replacement)
    print("Replaced Services")
else:
    print("Services target not found")

# 4. Update end of services + start of contact
contact_target = """ </div>
 </section>
 </FadeIn>
 {/* CONTACT SECTION */}
 <FadeIn><section id="contact-form-section" className="max-w-7xl mx-auto px-6 space-y-16">"""

contact_replacement = """ </div>
 </div>
 </FadeIn>
 </section>
 {/* CONTACT SECTION */}
 <section id="contact-form-section" className="relative py-24 px-6 overflow-hidden">
 <div className="absolute inset-0 bg-[#fffcf5] z-[-2]"></div>
 <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000" alt="Contact background" className="absolute inset-0 w-full h-full object-cover opacity-[0.04] z-[-1] pointer-events-none" />
 <FadeIn><div className="max-w-7xl mx-auto space-y-16">"""

if contact_target in content:
    content = content.replace(contact_target, contact_replacement)
    print("Replaced Contact")
else:
    print("Contact target not found")

with open('src/App.tsx', 'w') as f:
    f.write(content)

