import React from "react";

const CurrencySwitcher = ({ setSelectedCurrency }) => {
  const handleChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  return (
    <select
      onChange={handleChange}
      className="bg-gray-800 text-gray-200 px-3 py-2 rounded"
    >
      <option value="usd">USD ($)</option>
      <option value="eur">EUR (€)</option>
      <option value="ngn">NGN (₦)</option>
      <option value="gbp">GBP (£)</option>
      <option value="jpy">JPY (¥)</option>
    </select>
  );
};

export default CurrencySwitcher;
