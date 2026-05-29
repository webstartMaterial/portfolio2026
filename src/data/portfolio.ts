export const HERO = {
  prompt:  '> samih@portfolio:~$ ./init --profile',
  name: {
    first: 'SAMIH',
    last:  'HABBANI',
  },
  pillars: [
    'Full Stack Developer',
    'Digital & AI Instructor',
    'Content Creator',
  ],
  identity: {
    title:   'Forward Deployed AI Engineer',
    tagline: 'I design, build and deploy custom AI solutions.',
  },
  cta: {
    primary:   'View Projects',
    secondary: 'Initiate a Connection',
  },
  meta: {
    STATUS:   'AVAILABLE',
    ROLE:     'FWDAI-ENG',
    LOCATION: 'REMOTE · FR',
  },
}

export const IDENTITY = {
  headline: 'A convergent profile. Four dimensions.',
  intro:
    "I'm not simply a developer, instructor, or creator — I'm all three, simultaneously. Each dimension feeds the others.",
  dimensions: [
    {
      id:      'fwdai',
      label:   'Forward Deployed AI Engineer',
      status:  'AUTOMATED',
      tagline: 'I design, build and deploy custom AI solutions.',
      desc:    "I design and deploy AI agents, LLM pipelines and custom intelligent systems — for businesses, startups and creators who want to integrate AI into production.",
      stack:   ['Claude API', 'OpenAI', 'Python', 'LangChain', 'RAG', 'Next.js', 'n8n', 'Prompt Engineering'],
      builds:  ['Autonomous AI agents', 'Business chatbots', 'RAG pipelines', 'LLM integrations', 'AI training tools'],
    },
    {
      id:      'dev',
      label:   'Full Stack Developer',
      status:  'DEPLOYED',
      tagline: 'From backend to frontend, from architecture to deployment.',
      desc:    'I design and deliver complete, high-performance, scalable web applications — from SaaS platforms to custom business tools.',
      stack:   ['React', 'Next.js', 'Symfony', 'Node.js', 'JavaScript', 'PHP', 'PostgreSQL', 'MySQL'],
      builds:  ['SaaS platforms', 'LMS', 'Dashboards', 'Business tools', 'REST APIs'],
    },
    {
      id:      'instructor',
      label:   'Digital & AI Instructor',
      status:  'ACTIVE',
      tagline: '10 years of teaching. 5,000+ learners trained.',
      desc:    'I create and run educational programs on web development, digital and AI — for children, adults and businesses.',
      metrics: { students: 5000, years: 10 },
      formats: ['Bootcamps', 'AI workshops', 'Corporate training', 'Custom programs'],
    },
    {
      id:      'creator',
      label:   'Content Creator',
      status:  'RUNNING',
      tagline: 'Making tech simple, visual and engaging.',
      desc:    'I transform complex concepts into clear, structured and impactful content — videos, courses, tech storytelling.',
      formats: ['Educational videos', 'Online courses', 'Tech storytelling', 'AI popularization'],
    },
  ],
}

export const PROJECTS = [
  {
    id:     '001',
    status: 'DEPLOYED',
    title:  'EduPlatform LMS',
    desc:   'Custom online learning platform with adaptive pathways, progress tracking and instructor tools.',
    stack:  ['Next.js', 'Symfony', 'PostgreSQL', 'AWS'],
    year:   '2024',
  },
  {
    id:     '002',
    status: 'RUNNING',
    title:  'AI Workshop Platform',
    desc:   'Interactive learning tool for AI workshops — children and businesses. Playful interface, real-time exercises.',
    stack:  ['React', 'Node.js', 'OpenAI API'],
    year:   '2024',
  },
  {
    id:     '003',
    status: 'DEPLOYED',
    title:  'SaaS Dashboard Pro',
    desc:   'Full-stack analytics dashboard with real-time visualizations, multi-tenant management and exports.',
    stack:  ['React', 'PHP', 'MySQL', 'Chart.js'],
    year:   '2023',
  },
  {
    id:     '004',
    status: 'DEPLOYED',
    title:  'DevFlow CLI',
    desc:   'Open-source CLI tool to automate development workflows. Generators, scaffolding, deployment.',
    stack:  ['Node.js', 'TypeScript'],
    year:   '2023',
  },
]
