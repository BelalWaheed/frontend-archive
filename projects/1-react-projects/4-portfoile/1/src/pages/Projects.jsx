import { Typography, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    image: "https://i.ibb.co/wFWm3MXF/e-Commerce.png",
    title: "E-Commerce App",
    description:
      "This is a modern, full-featured e-commerce web application built with React. It includes separate interfaces for customers and administrators, providing a complete solution for online retail.",
    tech: ["React.js", "Tailwind CSS", "redux-toolkit"],
    link: "https://ecommerce-belal.vercel.app/",
    github: "https://github.com/BelalWaheed/eCommerce",
  },

  {
    title: "show cart",
    image: "https://i.ibb.co/m53jyffS/cart.png",
    description:
      "simple full functional cart and show products built with react.",
    tech: ["React.js", "Tailwind CSS", "redux-toolkit"],
    link: "https://react-cart-nine-self.vercel.app/",
    github: "https://github.com/BelalWaheed/react_cart",
  },

  {
    title: "Store Management System",
    image: "https://i.ibb.co/wrZTJ9q7/c.png",
    description:
      "This project is a C# Windows Forms application for managing a store's database. It provides a graphical user interface to interact with products, customers, and orders data stored in a SQL Server database.",
    tech: ["C#", "Windows form", ".NET framework", "SQL Server"],
    link: "https://github.com/BelalWaheed/Store-Management-System",
    github: "https://github.com/BelalWaheed/Store-Management-System",
  },
  {
    title: "Weather App",
    image: "https://i.ibb.co/zW72cKZc/wheiter.png",
    description:
      "A responsive weather application built with vanilla JavaScript that fetches real-time weather data using the OpenWeatherMap API. The app displays temperature, city name, weather conditions, and dynamic icons based on live data. Clean design and user-friendly interface tailored for quick weather checks.",
    tech: ["JavaScript", "REST API", "HTML", "CSS", "OpenWeatherMap"],
    link: "https://belal-weather-app.vercel.app/",
    github: "https://github.com/BelalWaheed/belal_WeatherAPP",
  },
  {
    title: "currency_converter",
    image: "https://i.ibb.co/2YKkd0Zc/currency.png",
    description:
      "A lightweight currency converter built with vanilla JavaScript, allowing users to convert between different currencies using live exchange rates from a public API. The app features real-time calculations, input validation, and a simple responsive layout for seamless use across devices.",

    tech: ["JavaScript", "REST API", "HTML", "CSS"],
    link: "https://currency-converter-henna-chi.vercel.app/",
    github: "https://github.com/BelalWaheed/currency_converter",
  },
  {
    title: "memes",
    image: "https://i.ibb.co/1G4fzm1P/mem.png",
    description:
      "A lightweight currency converter built with vanilla JavaScript, allowing users to convert between different currencies using live exchange rates from a public API. The app features real-time calculations, input validation, and a simple responsive layout for seamless use across devices.",

    tech: ["JavaScript", "REST API", "HTML", "CSS"],
    link: "https://memes-lyart.vercel.app/",
    github: "https://github.com/BelalWaheed/memes",
  },
  {
    title: "Portfolio Website",
    image: "https://i.ibb.co/7xLnPfHw/portfileo.png",
    description:
      "A personal portfolio built with React, Tailwind CSS, and Framer Motion animations.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    link: "https://belal-waheed.vercel.app",
    github: "https://github.com/BelalWaheed/portfolio",
  },
];
export default function Projects() {
  return (
    <section className="min-h-[calc(100vh-68px)] bg-gradient-to-br from-[#0f172a] to-[#0e111a] text-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <Typography
          variant="h2"
          className="text-4xl md:text-5xl font-bold text-center mb-6"
        >
          <span className="text-white">My </span>
          <span className="text-gray-400">Projects</span>
        </Typography>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto text-lg">
          Here are some of my recent projects that showcase my skills in web
          development and user experience design.
        </p>

        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="flex flex-col lg:flex-row items-center bg-[#12161F] rounded-xl shadow-lg p-6 gap-10 mb-14"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-full lg:w-1/2">
              <img
                src={project.image}
                alt={project.title}
                className="rounded-xl w-full hover:scale-95 transition-transform duration-500 shadow-lg"
              />
            </div>

            <div className="w-full lg:w-1/2">
              <Typography
                variant="h4"
                className="text-2xl md:text-3xl font-bold text-white mb-4"
              >
                {project.title}
              </Typography>
              <p className="text-gray-400 text-base mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#1f2a38] text-[#00C2CB] px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    color="light-blue"
                    className="flex items-center gap-2"
                  >
                    View Live Demo <FaExternalLinkAlt size={14} />
                  </Button>
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button color="blue-gray" className="flex items-center gap-2">
                    View Code <FaGithub size={16} />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
