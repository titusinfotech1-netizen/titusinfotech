import React from 'react';
import { ShieldCheck, ArrowLeft, Lock, Eye, FileLock2 } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-12 animate-fade-in-up text-black">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between border-b border-solid border-gray-100 pb-6">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-black hover:text-[#B89B5E] font-playfair font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#D4AF37]" /> Back to Home
        </button>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Security Certified</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="space-y-4 text-center md:text-left">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">Policy & Compliance</span>
        <h1 className="font-playfair font-black text-3xl sm:text-4xl md:text-5xl text-black leading-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-500 font-mono">
          Last Updated: July 17, 2026 | Effective immediately for all visitors and clients
        </p>
      </div>

      {/* Intro Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="bg-[#FAF8F5] border border-solid border-gray-100 p-6 rounded-2xl space-y-3">
          <Lock className="w-5 h-5 text-[#D4AF37]" />
          <h4 className="font-playfair font-extrabold text-sm uppercase tracking-wide">Data Protection</h4>
          <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
            We encrypt all data in transit and at rest using enterprise security protocols.
          </p>
        </div>
        <div className="bg-[#FAF8F5] border border-solid border-gray-100 p-6 rounded-2xl space-y-3">
          <Eye className="w-5 h-5 text-[#D4AF37]" />
          <h4 className="font-playfair font-extrabold text-sm uppercase tracking-wide">Absolute Transparency</h4>
          <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
            No unexpected tracker scripts. We never rent, share, or sell your private information.
          </p>
        </div>
        <div className="bg-[#FAF8F5] border border-solid border-gray-100 p-6 rounded-2xl space-y-3">
          <FileLock2 className="w-5 h-5 text-[#D4AF37]" />
          <h4 className="font-playfair font-extrabold text-sm uppercase tracking-wide">Regulatory Alignment</h4>
          <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
            Strict adherence to Information Technology Act, 2000 (India) and global compliance rules.
          </p>
        </div>
      </div>

      {/* Detailed Legal Sections */}
      <div className="space-y-8 pt-4 font-sans text-xs leading-relaxed text-gray-700">
        <section className="space-y-3">
          <h3 className="font-playfair font-black text-lg text-[#B89B5E] uppercase tracking-wider">1. Information Collection</h3>
          <p>
            Titus Infotech collects information that you voluntarily provide to us when submitting design blueprints, budget estimations, or contact criteria through our boutique form utilities. This includes:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1.5 font-medium text-black">
            <li>Identifiable credentials such as your full name, business email address, and active telephone numbers.</li>
            <li>Corporate variables including organization name, target market niche, and project requirements.</li>
            <li>Financial variables including your selected project valuation budget tier and quote specs.</li>
            <li>Interactive conversations conducted with our on-site artificial intelligence consulting systems.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="font-playfair font-black text-lg text-[#B89B5E] uppercase tracking-wider">2. Data Usage & Diagnostics</h3>
          <p>
            The collected criteria are handled strictly for high-fidelity service delivery, including:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1.5 font-medium text-black">
            <li>Formulating precise technical proposals and architecture quotes mapped to your target budget.</li>
            <li>Scheduling live consulting calls, follow-up diagnostics, or bespoke status reports.</li>
            <li>Delivering our curated agency publications, tech-insights newsletters, and design logs.</li>
            <li>Refining on-site system experiences and software performance metrics.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="font-playfair font-black text-lg text-[#B89B5E] uppercase tracking-wider">3. Safeguards & Storage Duration</h3>
          <p>
            Your details are stored securely within our private data pipelines. We retain data strictly for the duration necessary to satisfy mutual collaboration goals or comply with applicable legal frameworks. All database access logs are regularly audited by our Principal Architect to prevent unapproved entries.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-playfair font-black text-lg text-[#B89B5E] uppercase tracking-wider">4. Third-Party Integrations & Scope Limitations</h3>
          <p>
            We operate as a hand-crafted agency and do not authorize background tracker loops to access your private criteria. Your metrics are shared with external providers only when necessary to process secure payment transitions or coordinate server instances (e.g., Google Workspace APIs, secure database hostings, etc.).
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-playfair font-black text-lg text-[#B89B5E] uppercase tracking-wider">5. Your Privacy Rights</h3>
          <p>
            You have full entitlement to review, adjust, or permanently scrub your logged credentials from our systems at any point. To request immediate correction, extraction, or deletion, kindly lodge a formal query to our compliance channels at <a href="mailto:titusinfotech1@gmail.com" className="text-[#D4AF37] hover:underline font-bold">titusinfotech1@gmail.com</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-playfair font-black text-lg text-[#B89B5E] uppercase tracking-wider">6. Policy updates</h3>
          <p>
            We reserve rights to adjust these privacy protocols as our systems grow. Critical modifications will be updated on this page with an adjusted date stamp. Continued site usage constitutes voluntary acceptance of updated protocols.
          </p>
        </section>
      </div>

      {/* Bottom Footer Back button */}
      <div className="flex justify-center pt-8 border-t border-solid border-gray-100">
        <button 
          onClick={onBack}
          className="bg-white hover:bg-gray-50 text-[#B89B5E] border border-solid border-[#D4AF37]/30 font-playfair font-bold text-xs px-8 py-3.5 rounded-full uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
        >
          Return to Services & Consultation
        </button>
      </div>
    </div>
  );
}
