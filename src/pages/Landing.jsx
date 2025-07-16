import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Landing = () => {
  // Features
  const features = [
    {
      icon: "📈",
      title: "Live Crypto Prices",
      description:
        "Access real-time market data for top coins and stay ahead in the fast-moving blockchain world.",
    },
    {
      icon: "🔗",
      title: "Blockchain Insights",
      description:
        "Coming soon: key blockchain metrics and analytics to deepen your understanding of the ecosystem.",
    },
    {
      icon: "⚡",
      title: "Lightning Fast Updates",
      description:
        "Auto-refreshing data ensures you never miss a market movement, with refresh intervals under your control.",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200">
      {/* Navbar */}
      <header className="p-4">
        <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            CoinScope
          </h1>
          <Link
            to="/dashboard"
            className="bg-cyan-500 text-white px-3 py-2 hover:scale-110 rounded shadow hover:bg-cyan-600 transition"
          >
            Go to Dashboard
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.main
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="flex-1 flex flex-col justify-center items-center text-center px-6 py-20 bg-[url('/crypto-bg.svg')] bg-cover bg-center"
      >
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          Your Crypto Dashboard, Reimagined
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-xl mb-6 text-gray-400"
        >
          Track real-time prices of top cryptocurrencies, monitor market trends,
          and make data-driven decisions. Built for the blockchain future.
        </motion.p>
        <Link
          to="/dashboard"
          className="bg-purple-600 px-8 py-3 hover:scale-110 rounded shadow hover:bg-purple-700 transition text-white font-semibold"
        >
          Launch CoinScope
        </Link>
      </motion.main>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="py-16 px-6 max-w-6xl mx-auto grid gap-12 md:grid-cols-3 text-center"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition"
          >
            <motion.h3 className="text-2xl font-bold mb-2">
              {feature.icon} {feature.title}
            </motion.h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-r from-purple-700 to-cyan-500 py-12 px-6 text-center"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-3xl font-bold mb-4"
        >
          Join the Future of Crypto Tracking
        </motion.h2>
        <Link
          to="/dashboard"
          className="inline-block bg-black hover:scale-110 bg-opacity-30 backdrop-blur px-8 py-3 rounded shadow text-white font-semibold hover:bg-opacity-50 transition"
        >
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Get Started Now
          </motion.p>
        </Link>
      </motion.section>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-gray-700 mt-auto">
        <p className="text-gray-500">
          © {new Date().getFullYear()} CoinScope – Built with ❤️ by Opera.
          Powered by CoinGecko API.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
