with open('src/App.tsx', 'r') as f:
    text = f.read()

# Let's locate the footer division that was missing its closing divs
target_footer = """  <div className="flex gap-3 text-black pt-2">
  <a href={`mailto:${agencySettings.email}`} className="hover:text-[#D4AF37] p-2 bg-[#F5F1EA]/50 rounded-full transition-colors flex items-center justify-center border border-solid border-[#D4AF37]/20 shadow-sm" title="Email Us">
    <Mail className="w-4 h-4" />
  </a>
  <a href={`tel:${agencySettings.phone}`} className="hover:text-[#D4AF37] p-2 bg-[#F5F1EA]/50 rounded-full transition-colors flex items-center justify-center border border-solid border-[#D4AF37]/20 shadow-sm" title="Call Us">
    <Phone className="w-4 h-4" />
  </a>
   <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-solid border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-black font-semibold tracking-wider uppercase">
   <p>© {new Date().getFullYear()} Titus Infotech. All Rights Reserved.</p>
   </div>
   </footer>"""

# Standardize whitespace for target_footer
clean_target_footer = '\\n'.join([l.strip() for l in target_footer.splitlines()])

lines = text.splitlines()
found_footer = False
for i in range(len(lines)):
    block = '\\n'.join([l.strip() for l in lines[i:i+11]])
    if clean_target_footer in block:
        # replace
        replacement_footer = """  <div className="flex gap-3 text-black pt-2">
  <a href={`mailto:${agencySettings.email}`} className="hover:text-[#D4AF37] p-2 bg-[#F5F1EA]/50 rounded-full transition-colors flex items-center justify-center border border-solid border-[#D4AF37]/20 shadow-sm" title="Email Us">
    <Mail className="w-4 h-4" />
  </a>
  <a href={`tel:${agencySettings.phone}`} className="hover:text-[#D4AF37] p-2 bg-[#F5F1EA]/50 rounded-full transition-colors flex items-center justify-center border border-solid border-[#D4AF37]/20 shadow-sm" title="Call Us">
    <Phone className="w-4 h-4" />
  </a>
  </div>
  </div>
  </div>

  <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-solid border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-black font-semibold tracking-wider uppercase">
  <p>© {new Date().getFullYear()} Titus Infotech. All Rights Reserved.</p>
  </div>
  </footer>"""
        lines[i:i+11] = replacement_footer.splitlines()
        found_footer = True
        break

text_after_footer = '\\n'.join(lines)

# Now, let's fix the ending divs at the bottom of the file
# We'll reload lines
lines_v2 = text_after_footer.splitlines()

target_end = """    </button>
  </div>
  </div>
  </div>
  </div>
  </footer>
  </div>
  </div>
  );
}"""

clean_target_end = '\\n'.join([l.strip() for l in target_end.splitlines()])
found_end = False
for i in range(len(lines_v2)):
    block = '\\n'.join([l.strip() for l in lines_v2[i:i+15]])
    if clean_target_end in block:
        replacement_end = """    </button>
  </div>

  </div>
  </div>
  );
}"""
        lines_v2[i:i+10] = replacement_end.splitlines()
        found_end = True
        break

if found_footer or found_end:
    with open('src/App.tsx', 'w') as f:
        f.write('\\n'.join(lines_v2) + '\\n')
    print(f"Footer fixed: {found_footer}, End fixed: {found_end}")
else:
    print("Could not find blocks to fix!")
