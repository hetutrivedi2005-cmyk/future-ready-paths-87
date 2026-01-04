export interface Module {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration: string;
  resources: string[];
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  completed?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  tools: string[];
  estimatedTime: string;
  submissionType: 'file' | 'link' | 'text';
  completed?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  students: string;
  rating: number;
  category: string;
  image: string;
  featured?: boolean;
  skills: string[];
  careerRelevance: string;
  modules: Module[];
  project: Project;
  certificateId?: string;
}

export const courses: Course[] = [
  {
    id: "frontend-development",
    title: "Frontend Development",
    description: "Master HTML, CSS, JavaScript, and React to build modern, responsive web applications.",
    longDescription: "This comprehensive frontend development course takes you from the basics of HTML and CSS to advanced React concepts. You'll learn how to create beautiful, responsive user interfaces and interactive web applications that work across all devices. By the end, you'll have the skills to build production-ready frontend applications.",
    instructor: "Sarah Chen",
    duration: "40 hours",
    level: "Beginner",
    students: "156K",
    rating: 4.9,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
    featured: true,
    skills: ["HTML5", "CSS3", "JavaScript ES6+", "React.js", "Responsive Design", "Git"],
    careerRelevance: "Frontend developers are in high demand with average salaries ranging from ₹6-25 LPA. This role is essential for any company with a web presence.",
    modules: [
      {
        id: "fe-mod-1",
        title: "HTML Fundamentals",
        description: "Learn the building blocks of web pages including semantic HTML, forms, and accessibility best practices.",
        videoUrl: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
        duration: "3 hours",
        resources: ["MDN HTML Guide", "HTML Cheat Sheet", "Semantic HTML Best Practices"],
        quiz: [
          {
            question: "Which HTML element is used for the largest heading?",
            options: ["<h6>", "<heading>", "<h1>", "<head>"],
            correctAnswer: 2
          },
          {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
            correctAnswer: 0
          }
        ]
      },
      {
        id: "fe-mod-2",
        title: "CSS Styling & Layouts",
        description: "Master CSS selectors, flexbox, grid, and responsive design techniques for beautiful layouts.",
        videoUrl: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
        duration: "5 hours",
        resources: ["CSS Tricks Flexbox Guide", "Grid Layout Tutorial", "Media Queries Reference"],
        quiz: [
          {
            question: "Which property is used to change the background color?",
            options: ["color", "bgcolor", "background-color", "background"],
            correctAnswer: 2
          }
        ]
      },
      {
        id: "fe-mod-3",
        title: "JavaScript Essentials",
        description: "Understand JavaScript fundamentals including variables, functions, DOM manipulation, and async programming.",
        videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
        duration: "8 hours",
        resources: ["JavaScript.info", "Eloquent JavaScript Book", "ES6 Features Guide"],
        quiz: [
          {
            question: "Which keyword declares a constant in JavaScript?",
            options: ["var", "let", "const", "constant"],
            correctAnswer: 2
          }
        ]
      },
      {
        id: "fe-mod-4",
        title: "React.js Fundamentals",
        description: "Build dynamic user interfaces with React components, hooks, state management, and routing.",
        videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
        duration: "10 hours",
        resources: ["React Official Docs", "React Hooks Cheatsheet", "Component Design Patterns"],
        quiz: [
          {
            question: "What hook is used for side effects in React?",
            options: ["useState", "useEffect", "useContext", "useReducer"],
            correctAnswer: 1
          }
        ]
      },
      {
        id: "fe-mod-5",
        title: "Advanced React & State Management",
        description: "Learn advanced patterns including context API, custom hooks, and performance optimization.",
        videoUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
        duration: "6 hours",
        resources: ["React Performance Guide", "Custom Hooks Tutorial", "State Management Comparison"],
        quiz: [
          {
            question: "Which hook helps avoid prop drilling?",
            options: ["useState", "useEffect", "useContext", "useMemo"],
            correctAnswer: 2
          }
        ]
      }
    ],
    project: {
      id: "fe-project-1",
      title: "Build a Portfolio Website",
      description: "Create a fully responsive personal portfolio website showcasing your skills, projects, and contact information. The portfolio should demonstrate your understanding of modern frontend technologies and best practices.",
      objectives: [
        "Design a responsive layout that works on mobile, tablet, and desktop",
        "Implement smooth animations and transitions",
        "Create an interactive project gallery with filtering",
        "Add a contact form with validation",
        "Deploy the website to a hosting platform"
      ],
      tools: ["React.js", "CSS/Tailwind", "React Router", "Vercel/Netlify"],
      estimatedTime: "15-20 hours",
      submissionType: "link"
    }
  },
  {
    id: "backend-development",
    title: "Backend Development with Node.js",
    description: "Learn server-side programming with Node.js, Express, and database integration.",
    longDescription: "Master backend development by building RESTful APIs and server-side applications with Node.js and Express. You'll learn database design with MongoDB and PostgreSQL, authentication, and deployment strategies. This course prepares you for full-stack development roles.",
    instructor: "Rajesh Kumar",
    duration: "45 hours",
    level: "Intermediate",
    students: "89K",
    rating: 4.8,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    featured: true,
    skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs", "Authentication"],
    careerRelevance: "Backend developers command salaries of ₹8-30 LPA. Every web application needs a solid backend, making this skill essential.",
    modules: [
      {
        id: "be-mod-1",
        title: "Node.js Fundamentals",
        description: "Understand Node.js architecture, modules, file system, and asynchronous programming.",
        videoUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE",
        duration: "5 hours",
        resources: ["Node.js Documentation", "NPM Guide", "Async Programming Patterns"]
      },
      {
        id: "be-mod-2",
        title: "Express.js & Routing",
        description: "Build web servers with Express.js, handle routing, middleware, and error handling.",
        videoUrl: "https://www.youtube.com/watch?v=L72fhGm1tfE",
        duration: "6 hours",
        resources: ["Express.js Guide", "Middleware Patterns", "REST API Best Practices"]
      },
      {
        id: "be-mod-3",
        title: "Database Integration",
        description: "Work with MongoDB and PostgreSQL, design schemas, and perform CRUD operations.",
        videoUrl: "https://www.youtube.com/watch?v=fgTGADljAeg",
        duration: "8 hours",
        resources: ["MongoDB University", "PostgreSQL Tutorial", "Database Design Patterns"]
      },
      {
        id: "be-mod-4",
        title: "Authentication & Security",
        description: "Implement JWT authentication, password hashing, and security best practices.",
        videoUrl: "https://www.youtube.com/watch?v=mbsmsi7l3r4",
        duration: "6 hours",
        resources: ["OWASP Security Guide", "JWT Documentation", "bcrypt Best Practices"]
      },
      {
        id: "be-mod-5",
        title: "API Design & Documentation",
        description: "Design RESTful APIs, implement versioning, and create comprehensive documentation.",
        videoUrl: "https://www.youtube.com/watch?v=_7UQPve99r4",
        duration: "4 hours",
        resources: ["OpenAPI Specification", "Swagger Documentation", "API Design Guidelines"]
      }
    ],
    project: {
      id: "be-project-1",
      title: "Build a Task Management API",
      description: "Create a complete RESTful API for a task management application with user authentication, CRUD operations, and proper error handling.",
      objectives: [
        "Design and implement a RESTful API architecture",
        "Set up user authentication with JWT tokens",
        "Create endpoints for tasks with filtering and pagination",
        "Implement proper error handling and validation",
        "Document the API using Swagger/OpenAPI"
      ],
      tools: ["Node.js", "Express.js", "MongoDB/PostgreSQL", "JWT", "Swagger"],
      estimatedTime: "20-25 hours",
      submissionType: "link"
    }
  },
  {
    id: "data-analytics",
    title: "Data Analytics with Python",
    description: "Learn data analysis using Python, Pandas, NumPy, and visualization libraries.",
    longDescription: "Transform raw data into actionable insights with Python. This course covers data cleaning, exploratory analysis, statistical methods, and creating compelling visualizations. You'll work with real-world datasets and learn to communicate findings effectively.",
    instructor: "Priya Sharma",
    duration: "35 hours",
    level: "Beginner",
    students: "112K",
    rating: 4.7,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    featured: true,
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "SQL", "Data Visualization"],
    careerRelevance: "Data analysts earn ₹5-20 LPA and are needed across all industries. This is one of the fastest-growing career paths in India.",
    modules: [
      {
        id: "da-mod-1",
        title: "Python for Data Analysis",
        description: "Learn Python basics focused on data manipulation including data types, functions, and file handling.",
        videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        duration: "6 hours",
        resources: ["Python.org Tutorial", "Jupyter Notebook Guide", "Python Cheatsheet"]
      },
      {
        id: "da-mod-2",
        title: "Data Manipulation with Pandas",
        description: "Master Pandas for data cleaning, transformation, merging, and analysis.",
        videoUrl: "https://www.youtube.com/watch?v=vmEHCJofslg",
        duration: "8 hours",
        resources: ["Pandas Documentation", "Data Cleaning Guide", "Pandas Cookbook"]
      },
      {
        id: "da-mod-3",
        title: "Numerical Computing with NumPy",
        description: "Understand NumPy arrays, mathematical operations, and statistical computations.",
        videoUrl: "https://www.youtube.com/watch?v=QUT1VHiLmmI",
        duration: "4 hours",
        resources: ["NumPy User Guide", "Linear Algebra Basics", "NumPy Cheatsheet"]
      },
      {
        id: "da-mod-4",
        title: "Data Visualization",
        description: "Create compelling charts and graphs with Matplotlib, Seaborn, and Plotly.",
        videoUrl: "https://www.youtube.com/watch?v=3Xc3CA655Y4",
        duration: "6 hours",
        resources: ["Matplotlib Gallery", "Seaborn Tutorial", "Visualization Best Practices"]
      },
      {
        id: "da-mod-5",
        title: "SQL for Data Analysis",
        description: "Query databases effectively to extract and analyze data at scale.",
        videoUrl: "https://www.youtube.com/watch?v=7S_tz1z_5bA",
        duration: "5 hours",
        resources: ["SQL Tutorial", "Query Optimization", "Database Design Basics"]
      }
    ],
    project: {
      id: "da-project-1",
      title: "Analyze E-commerce Sales Data",
      description: "Perform comprehensive analysis on an e-commerce dataset to uncover sales trends, customer behavior, and actionable business insights.",
      objectives: [
        "Clean and preprocess real-world sales data",
        "Conduct exploratory data analysis (EDA)",
        "Identify sales trends and seasonal patterns",
        "Create a dashboard with key metrics and visualizations",
        "Present findings with actionable recommendations"
      ],
      tools: ["Python", "Pandas", "Matplotlib/Seaborn", "Jupyter Notebook"],
      estimatedTime: "15-20 hours",
      submissionType: "file"
    }
  },
  {
    id: "ai-machine-learning",
    title: "AI & Machine Learning Fundamentals",
    description: "Understand the fundamentals of AI and machine learning with hands-on projects.",
    longDescription: "Begin your journey into artificial intelligence and machine learning. Learn the core concepts, algorithms, and techniques that power modern AI systems. From supervised learning to neural networks, this course provides a solid foundation for AI careers.",
    instructor: "Dr. Amit Verma",
    duration: "50 hours",
    level: "Intermediate",
    students: "78K",
    rating: 4.8,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
    featured: true,
    skills: ["Python", "Scikit-learn", "TensorFlow", "Machine Learning", "Deep Learning", "Model Deployment"],
    careerRelevance: "AI/ML engineers are among the highest-paid tech professionals with salaries of ₹12-50 LPA. The demand is expected to grow 5x in the next 5 years.",
    modules: [
      {
        id: "ml-mod-1",
        title: "Introduction to Machine Learning",
        description: "Understand ML concepts, types of learning, and the machine learning workflow.",
        videoUrl: "https://www.youtube.com/watch?v=GwIo3gDZCVQ",
        duration: "4 hours",
        resources: ["ML Glossary", "Andrew Ng's Notes", "ML Roadmap"]
      },
      {
        id: "ml-mod-2",
        title: "Supervised Learning Algorithms",
        description: "Learn regression, classification, decision trees, and ensemble methods.",
        videoUrl: "https://www.youtube.com/watch?v=i_LwzRVP7bg",
        duration: "10 hours",
        resources: ["Scikit-learn Documentation", "Algorithm Comparison", "Hyperparameter Tuning"]
      },
      {
        id: "ml-mod-3",
        title: "Unsupervised Learning",
        description: "Explore clustering, dimensionality reduction, and anomaly detection techniques.",
        videoUrl: "https://www.youtube.com/watch?v=8dqdDEyzkFA",
        duration: "6 hours",
        resources: ["K-Means Tutorial", "PCA Explained", "Clustering Evaluation"]
      },
      {
        id: "ml-mod-4",
        title: "Neural Networks & Deep Learning",
        description: "Build neural networks with TensorFlow and understand deep learning architectures.",
        videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk",
        duration: "12 hours",
        resources: ["TensorFlow Guide", "Neural Network Playground", "Deep Learning Book"]
      },
      {
        id: "ml-mod-5",
        title: "Model Deployment & MLOps",
        description: "Deploy models to production and understand MLOps best practices.",
        videoUrl: "https://www.youtube.com/watch?v=79X9dL9T2aI",
        duration: "6 hours",
        resources: ["MLflow Documentation", "Docker for ML", "Cloud Deployment Guide"]
      }
    ],
    project: {
      id: "ml-project-1",
      title: "Build a Sentiment Analysis Model",
      description: "Create an end-to-end machine learning pipeline for analyzing customer reviews and predicting sentiment.",
      objectives: [
        "Collect and preprocess text data",
        "Perform feature engineering and text vectorization",
        "Train and evaluate multiple ML models",
        "Build a simple API to serve predictions",
        "Document model performance and insights"
      ],
      tools: ["Python", "Scikit-learn", "NLTK/spaCy", "Flask/FastAPI"],
      estimatedTime: "25-30 hours",
      submissionType: "link"
    }
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Fundamentals",
    description: "Learn user-centered design principles, wireframing, and prototyping.",
    longDescription: "Master the art and science of designing digital experiences. From user research to high-fidelity prototypes, learn the complete design process. You'll use industry-standard tools and develop a portfolio that showcases your design thinking.",
    instructor: "Maya Patel",
    duration: "30 hours",
    level: "Beginner",
    students: "67K",
    rating: 4.6,
    category: "Design",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400",
    skills: ["Figma", "User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"],
    careerRelevance: "UI/UX designers earn ₹6-25 LPA. With digital-first businesses growing, design skills are increasingly valuable.",
    modules: [
      {
        id: "ux-mod-1",
        title: "Design Thinking & User Research",
        description: "Understand user-centered design process and research methodologies.",
        videoUrl: "https://www.youtube.com/watch?v=gHGN6hs2gZY",
        duration: "5 hours",
        resources: ["Design Thinking Guide", "User Interview Templates", "Research Methods"]
      },
      {
        id: "ux-mod-2",
        title: "Information Architecture",
        description: "Learn to organize content and create intuitive navigation structures.",
        videoUrl: "https://www.youtube.com/watch?v=Ij4WquJaRTc",
        duration: "4 hours",
        resources: ["IA Fundamentals", "Card Sorting Guide", "Sitemaps Tutorial"]
      },
      {
        id: "ux-mod-3",
        title: "Wireframing & Prototyping",
        description: "Create low and high-fidelity wireframes and interactive prototypes.",
        videoUrl: "https://www.youtube.com/watch?v=FTFaQWZBqQ8",
        duration: "8 hours",
        resources: ["Figma Basics", "Wireframe Templates", "Prototyping Best Practices"]
      },
      {
        id: "ux-mod-4",
        title: "Visual Design Principles",
        description: "Master typography, color theory, spacing, and visual hierarchy.",
        videoUrl: "https://www.youtube.com/watch?v=_Hp_dI0DzY4",
        duration: "6 hours",
        resources: ["Design Principles", "Color Theory Guide", "Typography Rules"]
      },
      {
        id: "ux-mod-5",
        title: "Design Systems & Handoff",
        description: "Build reusable design systems and prepare designs for development.",
        videoUrl: "https://www.youtube.com/watch?v=EK-pHkc5EL4",
        duration: "5 hours",
        resources: ["Design System Guide", "Component Libraries", "Developer Handoff"]
      }
    ],
    project: {
      id: "ux-project-1",
      title: "Redesign a Mobile App",
      description: "Conduct user research and create a complete redesign for an existing mobile application, improving its usability and visual appeal.",
      objectives: [
        "Conduct competitive analysis and user research",
        "Create user personas and journey maps",
        "Design wireframes and high-fidelity mockups",
        "Build an interactive prototype",
        "Conduct usability testing and iterate"
      ],
      tools: ["Figma", "FigJam", "Maze/UsabilityHub"],
      estimatedTime: "20-25 hours",
      submissionType: "link"
    }
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Fundamentals",
    description: "Learn cloud computing with AWS and DevOps practices for modern software delivery.",
    longDescription: "Master cloud infrastructure and DevOps practices essential for modern software development. Learn to deploy, scale, and manage applications on AWS. Understand CI/CD pipelines, containerization, and infrastructure as code.",
    instructor: "Vikram Singh",
    duration: "45 hours",
    level: "Intermediate",
    students: "54K",
    rating: 4.7,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Linux"],
    careerRelevance: "DevOps engineers earn ₹10-35 LPA. Cloud skills are essential as more companies move to cloud infrastructure.",
    modules: [
      {
        id: "do-mod-1",
        title: "Cloud Computing Fundamentals",
        description: "Understand cloud concepts, service models, and AWS core services.",
        videoUrl: "https://www.youtube.com/watch?v=k1RI5locZE4",
        duration: "6 hours",
        resources: ["AWS Overview", "Cloud Concepts", "Service Comparison"]
      },
      {
        id: "do-mod-2",
        title: "AWS Core Services",
        description: "Master EC2, S3, RDS, and VPC for building cloud infrastructure.",
        videoUrl: "https://www.youtube.com/watch?v=ulprqHHWlng",
        duration: "10 hours",
        resources: ["AWS Documentation", "EC2 Best Practices", "S3 Guide"]
      },
      {
        id: "do-mod-3",
        title: "Docker & Containerization",
        description: "Learn containerization with Docker for consistent application deployment.",
        videoUrl: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
        duration: "8 hours",
        resources: ["Docker Documentation", "Dockerfile Best Practices", "Container Security"]
      },
      {
        id: "do-mod-4",
        title: "CI/CD Pipelines",
        description: "Build automated pipelines with GitHub Actions and AWS CodePipeline.",
        videoUrl: "https://www.youtube.com/watch?v=R8_veQiYBjI",
        duration: "6 hours",
        resources: ["GitHub Actions Guide", "CI/CD Best Practices", "Testing Strategies"]
      },
      {
        id: "do-mod-5",
        title: "Infrastructure as Code",
        description: "Manage infrastructure with Terraform and CloudFormation.",
        videoUrl: "https://www.youtube.com/watch?v=SLB_c_ayRMo",
        duration: "6 hours",
        resources: ["Terraform Documentation", "IaC Patterns", "State Management"]
      }
    ],
    project: {
      id: "do-project-1",
      title: "Deploy a Containerized Application",
      description: "Build a complete CI/CD pipeline to deploy a containerized web application on AWS.",
      objectives: [
        "Containerize a web application with Docker",
        "Set up AWS infrastructure using Terraform",
        "Create a CI/CD pipeline with GitHub Actions",
        "Implement monitoring and logging",
        "Document the deployment process"
      ],
      tools: ["AWS", "Docker", "Terraform", "GitHub Actions"],
      estimatedTime: "25-30 hours",
      submissionType: "link"
    }
  },
  {
    id: "cybersecurity-basics",
    title: "Cybersecurity Fundamentals",
    description: "Learn essential cybersecurity concepts, threats, and defense strategies.",
    longDescription: "Understand the cybersecurity landscape and learn to protect systems and data. From network security to ethical hacking basics, this course covers essential skills for security-conscious professionals. Perfect for anyone looking to specialize in security.",
    instructor: "Arjun Reddy",
    duration: "35 hours",
    level: "Beginner",
    students: "45K",
    rating: 4.5,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
    skills: ["Network Security", "Threat Analysis", "Penetration Testing", "Security Tools", "Incident Response", "Compliance"],
    careerRelevance: "Cybersecurity professionals earn ₹8-40 LPA. With increasing cyber threats, security skills are critical for all organizations.",
    modules: [
      {
        id: "cs-mod-1",
        title: "Security Fundamentals",
        description: "Understand security concepts, CIA triad, and threat landscape.",
        videoUrl: "https://www.youtube.com/watch?v=z5nc9MDbvkw",
        duration: "5 hours",
        resources: ["Security Basics", "Threat Landscape Report", "Security Frameworks"]
      },
      {
        id: "cs-mod-2",
        title: "Network Security",
        description: "Learn firewalls, VPNs, intrusion detection, and network monitoring.",
        videoUrl: "https://www.youtube.com/watch?v=E03gh1huvW4",
        duration: "8 hours",
        resources: ["Network Security Guide", "Wireshark Tutorial", "Firewall Configuration"]
      },
      {
        id: "cs-mod-3",
        title: "Web Application Security",
        description: "Understand OWASP Top 10, XSS, SQL injection, and secure coding.",
        videoUrl: "https://www.youtube.com/watch?v=F5KJVuii0Yw",
        duration: "7 hours",
        resources: ["OWASP Guide", "Secure Coding Practices", "Vulnerability Testing"]
      },
      {
        id: "cs-mod-4",
        title: "Ethical Hacking Basics",
        description: "Learn penetration testing methodology and common attack techniques.",
        videoUrl: "https://www.youtube.com/watch?v=3Kq1MIfTWCE",
        duration: "8 hours",
        resources: ["Kali Linux Guide", "Penetration Testing Methodology", "Bug Bounty Resources"]
      },
      {
        id: "cs-mod-5",
        title: "Incident Response",
        description: "Handle security incidents, forensics, and recovery procedures.",
        videoUrl: "https://www.youtube.com/watch?v=3yPfhZN8WT8",
        duration: "5 hours",
        resources: ["IR Playbook", "Digital Forensics Basics", "Recovery Procedures"]
      }
    ],
    project: {
      id: "cs-project-1",
      title: "Security Assessment Report",
      description: "Conduct a comprehensive security assessment of a web application and document findings.",
      objectives: [
        "Perform reconnaissance and information gathering",
        "Identify vulnerabilities using security tools",
        "Test for OWASP Top 10 vulnerabilities",
        "Document findings with severity ratings",
        "Provide remediation recommendations"
      ],
      tools: ["Burp Suite", "Nmap", "OWASP ZAP", "Kali Linux"],
      estimatedTime: "20-25 hours",
      submissionType: "file"
    }
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Complete Course",
    description: "Master SEO, social media marketing, content marketing, and paid advertising.",
    longDescription: "Learn comprehensive digital marketing strategies to grow businesses online. From SEO and content marketing to paid advertising and analytics, master the skills needed to create and execute successful digital campaigns.",
    instructor: "Neha Gupta",
    duration: "40 hours",
    level: "Beginner",
    students: "92K",
    rating: 4.6,
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    skills: ["SEO", "Google Ads", "Social Media Marketing", "Content Strategy", "Analytics", "Email Marketing"],
    careerRelevance: "Digital marketers earn ₹4-20 LPA. Every business needs digital presence, making this skill universally valuable.",
    modules: [
      {
        id: "dm-mod-1",
        title: "Digital Marketing Overview",
        description: "Understand digital channels, customer journey, and marketing funnels.",
        videoUrl: "https://www.youtube.com/watch?v=hiHMGCaQPxA",
        duration: "4 hours",
        resources: ["Marketing Fundamentals", "Customer Journey Map", "Channel Strategy"]
      },
      {
        id: "dm-mod-2",
        title: "Search Engine Optimization",
        description: "Learn on-page SEO, technical SEO, and link building strategies.",
        videoUrl: "https://www.youtube.com/watch?v=xsVTqzratPs",
        duration: "8 hours",
        resources: ["SEO Beginner Guide", "Keyword Research Tools", "Technical SEO Checklist"]
      },
      {
        id: "dm-mod-3",
        title: "Social Media Marketing",
        description: "Create effective social media strategies for different platforms.",
        videoUrl: "https://www.youtube.com/watch?v=I2pwcAVonKI",
        duration: "8 hours",
        resources: ["Platform Best Practices", "Content Calendar Template", "Engagement Strategies"]
      },
      {
        id: "dm-mod-4",
        title: "Paid Advertising",
        description: "Master Google Ads, Facebook Ads, and performance marketing.",
        videoUrl: "https://www.youtube.com/watch?v=yf7j0FPqbEg",
        duration: "10 hours",
        resources: ["Google Ads Guide", "Facebook Ads Manager", "Campaign Optimization"]
      },
      {
        id: "dm-mod-5",
        title: "Analytics & Reporting",
        description: "Measure performance with Google Analytics and create insightful reports.",
        videoUrl: "https://www.youtube.com/watch?v=i4nCiKQ6rJo",
        duration: "6 hours",
        resources: ["GA4 Documentation", "Reporting Templates", "Attribution Models"]
      }
    ],
    project: {
      id: "dm-project-1",
      title: "Create a Digital Marketing Campaign",
      description: "Plan and execute a complete digital marketing campaign for a product or service.",
      objectives: [
        "Develop a marketing strategy and buyer personas",
        "Create content for multiple channels",
        "Set up and optimize ad campaigns",
        "Track performance with analytics",
        "Present campaign results and insights"
      ],
      tools: ["Google Analytics", "Google Ads", "Canva", "Social Media Platforms"],
      estimatedTime: "20-25 hours",
      submissionType: "file"
    }
  }
];

export const videoLectures = [
  {
    id: "1",
    title: "Introduction to Python Programming",
    instructor: "Dr. Angela Yu",
    duration: "2:15:30",
    thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg",
    videoId: "rfscVS0vtbw",
    views: "12M",
    rating: 4.9,
    category: "Technology",
  },
  {
    id: "2",
    title: "Machine Learning Full Course",
    instructor: "Andrew Ng",
    duration: "3:45:00",
    thumbnail: "https://img.youtube.com/vi/GwIo3gDZCVQ/maxresdefault.jpg",
    videoId: "GwIo3gDZCVQ",
    views: "8.5M",
    rating: 4.8,
    category: "Technology",
  },
  {
    id: "3",
    title: "Digital Marketing Masterclass",
    instructor: "Neil Patel",
    duration: "1:45:20",
    thumbnail: "https://img.youtube.com/vi/hiHMGCaQPxA/maxresdefault.jpg",
    videoId: "hiHMGCaQPxA",
    views: "2.1M",
    rating: 4.7,
    category: "Marketing",
  },
  {
    id: "4",
    title: "Data Science with R Programming",
    instructor: "Kirill Eremenko",
    duration: "4:20:00",
    thumbnail: "https://img.youtube.com/vi/_V8eKsto3Ug/maxresdefault.jpg",
    videoId: "_V8eKsto3Ug",
    views: "3.2M",
    rating: 4.6,
    category: "Technology",
  },
  {
    id: "5",
    title: "JavaScript Complete Tutorial",
    instructor: "Mosh Hamedani",
    duration: "3:30:45",
    thumbnail: "https://img.youtube.com/vi/W6NZfCO5SIk/maxresdefault.jpg",
    videoId: "W6NZfCO5SIk",
    views: "15M",
    rating: 4.9,
    category: "Technology",
  },
  {
    id: "6",
    title: "Project Management Fundamentals",
    instructor: "Mike Clayton",
    duration: "2:00:00",
    thumbnail: "https://img.youtube.com/vi/uWPIsaYpY7U/maxresdefault.jpg",
    videoId: "uWPIsaYpY7U",
    views: "1.8M",
    rating: 4.5,
    category: "Business",
  },
];

export const motivationalQuotes = [
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { quote: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { quote: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.", author: "Brian Herbert" },
  { quote: "Investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { quote: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { quote: "Your limitation—it's only your imagination.", author: "Unknown" },
  { quote: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { quote: "Great things never come from comfort zones.", author: "Unknown" },
];

export const careerGoals = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "AI/ML Engineer",
  "UI/UX Designer",
  "DevOps Engineer",
  "Cybersecurity Analyst",
  "Digital Marketer",
  "Cloud Architect",
];
