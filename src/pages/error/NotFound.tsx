import "./NotFound.css";

import Three404 from "../../components/three/Three404";

/**
 * 404 page component.
 */
function NotFound() {
  return (
    <section id="not-found">
      <div className="not-found-content">
        <Three404 />
        <h1>Page Not Found</h1>
        <p aria-label="Page not found">
          The page you are looking for does not exist.
        </p>
      </div>
    </section>
  );
}

export default NotFound;
