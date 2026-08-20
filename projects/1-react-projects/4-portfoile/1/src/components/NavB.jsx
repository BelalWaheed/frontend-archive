import { Link, useLocation } from "react-router-dom";

function NavB() {
  const { pathname } = useLocation();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Projects", to: "/projects" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <nav className="  shadow-glow bg-gradient-to-r from-[#0f172a] to-[#0e111a] px-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-white gap-4">
        <Link to="/" className="text-3xl font-bold text-white">
          <span className="text-[#00C2CB]">Belal</span> Dev
        </Link>

        <div className="flex gap-6 text-base font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors duration-200 ${
                pathname === link.to
                  ? "text-[#00C2CB] underline underline-offset-4"
                  : "text-white hover:text-[#00C2CB]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavB;
