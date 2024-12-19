const CalculatorUI = ({ onKeyPress, isInputEnabled }) => {
  const renderKeys = () => {
    const keys = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "clear"];

    return keys.map((key) => (
      <button
        key={key}
        onClick={() => onKeyPress(key)}
        disabled={!isInputEnabled}
        className={`
          w-full h-16 rounded-lg text-xl font-bold transition-all
          ${
            isInputEnabled
              ? "bg-indigo-500 text-white hover:bg-indigo-600 active:scale-95 shadow-md"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }
        `}
      >
        {key}
      </button>
    ));
  };

  return <div className="grid grid-cols-3 gap-3">{renderKeys()}</div>;
};

export default CalculatorUI;
