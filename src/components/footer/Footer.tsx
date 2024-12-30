/**
 * Footer component.
 */
function Footer() {
  return (
    <footer
      aria-label="Footer"
      className="flex h-[56px] items-center justify-center">
      <section id="copyright">
        <h1 className="sr-only">Copyright Notice</h1>
        <p aria-label="Copyright">
          <small>&copy; 2024 Islam Ahmed. All rights reserved.</small>
        </p>
      </section>
    </footer>
  );
}

export default Footer;
