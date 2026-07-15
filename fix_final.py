with open('src/App.tsx', 'r') as f:
    lines = f.readlines()

for i in range(330, min(500, len(lines))):
    if "</section>" in lines[i] and "FadeIn>" not in lines[i]:
        # found it
        lines[i] = lines[i].replace("</section>", "</section></FadeIn>")
        break

with open('src/App.tsx', 'w') as f:
    f.writelines(lines)
