import React from "react";

const CoinCard = ({coin, selectedCurrency, onClick }) => {
    const currencySymbols = {
    usd: "$",
    eur: "€",
    ngn: "₦",
    gbp: "£",
    jpy: "¥",
  };

  const symbol = currencySymbols[selectedCurrency] || selectedCurrency.toUpperCase();

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded p-4 shadow hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <img src={coin.image} alt={coin.name} className="w-8 h-8" />
          <span className="font-semibold">{coin.name}</span>
        </div>
        <div className="text-right">
          
          <p>{symbol}{coin.current_price.toLocaleString()}</p>

          <p
            className={
              coin.price_change_percentage_24h > 0
                ? "text-green-400"
                : "text-red-400"
            }
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Sparkline SVG */}
      {coin.sparkline_in_7d && coin.sparkline_in_7d.price && (
        <svg viewBox="0 0 100 30" className="w-full h-8">
          <polyline
            fill="none"
            stroke={coin.price_change_percentage_24h > 0 ? "limegreen" : "red"}
            strokeWidth="2"
            points={coin.sparkline_in_7d.price
              .map((p, i) => `${(i / coin.sparkline_in_7d.price.length) * 100},${30 - (p / Math.max(...coin.sparkline_in_7d.price)) * 30}`)
              .join(" ")}
          />
        </svg>
      )}
    </div>
  );
};

export default CoinCard;
