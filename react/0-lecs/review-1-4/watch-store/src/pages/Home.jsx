import { motion } from "framer-motion";

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 * i, duration: 0.6 },
    }),
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <motion.section
        id="Home"
        className="flex flex-col md:flex-row justify-center items-center py-12 px-4 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.div className="md:w-1/2 w-full" custom={1} variants={fadeIn}>
          <h1 className="text-4xl font-bold mb-4 text-center md:text-left">
            Watch of Choice
          </h1>
          <p className="mb-6 text-center md:text-left leading-relaxed">
            Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse.
          </p>
          <div className="flex justify-center md:justify-start">
            <motion.a
              href="#Products"
              whileHover={{ scale: 1.05 }}
              className="bg-havelock-blue-500 hover:bg-havelock-blue-600 text-white px-4 py-2 rounded transition"
            >
              SHOW WATCHES
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2 w-full mt-6 md:mt-0 flex justify-center"
          custom={2}
          variants={fadeIn}
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="/1.png"
            alt="Main Watch"
            className="w-4/5"
          />
        </motion.div>
      </motion.section>

      {/* New Products */}
      <section id="Products" className="max-w-7xl mx-auto px-4 py-12">
        <motion.h2
          className="text-3xl font-bold mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={1}
        >
          New Products
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { src: "/2.png", name: "Skagen Watch!", price: "$240.11" },
            { src: "/3.png", name: "Silver Watch!", price: "$780.11" },
            { src: "/4.png", name: "Golden Watch!", price: "$2400.11" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              custom={i + 1}
            >
              <img
                src={item.src}
                className="w-full object-cover rounded-md"
                alt={item.name}
              />
              <figcaption className="text-xl font-semibold mt-2">
                {item.name}
              </figcaption>
              <p className="text-red-600">{item.price}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section id="New-Arrivals" className="bg-gray-100 py-12 px-4">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={1}
        >
          <h2 className="text-3xl font-bold mb-4">New Arrivals</h2>
          <p className="text-gray-700">
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
            gravida.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {[5, 6, 7].map((n, i) => (
            <motion.div
              key={n}
              className="bg-white rounded-md overflow-hidden shadow"
              whileHover={{ scale: 1.03 }}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              custom={i + 1}
            >
              <img src={`/${n}.png`} alt={`Product ${n}`} />
              <div className="p-4 text-center">
                <p>Thermo Ball Etip</p>
                <p>Gloves</p>
                <motion.a
                  href="#Home"
                  className="inline-block mt-2 bg-havelock-blue-500 hover:bg-havelock-blue-600 text-white px-3 py-1 rounded transition"
                  whileHover={{ scale: 1.05 }}
                >
                  Add To Cart
                </motion.a>
                <div className="mt-2 text-lg font-semibold text-gray-800">
                  $45.743
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mt-12 mb-16 max-w-7xl mx-auto px-4">
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={1}
        >
          {["gallery1", "gallery2", "gallery3", "gallery4"].map((img, i) => (
            <motion.img
              key={img}
              src={`/${img}.png`}
              alt={`Gallery ${i + 1}`}
              className="w-64 rounded shadow"
              whileHover={{ scale: 1.08 }}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              custom={i + 1}
            />
          ))}
        </motion.div>
      </section>
    </div>
  );
}
