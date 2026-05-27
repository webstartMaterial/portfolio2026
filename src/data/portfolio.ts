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
    primary:   'Voir les projets',
    secondary: 'Initier une connexion',
  },
  meta: {
    STATUS:   'AVAILABLE',
    ROLE:     'FWDAI-ENG',
    LOCATION: 'REMOTE · FR',
  },
}

export const IDENTITY = {
  headline: 'Un profil convergent. Quatre dimensions.',
  intro:
    'Je ne suis pas simplement développeur, formateur ou créateur — je suis les trois, simultanément. Chaque dimension alimente les autres.',
  dimensions: [
    {
      id:      'fwdai',
      label:   'Forward Deployed AI Engineer',
      status:  'AUTOMATED',
      tagline: 'I design, build and deploy custom AI solutions.',
      desc:    'Je conçois et déploie des agents IA, des pipelines LLM et des systèmes intelligents sur mesure — pour des entreprises, startups et créateurs qui veulent intégrer l\'IA en production.',
      stack:   ['Claude API', 'OpenAI', 'Python', 'LangChain', 'RAG', 'Next.js', 'n8n', 'Prompt Engineering'],
      builds:  ['Agents IA autonomes', 'Chatbots métier', 'Pipelines RAG', 'Intégrations LLM', 'Outils de formation IA'],
    },
    {
      id:      'dev',
      label:   'Full Stack Developer',
      status:  'DEPLOYED',
      tagline: 'Du backend au frontend, de l\'architecture au déploiement.',
      desc:    'Je conçois et livre des applications web complètes, performantes et scalables — des plateformes SaaS aux outils métier sur mesure.',
      stack:   ['React', 'Next.js', 'Symfony', 'Node.js', 'JavaScript', 'PHP', 'PostgreSQL', 'MySQL'],
      builds:  ['Plateformes SaaS', 'LMS', 'Dashboards', 'Outils métier', 'APIs REST'],
    },
    {
      id:      'instructor',
      label:   'Digital & AI Instructor',
      status:  'ACTIVE',
      tagline: '10 ans de transmission. 5 000+ apprenants formés.',
      desc:    'Je crée et anime des programmes pédagogiques sur le développement web, le digital et l\'IA — pour enfants, adultes et entreprises.',
      metrics: { students: 5000, years: 10 },
      formats: ['Bootcamps', 'Ateliers IA', 'Formations entreprises', 'Programmes sur-mesure'],
    },
    {
      id:      'creator',
      label:   'Content Creator',
      status:  'RUNNING',
      tagline: 'Rendre la tech simple, visuelle et engageante.',
      desc:    'Je transforme des concepts complexes en contenu clair, structuré et impactant — vidéos, formations, storytelling tech.',
      formats: ['Vidéos éducatives', 'Formations en ligne', 'Storytelling tech', 'Vulgarisation IA'],
    },
  ],
}

export const PROJECTS = [
  {
    id:     '001',
    status: 'DEPLOYED',
    title:  'EduPlatform LMS',
    desc:   'Plateforme d\'apprentissage en ligne sur-mesure avec parcours adaptatifs, suivi de progression et outils instructeur.',
    stack:  ['Next.js', 'Symfony', 'PostgreSQL', 'AWS'],
    year:   '2024',
  },
  {
    id:     '002',
    status: 'RUNNING',
    title:  'AI Workshop Platform',
    desc:   'Outil pédagogique interactif pour les ateliers IA — enfants et entreprises. Interface ludique, exercices temps réel.',
    stack:  ['React', 'Node.js', 'OpenAI API'],
    year:   '2024',
  },
  {
    id:     '003',
    status: 'DEPLOYED',
    title:  'SaaS Dashboard Pro',
    desc:   'Dashboard analytique full-stack avec visualisations temps réel, gestion multi-tenant et exports.',
    stack:  ['React', 'PHP', 'MySQL', 'Chart.js'],
    year:   '2023',
  },
  {
    id:     '004',
    status: 'DEPLOYED',
    title:  'DevFlow CLI',
    desc:   'Outil CLI open-source pour automatiser les workflows de développement. Générateurs, scaffolding, déploiement.',
    stack:  ['Node.js', 'TypeScript'],
    year:   '2023',
  },
]
