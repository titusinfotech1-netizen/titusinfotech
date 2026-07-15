import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# 3. Update end of about section + start of services
content = re.sub(
    r'</div>\s*</div>\s*</div>\s*</section></FadeIn>\s*\{\/\* SERVICES SECTION \*\/\}\s*<FadeIn>\s*<section className="max-w-7xl mx-auto px-6 py-16 space-y-16">',
    r"""</div>
            </div>
          </div></FadeIn>
        </section>

        {/* SERVICES SECTION */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#f8f9fa] z-[-2]"></div>
          <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000" alt="Services background" className="absolute inset-0 w-full h-full object-cover opacity-[0.04] z-[-1] pointer-events-none" />
          <FadeIn>
            <div className="max-w-7xl mx-auto space-y-16">""",
    content
)

# 4. Update end of services + start of contact
content = re.sub(
    r'\}\)\}\s*</div>\s*</section>\s*</FadeIn>\s*\{\/\* CONTACT SECTION \*\/\}\s*<FadeIn><section id="contact-form-section" className="max-w-7xl mx-auto px-6 space-y-16">',
    r"""              ))}
            </div>
          </div>
        </FadeIn>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact-form-section" className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#fffcf5] z-[-2]"></div>
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000" alt="Contact background" className="absolute inset-0 w-full h-full object-cover opacity-[0.04] z-[-1] pointer-events-none" />
          <FadeIn><div className="max-w-7xl mx-auto space-y-16">""",
    content
)

# 5. Update end of contact section
content = re.sub(
    r'</form>\s*</div>\s*\{\/\* Contact info right \*\/\}.*?</section></FadeIn>\s*</div>\s*</div>\s*\)}',
    lambda m: m.group(0).replace('</section></FadeIn>', '</div></FadeIn>\n        </section>'),
    content,
    flags=re.DOTALL
)

with open('src/App.tsx', 'w') as f:
    f.write(content)

