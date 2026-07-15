import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

target = """ {/* VIEW: THANK YOU PAGE */}
 {view === 'thankyou' && (
 <section className="max-w-xl mx-auto px-6 py-24 text-center space-y-6 animate-fade-in-up">"""

replacement = """ {/* VIEW: THANK YOU PAGE */}
 {view === 'thankyou' && (
 <section className="relative min-h-[60vh] flex flex-col items-center justify-center max-w-xl mx-auto px-6 py-24 text-center space-y-6 animate-fade-in-up">
 <div className="absolute inset-0 bg-[#fdfaf5] z-[-2] w-[100vw] left-[50%] right-[50%] -mx-[50vw]"></div>
 <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000" alt="Thank you background" className="absolute inset-0 w-[100vw] h-full object-cover opacity-[0.03] z-[-1] pointer-events-none left-[50%] right-[50%] -mx-[50vw]" />"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/App.tsx', 'w') as f:
        f.write(content)
    print("Replaced!")
else:
    print("Target not found")
