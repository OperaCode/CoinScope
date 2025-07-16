import React, { useEffect, useState } from "react";
import axios from "axios";

const CoinModal = ({ coinId, onClose }) => {
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
      setCoin(res.data);
    };
    fetchCoin();
  }, [coinId]);

  if (!coin) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full relative shadow-lg border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <div className="flex flex-col items-center gap-3 mb-6">
          <img src={coin.image.large} alt={coin.name} className="w-16 h-16" />
          <h2 className="text-3xl font-bold text-center">{coin.name}</h2>
          <span className="bg-cyan-600/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
            Rank #{coin.market_cap_rank}
          </span>
        </div>

        <div className="space-y-3 text-gray-300">
          <div className="flex justify-between">
            <span>💰 Market Cap:</span>
            <span className="font-semibold">${coin.market_data.market_cap.usd.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>🔢 Total Supply:</span>
            <span className="font-semibold">{coin.market_data.total_supply?.toLocaleString() || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span>🔺 All-Time High:</span>
            <span className="font-semibold">${coin.market_data.ath.usd.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>🔻 All-Time Low:</span>
            <span className="font-semibold">${coin.market_data.atl.usd.toLocaleString()}</span>
          </div>
        </div>

        <a
          href={coin.links.homepage[0]}
          target="_blank"
          rel="noreferrer"
          className="block mt-6 bg-cyan-600 hover:bg-cyan-700 text-white text-center py-2 rounded-lg transition"
        >
          Visit Website
        </a>
      </div>
    </div>
  );
};

export default CoinModal;
