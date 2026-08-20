import { Typography } from "@material-tailwind/react";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FooterB() {
  return (
    <footer className=" shadow-glow bg-gradient-to-r from-[#0f172a] to-[#0e111a] text-white pt-6 pb-4 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 border-b border-[#00C2CB] pb-4">
        <div>
          <Typography
            variant="h5"
            className="text-[#00C2CB] font-bold pt-serif-bold"
          >
            Belal
          </Typography>
          <p className="text-gray-400 mt-1 text-sm">
            Crafting digital experiences with creativity.
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-center gap-1 text-sm">
          <Typography variant="h6" className="pt-serif-bold mb-1">
            Navigate
          </Typography>
          <Link to="/" className="hover:text-[#00C2CB]">Home</Link>
          <Link to="/projects" className="hover:text-[#00C2CB]">Projects</Link>
          <Link to="/contact" className="hover:text-[#00C2CB]">Contact</Link>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-1">
          <Typography variant="h6" className="pt-serif-bold mb-1 text-sm">
            Connect
          </Typography>
          <div className="flex gap-3 text-[#00C2CB] text-lg">
            <a href="https://github.com/BelalWaheed" target="_blank" rel="noreferrer">
              <FaGithub className="hover:text-white transition" />
            </a>
            <a href="https://linkedin.com/in/belalwhaeed" target="_blank" rel="noreferrer">
              <FaLinkedin className="hover:text-white transition" />
            </a>
            <a href="https://facebook.com/profile.php?id=100033451629383" target="_blank" rel="noreferrer">
              <FaFacebook className="hover:text-white transition" />
            </a>
            <a href="https://instagram.com/belalwaheed_" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-white transition" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-3">
        &copy; {new Date().getFullYear()} Belal Waheed. All rights reserved.
      </div>
    </footer>
  );
}
