import "./Home.css";

import SocialNav from "../../components/social/SocialNav";

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
            <span>Islam Ahmed</span>, <br />
            Full-stack developer
            <br />
            driven by security and UX design.
          </h1>
          <button
            onClick={() => {
              const element = document.getElementById("start");
              element?.scrollIntoView({ behavior: "smooth" });
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
        <div className="start-content" role="none">
          <h1>Start</h1>
        </div>
      </section>
    </>
  );
}

export default Home;
