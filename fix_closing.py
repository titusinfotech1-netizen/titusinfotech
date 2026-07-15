import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'(</section>\s+)({\/\* CONTACT SECTION \*\/\})', r'</section></FadeIn>\n\n        \2', content)

# just replace the last section manually
target = '''        </section>
      </div>
      </div>
      )}'''

replacement = '''        </section></FadeIn>
      </div>
      </div>
      )}'''

content = content.replace(target, replacement)

with open('src/App.tsx', 'w') as f:
    f.write(content)

print("done")
