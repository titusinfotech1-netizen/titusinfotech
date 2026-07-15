import { Project, BlogPost, Task } from '../types';

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "Luxe Atelier Interior Portal",
    category: "Business",
    description: "An immersive, minimal digital showroom for an international high-end architectural firm, centered on interactive visual layouts.",
    technologies: ["React", "Framer Motion", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
    demoUrl: "#",
    caseStudy: {
      challenge: "The client needed to translate the physical tactile experience of physical marble and premium fabrics into digital pixels without compromising luxury.",
      solution: "We designed a slow-panning fullscreen hero grid with staggered image entries and responsive typography overlays to highlight premium materials.",
      result: "Achieved a 98/100 performance score, 40% increase in average session duration, and 12 high-intent client inquiries within the first 30 days."
    }
  },
  {
    id: "proj-2",
    title: "Maison de la Haute Couture",
    category: "E-Commerce",
    description: "A premium headless commerce store with slick canvas transitions, multi-currency support, and instantaneous checkout flows.",
    technologies: ["Next.js", "Stripe", "Tailwind CSS", "Node.js"],
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
    demoUrl: "#",
    caseStudy: {
      challenge: "E-commerce apps often load heavily, creating latency that repels premium shoppers who value their time.",
      solution: "Implemented strict static site generation (SSG) with server-side incremental regeneration, lazy loading images with custom blurred SVG placeholding.",
      result: "Reduced average load time from 4.2 seconds to 650ms. Conversion rate grew by 24% globally."
    }
  },
  {
    id: "proj-3",
    title: "Veloce Financial Dashboard",
    category: "Dashboard",
    description: "A secure, lightning-fast financial analytics dashboard showcasing visual asset pacing, modern line indicators, and CSV controls.",
    technologies: ["React", "Recharts", "Tailwind CSS", "Firebase"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    demoUrl: "#",
    caseStudy: {
      challenge: "Providing rich historical timelines with 10,000+ data coordinates usually throttles browser frame rates.",
      solution: "Used canvas-based SVG data plotting and optimized key states in local memory to maintain 60FPS fluid navigation.",
      result: "The venture fund reported a 15% improvement in analyst decision-making speed due to the ultra-dense clean design."
    }
  },
  {
    id: "proj-4",
    title: "Solaria Premium Estates",
    category: "Real Estate",
    description: "A minimalist property finder portal with custom maps, drone view integration, and booking forms for private viewings.",
    technologies: ["React", "Express", "Tailwind CSS", "Mapbox"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    demoUrl: "#",
    caseStudy: {
      challenge: "High-value buyers demand seamless private viewing scheduling without endless calls.",
      solution: "Integrated a custom visual scheduler synchronized directly with the agency's shared Google Workspace Calendars.",
      result: "Bypassed standard listing websites to capture 4.8 million dollars in exclusive luxury property transactions in 3 months."
    }
  },
  {
    id: "proj-5",
    title: "Aetheria Wellness Lounge",
    category: "Healthcare",
    description: "An elegant, eye-soothing booking and consulting portal for high-end boutique meditation lounges and clinics.",
    technologies: ["React", "Express", "Tailwind CSS", "MongoDB"],
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    demoUrl: "#",
    caseStudy: {
      challenge: "Medical and luxury clinic forms are notoriously rigid, cold, and intimidating.",
      solution: "Replaced old multi-field text walls with a conversational form system styled with soft cream colors and smooth hover state indicators.",
      result: "Form abandonment rates plummeted by 68% and customer satisfaction surveys reached 99.4% approval."
    }
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Art of Minimal Web Design in 2026",
    category: "Design",
    summary: "Why leading world-class luxury brands are stripping back visual volume in favor of structural typography and generous whitespace.",
    content: "The modern web has become incredibly cluttered with flashing banners, generic gradients, and immediate pop-up requests. For luxury brands, this visual noise is fatal. Luxury is defined by quiet confidence, premium craftsmanship, and deliberate spacing. In 2026, minimal web design focuses on high-contrast editorial typography, crisp container lines, and micro-animations that respond only when useful. By leveraging deep charcoal backgrounds combined with warm gold accents and cream whites, you create a virtual digital showroom that feels exclusive, professional, and trustworthy.",
    date: "July 8, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "Titus Vance",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      role: "Lead Creative Partner"
    }
  },
  {
    id: "blog-2",
    title: "Unlocking 99+ Mobile Page Speed in React Applications",
    category: "Technology",
    summary: "A professional checklist on resource bundling, lazy-loading strategies, and CSS stripping for sub-second visual renders.",
    content: "Every 100ms of latency costs modern digital businesses up to 1% in conversion rates. High-net-worth customers are particularly impatient. Achieving a 99+ speed rating on Google PageSpeed Insights requires optimizing resource footprints. In this article, we cover: 1) Lazy loading of secondary widgets (such as chat boxes) using Dynamic imports, 2) Optimizing modern SVG graphics rather than downloading massive PNG files, 3) Crafting full-stack API routes to keep processing on the server, and 4) Purging and stripping CSS assets so that critical viewport components render instantly.",
    date: "July 5, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "Kayden Frost",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      role: "Principal Architect"
    }
  },
  {
    id: "blog-3",
    title: "Bespoke Branding: Why Luxury Websites Prefer Custom Code",
    category: "Business",
    summary: "Discover why template builders like WordPress or Wix fail to build trust with modern high-ticket clientele.",
    content: "When a potential high-ticket client lands on your website, they instantly judge your authority, prices, and level of craftsmanship. Templates look similar because they are built on general foundations. A custom React website tailored to your brand represents your standards. Custom architectures provide absolute security, infinite scalability, and bespoke visual timelines that templates can never replicate. When you invest in a tailored codebase, you don't just buy a website; you establish a permanent digital asset that commands higher premium margins.",
    date: "June 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "Sarah Sterling",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      role: "Digital Strategist"
    }
  }
];

export const initialTasks: Task[] = [
  { id: "task-1", title: "Bespoke Design Wireframe", project: "Luxe Atelier", status: "todo", priority: "high" },
  { id: "task-2", title: "Stripe Payment Gateway Integration", project: "Maison Couture", status: "development", priority: "medium" },
  { id: "task-3", title: "Visual Dashboard Performance Sweep", project: "Veloce Dashboard", status: "review", priority: "high" },
  { id: "task-4", title: "Setup WebSockets real-time sync", project: "Titus Portal", status: "design", priority: "low" },
  { id: "task-5", title: "Launch and CDN propagation", project: "Aetheria Lounge", status: "done", priority: "high" }
];

export const testimonials = [
  {
    quote: "Titus Infotech completely reinvented our web footprint. Their incredible attention to minimal alignment, high-speed rendering, and premium animations delivered a massive increase in our global boutique bookings.",
    name: "Genevieve Dubois",
    role: "Global Creative Director",
    company: "Dubois Luxury Group",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "Outstanding engineering and world-class design sense. They build custom applications that are lightning-fast and visually stunning. They operate like a premium digital partner, not just code monkeys.",
    name: "Arthur Pendelton",
    role: "Principal Founder",
    company: "Apex Capital VC",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "The Admin Dashboard they custom-built for our team is a masterclass in utility and aesthetics. Our project management, lead workflows, and client logs are completely streamlined. Worth every dollar.",
    name: "Emilio Martinez",
    role: "Director of Real Estate",
    company: "Azure Horizon Estates",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  }
];

export const faqs = [
  {
    q: "How long does development take?",
    a: " Bespoke portfolios and landing pages take 2 to 4 weeks. Full custom e-commerce and large-scale web applications with customized dashboards generally take 4 to 8 weeks, ensuring flawless quality sweeps."
  },
  {
    q: "Do you provide premium hosting?",
    a: "Yes. We configure elite scale-to-zero server architectures and global CDNs (like Cloud Run or Vercel Edge) to guarantee under-500ms load speeds worldwide. We also assist with domain linking."
  },
  {
    q: "Do you redesign existing websites?",
    a: "Absolutely. We specialize in converting lagging, template-based websites into premium custom React codes that instantly elevate brand authority and search rankings."
  },
  {
    q: "Can I edit my website later?",
    a: "Yes. We provide custom administrative panels (like our beautiful Admin Dashboard) where you can manage portfolios, blogs, images, and client logs yourself without looking at a line of code."
  },
  {
    q: "Do you provide premium support?",
    a: "Yes. Every client receives lifetime security support, monthly software checks, and content update credits as part of our premium maintenance agreements."
  },
  {
    q: "How much does a website cost?",
    a: "Our bespoke design and code agreements range from $2,500 for sleek landing pages to $15,000+ for dense enterprise software applications and portals. Every quote is fully detailed and non-binding."
  }
];
