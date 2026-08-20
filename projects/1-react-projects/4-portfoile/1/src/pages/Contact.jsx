import { Typography, Input, Textarea, Button } from "@material-tailwind/react";
import { useForm, ValidationError } from "@formspree/react";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [state, handleSubmit] = useForm("xgvzwwea");

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Message sent successfully!", {
        style: {
          background: "#1e293b",
          color: "#00C2CB",
          border: "1px solid #00C2CB",
        },
      });
    }
  }, [state.succeeded]);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#0e111a] text-white px-6 py-20">
      <Toaster />

      <div className="text-center max-w-2xl mx-auto mb-16">
        <Typography
          variant="h2"
          className="text-3xl md:text-4xl font-bold pt-serif-bold"
        >
          Let’s <span className="text-[#00C2CB]">Get in Touch</span>
        </Typography>
        <p className="text-gray-400 mt-3 text-sm md:text-base">
          Feel free to reach out for collaborations or just a friendly hola 👋
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={0.1}
          className="flex justify-center"
        >
          <img
            src="https://i.ibb.co/0j4brtVY/me.jpg"
            alt="Belal Waheed"
            className="rounded-xl w-full max-w-sm border-2 border-[#00C2CB] shadow-[0_0_20px_#00C2CB40]"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={0.2}
          className="bg-[#111827] p-10 rounded-2xl shadow-xl space-y-6"
        >
          {state.succeeded ? (
            <div className="text-center text-[#00C2CB] text-xl font-semibold">
              ✅ Thank you! Your message was sent.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                name="name"
                required
                className="text-white bg-[#1f2937]  focus:ring-2 focus:ring-[#00C2CB]"
              />
              <Input
                label="Email Address"
                type="email"
                name="email"
                required
                className="text-white bg-[#1f2937]  focus:ring-2 focus:ring-[#00C2CB]"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-red-400 text-sm"
              />
              <Input
                label="Subject"
                name="subject"
                required
                className="text-white bg-[#1f2937]  focus:ring-2 focus:ring-[#00C2CB]"
              />
              <Textarea
                label="Message"
                name="message"
                required
                className="text-white bg-[#1f2937]  focus:ring-2 focus:ring-[#00C2CB]"
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className="text-red-400 text-sm"
              />
              <Button
                type="submit"
                disabled={state.submitting}
                className="w-full bg-gradient-to-r from-[#00C2CB] to-[#A162F7] shadow-md text-sm"
              >
                {state.submitting ? "Sending..." : "SEND MESSAGE"}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
