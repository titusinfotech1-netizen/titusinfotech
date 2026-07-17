import React, { useState, useEffect } from 'react';
import { 
 Laptop, Code2, Sparkles, TrendingUp, Smartphone, ShieldCheck, Cpu, Wrench, 
 Layers, Globe, ChevronDown, ChevronUp, Star, Check, ArrowRight, Github, Figma, 
 Search, Menu, X, Lock, Send, ExternalLink, FileCode, Terminal, 
 ArrowUp, Mail, Phone, MapPin, ChevronLeft, CheckCircle2, Monitor, PenTool, Music, Video, Camera, MessageSquare
} from 'lucide-react';

// Shared types and initial data
import { Project, BlogPost, Lead } from './types';
import { initialProjects, initialBlogPosts, testimonials, faqs } from './data/mockData';
import { servicesData, ServiceDetail } from './data/servicesData';

// Custom Subcomponents
import AdminDashboard from './components/AdminDashboard';
import { FadeIn } from './components/FadeIn';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
// @ts-ignore
import titusLogo from './assets/images/titus_logo_1784128112710.jpg';
// @ts-ignore
import whatsappLogo from './assets/images/whatsapp_logo_1784133431023.jpg';

export default function App() {
 const [isDarkMode, setIsDarkMode] = useState(false);
 const [view, setView] = useState<'contact' | 'thankyou' | 'privacy' | 'terms'>('contact');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServiceConsultation = (serviceTitle: string) => {
    setContactForm(prev => ({
      ...prev,
      message: `I am interested in the "${serviceTitle}" service. Please provide further consultation regarding design options, specifications, and a precise quote.`
    }));
    setSelectedService(null);
    setView('contact');
    setTimeout(() => {
      document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

 // Active lead submitted for WhatsApp link
 const [lastLead, setLastLead] = useState<{
 name: string;
 email: string;
 phone: string;
 company: string;
 budget: string;
 message: string;
 } | null>(null);
 
 // Mobile responsive nav toggle
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

 // Core synchronized databases (propagate Admin edits instantly!)
 const [portfolioItems, setPortfolioItems] = useState<Project[]>(initialProjects);
 const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
 const [leads, setLeads] = useState<Lead[]>([]);
 
 // Custom global agency settings
 const [agencySettings, setAgencySettings] = useState({
 email: "titusinfotech1@gmail.com",
 phone: "9787674303",
 whatsapp: "919787674303",
 address: ""
 });

 // Active filter for Portfolio grid
 const [portfolioFilter, setPortfolioFilter] = useState('All');

 // Interactive popup modals
 const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
 const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

 // Contact form submission state
 const [contactForm, setContactForm] = useState({
 name: "", email: "", phone: "", company: "", budget: "₹4,00,000 - ₹8,00,000", message: ""
 });
 const [isSubmitting, setIsSubmitting] = useState(false);

 // Cookie Consent banner state
 const [cookieConsent, setCookieConsent] = useState(() => {
 return localStorage.getItem('titus_cookie_accepted') === 'true';
 });

 // Blog dynamic search
 const [blogSearch, setBlogSearch] = useState("");
 const [blogCategoryFilter, setBlogCategoryFilter] = useState("All");

 // Newsletter state
 const [newsletterEmail, setNewsletterEmail] = useState("");

 // Plan comparison expansion
 const [comparePlansExpanded, setComparePlansExpanded] = useState(false);

 // Active FAQ index accordion
 const [activeFaq, setActiveFaq] = useState<number | null>(null);

 // Back to Top button show state
 const [showBackToTop, setShowBackToTop] = useState(false);

 // Floating Action Button (FAB) contact menu state
 const [fabOpen, setFabOpen] = useState(false);

 // Sync leads count on startup
 useEffect(() => {
 const fetchLeadsCount = async () => {
 try {
 const res = await fetch('/api/leads');
 if (res.ok) {
 const data = await res.json();
 setLeads(data);
 }
 } catch (err) {
 console.error("Could not sync leads count", err);
 }
 };
 fetchLeadsCount();
 }, []);

 // Monitor scroll for back-to-top show/hide
 useEffect(() => {
 const handleScroll = () => {
 setShowBackToTop(window.scrollY > 400);
 };
 window.addEventListener('scroll', handleScroll);
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 const handleContactSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!contactForm.name || !contactForm.email || !contactForm.message) {
 alert("Please provide name, email, and description criteria.");
 return;
 }
 setIsSubmitting(true);

 try {
 const response = await fetch('/api/contact', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(contactForm)
 });
 if (response.ok) {
 const data = await response.json();
 // Update local leads state
 setLeads(prev => [data.lead, ...prev]);

 // Cache this submission details in state
 const submissionDetails = { ...contactForm };
 setLastLead(submissionDetails);

 // Reset form
 setContactForm({
 name: "", email: "", phone: "", company: "", budget: "₹4,00,000 - ₹8,00,000", message: ""
 });
 // Route to custom Thank You Page view
 setView('thankyou');
 window.scrollTo(0, 0);
 } else {
 throw new Error("Failed to post submission");
 }
 } catch (err) {
 console.error(err);
 alert("Submission connection error. Your details were temporarily backed up.");
 } finally {
 setIsSubmitting(false);
 }
 };

 const handleNewsletterSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 if (!newsletterEmail) return;
 alert(`Thank you for subscribing! Exquisite publications will be delivered to ${newsletterEmail} shortly.`);
 setNewsletterEmail("");
 };

 const acceptCookies = () => {
 localStorage.setItem('titus_cookie_accepted', 'true');
 setCookieConsent(true);
 };

 // Filter portfolio items
 const filteredProjects = portfolioItems.filter(p => {
 if (portfolioFilter === 'All') return true;
 return p.category.toLowerCase() === portfolioFilter.toLowerCase();
 });

 // Filter blog posts
 const filteredBlogs = blogPosts.filter(b => {
 const matchesSearch = b.title.toLowerCase().includes(blogSearch.toLowerCase()) || 
 b.summary.toLowerCase().includes(blogSearch.toLowerCase());
 const matchesCategory = blogCategoryFilter === 'All' || b.category === blogCategoryFilter;
 return matchesSearch && matchesCategory;
 });

 // Simple Scroll trigger navigation handler
 const navigateTo = (targetView: typeof view) => {
    setSelectedService(null);
 setView(targetView);
 setMobileMenuOpen(false);
 window.scrollTo({ top: 0, behavior: 'smooth' });
 };

 // Standard Technology Badges
 const techStack = [
 { name: "React", icon: "⚛️" },
 { name: "Next.js", icon: "🌐" },
 { name: "Tailwind CSS", icon: "🎨" },
 { name: "Node.js", icon: "🟢" },
 { name: "Express", icon: "🚀" },
 { name: "MongoDB", icon: "🍃" },
 { name: "MySQL", icon: "🐬" },
 { name: "Firebase", icon: "🔥" },
 { name: "Figma", icon: "📐" },
 { name: "Adobe XD", icon: "🖼️" },
 { name: "GitHub", icon: "🐙" },
 { name: "TypeScript", icon: "📘" }
 ];

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'website': return <Monitor className="w-5 h-5" />;
      case 'app': return <Smartphone className="w-5 h-5" />;
      case 'logo': return <PenTool className="w-5 h-5" />;
      case 'music': return <Music className="w-5 h-5" />;
      case 'editing': return <Camera className="w-5 h-5" />;
      default: return <Monitor className="w-5 h-5" />;
    }
  };

 return (
 <div className={`${isDarkMode ? 'dark' : ''} transition-colors duration-300 min-h-screen flex flex-col font-playfair`}>
 <div className="bg-white text-[#D4AF37] flex-1 flex flex-col selection:bg-[#D4AF37] selection:text-[#B89B5E]">
 
  {/* Sticky Transparent Navbar */}
  <header className="sticky top-4 z-30 px-4 md:px-6 w-full transition-all duration-200">
    <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 bg-white/95 backdrop-blur-md border border-solid border-[#D4AF37]/30 rounded-2xl md:rounded-full shadow-lg flex items-center justify-between relative">
      {/* Logo on Left */}
      <button 
        onClick={() => navigateTo('contact')} 
        className="flex items-center gap-2.5 text-left group cursor-pointer"
      >
        <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center border border-solid border-[#D4AF37]/30 shadow-sm bg-white p-0.5">
          <img 
            src={titusLogo} 
            alt="Titus Infotech Logo" 
            className="w-full h-full object-contain" 
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <span className="font-playfair font-extrabold text-xs tracking-widest text-[#B89B5E] uppercase">
            Titus Infotech
          </span>
          <span className="block text-[8px] text-black font-medium tracking-widest uppercase"></span>
        </div>
      </button>

      {/* Desktop Navigation Tabs */}
      <nav className="hidden md:flex items-center gap-1 bg-gray-50/85 p-1 border border-solid border-gray-100 rounded-full">
        <button 
          onClick={() => {
            navigateTo('contact');
            setTimeout(() => {
              document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="px-5 py-2 text-[10px] font-playfair font-bold uppercase tracking-widest text-black hover:text-[#B89B5E] transition-all rounded-full hover:bg-white cursor-pointer"
        >
          Services
        </button>
        <button 
          onClick={() => {
            navigateTo('contact');
            setTimeout(() => {
              document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="px-5 py-2 text-[10px] font-playfair font-bold uppercase tracking-widest text-black hover:text-[#B89B5E] transition-all rounded-full hover:bg-white cursor-pointer"
        >
          Consultation
        </button>
      </nav>

      {/* Right Side CTA Button */}
      <div className="hidden md:flex items-center">
        <button 
          onClick={() => {
            navigateTo('contact');
            setTimeout(() => {
              document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="bg-[#D4AF37] hover:bg-[#B89B5E] text-black font-playfair font-bold text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
        >
          Request Quote
        </button>
      </div>

      {/* Mobile Nav Button */}
      <div className="flex md:hidden items-center gap-3">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-gray-50 border border-solid border-gray-100 rounded-full text-[#D4AF37] cursor-pointer hover:bg-white transition-all shadow-sm"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>
    </div>

    {/* Mobile Dropdown Panel - elegantly curved */}
    {mobileMenuOpen && (
      <div className="absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-md border border-solid border-[#D4AF37]/30 rounded-2xl shadow-xl p-4 flex flex-col gap-2.5 md:hidden animate-fade-in-up">
        <button 
          onClick={() => {
            navigateTo('contact');
            setTimeout(() => {
              document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="w-full text-center py-3 text-xs font-playfair font-bold uppercase tracking-widest text-black hover:text-[#B89B5E] transition-all rounded-xl hover:bg-gray-50 cursor-pointer"
        >
          Services
        </button>
        <button 
          onClick={() => {
            navigateTo('contact');
            setTimeout(() => {
              document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="w-full text-center py-3 text-xs font-playfair font-bold uppercase tracking-widest text-black hover:text-[#B89B5E] transition-all rounded-xl hover:bg-gray-50 cursor-pointer"
        >
          Consultation
        </button>
        <button 
          onClick={() => {
            navigateTo('contact');
            setTimeout(() => {
              document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="w-full text-center py-3 text-xs font-playfair font-bold uppercase tracking-widest bg-[#D4AF37] text-black rounded-xl cursor-pointer"
        >
          Request Quote
        </button>
      </div>
    )}
  </header>
 {/* Core Layout Switcher / Content Area */}
 <main className="flex-1">
{/* VIEW: CONTACT */}
 {view === 'contact' && (
  <div className="animate-fade-in-up">
    {selectedService ? (
      (() => {
        const service = servicesData.find(s => s.id === selectedService);
        if (!service) return null;
        return (
          <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-12 animate-fade-in-up">
            {/* Back Navigation Bar */}
            <div className="flex items-center justify-between border-b border-solid border-gray-100 pb-6">
              <button 
                onClick={() => setSelectedService(null)}
                className="inline-flex items-center gap-2 text-black hover:text-[#B89B5E] font-playfair font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-[#D4AF37]" /> Back to Services
              </button>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bespoke Specs</span>
              </div>
            </div>

            {/* Main Header / Title */}
            <div className="space-y-4 text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">Detailed Capabilities Overview</span>
              <h1 className="font-playfair font-black text-3xl sm:text-4xl md:text-5xl text-black leading-tight">
                {service.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-2xl">
                {service.desc}
              </p>
            </div>

            {/* Split Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
              
              {/* Left Column: Cover Image & Value Card */}
              <div className="lg:col-span-5 space-y-6">
                <div className="aspect-video sm:aspect-[4/3] rounded-3xl overflow-hidden border border-solid border-[#D4AF37]/35 shadow-lg relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                  <div className="absolute bottom-5 left-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white text-[#D4AF37] flex items-center justify-center border border-solid border-[#D4AF37]/30 shadow">
                      {getServiceIcon(service.id)}
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-300 font-bold uppercase tracking-wider">Service Category</p>
                      <p className="text-xs text-white font-extrabold uppercase tracking-widest">{service.title}</p>
                    </div>
                  </div>
                </div>

                {/* Interactive Pricing Card */}
                <div className="bg-gradient-to-br from-[#FAF6EE] via-white to-[#FCF9F2] border border-solid border-[#D4AF37]/35 rounded-3xl p-6 md:p-8 shadow-xl shadow-[#D4AF37]/5 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-xl pointer-events-none"></div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest block">Premium Valuation</span>
                    <h3 className="font-playfair font-black text-2xl text-black">
                      {service.price}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                      {service.priceDetail}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-dashed border-[#D4AF37]/30 space-y-4">
                    <button 
                      onClick={() => handleServiceConsultation(service.title)}
                      className="w-full bg-[#D4AF37] hover:bg-[#B89B5E] text-black font-playfair font-bold py-3.5 rounded-xl uppercase tracking-wider text-[10px] shadow-lg transition-all active:scale-[0.97] cursor-pointer text-center flex items-center justify-center gap-2"
                    >
                      Consult on this Service <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => setSelectedService(null)}
                      className="w-full bg-white hover:bg-gray-50 text-[#B89B5E] border border-solid border-[#D4AF37]/30 font-playfair font-bold py-3 text-[10px] rounded-xl uppercase tracking-widest transition-colors cursor-pointer text-center"
                    >
                      Return to Main Page
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Descriptions & Details */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Long detailed description */}
                <div className="space-y-4">
                  <h3 className="font-playfair font-black text-lg text-[#B89B5E] uppercase tracking-wider">Craft Architecture & Mission</h3>
                  <p className="text-xs text-black leading-relaxed font-medium">
                    {service.details}
                  </p>
                </div>

                {/* Key Advantages / Benefits */}
                <div className="space-y-4">
                  <h3 className="font-playfair font-black text-sm text-black uppercase tracking-wider">Key Strategic Advantages</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {service.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3 bg-gray-50/50 p-3.5 rounded-2xl border border-solid border-gray-100">
                        <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <p className="text-[11px] text-black leading-relaxed font-semibold">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Deliverables / Specs */}
                <div className="space-y-4">
                  <h3 className="font-playfair font-black text-sm text-black uppercase tracking-wider">Technical Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {service.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2.5 bg-white border border-solid border-gray-100 px-4 py-3 rounded-xl shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0"></span>
                        <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Development Process Timeline */}
            <div className="pt-8 border-t border-solid border-gray-100">
              <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]">Our Blueprint</span>
                <h3 className="font-playfair font-black text-xl text-black uppercase tracking-wider">The Professional Process</h3>
                <p className="text-[11px] text-gray-500">Every project goes through precise phases to guarantee luxury-grade outputs.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.process.map((step, i) => (
                  <div key={i} className="bg-[#FAF8F5]/60 border border-solid border-gray-100 p-6 rounded-2xl relative shadow-sm hover:border-[#D4AF37]/35 transition-colors">
                    <span className="absolute top-4 right-5 font-playfair font-black text-3xl text-[#D4AF37]/25">{step.step}</span>
                    <h4 className="font-playfair font-extrabold text-sm text-black mb-2 uppercase tracking-wide">{step.title}</h4>
                    <p className="text-[11px] text-gray-600 leading-relaxed font-medium">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Back Button */}
            <div className="flex justify-center pt-6">
              <button 
                onClick={() => {
                  setSelectedService(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white hover:bg-gray-50 text-[#B89B5E] border border-solid border-[#D4AF37]/30 font-playfair font-bold text-xs px-8 py-3.5 rounded-full uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
              >
                Back to Services Overview
              </button>
            </div>
          </div>
        );
      })()
    ) : (
      <>

   {/* HERO SECTION */}
  <section className="relative pt-24 pb-28 flex flex-col items-center justify-center min-h-[85vh] overflow-hidden px-6">
    <div className="absolute inset-0 bg-gradient-to-b from-[#fefdfb] via-white to-[#fbf9f5] z-[-2]"></div>
    <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" alt="Hero background" className="absolute inset-0 w-full h-full object-cover opacity-[0.035] z-[-1] pointer-events-none" />
    
    <div className="relative z-10 max-w-5xl mx-auto space-y-12 text-center">
      {/* Main Grand Typography Title */}
      <div className="space-y-4">
        <h1 className="font-playfair font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black leading-tight tracking-tight max-w-4xl mx-auto">
          We Forge <span className="text-[#B89B5E] underline decoration-[#D4AF37]/30 underline-offset-8">Luxury Digital Crafts</span> That Command Millions
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
          Titus Infotech designs high-performance full-stack web systems, native iOS/Android applications, iconic corporate brandings, cinematic film editing, and original audio soundscapes. We cultivate absolute digital dominance for elite enterprises.
        </p>
      </div>

      {/* Premium Dual CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button 
          onClick={() => document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#B89B5E] text-black font-playfair font-black text-xs px-8 py-4 rounded-full uppercase tracking-widest transition-all active:scale-95 shadow-xl hover:shadow-2xl hover:shadow-[#D4AF37]/20 cursor-pointer"
        >
          Request Private Consultation
          <ArrowRight className="w-4 h-4" />
        </button>
        <button 
          onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#B89B5E] border border-solid border-[#D4AF37]/40 font-playfair font-bold text-xs px-8 py-4 rounded-full uppercase tracking-widest transition-all active:scale-95 shadow-sm cursor-pointer"
        >
          Explore Master Crafts
        </button>
      </div>

      {/* Quick Visual Badges of our Pillars */}
      <div className="pt-6 pb-2">
        <p className="text-[9px] font-playfair font-bold uppercase tracking-[0.2em] text-[#B89B5E] mb-4">Core Pillars of Creative Mastery</p>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {[
            { label: "Web Engineering", icon: <Code2 className="w-3.5 h-3.5" /> },
            { label: "Native Apps", icon: <Smartphone className="w-3.5 h-3.5" /> },
            { label: "Luxury Branding", icon: <PenTool className="w-3.5 h-3.5" /> }
          ].map((pill, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/80 border border-solid border-gray-100 rounded-full px-4 py-1.5 shadow-sm hover:border-[#D4AF37]/30 transition-colors">
              <span className="text-[#B89B5E]">{pill.icon}</span>
              <span className="text-[10px] font-semibold text-black uppercase tracking-wider">{pill.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
        <div className="flex flex-col">
        {/* SERVICES SECTION */}
        <section id="services-section" className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#f8f9fa] z-[-2]"></div>
          <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000" alt="Services background" className="absolute inset-0 w-full h-full object-cover opacity-[0.04] z-[-1] pointer-events-none" />
          <FadeIn>
            <div className="max-w-7xl mx-auto space-y-16">
              <div className="text-center max-w-xl mx-auto space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">Our Capabilities</span>
                <h2 className="font-playfair font-extrabold text-3xl text-[#B89B5E]">Comprehensive Digital Services</h2>
                <p className="text-xs text-black leading-relaxed">
                  From luxury digital storefronts to bespoke visual and audio content, our agency provides an end-to-end suite of creative engineering solutions.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {servicesData.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-left bg-white rounded-3xl border border-solid border-[#D4AF37]/20 shadow-lg hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-300 group overflow-hidden flex flex-col h-full cursor-pointer active:scale-[0.98]"
                  >
                    <div className="relative aspect-video w-full overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"></div>
                      <div className="absolute -bottom-5 left-6 w-10 h-10 bg-[#F5F1EA] text-[#D4AF37] flex items-center justify-center rounded-xl border border-solid border-[#D4AF37]/30 shadow-md group-hover:scale-110 transition-transform">
                        {getServiceIcon(service.id)}
                      </div>
                    </div>
                    <div className="p-6 pt-8 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="font-playfair font-extrabold text-sm text-[#B89B5E] group-hover:text-[#D4AF37] transition-colors">{service.title}</h3>
                        <p className="text-[11px] text-gray-700 leading-relaxed font-medium">
                          {service.desc}
                        </p>
                      </div>
                      <div className="pt-4 flex items-center justify-between border-t border-solid border-gray-50 mt-4 w-full">
                        <span className="text-[9px] font-bold text-[#B89B5E] tracking-widest uppercase">{service.price}</span>
                        <span className="text-[9px] font-bold text-gray-400 group-hover:text-black transition-colors uppercase tracking-widest flex items-center gap-1">
                          Learn More <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </button>
                ))}</div>
            </div>
          </FadeIn>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact-form-section" className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#fffcf5] z-[-2]"></div>
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000" alt="Contact background" className="absolute inset-0 w-full h-full object-cover opacity-[0.04] z-[-1] pointer-events-none" />
          <FadeIn>
            <div className="max-w-7xl mx-auto space-y-16">
              <div className="text-center max-w-xl mx-auto space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">Priority Inquiries</span>
                <h2 className="font-playfair font-bold text-3xl text-[#B89B5E] font-extrabold">Initiate Your Digital Transformation</h2>
                <p className="text-xs text-black">Provide your criteria below for custom quote projections.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Contact form left */}
                <div className="lg:col-span-3 bg-white p-8 rounded-3xl border border-solid border-[#D4AF37]/30 shadow-sm">
                  <form onSubmit={handleContactSubmit} className="space-y-6 text-xs text-black">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label htmlFor="form-name" className="font-semibold">Full Identity / Name *</label>
                        <input id="form-name" type="text" required value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} className="w-full p-3 rounded-xl bg-white border border-solid border-[#D4AF37]/30 text-black focus:outline-none focus:border-[#D4AF37] text-xs transition-colors" placeholder="e.g. Sophia Lorenz" />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="form-email" className="font-semibold">Email Address *</label>
                        <input id="form-email" type="email" required value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} className="w-full p-3 rounded-xl bg-white border border-solid border-[#D4AF37]/30 text-black focus:outline-none focus:border-[#D4AF37] text-xs transition-colors" placeholder="e.g. sophia@lorenz-atelier.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label htmlFor="form-phone" className="font-semibold">Phone (Optional)</label>
                        <input id="form-phone" type="text" value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} className="w-full p-3 rounded-xl bg-white border border-solid border-[#D4AF37]/30 text-black focus:outline-none focus:border-[#D4AF37] text-xs transition-colors" placeholder="e.g. +1 (555) 342-9182" />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="form-company" className="font-semibold">Company / Brand (Optional)</label>
                        <input id="form-company" type="text" value={contactForm.company} onChange={e => setContactForm({ ...contactForm, company: e.target.value })} className="w-full p-3 rounded-xl bg-white border border-solid border-[#D4AF37]/30 text-black focus:outline-none focus:border-[#D4AF37] text-xs transition-colors" placeholder="e.g. Lorenz Atelier Boutique" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="form-budget" className="font-semibold">Valuation Budget Tier</label>
                      <select id="form-budget" value={contactForm.budget} onChange={e => setContactForm({ ...contactForm, budget: e.target.value })} className="w-full p-3 rounded-xl bg-white border border-solid border-[#D4AF37]/30 text-black focus:outline-none focus:border-[#D4AF37] text-xs" >
                        <option value="₹2,00,000 - ₹4,00,000" className="text-black">₹2,00,000 - ₹4,00,000 (Minimalist showcase)</option>
                        <option value="₹4,00,000 - ₹8,00,000" className="text-black">₹4,00,000 - ₹8,00,000 (Bespoke Business portal)</option>
                        <option value="₹8,00,000 - ₹12,00,000" className="text-black">₹8,00,000 - ₹12,00,000 (Heads e-commerce engine)</option>
                        <option value="₹12,00,000 - ₹20,00,000" className="text-black">₹12,00,000 - ₹20,00,000 (Enterprise dynamic software)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="form-message" className="font-semibold">Project Criteria / Technical Scope *</label>
                      <textarea id="form-message" required value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} rows={5} className="w-full p-3 rounded-xl bg-white border border-solid border-[#D4AF37]/30 text-black focus:outline-none focus:border-[#D4AF37] text-xs transition-colors leading-relaxed" placeholder="Tell us about page counts, required animations, local databasing scopes, or WebGL desires..." />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#D4AF37] hover:bg-[#B89B5E] text-black font-playfair font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-lg transition-all active:scale-95 cursor-pointer text-center flex items-center justify-center gap-2" >
                      {isSubmitting ? "TRANSMITTING DATA..." : "SUBMIT PROPOSAL REQUEST"} <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

                {/* Contact info right */}
                <div className="lg:col-span-2 flex flex-col justify-between">
                  <div className="bg-gradient-to-br from-[#FAF6EE] via-white to-[#FCF9F2] p-8 md:p-10 rounded-3xl border border-solid border-[#D4AF37]/35 shadow-xl shadow-[#D4AF37]/5 space-y-8 h-full flex flex-col justify-between relative overflow-hidden">
                    {/* Subtle background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B89B5E]/5 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="space-y-6 relative z-10">
                      {/* Active Response Badge */}
                      <div className="inline-flex items-center gap-2 bg-emerald-50 border border-solid border-emerald-100 px-3 py-1 rounded-full shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-700">
                          Worldwide Response: &lt;12 Hours
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-playfair font-black text-xl text-[#B89B5E] uppercase tracking-wider">Reach Us Directly</h3>
                        <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                          Skip the queue entirely. Reach our senior engineers and lead designers through active priority channels.
                        </p>
                      </div>

                      {/* Premium Interactive Cards */}
                      <div className="space-y-4 pt-2">
                        {/* Email Card */}
                        <a 
                          href={`mailto:${agencySettings.email}`}
                          className="flex items-center gap-4 bg-white hover:bg-[#FAF6EE]/50 border border-solid border-[#D4AF37]/20 p-4 rounded-2xl transition-all duration-300 group shadow-sm active:scale-[0.98] block"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#B89B5E] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                            <Mail className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Email Priority Channel</p>
                            <p className="text-xs text-black font-semibold group-hover:text-[#B89B5E] transition-colors">{agencySettings.email}</p>
                          </div>
                        </a>

                        {/* Telephone Card */}
                        <a 
                          href={`tel:${agencySettings.phone}`}
                          className="flex items-center gap-4 bg-white hover:bg-[#FAF6EE]/50 border border-solid border-[#D4AF37]/20 p-4 rounded-2xl transition-all duration-300 group shadow-sm active:scale-[0.98] block"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#B89B5E] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                            <Phone className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Direct Hotline</p>
                            <p className="text-xs text-black font-semibold group-hover:text-[#B89B5E] transition-colors">+{agencySettings.phone}</p>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Operational Details & Guarantee Section */}
                    <div className="pt-6 border-t border-dashed border-[#D4AF37]/35 relative z-10 space-y-4">
                      <div className="space-y-1">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Active Consulting Hours</p>
                        <p className="text-[11px] text-black font-semibold">10:00 AM – 7:00 PM IST | Mon – Fri</p>
                      </div>
                      <div className="bg-white/80 p-3 rounded-xl border border-solid border-gray-100 shadow-sm">
                        <p className="text-[10px] text-gray-600 leading-relaxed">
                          <strong className="text-[#B89B5E] font-semibold">Diagnostic Guarantee:</strong> Every inquiry is personally analyzed by our Principal Architect to evaluate system scope, performance optimizations, and pricing estimates.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
        </div>
      
      </>
    )}
  </div>
)}

 {/* VIEW: THANK YOU PAGE */}
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
     {/* Reach Us Card */}
      <div className="bg-[#F5F1EA]/50 border border-solid border-[#D4AF37]/30 rounded-3xl p-8 text-center space-y-5 max-w-md mx-auto shadow-md">
        <div className="space-y-1">
          <p className="text-[10px] text-[#B89B5E] font-bold tracking-widest uppercase">
            Direct Office Channels
          </p>
          <h3 className="font-playfair font-extrabold text-sm text-black uppercase">
            Reach Us Anytime
          </h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4 pt-2">
          {/* Email Channel */}
          <a 
            href={`mailto:${agencySettings.email}`}
            className="flex items-center gap-4 bg-white hover:bg-[#F5F1EA]/30 border border-solid border-[#D4AF37]/15 p-4 rounded-xl transition-all duration-300 group shadow-sm text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-[#F5F1EA] text-[#D4AF37] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] text-gray-400 uppercase font-semibold tracking-wider">Email Address</p>
              <p className="text-xs text-black font-medium group-hover:text-[#B89B5E] transition-colors">{agencySettings.email}</p>
            </div>
          </a>

          {/* Hotline Channel */}
          <a 
            href={`tel:${agencySettings.phone}`}
            className="flex items-center gap-4 bg-white hover:bg-[#F5F1EA]/30 border border-solid border-[#D4AF37]/15 p-4 rounded-xl transition-all duration-300 group shadow-sm text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-[#F5F1EA] text-[#D4AF37] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] text-gray-400 uppercase font-semibold tracking-wider">Consulting Line</p>
              <p className="text-xs text-black font-medium group-hover:text-[#B89B5E] transition-colors">+{agencySettings.phone}</p>
            </div>
          </a>
        </div>
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

 {view === 'privacy' && (
   <PrivacyPolicy onBack={() => navigateTo('contact')} />
 )}

 {view === 'terms' && (
   <TermsAndConditions onBack={() => navigateTo('contact')} />
 )}

 </main>

 {/* UNIVERSAL FOOTER */}
  <footer className="bg-white border-t border-solid border-[#D4AF37]/30 py-8 text-[#D4AF37]">
    <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
      <button 
        onClick={() => navigateTo('contact')} 
        className="flex items-center gap-2.5 text-left group cursor-pointer"
      >
        <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center border border-solid border-[#D4AF37]/30 shadow-sm bg-white p-0.5">
          <img 
            src={titusLogo} 
            alt="Titus Infotech Logo" 
            className="w-full h-full object-contain" 
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="font-playfair font-extrabold text-xs tracking-widest text-[#B89B5E] uppercase">
          Titus Infotech
        </div>
      </button>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <button 
          onClick={() => navigateTo('privacy')}
          className="text-[10px] text-black hover:text-[#B89B5E] font-bold tracking-wider uppercase transition-colors cursor-pointer"
        >
          Privacy Policy
        </button>
        <span className="hidden sm:inline text-[#D4AF37]/40">|</span>
        <button 
          onClick={() => navigateTo('terms')}
          className="text-[10px] text-black hover:text-[#B89B5E] font-bold tracking-wider uppercase transition-colors cursor-pointer"
        >
          Terms & Conditions
        </button>
        <span className="hidden sm:inline text-[#D4AF37]/40">|</span>
        <p className="text-[10px] text-black font-semibold tracking-wider uppercase">
          © {new Date().getFullYear()} Titus Infotech. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>

  {/* FLOATING ACTION BUTTON (FAB) MENU */}
  <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-none">
    {/* Sub-menu Items */}
    <div className={`flex flex-col items-end gap-2.5 transition-all duration-300 transform origin-bottom ${
      fabOpen 
        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
        : "opacity-0 translate-y-4 scale-95 pointer-events-none"
    }`}>
      {/* WhatsApp Support Item */}
      <a 
        href={`https://wa.me/${agencySettings.whatsapp}?text=${encodeURIComponent("Hello Titus Infotech, I would like to consult about a premium website or app development project.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center group pointer-events-auto"
      >
        <span className="bg-black/85 text-white text-[10px] font-playfair font-semibold tracking-wider px-3 py-1.5 rounded-lg shadow-md mr-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          WhatsApp Chat
        </span>
        <div className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#128C7E] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 border border-solid border-[#25D366]/20 overflow-hidden p-1.5">
          <img 
            src={whatsappLogo} 
            alt="WhatsApp" 
            className="w-full h-full object-contain" 
            referrerPolicy="no-referrer"
          />
        </div>
      </a>

      {/* Hotline Call Item */}
      <a 
        href={`tel:${agencySettings.phone}`}
        className="flex items-center group pointer-events-auto"
      >
        <span className="bg-black/85 text-white text-[10px] font-playfair font-semibold tracking-wider px-3 py-1.5 rounded-lg shadow-md mr-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Call Consultant
        </span>
        <div className="w-10 h-10 rounded-full bg-white text-[#B89B5E] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 border border-solid border-[#D4AF37]/30">
          <Phone className="w-4.5 h-4.5" />
        </div>
      </a>

      {/* Email Us Item */}
      <a 
        href={`mailto:${agencySettings.email}`}
        className="flex items-center group pointer-events-auto"
      >
        <span className="bg-black/85 text-white text-[10px] font-playfair font-semibold tracking-wider px-3 py-1.5 rounded-lg shadow-md mr-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Direct Email
        </span>
        <div className="w-10 h-10 rounded-full bg-white text-[#B89B5E] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 border border-solid border-[#D4AF37]/30">
          <Mail className="w-4.5 h-4.5" />
        </div>
      </a>
    </div>

    {/* Main Toggle Button */}
    <button 
      onClick={() => setFabOpen(!fabOpen)}
      className={`w-11 h-11 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 pointer-events-auto cursor-pointer focus:outline-none select-none relative ${
        fabOpen 
          ? "bg-black text-white scale-110 animate-none" 
          : "bg-[#D4AF37] hover:bg-[#B89B5E] text-white hover:scale-105 active:scale-95"
      }`}
      aria-label="Contact Channels Menu"
    >
      {/* Pulse Effect when closed */}
      {!fabOpen && (
        <span className="absolute inset-0 rounded-full bg-[#D4AF37] animate-ping opacity-25 -z-10"></span>
      )}
      
      <div className={`transition-transform duration-300 ${fabOpen ? "rotate-90" : "rotate-0"}`}>
        {fabOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageSquare className="w-5 h-5" />
        )}
      </div>
    </button>
  </div>
  </div>
  </div>
  );
}
