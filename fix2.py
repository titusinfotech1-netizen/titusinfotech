import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Let's see where the unclosed FadeIn is.
# The second one is at line 333: <FadeIn><section id="contact-form-section" ...>
# We need to close it before `</div>` and `)}`

content = content.replace('        </section>\n      </div>', '        </section></FadeIn>\n      </div>')

with open('src/App.tsx', 'w') as f:
    f.write(content)
