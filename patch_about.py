import re

with open("src/App.tsx", "r") as f:
    content = f.read()

about_html = """
            <div className="animate-fade-in-up space-y-24 py-16">
              {/* ABOUT SECTION */}
              <section className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">Our Work</span>
                    <h2 className="font-sora font-extrabold text-3xl md:text-4xl text-black dark:text-white">Premium Website Creation</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      At Titus Infotech, we specialize in high-performance, bespoke website creation. We bridge the critical gap between pixel-perfect artistic design and robust software engineering to deliver platforms that run flawlessly and look stunning.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      Our custom-built web architectures are tailored to elevate your brand, command respect, and establish instant trust. Whether you need a modern landing page or a complex full-stack web application, we build digital experiences that drive real results.
                    </p>
                    <div className="grid grid-cols-2 gap-6 pt-6">
                      <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
                        <h4 className="font-sora font-bold text-black dark:text-white text-xs">Custom Engineering</h4>
                        <p className="text-[10px] text-gray-500">Lightning-fast modern web architectures.</p>
                      </div>
                      <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
                        <h4 className="font-sora font-bold text-black dark:text-white text-xs">Bespoke UI/UX</h4>
                        <p className="text-[10px] text-gray-500">Luxury visual identities designed to convert.</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-square md:aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" alt="Web Engineering Workspace" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-8 -left-8 bg-white dark:bg-[#1A1A1A] p-6 rounded-2xl shadow-xl border border-solid border-gray-100 dark:border-white/5 hidden md:block">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#D4AF37]/10 flex items-center justify-center rounded-xl text-[#D4AF37]">
                          <Code2 className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-sora font-bold text-black dark:text-white text-sm">Web Creation</p>
                          <p className="text-[10px] text-gray-500">Digital Engineering</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* CONTACT SECTION */}
              <section className="max-w-7xl mx-auto px-6 space-y-16">
"""

content = content.replace(
    """{view === 'contact' && (
            <section className="max-w-7xl mx-auto px-6 py-16 animate-fade-in-up space-y-16">""",
    """{view === 'contact' && (""" + about_html
)

content = content.replace(
    """                </div>
              </div>
            </section>
          )}""",
    """                </div>
              </div>
            </section>
            </div>
          )}"""
)

with open("src/App.tsx", "w") as f:
    f.write(content)

