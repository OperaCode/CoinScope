import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CoinCard from "../components/CoinCard";
import CoinModal from "../components/CoinModal";
import CurrencySwitcher from "../components/CurrencySwitcher";
import PortfolioTracker from "../components/PortfolioTracker";

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshCountdown, setRefreshCountdown] = useState(60);
  const [showPortfolio, setShowPortfolio] = useState(false); // toggle portfolio tracker

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // refresh every 60s

    const countdown = setInterval(() => {
      setRefreshCountdown((prev) => (prev === 1 ? 60 : prev - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, [selectedCurrency]);

  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: selectedCurrency,
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: true,
        },
      }
    );
    setCoins(res.data);
    setLoading(false);
    setRefreshCountdown(60);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      {/* Header */}
      <header className="w-full fixed px-5 lg:px-12 xl:px-[8%] py-4 flex items-center justify-between z-50 bg-opacity-50 backdrop-blur-lg shadow-sm mb-8 shadow-white/20">
        <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          CoinScope
        </h1>
        <nav className="flex gap-4">
          <button
            onClick={() => setShowPortfolio(!showPortfolio)}
            className="bg-cyan-500 text-white px-5 py-2 rounded shadow hover:bg-cyan-600 transition"
          >
            {showPortfolio ? "Dashboard" : "My Portfolio"}
          </button>
        </nav>
      </header>

      {/* Content */}
      <div className="mt-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            {showPortfolio ? "My Portfolio" : "Dashboard"}
          </h2>
          <CurrencySwitcher setSelectedCurrency={setSelectedCurrency} />
        </div>
        <p className="text-gray-400 mb-4">
          Refreshing in {refreshCountdown}s
        </p>

        {showPortfolio ? (
          <PortfolioTracker coins={coins} />
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {coins.map((coin) => (
              <CoinCard
                key={coin.id}
                coin={coin}
                onClick={() => setSelectedCoin(coin.id)}
              />
            ))}
          </div>
        )}

        {selectedCoin && (
          <CoinModal
            coinId={selectedCoin}
            onClose={() => setSelectedCoin(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
