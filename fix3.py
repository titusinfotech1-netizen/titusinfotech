import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Just close the <FadeIn> manually
content = content.replace('  </section>\n  </div>\n  </div>\n  )}', '  </section></FadeIn>\n  </div>\n  </div>\n  )}')

with open('src/App.tsx', 'w') as f:
    f.write(content)
