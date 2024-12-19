import { useState } from "react";
import { generateSequence } from "../utils/generateSequence";
import CalculatorUI from "./CalculatorUI";
import Display from "./Display";
import isEmpty from "is-empty";

const GameController = () => {
  const [digitCount, setDigitCount] = useState(3);
  const [speed, setSpeed] = useState("slow");
  const [sequence, setSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInput, setUserInput] = useState([]);
  const [gameStatus, setGameStatus] = useState("");
  const [isCheckEnabled, setIsCheckEnabled] = useState(false);

  const startNewTest = (count) => {
    const digits = count?.type ? digitCount : count;
    console.log("digits: ", digits);
    const newSequence = generateSequence(digits);
    console.log("newSequence: ", newSequence);
    setSequence(newSequence);
    setUserInput([]);
    setGameStatus("");
    setIsPlaying(true);
    setIsCheckEnabled(false);
  };

  const handleKeyPress = (digit) => {
    if (digit === "clear") {
      setUserInput([]);
      setIsCheckEnabled(false);
      setGameStatus("");
      return;
    }

    if (!isPlaying && userInput.length < digitCount) {
      const newInput = [...userInput, digit];
      setUserInput(newInput);

      if (newInput.length === digitCount) {
        setIsCheckEnabled(true);
      }
    }
  };

  const checkSequence = () => {
    if (userInput.length === digitCount) {
      const isCorrect = userInput.every(
        (digit, index) => digit === sequence[index]
      );
      setGameStatus(isCorrect ? "Success! 🎉" : "Failure! 😢");
      setIsCheckEnabled(false);
    }
  };

  const forwardTest = () => {
    if (digitCount < 9) {
      setDigitCount(digitCount + 1);
      startNewTest(digitCount + 1);
    }
  };

  return (
    <div className=" flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border-4">
        {/* <h1 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Memory Challenge
        </h1> */}

        <Display
          sequence={sequence}
          speed={speed}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          userInput={userInput}
          gameStatus={gameStatus}
        />

        <div className="flex justify-between items-center mb-6 space-x-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDigitCount(Math.max(digitCount - 1, 3))}
              className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors"
            >
              -
            </button>
            <span className="text-lg font-semibold text-gray-700">
              Digits: {digitCount}
            </span>
            <button
              onClick={() => setDigitCount(Math.min(digitCount + 1, 9))}
              className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={() => setSpeed(speed === "slow" ? "fast" : "slow")}
            className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
          >
            {speed === "slow" ? "Fast Mode" : "Slow Mode"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            onClick={startNewTest}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white py-3 rounded-lg hover:from-green-500 hover:to-green-700 transition-all transform hover:scale-105"
          >
            New Test
          </button>
          <button
            onClick={forwardTest}
            disabled={digitCount >= 9}
            className={`
              py-3 rounded-lg transition-all transform hover:scale-105
              ${
                digitCount >= 9
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700"
              }
            `}
          >
            Forward
          </button>
        </div>

        <div className="mb-6">
          <button
            onClick={checkSequence}
            disabled={!isCheckEnabled}
            className={`
              w-full py-3 rounded-lg transition-all
              ${
                isCheckEnabled
                  ? "bg-gradient-to-r from-purple-400 to-purple-600 text-white hover:from-purple-500 hover:to-purple-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            {gameStatus?.includes("Failure") && !isEmpty(sequence)
              ? sequence.join(" ")
              : "Check Sequence"}
          </button>
        </div>

        <CalculatorUI onKeyPress={handleKeyPress} isInputEnabled={!isPlaying} />
      </div>
    </div>
  );
};

export default GameController;
