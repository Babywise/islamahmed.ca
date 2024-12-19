/**
 * Home page component.
 */
function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center tracking-widest"
      id="home-landing"
      role="none">
      <div
        className="text-xl sm:text-4xl"
        id="landing-heading"
        role="presentation">
        <h1>
          Hello, I&apos;m{" "}
          <span className="font-bold text-general-40">Islam</span>.
        </h1>
        <h1>I&apos;m a full stack web developer.</h1>
      </div>
      <button
        className="mt-4 w-1/3 min-w-44"
        onClick={() => {
          const element = document.getElementById("start");
          element?.scrollIntoView({ behavior: "smooth" });
        }}
        type="button">
        <span>Begin the Tour</span>
      </button>
    </div>
  );
}

export default Home;
