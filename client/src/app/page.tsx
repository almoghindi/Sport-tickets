"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Button from "./components/button";

const Home = () => {
  const router = useRouter();

  const gradient = {
    hidden: { backgroundPosition: "200% 0" },
    visible: {
      backgroundPosition: "-200% 0",
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "mirror" as const,
      },
    },
  };

  const fallFromSky = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <div className="relative flex justify-center sm:justify-start items-center h-screen min-w-full text-white p-5">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/background.webp")' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <motion.div
        className="relative max-w-xxl z-10 md:ml-[20%] text-center sm:text-left"
        initial="hidden"
        animate="visible"
        variants={fallFromSky}
      >
        <h1 className="text-4xl sm:text-7xl font-bold leading-tight mb-5">
          Get Your Tickets
          <br />
          <motion.span
            className="glowing-text"
            initial="hidden"
            animate="visible"
            variants={gradient}
            style={{
              background:
                "linear-gradient(90deg, darkblue, lightblue, darkblue)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            to the Best Events
          </motion.span>
        </h1>
        <p className="text-lg sm:text-xl mb-5">
          Discover and purchase tickets to the most exciting sports events now.
        </p>
        <Button
          onClick={() => router.push("/tickets")}
          text="Explore Tickets"
          type="button"
        />
      </motion.div>
    </div>
  );
};

export default Home;
