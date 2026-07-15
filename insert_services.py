import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

services_html = """
        {/* SERVICES SECTION */}
        <FadeIn>
          <section className="max-w-7xl mx-auto px-6 py-16 space-y-16">
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
          </section>
        </FadeIn>
"""

content = content.replace("        {/* CONTACT SECTION */}", services_html + "\n        {/* CONTACT SECTION */}")

with open('src/App.tsx', 'w') as f:
    f.write(content)

print("done")
