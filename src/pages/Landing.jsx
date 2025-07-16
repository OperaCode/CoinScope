import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
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
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 py-20 bg-[url('/crypto-bg.svg')] bg-cover bg-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">
          Your Crypto Dashboard, Reimagined
        </h2>
        <p className="max-w-xl mb-6 text-gray-400">
          Track real-time prices of top cryptocurrencies, monitor market trends,
          and make data-driven decisions. Built for the blockchain future.
        </p>
        <Link
          to="/dashboard"
          className="bg-purple-600 px-8 py-3 hover:scale-110 rounded shadow hover:bg-purple-700 transition text-white font-semibold"
        >
          Launch CoinScope
        </Link>
      </main>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid gap-12 md:grid-cols-3 text-center">
        <div className="bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition">
          <h3 className="text-2xl font-bold mb-2">📈 Live Crypto Prices</h3>
          <p className="text-gray-400">
            Access real-time market data for top coins and stay ahead in the
            fast-moving blockchain world.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition">
          <h3 className="text-2xl font-bold mb-2">🔗 Blockchain Insights</h3>
          <p className="text-gray-400">
            Coming soon: key blockchain metrics and analytics to deepen your
            understanding of the ecosystem.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition">
          <h3 className="text-2xl font-bold mb-2">⚡ Lightning Fast Updates</h3>
          <p className="text-gray-400">
            Auto-refreshing data ensures you never miss a market movement, with
            refresh intervals under your control.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-purple-700 to-cyan-500 py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Join the Future of Crypto Tracking
        </h2>
        <Link
          to="/dashboard"
          className="inline-block bg-black hover:scale-110 bg-opacity-30 backdrop-blur px-8 py-3 rounded shadow text-white font-semibold hover:bg-opacity-50 transition"
        >
          Get Started Now
        </Link>
      </section>

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
