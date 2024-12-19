import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameController from "../components/GameController";
import SpatialMemoryTest from "../components/SpatialMemoryTest";

const Home = () => {
    const [activeGame, setActiveGame] = useState('number');

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-white rounded-lg shadow-md p-2 flex space-x-2">
              <button
                onClick={() => setActiveGame('number')}
                className={`flex-1 py-2 rounded-md transition-all ${
                  activeGame === 'number'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Number Memory
              </button>
              <button
                onClick={() => setActiveGame('spatial')}
                className={`flex-1 py-2 rounded-md transition-all ${
                  activeGame === 'spatial'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Spatial Memory
              </button>
            </div>
          </div>
          
          {activeGame === 'number' ? <GameController /> : <SpatialMemoryTest />}
        </div>
      </div>
    );
};

export default Home;
