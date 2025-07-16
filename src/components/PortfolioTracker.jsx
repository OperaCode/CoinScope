import React, { useState, useEffect } from "react";
import axios from "axios";

const PortfolioTracker = () => {
  const [coins, setCoins] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch coins when component mounts (like CoinModal)
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(res.data);
      } catch (err) {
        console.error("Error fetching coins:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  // Load saved quantities from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("portfolioQuantities"));
    if (saved) setQuantities(saved);
  }, []);

  // Calculate grand total
  useEffect(() => {
    const total = coins.reduce((acc, coin) => {
      const qty = parseFloat(quantities[coin.id] || 0);
      return acc + qty * coin.current_price;
    }, 0);
    setGrandTotal(total);
  }, [quantities, coins]);

  // Handle input change
  const handleChange = (e, coinId) => {
    const newQuantities = { ...quantities, [coinId]: e.target.value };
    setQuantities(newQuantities);
    localStorage.setItem("portfolioQuantities", JSON.stringify(newQuantities));
  };

  return (
    <div className="bg-gray-800 rounded p-6 shadow mt-10 ">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">My Assets</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {coins.map((coin) => {
            const qty = quantities[coin.id] || "";
            const totalValue = qty * coin.current_price;

            return (
              <div key={coin.id} className="bg-gray-900 p-4 rounded shadow">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    <span>{coin.name}</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Current: ${coin.current_price.toLocaleString()}
                  </p>
                </div>

                <input
                  type="number"
                  value={qty}
                  onChange={(e) => handleChange(e, coin.id)}
                  placeholder="Quantity owned"
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded mb-2"
                />

                <p className="text-green-400">
                  Value: $
                  {totalValue.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 text-xl font-bold text-right">
        Grand Total: $
        {grandTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </div>
    </div>
  );
};

export default PortfolioTracker;
