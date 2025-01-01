import Three404 from "../../components/three/Three404";

/**
 * 404 page component.
 */
function NotFound() {
  return (
    <section id="not-found">
      <div className="flex min-h-[calc(100svh-56px)] flex-col items-center justify-center">
        <Three404 className="aspect-video max-h-52 max-w-[50%]" />
        <h1>Page Not Found</h1>
        <p aria-label="Page not found" role="alert">
          The page you are looking for does not exist.
        </p>
      </div>
    </section>
  );
}

export default NotFound;
