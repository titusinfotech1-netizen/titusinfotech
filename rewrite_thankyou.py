import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Let's replace the Thank You page section
content = re.sub(
    r'<section className="relative min-h-\[60vh\].*?\{/\* VIEW: THANK YOU PAGE \*/\}',
    '{/* VIEW: THANK YOU PAGE */}',
    content,
    flags=re.DOTALL
)

# wait, the string is:
# {/* VIEW: THANK YOU PAGE */}
# {view === 'thankyou' && (
# <section className="relative min-h-[60vh] flex flex-col items-center justify-center max-w-xl mx-auto px-6 py-24 text-center space-y-6 animate-fade-in-up">
# <div className="absolute inset-0 bg-[#fdfaf5] z-[-2] w-[100vw] left-[50%] right-[50%] -mx-[50vw]"></div>
# <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000" alt="Thank you background" className="absolute inset-0 w-[100vw] h-full object-cover opacity-[0.03] z-[-1] pointer-events-none left-[50%] right-[50%] -mx-[50vw]" />

start_str = "{/* VIEW: THANK YOU PAGE */}"
end_str = "</main>"

start_idx = content.find(start_str)
end_idx = content.find(end_str)

new_block = """{/* VIEW: THANK YOU PAGE */}
 {view === 'thankyou' && (
 <div className="relative min-h-[60vh] flex flex-col items-center justify-center w-full overflow-hidden animate-fade-in-up">
   <div className="absolute inset-0 bg-[#fdfaf5] z-[-2]"></div>
   <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000" alt="Thank you background" className="absolute inset-0 w-full h-full object-cover opacity-[0.04] z-[-1] pointer-events-none" />
   <section className="relative z-10 max-w-xl mx-auto px-6 py-24 text-center space-y-6">
     <span className="text-[#D4AF37] font-playfair font-extrabold text-5xl flex justify-center"><CheckCircle2 className="w-16 h-16 text-[#D4AF37]" /></span>
     <h2 className="font-playfair font-bold text-xl text-[#B89B5E] uppercase tracking-wider">Proposal Received</h2>
     <p className="text-xs text-black leading-relaxed">
       Thank you for initiating contact with Titus Infotech. Your project criteria and budget valuations have been logged directly into our central client diagnostic queue. Our Principal Architect will personally review your scopes and reach out within 12 business hours.
     </p>
     {/* Direct WhatsApp Action Block */}
     <div className="bg-[#25D366]/10 border border-solid border-[#25D366]/25 rounded-2xl p-6 text-center space-y-3 max-w-sm mx-auto">
       <p className="text-xs text-[#128C7E] font-semibold">
         🚀 Speed up your review process!
       </p>
       <p className="text-[11px] text-black leading-normal">
         Click the button below to submit your project description directly to our WhatsApp support team for instant diagnostics.
       </p>
       <a 
         href={`https://wa.me/919787674303?text=${encodeURIComponent(
           lastLead 
             ? `Hello Titus Infotech, I would like to get a free quote.\nName: ${lastLead.name}\nEmail: ${lastLead.email}\nPhone: ${lastLead.phone || 'N/A'}\nCompany: ${lastLead.company || 'N/A'}\nBudget: ${lastLead.budget}\nMessage: ${lastLead.message}`
             : "Hello Titus Infotech, I would like to request a custom quote."
         )}`}
         target="_blank" rel="noopener noreferrer" 
         className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-playfair font-bold text-xs px-5 py-3 rounded-xl uppercase tracking-wider shadow cursor-pointer transition-all active:scale-95 w-full"
       >
         Send Details on WhatsApp
       </a>
     </div>
     <div className="flex justify-center gap-3 pt-2">
       <button 
         onClick={() => navigateTo('contact')}
         className="bg-[#D4AF37] hover:bg-[#B89B5E] text-[#B89B5E] font-playfair font-bold text-xs px-6 py-3.5 rounded-xl uppercase tracking-wider cursor-pointer shadow"
       >
         Return to Form
       </button> 
     </div>
   </section>
 </div>
 )}
"""

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_block + "\n " + content[end_idx:]
    with open('src/App.tsx', 'w') as f:
        f.write(content)
    print("Replaced!")
else:
    print("Not found bounds")
