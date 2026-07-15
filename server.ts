import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());

  // Storage for Contact submissions (leads) so they show up dynamically in the Admin Dashboard!
  const leads: any[] = [
    {
      id: "lead-1",
      name: "Sophia Lorenz",
      email: "sophia@lorenz-atelier.com",
      phone: "+1 (555) 342-9182",
      company: "Lorenz Atelier (Luxury Fashion)",
      budget: "₹12,00,000 - ₹20,00,000",
      message: "We need an ultra-modern e-commerce portfolio for our luxury boutique. Our goal is to launch next season with a focus on immersive WebGL transitions and minimalist typography.",
      status: "unread",
      date: "2026-07-08T14:30:00Z"
    },
    {
      id: "lead-2",
      name: "Marcus Vance",
      email: "vance@elevate-capital.co",
      phone: "+44 20 7946 0192",
      company: "Elevate Capital Group",
      budget: "₹4,00,000 - ₹8,00,000",
      message: "We are seeking a website redesign. Our current site feels dated and doesn't represent our high-end fintech advisory services. Mobile response and high speed are absolute key.",
      status: "read",
      date: "2026-07-07T09:15:00Z"
    }
  ];

  // API endpoint to submit a lead
  app.post('/api/contact', (req, res) => {
    const { name, email, phone, company, budget, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }
    const newLead = {
      id: `lead-${Date.now()}`,
      name,
      email,
      phone: phone || "N/A",
      company: company || "N/A",
      budget: budget || "Not specified",
      message,
      status: "unread",
      date: new Date().toISOString()
    };
    leads.unshift(newLead);
    res.json({ success: true, lead: newLead });
  });

  // API endpoint to get all leads (for the Admin Dashboard)
  app.get('/api/leads', (req, res) => {
    res.json(leads);
  });

  // API endpoint to update lead status
  app.patch('/api/leads/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const lead = leads.find(l => l.id === id);
    if (lead) {
      lead.status = status;
      return res.json({ success: true, lead });
    }
    res.status(404).json({ error: "Lead not found" });
  });

  // API endpoint to delete lead
  app.delete('/api/leads/:id', (req, res) => {
    const { id } = req.params;
    const index = leads.findIndex(l => l.id === id);
    if (index !== -1) {
      leads.splice(index, 1);
      return res.json({ success: true });
    }
    res.status(404).json({ error: "Lead not found" });
  });

  // Gemini AI Chat Assistant Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Return a elegant fallback when API key is not configured yet
        return res.json({
          text: "Greetings from Titus Infotech! I am currently operating in demo mode because my Gemini API credentials are still being linked in the Secrets settings. \n\nHowever, I can tell you that Titus Infotech is a luxury web development freelancing brand founded by KDFreez. We build elite, lightning-fast React/Next.js/Tailwind websites with flawless page speeds (above 95), premium interactive animations, custom client dashboards, and pristine typography. \n\nHow can I guide your digital transformation journey today?"
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstruction = `
You are "Titus", an elite, sophisticated, and highly intelligent digital brand ambassador for "Titus Infotech" (a world-class web development agency founded by KDFreez).

Brand Details:
- Name: Titus Infotech (founded by KDFreez)
- Specialty: Ultra-high-end bespoke custom websites, premium React/Next.js web applications, luxury typography, immersive visual interactions, conversion-optimized redesigns, full SEO strategy, and custom clients portals.
- Our Core Values: Impeccable craftsmanship, 95+ Page Speed optimization, absolute secure architectures, full responsiveness, local persistent clients portals, and tailored user experience (UX) aesthetics.
- Style Theme: Clean cream-white, rich luxury golds, deep charcoal blacks, and minimal structural grids.
- Process: Our elite 7-Step workflow:
  1. Requirement Gathering
  2. Research & Discovery
  3. Bespoke UI/UX Design (Figma & Adobe XD)
  4. Advanced Clean-Code Development (React, Next.js, Node.js, Express)
  5. Impeccable Performance & Quality Testing
  6. Flawless Launch
  7. Lifetime Premium Support & Security Maintenance

Tone Guidelines:
- luxurious, highly professional, polite, elegant, brief, yet descriptive.
- Do not use generic chatbot introductory clutter ("Hope you are having a nice day!"). Get straight to the sophisticated answer.
- Always refer to Titus Infotech as "we" or "our agency".
- Feel free to suggest budget ranges if asked (Simple high-end landing page: ₹2,00,000 - ₹4,00,000, Full business portal/E-commerce: ₹4,00,000 - ₹10,00,000, Large-scale bespoke application: ₹12,00,000+).

Respond elegantly in polished Markdown format.
`;

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const response = await chat.sendMessage({ message });
      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({ error: "The AI assistant encountered a temporary connection issue. Please try again." });
    }
  });

  // Integration of Frontend Server
  if (process.env.NODE_ENV === 'production') {
    // In production, serve the built files
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  } else {
    // In development, hook up Vite dev server as middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const port = 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`[Titus Infotech Full-Stack Server] running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error("Server Startup Failure:", err);
});
