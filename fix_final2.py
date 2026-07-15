import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Let's fix the end of Thank You page.
# The error was in fix_thankyou.py, which was executed.
# It replaced some things, let's just make sure the tags are balanced.
# We have a <main className="flex-1">
# Inside we have:
# {view === 'contact' && (
#   <div className="animate-fade-in-up">
#     ...
#     <div className="flex flex-col">
#       ...
#     </div>
#   </div>
# )}
#
# {view === 'thankyou' && (
#   <div className="relative min-h-[60vh] flex flex-col items-center justify-center w-full overflow-hidden animate-fade-in-up">
#     <div className="absolute inset-0 bg-[#fdfaf5] z-[-2]"></div>
#     <img src="..." />
#     <section className="relative z-10 max-w-xl mx-auto px-6 py-24 text-center space-y-6">
#       ...
#     </section>
#   </div>
# )}
#
# </main>

# Let's completely rewrite the file from VIEW: THANK YOU PAGE downwards.
start_str = "{/* VIEW: THANK YOU PAGE */}"
start_idx = content.find(start_str)

new_tail = """{/* VIEW: THANK YOU PAGE */}
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
             ? `Hello Titus Infotech, I would like to get a free quote.\\nName: ${lastLead.name}\\nEmail: ${lastLead.email}\\nPhone: ${lastLead.phone || 'N/A'}\\nCompany: ${lastLead.company || 'N/A'}\\nBudget: ${lastLead.budget}\\nMessage: ${lastLead.message}`
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

 </main>

 {/* UNIVERSAL FOOTER */}
 <footer className="bg-white border-t border-solid border-[#D4AF37]/30 py-12 text-[#D4AF37]">
 <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
 
 {/* Column 1 Branding */}
 <div className="space-y-4">
 <button 
 onClick={() => navigateTo('contact')} 
 className="flex items-center gap-2.5 text-left group cursor-pointer"
 >
 <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#B89B5E] font-playfair font-extrabold text-lg tracking-wider">
 T
 </div>
 <div className="font-playfair font-extrabold text-sm tracking-widest text-[#B89B5E] uppercase">
 Titus Infotech
 </div>
 </button>
 <p className="text-black leading-relaxed max-w-[200px]">
 Premium luxury web engineering. We build lightning-fast React architectures designed to grow high-ticket trust.
 </p>
 </div>

 {/* Column 2 Legal / Social */}
 <div className="space-y-4">
 <h4 className="font-playfair font-bold text-[#B89B5E] uppercase tracking-wider text-[11px]">Reach Us</h4>
 <div className="text-black space-y-1">
 <p>Email: <a href={`mailto:${agencySettings.email}`} className="hover:text-[#D4AF37]">{agencySettings.email}</a></p>
 <p>Phone: <a href={`tel:${agencySettings.phone}`} className="hover:text-[#D4AF37]">{agencySettings.phone}</a></p>
 </div>
 <div className="flex gap-3 text-black pt-2">
 <a href={`https://wa.me/${agencySettings.phone.replace(/\\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] p-2 bg-white/5 rounded-full transition-colors flex items-center justify-center">
 <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="none" className="w-4 h-4"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.062-.301-.15-1.265-.466-2.403-1.485-.888-.79-1.484-1.761-1.658-2.059-.173-.301-.018-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.502.097-.206.05-.389-.025-.539-.071-.15-.674-1.62-.922-2.206-.24-.579-.492-.501-.673-.51l-.573-.01c-.198 0-.52.074-.792.359-.271.285-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.21 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
 </a>
 </div>
 </div>
 </div>

 <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-solid border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-black font-semibold tracking-wider uppercase">
 <p>© {new Date().getFullYear()} Titus Infotech. All Rights Reserved.</p>
 </div>
 </footer>
 </div>
 </div>
 );
}
"""

if start_idx != -1:
    content = content[:start_idx] + new_tail
    with open('src/App.tsx', 'w') as f:
        f.write(content)
    print("Fixed!")
else:
    print("Not found")

