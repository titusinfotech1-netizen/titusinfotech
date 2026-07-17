import React from 'react';
import { Scale, ArrowLeft, FileText, Landmark, FileCheck } from 'lucide-react';

interface TermsAndConditionsProps {
  onBack: () => void;
}

export default function TermsAndConditions({ onBack }: TermsAndConditionsProps) {
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
          <Scale className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Legal Agreement</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="space-y-4 text-center md:text-left">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">Service Agreement</span>
        <h1 className="font-playfair font-black text-3xl sm:text-4xl md:text-5xl text-black leading-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs text-gray-500 font-mono">
          Last Updated: July 17, 2026 | Governing services, quotes, and custom software delivery
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="bg-[#FAF8F5] border border-solid border-gray-100 p-6 rounded-2xl space-y-3">
          <FileText className="w-5 h-5 text-[#D4AF37]" />
          <h4 className="font-playfair font-extrabold text-sm uppercase tracking-wide">Estimates & SOW</h4>
          <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
            Preliminary quote values are non-binding. Project boundaries are strictly set by formal Statement of Work (SOW) documents.
          </p>
        </div>
        <div className="bg-[#FAF8F5] border border-solid border-gray-100 p-6 rounded-2xl space-y-3">
          <Landmark className="w-5 h-5 text-[#D4AF37]" />
          <h4 className="font-playfair font-extrabold text-sm uppercase tracking-wide">INR Valuations</h4>
          <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
            All prices are officially cataloged in Indian Rupees (₹/INR) to align with standard local pricing and payment pipelines.
          </p>
        </div>
        <div className="bg-[#FAF8F5] border border-solid border-gray-100 p-6 rounded-2xl space-y-3">
          <FileCheck className="w-5 h-5 text-[#D4AF37]" />
          <h4 className="font-playfair font-extrabold text-sm uppercase tracking-wide">IP Clearances</h4>
          <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
            Ownership of custom code, custom soundscapes, vector assets, and brand logos transfers fully upon final payment resolution.
          </p>
        </div>
      </div>

      {/* Detailed Legal Sections */}
      <div className="space-y-8 pt-4 font-sans text-xs leading-relaxed text-gray-700">
        <section className="space-y-3">
          <h3 className="font-playfair font-black text-lg text-[#B89B5E] uppercase tracking-wider">1. Agreement to Terms</h3>
          <p>
            By viewing our premium digital showcase, interacting with our automated diagnostic systems, or submitting detailed design requirements, you signify absolute consent to follow these Terms & Conditions. If you differ on any stipulations, you must stop utilizing our portal tools and consulting frameworks immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-playfair font-black text-lg text-[#B89B5E] uppercase tracking-wider">2. Operational Offerings & Quotes</h3>
          <p>
            Titus Infotech develops bespoke high-performance websites, native mobile applications, geometric brand marks/logos, cinematic editing suites, and custom music productions.
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1.5 font-medium text-black">
            <li>Any budget tiers or estimates generated on the site are introductory tools.</li>
            <li>We reserve exclusive rights to adjust service metrics, tech-stack criteria, and prices prior to formal contract signatures.</li>
            <li>Proposals remain active for 30 calendar days from delivery unless explicitly stated.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="font-playfair font-black text-lg text-[#B89B5E] uppercase tracking-wider">3. Currency & Settlement Terms</h3>
          <p>
            To accommodate local regulatory frameworks, all cataloged pricing benchmarks are represented in Indian Rupees (₹ / INR). Any wire transfers, corporate deposits, or online settlements must resolve in INR unless separate billing channels are contractually established in writing. Milestones, retainer schemes, and deposit criteria will be finalized inside individual Statement of Work (SOW) files.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-playfair font-black text-lg text-[#B89B5E] uppercase tracking-wider">4. Intellectual Property Rights</h3>
          <p>
            All pre-existing site layouts, diagnostic widgets, visual patterns, and original copy on this portal are the sole intellectual property of Titus Infotech. Regarding client projects:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1.5 font-medium text-black">
            <li>Ownership of custom source repositories, databases, sound masters, and artwork passes to the client upon full payment receipt.</li>
            <li>We retain non-exclusive, perpetual rights to display non-confidential project milestones and screenshots in our corporate design portfolios.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="font-playfair font-black text-lg text-[#B89B5E] uppercase tracking-wider">5. Service Warranty & Code Liability</h3>
          <p>
            We provide our digital products with a pristine performance warranty. However, because external systems constantly evolve, we cannot offer liability coverage for:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1.5 font-medium text-black">
            <li>Failures triggered by unapproved client modifications to final production codebases.</li>
            <li>Outages stemming from third-party hosting companies, database systems, or API shifts.</li>
            <li>Loss of conversions, organic search ranks, or marketing revenue.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="font-playfair font-black text-lg text-[#B89B5E] uppercase tracking-wider">6. Governing Legislation & Jurisdiction</h3>
          <p>
            These conditions are governed exclusively by the laws of India. Any litigation, mediation, or legal claims arising from our agency agreements or online assets will be settled exclusively within the authorized courts located in India.
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
