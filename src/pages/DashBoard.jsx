import React, { useEffect, useState, useCallback } from "react";
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
  const [error, setError] = useState(null);
  const [refreshCountdown, setRefreshCountdown] = useState(60);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: selectedCurrency,
            order: "market_cap_desc",
            per_page: 10,
            page,
            sparkline: true,
            query: searchTerm || undefined,
          },
        }
      );
      console.log("Fetched coins:", res.data);

      setCoins(res.data);
      setTotalPages(Math.ceil(100 / 10)); // Assuming 100 total coins for simplicity
      setLoading(false);
      setRefreshCountdown(60);
    } catch (err) {
      setError("Failed to fetch coin data. Please try again later.");
      setLoading(false);
    }
  }, [selectedCurrency, page, searchTerm]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    const countdown = setInterval(() => {
      setRefreshCountdown((prev) => (prev === 1 ? 60 : prev - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, [fetchData]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="w-full fixed top-0 left-0 px-6 py-8 flex items-center justify-between z-50 bg-gray-900/80 backdrop-blur-lg shadow-md shadow-gray-700/20">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
          CoinScope
        </h1>
        <nav className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setShowPortfolio(!showPortfolio)}
            className="cursor-pointer bg-cyan-500 text-white px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg shadow-md hover:bg-cyan-600 transition-all duration-300 text-sm sm:text-base"
          >
            {showPortfolio ? "Dashboard" : "Got to My Portfolio"}
          </button>

          <Link to="/">
            <button className="cursor-pointer text-white px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300 text-sm sm:text-base">
              Back Home
            </button>
          </Link>
        </nav>
      </header>

      {/* Content */}
      <div className="mt-28 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-300 text-transparent bg-clip-text">
            {showPortfolio ? "Portfolio Tracker" : "Dashboard"}
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search coins..."
              value={searchTerm}
              onChange={handleSearch}
              className="bg-gray-800 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full sm:w-64"
            />
            <CurrencySwitcher setSelectedCurrency={setSelectedCurrency} />
          </div>
        </div>
        <p className="text-gray-400 mb-4 text-sm sm:text-base">
          {loading ? "Loading..." : `Refreshing in ${refreshCountdown}s`}
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {showPortfolio ? (
          <PortfolioTracker coins={coins} />
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coins.map((coin) => (
                <CoinCard
                  key={coin.id}
                  coin={coin}
                  onClick={() => setSelectedCoin(coin.id)}
                  selectedCurrency={selectedCurrency}
                />
              ))}
            </div>
            <div className="flex justify-center items-center gap-2 mt-6 ">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 hover:bg-gray-600 transition-all duration-300"
              >
                Previous
              </button>
              <span className="text-gray-300">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 hover:bg-gray-600 transition-all duration-300"
              >
                Next
              </button>
            </div>
          </>
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
