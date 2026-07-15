import React from 'react';

export interface ServiceDetail {
  id: string;
  title: string;
  desc: string;
  price: string;
  priceDetail: string;
  image: string;
  benefits: string[];
  specs: string[];
  process: { step: string; title: string; text: string }[];
  details: string;
}

export const servicesData: ServiceDetail[] = [
  {
    id: 'website',
    title: 'Website Creation',
    desc: 'High-performance, luxury web architectures and full-stack solutions tailored for modern businesses.',
    price: 'Up to ₹2,000',
    priceDetail: 'Based on the design complexity, page counts, and custom interactions.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    details: 'We forge premium digital storefronts, corporate landing hubs, and interactive web tools that command attention. By bypassing standard sluggish website builders (WordPress, Wix, etc.), we write hand-crafted, modern React/Next.js code from scratch. This guarantees lightning-fast loading speeds, perfect mobile responsiveness, and custom animations that leave a lasting impression on your high-value clientele. Every website features complete search engine optimization (SEO) and absolute data privacy compliance.',
    benefits: [
      'Perfect Google Lighthouse speed optimization for optimal search visibility',
      'Immersive layout animations and micro-interactions for elevated user engagement',
      'Bespoke headless architectures allowing fast, custom content updates',
      'Complete responsive compatibility across ultra-wide monitors, tablets, and phones',
      'No templates or pre-made themes—100% bespoke layout tailor-made for your brand'
    ],
    specs: [
      'React 18 / Next.js Production Build Frameworks',
      'Tailwind CSS Modern Utility Design Systems',
      'On-Page SEO Schema Markup & Semantic Metadata',
      'Complete domain routing & SSL certificate configuration',
      'Interactive contact inquiries with automated email routing'
    ],
    process: [
      { step: '01', title: 'Conceptual Blueprint', text: 'We analyze your target market, establish the visual mood board, and pair appropriate typography.' },
      { step: '02', title: 'High-Fidelity Wireframes', text: 'We craft custom UI layouts in Figma, planning the exact scroll effects and interactive animations.' },
      { step: '03', title: 'Bespoke Development', text: 'Our senior engineers write clean, type-safe code, incorporating modern frameworks and lazy-loading assets.' },
      { step: '04', title: 'Optimization & Launch', text: 'We execute rigorous performance audits, optimize static image formats, and deploy on high-performance CDN.' }
    ]
  },
  {
    id: 'app',
    title: 'App Building',
    desc: 'Bespoke iOS and Android mobile applications crafted with high-fidelity performance and native feel.',
    price: 'Up to ₹4,000',
    priceDetail: 'Based on the design complexity, database synchronization, and target platforms.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200',
    details: 'We engineer custom-tailored mobile applications that feel native, responsive, and robust. Leveraging top-tier frameworks like React Native or Flutter, we deliver apps that run flawlessly on both Apple App Store and Google Play from a single, high-performance codebase. Our mobile apps prioritize state persistence, offline compatibility, fluid touch animations, and robust secure authentication systems to protect user data.',
    benefits: [
      'Native-grade screen transitions and fluid touch-event feedback',
      'Offline-first architecture keeping features active even without internet connection',
      'Secure JWT/OAuth credential flows protecting private profiles and databases',
      'Interactive push notifications to maintain consistent user engagement',
      'Seamless multi-platform compatibility across various screen aspect ratios'
    ],
    specs: [
      'React Native / Flutter Cross-Platform Compilation',
      'Fast, secure SQLite/Room local data state persistence',
      'Automated CI/CD App Store & Play Store publishing pipelines',
      'Optimized media caching and hardware-accelerated graphics rendering',
      'Full integration with external device cameras, haptics, and biometrics'
    ],
    process: [
      { step: '01', title: 'Product Architecture', text: 'We map out user flows, define exact cloud data structures, and establish core security boundaries.' },
      { step: '02', title: 'Bespoke UI Design', text: 'We design a comprehensive screen library in Figma, ensuring generous touch targets and high accessibility.' },
      { step: '03', title: 'Full-Stack Development', text: 'Our engineers build the client application while pairing it with secure, cloud-hosted API proxy routes.' },
      { step: '04', title: 'Store Submission', text: 'We compile production release binaries, set up required app store listings, and manage the review cycles.' }
    ]
  },
  {
    id: 'logo',
    title: 'Logo Creation',
    desc: 'Bespoke visual identities, premium brand marks, and comprehensive design systems.',
    price: 'Up to ₹200',
    priceDetail: 'Based on the design concepts, revisions, and brand assets required.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200',
    details: 'Your visual mark is the primary portal through which clients evaluate your quality. We design premium brand logos and complete corporate identities from first principles. By choosing precise geometric structures, choosing custom hand-crafted letterforms, and matching sophisticated color theories, we establish a visual language that communicates premium quality. You receive high-resolution vector assets, responsive layouts, and a cohesive corporate style sheet.',
    benefits: [
      '100% custom-designed geometric marks—absolutely no generic stock vectors',
      'Exhaustive research into industry competitors to ensure distinctive positioning',
      'Scalable vector structures that maintain perfect clarity from small favicons to massive banners',
      'Sophisticated typography pairings matching modern corporate design aesthetics',
      'Detailed guidelines explaining clear space rules, layout variants, and incorrect usage'
    ],
    specs: [
      'Fully scalable vector formats (AI, EPS, SVG, and PDF)',
      'High-resolution raster files for web and social profiles (PNG, JPG)',
      'Light and dark mode color variants including solid black and white',
      'Complete copyright transfer for full commercial ownership',
      'Aesthetic style sheets containing specific Hex/Pantone colors'
    ],
    process: [
      { step: '01', title: 'Discovery & Direction', text: 'We explore your brand values, target audience, and preferred aesthetic moods (e.g. Swiss modern, editorial serif).' },
      { step: '02', title: 'Concept Generation', text: 'We sketch multiple original layout variations exploring distinct concepts and symbols.' },
      { step: '03', title: 'Geometric Refinement', text: 'We trace the chosen concept digitally, ensuring perfect balance, kerning, and grid proportions.' },
      { step: '04', title: 'Brand Assets Delivery', text: 'We pack the complete set of assets and deliver comprehensive files with clear usage guidelines.' }
    ]
  },
  {
    id: 'music',
    title: 'Music Production',
    desc: 'Original audio engineering, custom soundscapes, and professional mixing/mastering.',
    price: 'Up to ₹2,000',
    priceDetail: 'Based on the genre complexity, track length, and orchestration requirements.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200',
    details: 'Elevate your products, films, or interactive media with bespoke auditory masterpieces. We compose original, tailored background music, sonic brand cues, and immersive soundscapes across various genres (cinematic, ambient, electronic, lofi, or corporate). Using professional, high-fidelity synthesizer modules, acoustic instrumentation, and pristine audio mixing processes, we deliver master tracks that deeply resonate with your listeners.',
    benefits: [
      'Tailored audio compositions designed specifically to match your visual pacing',
      '100% royalty-free commercial licenses—no licensing subscription fees',
      'Pristine, master-level engineering and dynamic range balance for premium speakers',
      'Perfect looping soundscapes for applications, meditation sessions, or event backdrops',
      'Unique sonic branding cues that give your company a distinct auditory identity'
    ],
    specs: [
      'Lossless master tracks (24-bit 48kHz WAV & FLAC formats)',
      'Compressed web-ready delivery (320kbps MP3 formats)',
      'Fully arranged individual instrument stems upon custom request',
      'Pre-faded loops and standard social media short-cut audio cuts',
      'Complete digital metadata encoding for streaming and catalogs'
    ],
    process: [
      { step: '01', title: 'Sonic Discovery', text: 'We analyze your visual media, define the emotional arc, and decide on appropriate instrumentation and BPM.' },
      { step: '02', title: 'Composing & Arranging', text: 'We construct the melody lines, layer synthesized or live elements, and structure the rhythmic progression.' },
      { step: '03', title: 'Mixing & Space', text: 'We balance the frequency spectrum, apply high-end spatial reverbs, and optimize instrument separation.' },
      { step: '04', title: 'Mastering Stage', text: 'We optimize the audio output levels for industry-standard streaming and hardware playback, delivering full audio dynamics.' }
    ]
  },
  {
    id: 'editing',
    title: 'Video & Photo Editing',
    desc: 'Cinematic visual treatments, color grading, and professional post-production editing.',
    price: 'Up to ₹2,000',
    priceDetail: 'Based on the design, raw footage length, and advanced animation/retouching requirements.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1200',
    details: 'Transform raw visual assets into compelling, cinematic stories that capture and hold absolute user attention. We provide meticulous photo retouching, background compositing, high-fidelity color grading, multi-camera video sequence assembly, and dynamic title motion graphics. Whether you need corporate promotional films, luxury product photography retouching, or high-end social media assets, our editors shape raw visual data into polished artistic work.',
    benefits: [
      'Cinematic color correction and stylized grading designed to evoke specific emotions',
      'Seamless cuts, smooth transitions, and precise sound effect synchronization',
      'Advanced motion graphics and elegant typography overlays for clear messaging',
      'Pristine skin retouching, object removal, and perfect lighting adjustments',
      'Optimized formats ready for 4K display, YouTube, or vertical social media reels'
    ],
    specs: [
      'High-bitrate ProRes/H.264 video exports up to 4K Ultra-HD',
      'Color-matched image files in lossless JPEG/PNG and raw WebP format',
      'Bespoke motion graphic templates custom-branded with your color system',
      'Soundtrack mixing and integrated audio ducking for clear vocal narration',
      'Subtitles, closed captions formatting (SRT files) for video accessibility'
    ],
    process: [
      { step: '01', title: 'Storyboard Review', text: 'We review your raw media, organize the narrative timeline, and establish the visual pacing.' },
      { step: '02', title: 'Rough Cut Assembly', text: 'We edit raw sequences into a coherent storyline, matching the audio rhythm and core message.' },
      { step: '03', title: 'Color & Sound Polish', text: 'We apply custom LUTs, balance sound levels, add ambient audio, and insert motion typography.' },
      { step: '04', title: 'Final Ultra-HD Render', text: 'We export the finished product optimized for your target delivery platforms and media screens.' }
    ]
  }
];
