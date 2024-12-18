/**
 * Home page component.
 */
function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center tracking-widest"
      id="home-landing">
      <div className="text-xl sm:text-4xl" id="landing-heading" role="heading">
        <h1>
          Hello, I&apos;m{" "}
          <span className="font-bold text-general-40/80">Islam</span>.
        </h1>
        <h1>I&apos;m a full stack web developer.</h1>
      </div>
      <button
        className="mt-4 w-1/3 min-w-44 rounded-full p-3 text-lg text-general-40/80 outline outline-2 outline-general-40/80 hover:font-bold hover:outline-4"
        type="button">
        <a href="#">Begin the Tour</a>
      </button>
    </div>
  );
}

export default Home;
