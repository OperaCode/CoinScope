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
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <img src={coin.image.small} alt={coin.name} className="w-10 h-10" />
          <h2 className="text-2xl font-bold">{coin.name}</h2>
        </div>

        <p><strong>Market Cap:</strong> ${coin.market_data.market_cap.usd.toLocaleString()}</p>
        <p><strong>Total Supply:</strong> {coin.market_data.total_supply?.toLocaleString() || "N/A"}</p>
        <p><strong>All-Time High:</strong> ${coin.market_data.ath.usd.toLocaleString()}</p>
        <p><strong>All-Time Low:</strong> ${coin.market_data.atl.usd.toLocaleString()}</p>
        <p className="mt-4">
          <a
            href={coin.links.homepage[0]}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 underline"
          >
            Visit Website
          </a>
        </p>
      </div>
    </div>
  );
};

export default CoinModal;
