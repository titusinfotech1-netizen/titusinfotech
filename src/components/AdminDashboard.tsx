import React, { useState, useEffect } from 'react';
import { 
  BarChart3, MessageSquare, Briefcase, FileText, Settings, Kanban, Plus, Trash2, 
  Check, CheckSquare, Eye, Mail, Phone, Calendar, AlertCircle, Save, IndianRupee,
  TrendingUp, Users, Award, ShieldAlert, CheckCircle2, ChevronRight
} from 'lucide-react';
import { Project, BlogPost, Lead, Task } from '../types';

interface AdminDashboardProps {
  portfolioItems: Project[];
  setPortfolioItems: React.Dispatch<React.SetStateAction<Project[]>>;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  agencySettings: any;
  setAgencySettings: (settings: any) => void;
}

export default function AdminDashboard({
  portfolioItems,
  setPortfolioItems,
  blogPosts,
  setBlogPosts,
  leads,
  setLeads,
  agencySettings,
  setAgencySettings
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'messages' | 'portfolio' | 'blog' | 'kanban' | 'settings'>('analytics');
  const [tasks, setTasks] = useState<Task[]>([
    { id: "task-1", title: "Bespoke Design Wireframe", project: "Luxe Atelier", status: "todo", priority: "high" },
    { id: "task-2", title: "Stripe Payment Gateway Integration", project: "Maison Couture", status: "development", priority: "medium" },
    { id: "task-3", title: "Visual Dashboard Performance Sweep", project: "Veloce Dashboard", status: "review", priority: "high" },
    { id: "task-4", title: "Setup WebSockets real-time sync", project: "Titus Portal", status: "design", priority: "low" },
    { id: "task-5", title: "Launch and CDN propagation", project: "Aetheria Lounge", status: "done", priority: "high" }
  ]);

  // Lead manager state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // New item creation state
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "", category: "Business", description: "", technologies: [], image: ""
  });
  const [techInput, setTechInput] = useState("");

  const [showAddBlog, setShowAddBlog] = useState(false);
  const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({
    title: "", category: "Design", summary: "", content: "", readTime: "5 min read", image: ""
  });

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskProject, setNewTaskProject] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');

  // Load and sync lead records from server-side database
  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error("Failed to fetch leads", err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const toggleLeadStatus = async (id: string, currentStatus: 'read' | 'unread') => {
    const nextStatus = currentStatus === 'unread' ? 'read' : 'unread';
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        fetchLeads();
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(prev => prev ? { ...prev, status: nextStatus } : null);
        }
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const deleteLead = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lead inquiry?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchLeads();
        setSelectedLead(null);
      }
    } catch (err) {
      console.error("Failed to delete lead", err);
    }
  };

  // Add Portfolio item
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;

    const added: Project = {
      id: `proj-${Date.now()}`,
      title: newProject.title,
      category: newProject.category || "Business",
      description: newProject.description,
      technologies: techInput ? techInput.split(',').map(t => t.trim()) : ["React", "Tailwind CSS"],
      image: newProject.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      demoUrl: "#",
      caseStudy: {
        challenge: "A bespoke custom digital solution designed to modern requirements.",
        solution: "High-performance interface styled with custom frameworks and optimized layouts.",
        result: "Flawless launch with instantaneous speed ratings and elevated brand awareness."
      }
    };

    setPortfolioItems(prev => [added, ...prev]);
    setNewProject({ title: "", category: "Business", description: "", technologies: [], image: "" });
    setTechInput("");
    setShowAddProject(false);
  };

  const deleteProject = (id: string) => {
    if (!window.confirm("Remove this project from the portfolio?")) return;
    setPortfolioItems(prev => prev.filter(p => p.id !== id));
  };

  // Add Blog item
  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content) return;

    const added: BlogPost = {
      id: `blog-${Date.now()}`,
      title: newBlog.title,
      category: newBlog.category || "Design",
      summary: newBlog.summary || "Bespoke digital strategy insight.",
      content: newBlog.content,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: newBlog.readTime || "5 min read",
      image: newBlog.image || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
      author: {
        name: "Kayden Frost",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        role: "Principal Developer"
      }
    };

    setBlogPosts(prev => [added, ...prev]);
    setNewBlog({ title: "", category: "Design", summary: "", content: "", readTime: "5 min read", image: "" });
    setShowAddBlog(false);
  };

  const deleteBlog = (id: string) => {
    if (!window.confirm("Remove this blog article?")) return;
    setBlogPosts(prev => prev.filter(b => b.id !== id));
  };

  // Kanban tasks methods
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const added: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      project: newTaskProject || "General",
      status: "todo",
      priority: newTaskPriority
    };

    setTasks(prev => [...prev, added]);
    setNewTaskTitle("");
    setNewTaskProject("");
    setNewTaskPriority("medium");
  };

  const moveTask = (id: string, status: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Calculate Pipeline budget volume
  const getPipelineValue = () => {
    return leads.reduce((acc, l) => {
      if (l.budget.includes("20,00,000")) return acc + 1600000;
      if (l.budget.includes("12,00,000")) return acc + 1000000;
      if (l.budget.includes("8,00,000")) return acc + 600000;
      return acc + 300000;
    }, 0);
  };

  return (
    <div className="bg-white  rounded-2xl border border-solid border-gray-100  overflow-hidden shadow-2xl font-playfair text-[#B89B5E] dark:text-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[600px]">
        {/* Side Panel Controls */}
        <div className="bg-gray-50  p-6 border-r border-solid border-gray-100  lg:col-span-1 flex flex-col gap-8 justify-between">
          <div className="space-y-6">
            <div className="space-y-1">
              <h4 className="font-playfair font-bold text-sm tracking-wide text-[#B89B5E] uppercase">Titus Portal</h4>
              <p className="text-[10px] text-black font-medium tracking-wider">SECURE CLIENT & AGENCY SHELL</p>
            </div>

            <nav className="flex flex-col gap-1.5" aria-label="Dashboard navigation">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                  activeTab === 'analytics'
                    ? 'bg-white  text-black dark:text-[#D4AF37] shadow-md'
                    : 'text-black dark:text-black hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#D4AF37] dark:hover:text-black'
                }`}
              >
                <BarChart3 className="w-4 h-4" /> Analytics Console
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                  activeTab === 'messages'
                    ? 'bg-white  text-black dark:text-[#D4AF37] shadow-md'
                    : 'text-black dark:text-black hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#D4AF37] dark:hover:text-black'
                }`}
              >
                <MessageSquare className="w-4 h-4" /> Lead Inquiries
                {leads.filter(l => l.status === 'unread').length > 0 && (
                  <span className="ml-auto w-4 h-4 bg-[#D4AF37] text-[#D4AF37] text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {leads.filter(l => l.status === 'unread').length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                  activeTab === 'portfolio'
                    ? 'bg-white  text-black dark:text-[#D4AF37] shadow-md'
                    : 'text-black dark:text-black hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#D4AF37] dark:hover:text-black'
                }`}
              >
                <Briefcase className="w-4 h-4" /> Portfolios
              </button>
              <button
                onClick={() => setActiveTab('blog')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                  activeTab === 'blog'
                    ? 'bg-white  text-black dark:text-[#D4AF37] shadow-md'
                    : 'text-black dark:text-black hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#D4AF37] dark:hover:text-black'
                }`}
              >
                <FileText className="w-4 h-4" /> Blog Publisher
              </button>
              <button
                onClick={() => setActiveTab('kanban')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                  activeTab === 'kanban'
                    ? 'bg-white  text-black dark:text-[#D4AF37] shadow-md'
                    : 'text-black dark:text-black hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#D4AF37] dark:hover:text-black'
                }`}
              >
                <Kanban className="w-4 h-4" /> Kanban Board
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-white  text-black dark:text-[#D4AF37] shadow-md'
                    : 'text-black dark:text-black hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#D4AF37] dark:hover:text-black'
                }`}
              >
                <Settings className="w-4 h-4" /> Settings Panel
              </button>
            </nav>
          </div>

          <div className="bg-white p-4 rounded-xl border border-solid border-[#D4AF37]/20">
            <p className="text-[10px] text-[#D4AF37] font-semibold tracking-wider font-playfair">LIVE SHELL OK</p>
            <p className="text-[9px] text-black mt-1">Version: 2026.1-LT</p>
            <p className="text-[9px] text-black">Node: v22.14.0</p>
          </div>
        </div>

        {/* Tab content area */}
        <div className="p-8 lg:col-span-4 bg-white ">
          {/* Analytics Console Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-playfair font-semibold text-lg text-[#B89B5E]">Business Intelligence</h2>
                  <p className="text-xs text-black">Dynamic system diagnostic metrics</p>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37] px-3 py-1 bg-[#D4AF37]/10 border border-solid border-[#D4AF37]/25 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> All servers operational
                </span>
              </div>

              {/* Stat Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-solid border-gray-100  shadow-sm">
                  <div className="flex justify-between items-center text-black mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Total Inquiries</span>
                    <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-[#B89B5E]">{leads.length}</h3>
                  <p className="text-[10px] text-green-500 mt-1 flex items-center gap-1 font-medium">
                    <TrendingUp className="w-3 h-3" /> +14.2% from last week
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-solid border-gray-100  shadow-sm">
                  <div className="flex justify-between items-center text-black mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Est. Pipeline Value</span>
                    <IndianRupee className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-[#B89B5E]">
                    ₹{getPipelineValue().toLocaleString()}
                  </h3>
                  <p className="text-[10px] text-green-500 mt-1 flex items-center gap-1 font-medium">
                    <TrendingUp className="w-3 h-3" /> Qualified active deals
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-solid border-gray-100  shadow-sm">
                  <div className="flex justify-between items-center text-black mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Pipeline Tasks</span>
                    <Kanban className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-[#B89B5E]">
                    {tasks.filter(t => t.status !== 'done').length}
                  </h3>
                  <p className="text-[10px] text-black mt-1 font-medium">
                    {tasks.filter(t => t.status === 'done').length} completed launch phases
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-solid border-gray-100  shadow-sm">
                  <div className="flex justify-between items-center text-black mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Web Speed Avg</span>
                    <Award className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-[#B89B5E]">98.4</h3>
                  <p className="text-[10px] text-green-500 mt-1 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" /> PageSpeed verified
                  </p>
                </div>
              </div>

              {/* Graphic representations (Executive minimal D3 style) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-solid border-gray-100  lg:col-span-2">
                  <h4 className="font-playfair font-semibold text-xs text-[#B89B5E] uppercase tracking-wider mb-6">Traffic Conversion Analytics</h4>
                  {/* Custom Minimal CSS Bar/Spark graphs */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-[11px] text-black mb-1">
                        <span>Desktop Organic Searches (Cream white themed)</span>
                        <span className="font-bold text-[#D4AF37]">4,821 visits (62%)</span>
                      </div>
                      <div className="w-full bg-gray-200  h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#D4AF37] h-full" style={{ width: '62%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-black mb-1">
                        <span>Social Referrals & LinkedIn Strategy</span>
                        <span className="font-bold text-[#D4AF37]">2,110 visits (28%)</span>
                      </div>
                      <div className="w-full bg-gray-200  h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#B89B5E] h-full" style={{ width: '28%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-black mb-1">
                        <span>Direct Word of Mouth (High end VC partners)</span>
                        <span className="font-bold text-[#D4AF37]">942 visits (10%)</span>
                      </div>
                      <div className="w-full bg-gray-200  h-1.5 rounded-full overflow-hidden">
                        <div className="bg-white  h-full" style={{ width: '10%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-solid border-gray-100  flex flex-col justify-between">
                  <div>
                    <h4 className="font-playfair font-semibold text-xs text-[#B89B5E] uppercase tracking-wider mb-3">Conversion Funnel</h4>
                    <p className="text-[10px] text-black mb-4">Percentage of total visits that convert to premium quotes.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white border border-solid border-white/5 flex items-center justify-center text-[10px] text-black font-bold font-playfair">
                        1
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold">Total Visits</p>
                        <p className="text-[10px] text-black">7,873 visits (100%)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#B89B5E] flex items-center justify-center text-[10px] text-[#D4AF37] font-bold font-playfair">
                        2
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold">Quote Inquiries</p>
                        <p className="text-[10px] text-black">268 quotes initiated (3.42%)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-[10px] text-[#D4AF37] font-bold font-playfair">
                        3
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold">Closed Deals</p>
                        <p className="text-[10px] text-black">21 contracts signed (7.8% of quote intent)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-playfair font-semibold text-lg text-[#B89B5E]">Lead Inquiries</h2>
                  <p className="text-xs text-black">Clients requesting web development quotes</p>
                </div>
                <button
                  onClick={fetchLeads}
                  className="text-[11px] bg-gray-50 hover:bg-gray-100  dark:hover:bg-white/5 border border-solid border-gray-100  px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer"
                >
                  Refresh Database
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Leads lists */}
                <div className="lg:col-span-1 space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {leads.length === 0 ? (
                    <div className="text-center py-12 text-black border border-solid border-dashed border-gray-100 rounded-2xl">
                      <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-xs">No active submissions received.</p>
                    </div>
                  ) : (
                    leads.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => setSelectedLead(l)}
                        className={`w-full text-left p-4 rounded-xl border border-solid transition-all duration-150 cursor-pointer flex flex-col gap-1.5 ${
                          selectedLead?.id === l.id
                            ? 'bg-white text-black border-[#1A1A1A] shadow-md  '
                            : l.status === 'unread'
                            ? 'bg-amber-50/40  border-[#D4AF37]/30 text-[#D4AF37]'
                            : 'bg-white  hover:bg-gray-50 dark:hover:bg-white/5 border-gray-100  text-gray-600 dark:text-black'
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="font-playfair font-bold text-xs truncate max-w-[120px]">{l.name}</span>
                          <span className="text-[8px] text-black">
                            {new Date(l.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-[10px] font-semibold truncate w-full">{l.company}</p>
                        <p className={`text-[9px] px-2 py-0.5 rounded-full w-max uppercase font-bold tracking-wider ${
                          selectedLead?.id === l.id 
                            ? 'bg-white/15 text-[#D4AF37]' 
                            : 'bg-gray-100  text-black dark:text-black'
                        }`}>
                          {l.budget}
                        </p>
                      </button>
                    ))
                  )}
                </div>

                {/* Lead viewer details */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-solid border-gray-100  min-h-[300px] flex flex-col justify-between">
                  {selectedLead ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-playfair font-semibold text-md text-[#B89B5E]">{selectedLead.name}</h3>
                          <p className="text-[11px] text-black font-semibold uppercase mt-0.5 tracking-wider">{selectedLead.company}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleLeadStatus(selectedLead.id, selectedLead.status)}
                            className={`p-2 rounded-xl border border-solid text-xs flex items-center justify-center cursor-pointer transition-all ${
                              selectedLead.status === 'unread'
                                ? 'bg-amber-100 border-amber-200 hover:bg-amber-200 text-amber-800'
                                : 'bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-800   dark:text-gray-300'
                            }`}
                            title="Toggle Read / Unread"
                          >
                            <CheckSquare className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteLead(selectedLead.id)}
                            className="p-2 bg-red-50 hover:bg-red-100 border border-solid border-red-200 text-red-700 rounded-xl cursor-pointer transition-all flex items-center justify-center"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-solid border-gray-200/50  py-4 text-xs space-y-2 sm:space-y-0">
                        <div className="space-y-1.5">
                          <p className="flex items-center gap-2 text-black">
                            <Mail className="w-3.5 h-3.5" /> Email Address
                          </p>
                          <a href={`mailto:${selectedLead.email}`} className="font-semibold text-[#D4AF37] hover:underline truncate block">
                            {selectedLead.email}
                          </a>
                        </div>
                        <div className="space-y-1.5 col-span-1">
                          <p className="flex items-center gap-2 text-black">
                            <Phone className="w-3.5 h-3.5" /> Contact Phone
                          </p>
                          <a href={`tel:${selectedLead.phone}`} className="font-semibold text-[#D4AF37] hover:underline block">
                            {selectedLead.phone}
                          </a>
                        </div>
                        <div className="space-y-1.5 col-span-1 pt-2 sm:pt-0">
                          <p className="flex items-center gap-2 text-black">
                            <IndianRupee className="w-3.5 h-3.5" /> Declared Budget
                          </p>
                          <p className="font-bold text-[#D4AF37] text-[13px]">{selectedLead.budget}</p>
                        </div>
                        <div className="space-y-1.5 col-span-1 pt-2 sm:pt-0">
                          <p className="flex items-center gap-2 text-black">
                            <Calendar className="w-3.5 h-3.5" /> Received On
                          </p>
                          <p className="font-semibold text-[#D4AF37]">
                            {new Date(selectedLead.date).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-black">Message Description</h4>
                        <div className="bg-white  p-4 rounded-xl border border-solid border-gray-100  text-xs text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {selectedLead.message}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col justify-center items-center text-center py-12 text-black">
                      <Eye className="w-10 h-10 text-gray-300 mb-3" />
                      <p className="text-xs">Select a lead message from the side list to view full quote criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Portfolio Management Tab */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-playfair font-semibold text-lg text-[#B89B5E]">Portfolio Showcase</h2>
                  <p className="text-xs text-black">Manage interactive agency cases displayed live</p>
                </div>
                <button
                  onClick={() => setShowAddProject(!showAddProject)}
                  className="bg-[#D4AF37] hover:bg-[#B89B5E] text-[#D4AF37] text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Publish New Project
                </button>
              </div>

              {/* Add form */}
              {showAddProject && (
                <form onSubmit={handleAddProject} className="bg-white p-6 rounded-2xl border border-solid border-gray-100  space-y-4 text-xs">
                  <h3 className="font-playfair font-bold text-xs text-[#B89B5E] uppercase tracking-wider">Publish Bespoke Project Card</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="project-title" className="font-semibold text-black">Project Name</label>
                      <input
                        id="project-title"
                        type="text"
                        required
                        value={newProject.title}
                        onChange={e => setNewProject(p => ({ ...p, title: e.target.value }))}
                        className="w-full p-2.5 rounded-xl bg-white  border border-solid border-gray-100  focus:outline-none focus:border-[#D4AF37]"
                        placeholder="e.g. Solaria Estates"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="project-category" className="font-semibold text-black">Category</label>
                      <select
                        id="project-category"
                        value={newProject.category}
                        onChange={e => setNewProject(p => ({ ...p, category: e.target.value }))}
                        className="w-full p-2.5 rounded-xl bg-white  border border-solid border-gray-100  focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Business">Business</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Dashboard">Dashboard</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Landing Pages">Landing Pages</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="project-desc" className="font-semibold text-black">Short Summary</label>
                    <textarea
                      id="project-desc"
                      required
                      value={newProject.description}
                      onChange={e => setNewProject(p => ({ ...p, description: e.target.value }))}
                      rows={2}
                      className="w-full p-2.5 rounded-xl bg-white  border border-solid border-gray-100  focus:outline-none focus:border-[#D4AF37]"
                      placeholder="High-level description of what we built..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="project-tech" className="font-semibold text-black">Technologies (comma separated)</label>
                      <input
                        id="project-tech"
                        type="text"
                        value={techInput}
                        onChange={e => setTechInput(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white  border border-solid border-gray-100  focus:outline-none focus:border-[#D4AF37]"
                        placeholder="e.g. Next.js, Stripe, Tailwind CSS"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="project-image" className="font-semibold text-black">Unsplash Mock Image URL</label>
                      <input
                        id="project-image"
                        type="text"
                        value={newProject.image}
                        onChange={e => setNewProject(p => ({ ...p, image: e.target.value }))}
                        className="w-full p-2.5 rounded-xl bg-white  border border-solid border-gray-100  focus:outline-none focus:border-[#D4AF37]"
                        placeholder="Leave blank for generic digital mockup image"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white hover:bg-[#D4AF37] text-black hover:text-[#D4AF37] py-2.5 rounded-xl font-bold transition-all cursor-pointer"
                  >
                    Publish Project Live
                  </button>
                </form>
              )}

              {/* Projects List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolioItems.map((p) => (
                  <div key={p.id} className="bg-white border border-solid border-gray-100  p-4 rounded-xl flex items-center gap-4 justify-between">
                    <div className="flex items-center gap-3 truncate">
                      <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0 border border-solid border-gray-200/20" />
                      <div className="truncate">
                        <h4 className="font-playfair font-semibold text-xs text-[#B89B5E] truncate">{p.title}</h4>
                        <p className="text-[10px] text-black mt-0.5">{p.category}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteProject(p.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg cursor-pointer shrink-0 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Publishing Tab */}
          {activeTab === 'blog' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-playfair font-semibold text-lg text-[#B89B5E]">Blog Publisher</h2>
                  <p className="text-xs text-black">Manage research blogs and tech tutorials</p>
                </div>
                <button
                  onClick={() => setShowAddBlog(!showAddBlog)}
                  className="bg-[#D4AF37] hover:bg-[#B89B5E] text-[#D4AF37] text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Publish New Post
                </button>
              </div>

              {/* Add Blog Form */}
              {showAddBlog && (
                <form onSubmit={handleAddBlog} className="bg-white p-6 rounded-2xl border border-solid border-gray-100  space-y-4 text-xs">
                  <h3 className="font-playfair font-bold text-xs text-[#B89B5E] uppercase tracking-wider">Publish Editorial Blog</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="blog-title" className="font-semibold text-black">Post Title</label>
                      <input
                        id="blog-title"
                        type="text"
                        required
                        value={newBlog.title}
                        onChange={e => setNewBlog(b => ({ ...b, title: e.target.value }))}
                        className="w-full p-2.5 rounded-xl bg-white  border border-solid border-gray-100  focus:outline-none focus:border-[#D4AF37]"
                        placeholder="e.g. Creative Layouts for 2026"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="blog-category" className="font-semibold text-black">Category</label>
                      <select
                        id="blog-category"
                        value={newBlog.category}
                        onChange={e => setNewBlog(b => ({ ...b, category: e.target.value }))}
                        className="w-full p-2.5 rounded-xl bg-white  border border-solid border-gray-100  focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Design">Design</option>
                        <option value="Technology">Technology</option>
                        <option value="Business">Business</option>
                        <option value="Case Study">Case Study</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="blog-summary" className="font-semibold text-black">Short Card Snippet Summary</label>
                    <input
                      id="blog-summary"
                      type="text"
                      required
                      value={newBlog.summary}
                      onChange={e => setNewBlog(b => ({ ...b, summary: e.target.value }))}
                      className="w-full p-2.5 rounded-xl bg-white  border border-solid border-gray-100  focus:outline-none focus:border-[#D4AF37]"
                      placeholder="Brief excerpt shown on cards..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="blog-content" className="font-semibold text-black">Full Editorial Article Content</label>
                    <textarea
                      id="blog-content"
                      required
                      value={newBlog.content}
                      onChange={e => setNewBlog(b => ({ ...b, content: e.target.value }))}
                      rows={6}
                      className="w-full p-2.5 rounded-xl bg-white  border border-solid border-gray-100  focus:outline-none focus:border-[#D4AF37]"
                      placeholder="Write your beautiful content here. Feel free to use double stars ** for gold bold highlights."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="blog-read" className="font-semibold text-black">Estimated Read Time</label>
                      <input
                        id="blog-read"
                        type="text"
                        value={newBlog.readTime}
                        onChange={e => setNewBlog(b => ({ ...b, readTime: e.target.value }))}
                        className="w-full p-2.5 rounded-xl bg-white  border border-solid border-gray-100  focus:outline-none focus:border-[#D4AF37]"
                        placeholder="e.g. 5 min read"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="blog-image" className="font-semibold text-black">Featured Image URL</label>
                      <input
                        id="blog-image"
                        type="text"
                        value={newBlog.image}
                        onChange={e => setNewBlog(b => ({ ...b, image: e.target.value }))}
                        className="w-full p-2.5 rounded-xl bg-white  border border-solid border-gray-100  focus:outline-none focus:border-[#D4AF37]"
                        placeholder="Unsplash URL or leave blank"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white hover:bg-[#D4AF37] text-black hover:text-[#D4AF37] py-2.5 rounded-xl font-bold transition-all cursor-pointer"
                  >
                    Publish Blog Article Live
                  </button>
                </form>
              )}

              {/* Blogs list */}
              <div className="space-y-2">
                {blogPosts.map((b) => (
                  <div key={b.id} className="bg-white border border-solid border-gray-100  p-4 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 truncate">
                      <img src={b.image} alt="" className="w-14 h-10 rounded-lg object-cover shrink-0 border border-solid border-gray-200/20" />
                      <div className="truncate">
                        <h4 className="font-playfair font-semibold text-xs text-[#B89B5E] truncate">{b.title}</h4>
                        <p className="text-[10px] text-black mt-0.5">{b.date} • {b.category}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteBlog(b.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg cursor-pointer shrink-0 transition-colors"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Kanban Board Tab */}
          {activeTab === 'kanban' && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h2 className="font-playfair font-semibold text-lg text-[#B89B5E]">Agile Project Pipeline</h2>
                <p className="text-xs text-black">Interactive Kanban scheduler for active client code scopes</p>
              </div>

              {/* Quick Add Task */}
              <form onSubmit={addTask} className="bg-white p-4 rounded-xl border border-solid border-gray-100  grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs items-end">
                <div className="space-y-1">
                  <label htmlFor="kanban-title" className="font-semibold text-black">Task Title</label>
                  <input
                    id="kanban-title"
                    type="text"
                    required
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    className="w-full p-2 rounded-lg bg-white  border border-solid border-gray-100  focus:outline-none"
                    placeholder="e.g. Dynamic SEO tuning"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="kanban-project" className="font-semibold text-black">Client / Project</label>
                  <input
                    id="kanban-project"
                    type="text"
                    value={newTaskProject}
                    onChange={e => setNewTaskProject(e.target.value)}
                    className="w-full p-2 rounded-lg bg-white  border border-solid border-gray-100  focus:outline-none"
                    placeholder="e.g. Maison de la Couture"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="kanban-priority" className="font-semibold text-black">Priority</label>
                  <select
                    id="kanban-priority"
                    value={newTaskPriority}
                    onChange={e => setNewTaskPriority(e.target.value as any)}
                    className="w-full p-2 rounded-lg bg-white  border border-solid border-gray-100  focus:outline-none"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#B89B5E] text-[#D4AF37] py-2 rounded-lg font-bold cursor-pointer transition-all active:scale-95 text-center flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Task
                </button>
              </form>

              {/* Grid columns */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 max-h-[500px] overflow-y-auto pr-1">
                {(['todo', 'design', 'development', 'review', 'done'] as Task['status'][]).map((col) => (
                  <div key={col} className="bg-gray-50  p-3 rounded-xl border border-solid border-gray-100  flex flex-col gap-3 min-h-[300px]">
                    <div className="flex justify-between items-center px-1">
                      <h4 className="font-playfair font-bold text-[10px] text-black uppercase tracking-wider">{col}</h4>
                      <span className="text-[9px] bg-gray-200  text-gray-600 dark:text-gray-300 font-bold px-1.5 py-0.5 rounded-full">
                        {tasks.filter(t => t.status === col).length}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col gap-2.5">
                      {tasks.filter(t => t.status === col).map((t) => (
                        <div key={t.id} className="bg-white p-3 rounded-lg border border-solid border-gray-100  shadow-sm space-y-2 text-[11px]">
                          <div className="flex justify-between items-start gap-2">
                            <p className="font-bold text-[#B89B5E] dark:text-gray-100 leading-tight">{t.title}</p>
                            <button
                              onClick={() => deleteTask(t.id)}
                              className="text-black hover:text-red-500 shrink-0 cursor-pointer"
                              title="Delete task"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <p className="text-[9px] text-black font-medium">Project: <span className="font-bold text-[#D4AF37]">{t.project}</span></p>

                          <div className="flex items-center justify-between pt-1">
                            <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                              t.priority === 'high' ? 'bg-red-50 text-red-700 ' :
                              t.priority === 'medium' ? 'bg-amber-50 text-amber-700 ' :
                              'bg-green-50 text-green-700 '
                            }`}>
                              {t.priority}
                            </span>

                            {/* Chevron Switcher */}
                            <div className="flex gap-0.5">
                              {col !== 'todo' && (
                                <button
                                  onClick={() => {
                                    const states: Task['status'][] = ['todo', 'design', 'development', 'review', 'done'];
                                    const prevIdx = states.indexOf(col) - 1;
                                    moveTask(t.id, states[prevIdx]);
                                  }}
                                  className="p-0.5 bg-gray-100  rounded hover:bg-gray-200 dark:hover:bg-white/15 cursor-pointer text-black"
                                  title="Move Left"
                                >
                                  &lsaquo;
                                </button>
                              )}
                              {col !== 'done' && (
                                <button
                                  onClick={() => {
                                    const states: Task['status'][] = ['todo', 'design', 'development', 'review', 'done'];
                                    const nextIdx = states.indexOf(col) + 1;
                                    moveTask(t.id, states[nextIdx]);
                                  }}
                                  className="p-0.5 bg-gray-100  rounded hover:bg-gray-200 dark:hover:bg-white/15 cursor-pointer text-black"
                                  title="Move Right"
                                >
                                  &rsaquo;
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h2 className="font-playfair font-semibold text-lg text-[#B89B5E]">Agency Core Configuration</h2>
                <p className="text-xs text-black">Modify live global details and contact numbers</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-solid border-gray-100  space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="settings-email" className="font-semibold text-black">Primary Agency Email</label>
                    <input
                      id="settings-email"
                      type="email"
                      value={agencySettings.email}
                      onChange={e => setAgencySettings({ ...agencySettings, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white  border border-solid border-gray-100  focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="settings-phone" className="font-semibold text-black">Consultant Phone Line</label>
                    <input
                      id="settings-phone"
                      type="text"
                      value={agencySettings.phone}
                      onChange={e => setAgencySettings({ ...agencySettings, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white  border border-solid border-gray-100  focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="settings-whatsapp" className="font-semibold text-black">WhatsApp Hot Link Phone Number (International Format)</label>
                    <input
                      id="settings-whatsapp"
                      type="text"
                      value={agencySettings.whatsapp}
                      onChange={e => setAgencySettings({ ...agencySettings, whatsapp: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white  border border-solid border-gray-100  focus:outline-none"
                      placeholder="e.g. +919000000000"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="settings-address" className="font-semibold text-black">Office Showroom Headquarters</label>
                    <input
                      id="settings-address"
                      type="text"
                      value={agencySettings.address}
                      onChange={e => setAgencySettings({ ...agencySettings, address: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white  border border-solid border-gray-100  focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 bg-amber-50/50  p-4 rounded-xl border border-solid border-[#D4AF37]/20">
                  <ShieldAlert className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <p className="text-[10px] text-gray-600 dark:text-gray-300 leading-normal">
                    <strong>Notice:</strong> Modifying details will instantly update all live references including footer information, WhatsApp float links, and contact card visual coordinates across all users.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => alert("Global administrative settings updated successfully.")}
                  className="w-full bg-white hover:bg-[#D4AF37] text-black hover:text-[#D4AF37] py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Global Configuration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
