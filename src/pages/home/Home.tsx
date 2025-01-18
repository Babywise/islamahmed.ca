import "./Home.css";

import SocialNav from "../../components/social/SocialNav";
import Timeline from "../../components/timeline/Timeline";

const timelineData = [
  {
    bullets: [
      "Designed and implemented an automated script to extract 3D assets from SharePoint using Python",
      "Developed a robust pipeline to collect asset metadata using Python, Node.js, React, Three.js, and Colhere",
      "Built and deployed containerized solutions on Azure cloud infrastructure using Docker",
      "Enhanced team productivity through proactive troubleshooting and code optimization",
      "Collaborated with teams to implement testing frameworks using Jest, Vitest, and ESLint",
      "Partnered with DevOps for CI/CD pipeline maintenance",
      "Conducted detailed code reviews and maintained coding standards"
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
      "Bitbucket",
      "MongoDB",
      "Express"
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
      <SocialNav />
      {/* <!-- Start section --> */}
      <section id="start">
        <div className="start-content" role="none" />
      </section>
      {/* <!-- Experience Timeline section --> */}
      <section id="experience">
        <Timeline items={timelineData} />
      </section>
    </>
  );
}

export default Home;
