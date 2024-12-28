import Three404 from "../../components/three/Three404";

/**
 * 404 page component.
 */
function NotFound() {
  return (
    <>
      <Three404 className="aspect-video max-h-52 max-w-[50%]" />
      <p aria-label="Page not found" className="text-center" role="alert">
        The page you are looking for does not exist.
      </p>
    </>
  );
}

export default NotFound;
