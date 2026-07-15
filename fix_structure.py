import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

target = """        </section>

        <div className="flex flex-col">
        {/* ABOUT SECTION */}"""

replacement = """        </section>

        <div className="flex flex-col">
        {/* ABOUT SECTION */}"""

# Let's replace everything from `        </section>\n\n        <div className="flex flex-col">\n        {/* ABOUT SECTION */}` down to the thank you page with the correct structure.

import ast

def extract_and_replace():
    with open('src/App.tsx', 'r') as f:
        content = f.read()
    
    start_str = "        </section>\n\n        <div className=\"flex flex-col\">\n        {/* ABOUT SECTION */}"
    end_str = "        {/* VIEW: THANK YOU PAGE */}"
    
    start_idx = content.find(start_str)
    end_idx = content.find(end_str)
    
    if start_idx == -1 or end_idx == -1:
        print("Couldn't find start or end")
        return
        
    new_middle = """        </section>

        <div className="flex flex-col">
        {/* ABOUT SECTION */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#fdfbf7] z-[-2]"></div>
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000" alt="About background" className="absolute inset-0 w-full h-full object-cover opacity-[0.04] z-[-1] pointer-events-none" />
          <FadeIn>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">Our Work</span>
                  <h2 className="font-playfair font-extrabold text-3xl md:text-4xl text-[#B89B5E]">Premium Website Creation</h2>
                  <p className="text-xs text-black leading-relaxed">
                    At Titus Infotech, we specialize in high-performance, bespoke website creation. We bridge the critical gap between pixel-perfect artistic design and robust software engineering to deliver platforms that run flawlessly and look stunning.
                  </p>
                  <p className="text-xs text-black leading-relaxed">
                    Our custom-built web architectures are tailored to elevate your brand, command respect, and establish instant trust. Whether you need a modern landing page or a complex full-stack web application, we build digital experiences that drive real results.
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-6">
                    <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
                      <h4 className="font-playfair font-bold text-[#B89B5E] text-xs">Custom Engineering</h4>
                      <p className="text-[10px] text-black">Lightning-fast modern web architectures.</p>
                    </div>
                    <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
                      <h4 className="font-playfair font-bold text-[#B89B5E] text-xs">Bespoke UI/UX</h4>
                      <p className="text-[10px] text-black">Luxury visual identities designed to convert.</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square md:aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" alt="Web Engineering Workspace" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* SERVICES SECTION */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#f8f9fa] z-[-2]"></div>
          <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000" alt="Services background" className="absolute inset-0 w-full h-full object-cover opacity-[0.04] z-[-1] pointer-events-none" />
          <FadeIn>
            <div className="max-w-7xl mx-auto space-y-16">
              <div className="text-center max-w-xl mx-auto space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">Our Capabilities</span>
                <h2 className="font-playfair font-extrabold text-3xl text-[#B89B5E]">Comprehensive Digital Services</h2>
                <p className="text-xs text-black leading-relaxed">
                  From luxury digital storefronts to bespoke visual and audio content, our agency provides an end-to-end suite of creative engineering solutions.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    title: 'Website Creation', 
                    desc: 'High-performance, luxury web architectures and full-stack solutions tailored for modern businesses.', 
                    icon: <Monitor className="w-8 h-8" /> 
                  },
                  { 
                    title: 'Logo Creation', 
                    desc: 'Bespoke visual identities, premium brand marks, and comprehensive design systems.', 
                    icon: <PenTool className="w-8 h-8" /> 
                  },
                  { 
                    title: 'Music Production', 
                    desc: 'Original audio engineering, custom soundscapes, and professional mixing/mastering.', 
                    icon: <Music className="w-8 h-8" /> 
                  },
                  { 
                    title: 'Video & Photo Editing', 
                    desc: 'Cinematic visual treatments, color grading, and professional post-production editing.', 
                    icon: <Camera className="w-8 h-8" /> 
                  }
                ].map((service, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-3xl border border-solid border-[#D4AF37]/20 shadow-lg hover:shadow-2xl transition-all duration-300 group">
                    <div className="w-14 h-14 bg-[#F5F1EA] text-[#D4AF37] flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <h3 className="font-playfair font-bold text-lg text-[#B89B5E] mb-3">{service.title}</h3>
                    <p className="text-xs text-black leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact-form-section" className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#fffcf5] z-[-2]"></div>
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000" alt="Contact background" className="absolute inset-0 w-full h-full object-cover opacity-[0.04] z-[-1] pointer-events-none" />
          <FadeIn>
            <div className="max-w-7xl mx-auto space-y-16">
              <div className="text-center max-w-xl mx-auto space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">Priority Inquiries</span>
                <h2 className="font-playfair font-bold text-3xl text-[#B89B5E] font-extrabold">Initiate Your Digital Transformation</h2>
                <p className="text-xs text-black">Provide your criteria below for custom quote projections.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Contact form left */}
                <div className="lg:col-span-3 bg-white p-8 rounded-3xl border border-solid border-[#D4AF37]/30 shadow-sm">
                  <form onSubmit={handleContactSubmit} className="space-y-6 text-xs text-black">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label htmlFor="form-name" className="font-semibold">Full Identity / Name *</label>
                        <input id="form-name" type="text" required value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} className="w-full p-3 rounded-xl bg-white border border-solid border-[#D4AF37]/30 text-[#D4AF37] focus:outline-none focus:border-[#D4AF37] text-xs transition-colors" placeholder="e.g. Sophia Lorenz" />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="form-email" className="font-semibold">Email Address *</label>
                        <input id="form-email" type="email" required value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} className="w-full p-3 rounded-xl bg-white border border-solid border-[#D4AF37]/30 text-[#D4AF37] focus:outline-none focus:border-[#D4AF37] text-xs transition-colors" placeholder="e.g. sophia@lorenz-atelier.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label htmlFor="form-phone" className="font-semibold">Phone (Optional)</label>
                        <input id="form-phone" type="text" value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} className="w-full p-3 rounded-xl bg-white border border-solid border-[#D4AF37]/30 text-[#D4AF37] focus:outline-none focus:border-[#D4AF37] text-xs transition-colors" placeholder="e.g. +1 (555) 342-9182" />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="form-company" className="font-semibold">Company / Brand (Optional)</label>
                        <input id="form-company" type="text" value={contactForm.company} onChange={e => setContactForm({ ...contactForm, company: e.target.value })} className="w-full p-3 rounded-xl bg-white border border-solid border-[#D4AF37]/30 text-[#D4AF37] focus:outline-none focus:border-[#D4AF37] text-xs transition-colors" placeholder="e.g. Lorenz Atelier Boutique" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="form-budget" className="font-semibold">Valuation Budget Tier</label>
                      <select id="form-budget" value={contactForm.budget} onChange={e => setContactForm({ ...contactForm, budget: e.target.value })} className="w-full p-3 rounded-xl bg-white border border-solid border-[#D4AF37]/30 text-[#D4AF37] focus:outline-none focus:border-[#D4AF37] text-xs" >
                        <option value="$2,500 - $5,000">$2,500 - $5,000 (Minimalist showcase)</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000 (Bespot Business portal)</option>
                        <option value="$10,000 - $15,000">$10,000 - $15,000 (Heads e-commerce engine)</option>
                        <option value="$15,000 - $25,000">$15,000 - $25,000 (Enterprise dynamic software)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="form-message" className="font-semibold">Project Criteria / Technical Scope *</label>
                      <textarea id="form-message" required value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} rows={5} className="w-full p-3 rounded-xl bg-white border border-solid border-[#D4AF37]/30 text-[#D4AF37] focus:outline-none focus:border-[#D4AF37] text-xs transition-colors leading-relaxed" placeholder="Tell us about page counts, required animations, local databasing scopes, or WebGL desires..." />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#D4AF37] hover:bg-[#B89B5E] text-[#B89B5E] font-playfair font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-lg transition-all active:scale-95 cursor-pointer text-center flex items-center justify-center gap-2" >
                      {isSubmitting ? "TRANSMITTING DATA..." : "SUBMIT PROPOSAL REQUEST"} <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

                {/* Contact info right */}
                <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
                  <div className="bg-[#F5F1EA]/30 p-8 rounded-3xl border border-solid border-[#D4AF37]/30 space-y-6 h-full flex flex-col justify-center">
                    <h3 className="font-playfair font-extrabold text-xs text-[#B89B5E] uppercase tracking-wider">Reach Us</h3> 
                    <div className="space-y-4 text-xs text-black">
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-[#D4AF37]">Email Address</p>
                          <a href={`mailto:${agencySettings.email}`} className="hover:underline">{agencySettings.email}</a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-[#D4AF37]">Consulting Line</p>
                          <a href={`tel:${agencySettings.phone}`} className="hover:underline">{agencySettings.phone}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
        </div>
      </div>
      )}

"""
    new_content = content[:start_idx] + new_middle + content[end_idx:]
    with open('src/App.tsx', 'w') as f:
        f.write(new_content)

extract_and_replace()
