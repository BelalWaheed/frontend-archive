import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SplashCursor from "../components/SplashCursor";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: custom, ease: "easeOut" },
  }),
};

export default function Home() {
  return (
    <div className="">
      <SplashCursor />

      <section className="bg-gradient-to-br from-[#0f172a] to-[#0e111a] text-white px-6 py-16 space-y-32">
        <motion.div
          className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 h-[calc(100vh-68px)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <motion.div
            className="flex-1 space-y-6"
            variants={fadeUp}
            custom={0.1}
          >
            <h1 className="text-4xl md:text-5xl pt-serif-bold text-white tracking-wide">
              Welcome, I'm <span className="text-[#00C2CB]">Belal</span>
            </h1>

            <p className="pt-serif-regular text-lg text-gray-300 italic">
              Front-end Developer. I build with clarity, motion, and modern
              design.
            </p>

            <div className="flex gap-4">
              <Link to="/projects">
                <Button className="bg-gradient-to-r from-[#00C2CB] to-[#A162F7] shadow-glow">
                  View Projects
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outlined"
                  className="border-[#00C2CB] text-[#00C2CB] hover:bg-[#00C2CB]/10"
                >
                  Contact Me
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 flex justify-center"
            variants={fadeUp}
            custom={0.2}
          >
            <img
              src="https://i.ibb.co/0j4brtVY/me.jpg"
              alt="Belal Waheed"
              className="w-72 h-72 object-cover rounded-full border-4 border-[#00C2CB] shadow-glow"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center "
        >
          {[
            "React",
            "Java Script",
            "Tailwind CSS",
            "HTML 5",
            "Redux toolkit",
            "Motion",
          ].map((skill, i) => (
            <motion.div
              key={skill}
              variants={fadeUp}
              custom={0.2 + i * 0.2}
              className="p-6 rounded-xl bg-surface shadow-glow"
            >
              <Typography variant="h5" className="text-primary">
                {skill}
              </Typography>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0.3}
          className="max-w-4xl mx-auto text-center"
        >
          <Typography variant="h3" className="text-2xl text-primary mb-4">
            About Me
          </Typography>
          <p className="text-gray-400">
            I’m Belal, a passionate Front-end Developer from Egypt with strong
            expertise in React, JavaScript, and Tailwind CSS. I specialize in
            building responsive, fast, and visually engaging web applications
            that provide smooth user experiences. With a solid understanding of
            Redux Toolkit and Framer Motion, I focus on crafting clean, modern
            interfaces with smart animations. I’m constantly improving my
            skills, aiming to deliver high-quality projects and grow as a
            professional developer.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0.4}
          className="text-center space-y-4"
        >
          <Typography variant="h4" className="text-secondary">
            Ready to work together?
          </Typography>
          <Link
            to="/contact"
            className="bg-gradient-to-r from-[#00C2CB] to-[#A162F7] px-6 py-3 inline-block rounded-full font-semibold shadow-glow hover:scale-105 transition"
          >
            Let’s Talk
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
