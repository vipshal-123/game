import React, { useState, useEffect } from 'react';

const SpatialMemoryTest = () => {
  const [span, setSpan] = useState(5);
  const [speed, setSpeed] = useState('slow');
  const [mode, setMode] = useState('forward');
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStatus, setGameStatus] = useState('');
  const [highlightedCell, setHighlightedCell] = useState(null);

  const grid = Array(9).fill(null);

  const generateSequence = () => {
    const newSequence = [];
    while (newSequence.length < span) {
      const cell = Math.floor(Math.random() * 9);
      if (!newSequence.includes(cell)) {
        newSequence.push(cell);
      }
    }
    return newSequence;
  };

  const startTest = () => {
    const newSequence = generateSequence();
    setSequence(newSequence);
    setUserSequence([]);
    setGameStatus('');
    setIsPlaying(true);
  };

  const handleCellClick = (index) => {
    if (!isPlaying && gameStatus !== 'Success! 🎉') {
      const newUserSequence = [...userSequence, index];
      setUserSequence(newUserSequence);

      if (newUserSequence.length === sequence.length) {
        checkSequence(newUserSequence);
      }
    }
  };

  const checkSequence = (userSeq) => {
    const compareSequence = mode === 'forward' ? sequence : [...sequence].reverse();
    const isCorrect = userSeq.every(
      (cell, index) => cell === compareSequence[index]
    );
    setGameStatus(isCorrect ? 'Success! 🎉' : 'Wrong sequence! 😢');
  };

  useEffect(() => {
    if (isPlaying && sequence.length > 0) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < sequence.length) {
          setHighlightedCell(sequence[currentIndex]);
          currentIndex++;
        } else {
          setHighlightedCell(null);
          setIsPlaying(false);
          clearInterval(interval);
        }
      }, speed === 'slow' ? 1000 : 500);

      return () => clearInterval(interval);
    }
  }, [isPlaying, sequence, speed]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border-4 ">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Spatial Memory Test
        </h1>

        <div className="mb-6 text-center">
          <p className="text-gray-600 mb-4">
            Remember the sequence shown in the grid and repeat it {mode === 'reverse' ? 'in reverse order' : 'in the same order'}
          </p>
          <div className="text-xl font-bold text-gray-700 mb-4">
            {isPlaying ? 'Watch the sequence...' : gameStatus || 'Ready to start'}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {grid.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              disabled={isPlaying}
              className={`
                w-full h-24 rounded-lg transition-all duration-200
                ${
                  highlightedCell === index
                    ? 'bg-indigo-500 scale-95'
                    : userSequence.includes(index)
                    ? 'bg-purple-300'
                    : 'bg-gray-200 hover:bg-gray-300'
                }
                ${isPlaying ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
            <button
              onClick={() => setSpan(Math.max(span - 1, 3))}
              className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200"
            >
              -
            </button>
            <span className="text-gray-700 font-medium">Span: {span}</span>
            <button
              onClick={() => setSpan(Math.min(span + 1, 9))}
              className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200"
            >
              +
            </button>
          </div>
          <button
            onClick={() => setSpeed(speed === 'slow' ? 'fast' : 'slow')}
            className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
          >
            {speed === 'slow' ? 'Fast' : 'Slow'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={startTest}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white py-3 rounded-lg hover:from-green-500 hover:to-green-700 transition-all"
          >
            Start Test
          </button>
          <button
            onClick={() => setMode(mode === 'forward' ? 'reverse' : 'forward')}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all"
          >
            {mode === 'forward' ? 'Switch to Reverse' : 'Switch to Forward'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpatialMemoryTest;