import "./Home.css";

import { FaBehance, FaGithub, FaLinkedin } from "react-icons/fa6";

import type { SocialLink } from "../../components/social/SocialNav";
import SocialNav from "../../components/social/SocialNav";
import TabContainer from "../../components/tabs/TabContainer";
import Timeline from "../../components/timeline/Timeline";

const workTimelineData = [
  {
    bullets: [
      "Designed and implemented an automated script to extract 3D assets from SharePoint using Python",
      "Developed a robust pipeline to collect asset metadata using Python, Node.js, React, Three.js, and Cohere",
      "Built and deployed containerized solutions on Azure cloud",
      "Collaborated with teams to implement testing frameworks using Jest, Vitest, and ESLint",
      "Partnered with DevOps for CI/CD pipeline maintenance",
      "Conducted detailed code reviews to maintain coding standards"
    ],
    description:
      "Developed and maintained asset management platform while contributing to various aspects of the development lifecycle.",
    duration: "8 months",
    location: "Waterloo, ON",
    organization: "Centre for Virtual Reality Innovation - VARLab",
    tags: [
      "React",
      "Node.js",
      "TypeScript",
      "Jira",
      "Confluence",
      "Cohere",
      "ESLint",
      "MongoDB",
      "Express",
      "Three.js",
      "Vitest",
      "Jest"
    ],
    title: "Software Developer - Web",
    year: "2024"
  },
  {
    bullets: [
      "Provided troubleshooting assistance and support to co-workers",
      "Built, rebuilt and refurbished all kinds of computers",
      "Ensured product orders were completed on time",
      "Created a solution to improve workplace productivity in the warehouse"
    ],
    description:
      "Managed computer repairs and warehouse operations while providing technical support.",
    duration: "1 year",
    location: "Cambridge, ON",
    organization: "VIG Computers",
    tags: ["Hardware Repair", "Customer Support", "Troubleshooting"],
    title: "Computer Technician",
    year: "2017"
  }
];

const educationTimelineData = [
  {
    bullets: [
      "Advanced computing courses and algorithms",
      "Led software development projects",
      "Network security and information security management",
      "Enterprise application development and systems architecture",
      "Database systems and data management",
      "Software quality assurance and testing",
      "User experience design and optimization"
    ],
    description: "Bachelor of Computer Science",
    duration: "4 years",
    location: "Waterloo, ON",
    organization: "Conestoga College",
    tags: [
      "InfoSec",
      "Enterprise Dev",
      "DB Systems",
      "UX/UI",
      "QA",
      "Network Sec",
      "SW Architecture",
      "Algorithms",
      "Parallel Computing",
      "OS",
      "DSA",
      "Unit Testing",
      "CI/CD",
      "Perf Analysis",
      "Security Mgmt",
      "Linear Algebra",
      "Discrete Math",
      "OOP",
      "Sys Analysis",
      "Tech Writing",
      "SDLC",
      "Rootkits",
      "Privacy"
    ],
    title: "Student",
    year: "2020"
  }
];

const socialLinks: SocialLink[] = [
  {
    icon: <FaLinkedin size={30} />,
    label: "LinkedIn",
    url: "https://linkedin.com/in/issia"
  },
  {
    icon: <FaGithub size={30} />,
    label: "GitHub",
    url: "https://github.com/babywise"
  },
  {
    icon: <FaBehance size={30} />,
    label: "Behance",
    url: "https://behance.net/islamdoesart"
  }
];

/**
 * Home page component.
 */
function Home() {
  return (
    <>
      {/* <!-- Hero section --> */}
      <section id="hero">
        <div className="hero-content" role="none">
          <h1>
            <span>Islam Ahmed</span>
            <br />
            Full-stack developer
            <br />
            driven by security and UX design.
          </h1>
          <button
            onClick={() => {
              const element = document.getElementById("start");
              const header = document.querySelector("header");
              if (element && header) {
                const headerHeight = header.offsetHeight;
                const elementPosition =
                  element.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                  behavior: "smooth",
                  top: elementPosition - headerHeight
                });
              }
            }}
            type="button">
            <span>Begin the Tour</span>
          </button>
        </div>
      </section>
      {/* <!-- Social navigation --> */}
      <SocialNav socialLinks={socialLinks} />
      {/* <!-- Start section --> */}
      <section id="start">
        <div className="start-content" role="none" />
      </section>
      {/* <!-- Experience section --> */}
      <section id="experience">
        <TabContainer
          tabs={[
            {
              content: <Timeline items={workTimelineData} />,
              id: "work",
              label: "Work"
            },
            {
              content: <Timeline items={educationTimelineData} />,
              id: "education",
              label: "Education"
            }
          ]}
        />
      </section>
    </>
  );
}

export default Home;
