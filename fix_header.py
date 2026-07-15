with open("src/App.tsx", "r") as f:
    content = f.read()

content = content.replace("{/* Core Layout Switcher / Content Area */}", "</header>\n        {/* Core Layout Switcher / Content Area */}")

with open("src/App.tsx", "w") as f:
    f.write(content)
