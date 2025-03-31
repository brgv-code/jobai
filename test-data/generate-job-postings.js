const fs = require("fs");

// Array of job data templates to create variation
const jobTemplates = [
  {
    title: "DevOps Engineer",
    company: "CloudScaler",
    location: "Seattle, WA",
    remote: "Hybrid",
    salary: "$115,000 - $145,000",
    skills: [
      "Kubernetes",
      "Docker",
      "AWS",
      "Terraform",
      "CI/CD",
      "Git",
      "Linux",
      "Python",
      "Monitoring",
    ],
    description:
      "CloudScaler is seeking a skilled DevOps Engineer to build and maintain our cloud infrastructure. You'll work on automating deployment processes and ensuring system reliability and scalability.",
  },
  {
    title: "Full Stack Developer",
    company: "WebSolutions",
    location: "Austin, TX",
    remote: "Remote",
    salary: "$95,000 - $130,000",
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "REST APIs",
      "Git",
      "HTML/CSS",
    ],
    description:
      "WebSolutions is looking for a Full Stack Developer to build modern web applications. You'll work on both frontend and backend components to deliver seamless user experiences.",
  },
  {
    title: "UI/UX Designer",
    company: "DesignMakers",
    location: "Portland, OR",
    remote: "On-site",
    salary: "$85,000 - $115,000",
    skills: [
      "Figma",
      "Adobe XD",
      "User Research",
      "Wireframing",
      "Prototyping",
      "Visual Design",
      "UI Design",
      "UX Design",
    ],
    description:
      "DesignMakers is seeking a talented UI/UX Designer to create beautiful and intuitive user interfaces. You'll collaborate with stakeholders to understand user needs and translate them into engaging designs.",
  },
  {
    title: "Product Manager",
    company: "ProductHub",
    location: "Chicago, IL",
    remote: "Hybrid",
    salary: "$110,000 - $140,000",
    skills: [
      "Product Strategy",
      "Agile",
      "Market Research",
      "User Stories",
      "Roadmapping",
      "Analytics",
      "A/B Testing",
    ],
    description:
      "ProductHub is looking for a Product Manager to lead our flagship product. You'll define product strategy, prioritize features, and work with engineering to bring products to market.",
  },
  {
    title: "Mobile Developer (iOS)",
    company: "AppCraft",
    location: "Los Angeles, CA",
    remote: "Remote",
    salary: "$100,000 - $135,000",
    skills: [
      "Swift",
      "iOS SDK",
      "Xcode",
      "UIKit",
      "Core Data",
      "REST APIs",
      "Git",
      "TestFlight",
    ],
    description:
      "AppCraft is seeking an iOS Developer to build beautiful mobile applications. You'll be responsible for implementing new features and maintaining existing functionality.",
  },
  {
    title: "Machine Learning Engineer",
    company: "AICompany",
    location: "San Jose, CA",
    remote: "On-site",
    salary: "$130,000 - $165,000",
    skills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Deep Learning",
      "NLP",
      "Computer Vision",
      "ML Ops",
      "Docker",
    ],
    description:
      "AICompany is looking for a Machine Learning Engineer to develop and deploy ML models. You'll work on cutting-edge ML solutions to solve complex business problems.",
  },
  {
    title: "QA Engineer",
    company: "QualityTech",
    location: "Denver, CO",
    remote: "Hybrid",
    salary: "$85,000 - $110,000",
    skills: [
      "Test Automation",
      "Selenium",
      "API Testing",
      "Cypress",
      "JIRA",
      "SQL",
      "JavaScript",
      "CI/CD",
    ],
    description:
      "QualityTech is seeking a QA Engineer to ensure the quality of our products. You'll design and implement test plans, automate test cases, and report bugs.",
  },
  {
    title: "Security Engineer",
    company: "SecureSystems",
    location: "Washington, DC",
    remote: "On-site",
    salary: "$120,000 - $150,000",
    skills: [
      "Network Security",
      "Cloud Security",
      "Penetration Testing",
      "Security Audits",
      "SIEM",
      "Compliance",
      "Risk Assessment",
    ],
    description:
      "SecureSystems is looking for a Security Engineer to protect our infrastructure. You'll identify vulnerabilities, implement security measures, and respond to security incidents.",
  },
  {
    title: "Data Engineer",
    company: "DataFlow",
    location: "Atlanta, GA",
    remote: "Remote",
    salary: "$110,000 - $140,000",
    skills: [
      "Python",
      "SQL",
      "ETL",
      "Data Warehousing",
      "Apache Spark",
      "Airflow",
      "AWS",
      "Snowflake",
    ],
    description:
      "DataFlow is seeking a Data Engineer to build and maintain our data infrastructure. You'll design data pipelines, optimize databases, and ensure data quality.",
  },
  {
    title: "Blockchain Developer",
    company: "ChainTech",
    location: "Miami, FL",
    remote: "Hybrid",
    salary: "$125,000 - $160,000",
    skills: [
      "Solidity",
      "Ethereum",
      "Smart Contracts",
      "Web3.js",
      "DApps",
      "Blockchain Architecture",
      "JavaScript",
      "Node.js",
    ],
    description:
      "ChainTech is looking for a Blockchain Developer to build decentralized applications. You'll design and implement smart contracts and blockchain solutions.",
  },
  {
    title: "Technical Project Manager",
    company: "ProjectPro",
    location: "Minneapolis, MN",
    remote: "Remote",
    salary: "$105,000 - $135,000",
    skills: [
      "Project Management",
      "Agile",
      "Scrum",
      "JIRA",
      "Risk Management",
      "Stakeholder Management",
      "Technical Background",
    ],
    description:
      "ProjectPro is seeking a Technical Project Manager to lead software projects. You'll plan, execute, and track project progress while managing stakeholder expectations.",
  },
  {
    title: "AR/VR Developer",
    company: "ImmersiveTech",
    location: "Raleigh, NC",
    remote: "On-site",
    salary: "$110,000 - $140,000",
    skills: [
      "Unity",
      "C#",
      "3D Modeling",
      "AR Frameworks",
      "VR Development",
      "UI/UX for AR/VR",
      "Spatial Computing",
    ],
    description:
      "ImmersiveTech is looking for an AR/VR Developer to create immersive experiences. You'll design and develop applications for AR and VR platforms.",
  },
  {
    title: "Database Administrator",
    company: "DataCore",
    location: "Dallas, TX",
    remote: "Hybrid",
    salary: "$100,000 - $130,000",
    skills: [
      "PostgreSQL",
      "MySQL",
      "Database Design",
      "Performance Tuning",
      "Backup/Recovery",
      "High Availability",
      "Security",
    ],
    description:
      "DataCore is seeking a Database Administrator to manage our database systems. You'll optimize performance, ensure data integrity, and implement security measures.",
  },
  {
    title: "Technical Writer",
    company: "DocuTech",
    location: "Pittsburgh, PA",
    remote: "Remote",
    salary: "$75,000 - $95,000",
    skills: [
      "Technical Documentation",
      "API Documentation",
      "Markdown",
      "Information Architecture",
      "Editing",
      "Software Knowledge",
    ],
    description:
      "DocuTech is looking for a Technical Writer to create clear documentation. You'll work with engineers to document APIs, features, and processes for users and developers.",
  },
  {
    title: "Site Reliability Engineer",
    company: "ReliableOps",
    location: "Phoenix, AZ",
    remote: "Hybrid",
    salary: "$120,000 - $150,000",
    skills: [
      "Linux",
      "Kubernetes",
      "AWS",
      "Monitoring",
      "Automation",
      "Incident Response",
      "Python",
      "Terraform",
    ],
    description:
      "ReliableOps is seeking an SRE to ensure our systems' reliability. You'll design and implement automation, monitor performance, and respond to incidents.",
  },
  {
    title: "AI Ethics Researcher",
    company: "EthicalAI",
    location: "Cambridge, MA",
    remote: "On-site",
    salary: "$115,000 - $145,000",
    skills: [
      "AI Ethics",
      "Machine Learning",
      "Research",
      "Policy Development",
      "Critical Thinking",
      "Communication",
      "Python",
    ],
    description:
      "EthicalAI is looking for an AI Ethics Researcher to ensure responsible AI development. You'll research ethical implications and develop guidelines for AI systems.",
  },
  {
    title: "Cloud Architect",
    company: "CloudDesign",
    location: "Houston, TX",
    remote: "Remote",
    salary: "$140,000 - $180,000",
    skills: [
      "AWS",
      "Azure",
      "GCP",
      "Cloud Migration",
      "Microservices",
      "Security",
      "IaC",
      "Kubernetes",
      "Serverless",
    ],
    description:
      "CloudDesign is seeking a Cloud Architect to design scalable cloud solutions. You'll lead cloud migration efforts and implement best practices for cloud infrastructure.",
  },
];

// Function to generate a job posting
function generateJobPosting(index, template) {
  const jobId = `job-${(index + 4).toString().padStart(3, "0")}`;
  const postedDate = new Date(2025, 2, Math.floor(Math.random() * 30) + 1); // Random date in March 2025

  // Format the date as YYYY-MM-DD
  const formattedDate = postedDate.toISOString().split("T")[0];

  return {
    id: jobId,
    title: template.title,
    company: template.company,
    location: template.location,
    remote: template.remote,
    type: Math.random() > 0.2 ? "Full-time" : "Contract",
    salary: template.salary,
    posted_date: formattedDate,
    description: template.description,
    responsibilities: [
      `Design and implement ${template.title.toLowerCase()} solutions that meet business requirements`,
      `Collaborate with cross-functional teams to deliver high-quality products`,
      `Troubleshoot and resolve complex technical issues`,
      `Stay up-to-date with industry trends and best practices`,
      `Contribute to documentation and knowledge sharing`,
    ],
    requirements: [
      `${
        Math.floor(Math.random() * 5) + 2
      }+ years of experience in ${template.title.toLowerCase()} or similar role`,
      `Strong knowledge of ${template.skills.slice(0, 3).join(", ")}`,
      `Experience with ${template.skills.slice(3, 5).join(" and ")}`,
      `Bachelor's degree in Computer Science or related field (or equivalent experience)`,
      `Excellent problem-solving and communication skills`,
    ],
    nice_to_have: [
      `Experience with ${
        template.skills[Math.floor(Math.random() * template.skills.length)]
      }`,
      `Knowledge of ${
        template.skills[Math.floor(Math.random() * template.skills.length)]
      }`,
      `Familiarity with agile development methodologies`,
      `Previous experience in a similar industry`,
    ],
    skills: template.skills,
    education: "Bachelor's degree in Computer Science or equivalent experience",
    benefits: [
      "Competitive salary and benefits package",
      "Health, dental, and vision insurance",
      "Retirement plan with company match",
      "Professional development opportunities",
      "Flexible work arrangements",
    ],
    application_url: `https://${template.company
      .toLowerCase()
      .replace(/\s/g, "")}.com/careers/${template.title
      .toLowerCase()
      .replace(/\s/g, "-")}`,
  };
}

// Generate and save job postings
function generateJobPostings() {
  for (let i = 0; i < jobTemplates.length; i++) {
    const jobPosting = generateJobPosting(i, jobTemplates[i]);
    const filePath = `./test-data/jobs/job${i + 4}.json`;

    fs.writeFileSync(filePath, JSON.stringify(jobPosting, null, 2));
    console.log(`Generated job posting: ${filePath}`);
  }
}

// Run the generator
generateJobPostings();
