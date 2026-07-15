export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  demoUrl?: string;
  caseStudy?: {
    challenge: string;
    solution: string;
    result: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  message: string;
  status: 'read' | 'unread';
  date: string;
}

export interface Task {
  id: string;
  title: string;
  project: string;
  status: 'todo' | 'design' | 'development' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
}
