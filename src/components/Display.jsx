import { useEffect, useState } from "react";

const Display = ({ 
  sequence, 
  speed, 
  isPlaying, 
  setIsPlaying, 
  userInput,
  gameStatus
}) => {
  const [currentDigit, setCurrentDigit] = useState(null);

  useEffect(() => {
    if (isPlaying && sequence.length > 0) {
      let currentIndex = 0;
      const interval = setInterval(
        () => {
          if (currentIndex < sequence.length) {
            setCurrentDigit(sequence[currentIndex]);
            currentIndex++;
          } else {
            clearInterval(interval);
            setCurrentDigit(null);
            setIsPlaying(false);
          }
        },
        speed === "slow" ? 1000 : 500
      );

      return () => clearInterval(interval);
    } else {
      setCurrentDigit(null);
    }
  }, [isPlaying, sequence, setIsPlaying, speed]);

  const displayText = () => {
    if (isPlaying && currentDigit !== null) {
      return currentDigit;
    }
    if (userInput.length > 0) {
      return userInput.join('');
    }
    if (gameStatus) {
      return gameStatus;
    }
    return "Ready?";
  };

  return (
    <div className="text-center mb-6 bg-gray-100 backdrop-blur-md shadow-sm h-16 flex items-center justify-center">
      <h2 className={`
        text-2xl font-bold tracking-wider
        ${
          gameStatus?.includes('Success') 
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600' 
            : gameStatus?.includes('Failure') 
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600' 
            : 'text-gray-700'
        }
      `}>
        {displayText()}
      </h2>
    </div>
  );
};

export default Display;