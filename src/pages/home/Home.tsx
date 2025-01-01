import SocialNav from "../../components/social/SocialNav";

/**
 * Home page component.
 */
function Home() {
  return (
    <>
      {/* <!-- Hero section --> */}
      <section id="hero">
        <div
          className="flex min-h-[calc(100svh-56px-56px-2rem)] flex-col items-center justify-center text-center tracking-widest"
          id="hero-content"
          role="none">
          <div
            className="text-xl sm:text-4xl"
            id="hero-heading"
            role="presentation">
            <h1>
              Hello, I&apos;m{" "}
              <span className="font-bold text-general-40">Islam</span>.
            </h1>
            <h1>I&apos;m a full stack web developer.</h1>
          </div>
          <button
            className="my-4 w-1/3 min-w-48"
            onClick={() => {
              const element = document.getElementById("start");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            type="button">
            <span>Begin the Tour</span>
          </button>
        </div>
      </section>
      <SocialNav />
      {/* <!-- Start section --> */}
      <section id="start">
        <div
          className="flex flex-col tracking-widest"
          id="start-content"
          role="none">
          <h1 className="mb-4 text-2xl font-bold tracking-widest">Start</h1>
        </div>
      </section>
    </>
  );
}

export default Home;
