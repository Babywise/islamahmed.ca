/**
 * Header Component.
 */
function Header() {
  return (
    <header className="bg-general-60/25 text-general-10/75 h-[56px] py-2 font-bold tracking-widest">
      <nav className="flex h-[calc(56px-1rem)] items-center justify-between">
        <img
          alt="Logo"
          className="aspect-square size-full max-w-[calc(56px-1rem)] object-contain text-black"
          src={`${import.meta.env.BASE_URL}/favicon.ico`}
        />
        <ul className="flex items-center justify-center gap-4">
          <li>
            <a href={`${import.meta.env.BASE_URL}/`}>Home</a>
          </li>
          <li>
            <a href={`${import.meta.env.BASE_URL}/projects`}>Projects</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
