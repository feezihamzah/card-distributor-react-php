// Import necessary React and Framer Motion functions
import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  // React state variables
  const [people, setPeople] = useState(""); // stores user input (number of people)
  const [hands, setHands] = useState([]);   // stores distributed card hands
  const [error, setError] = useState("");   // stores error message
  const [showCards, setShowCards] = useState(false); // controls card flip animation

  // Function to call PHP backend and fetch shuffled cards
  const fetchCards = async () => {
    const n = parseInt(people); // convert input to number

    // Validate input
    if (!n || n <= 0) {
      setError("Please enter a valid number.");
      setHands([]);
      return;
    }

    try {
      // Call your PHP API with ?n=value
      const res = await fetch(`http://localhost/cards/distribute.php?n=${n}`);
      const data = await res.json();

      // If error returned by PHP
      if (data.error) {
        setError(data.error);
        setHands([]);
      } else {
        // Success: store card hands in state
        setHands(data.hands);
        setError("");
        setShowCards(false); // reset card state
        setTimeout(() => setShowCards(true), 500); // delay then show cards with animation
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect to backend.");
      setHands([]);
    }
  };

  // Reset the app (clear all states)
  const reset = () => {
    setPeople("");
    setHands([]);
    setError("");
    setShowCards(false);
  };

  return (
    <div className="p-4 text-center font-sans text-white bg-green-900 min-h-screen">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        Card Distributor (React + PHP)
      </h1>

      {/* Input + buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-4">
        <input
          type="number"
          placeholder="Number of people"
          className="p-2 rounded text-black"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        />
        <button
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-800 text-white"
          onClick={fetchCards}
        >
          Distribute
        </button>
        <button
          className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-700 text-white"
          onClick={reset}
        >
          Reset
        </button>
      </div>

      {/* Error display */}
      {error && <p className="text-red-300 mb-4">{error}</p>}

      {/* Display hands for each person */}
      <div className="space-y-6 max-w-6xl mx-auto px-2">
        {hands.map((hand, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow text-black">
            {/* Label for person */}
            <strong className="block mb-2 text-lg">Person {idx + 1}</strong>

            {/* Card row */}
            <div className="flex flex-wrap justify-center gap-2">
              {hand.map((card, i) => (
                // Animate card flip using Framer Motion
               <div key={i} className="w-[60px] h-[90px] perspective">
				  <motion.div
					className="card-inner w-full h-full relative"
					animate={{ rotateY: showCards ? 180 : 0 }}
					initial={{ rotateY: 0 }}
					transition={{ delay: i * 0.05, duration: 0.6 }}
				  >
					{/* Back face */}
					<img
					  src="/cards/back.png"
					  alt="back"
					  className="card-back w-full h-full absolute rounded shadow"
					/>

					{/* Front face (actual card image) */}
					<img
					  src={`/cards/${card}.png`}
					  alt={card}
					  className="card-front w-full h-full absolute rounded shadow"
					/>
				  </motion.div>
				</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CSS for 3D flip effect */}
      <style>{`
	  .perspective {
		perspective: 1000px;
	  }

	  .card-inner {
		transform-style: preserve-3d;
		position: relative;
	  }

	  .card-front,
	  .card-back {
		backface-visibility: hidden;
		transform-style: preserve-3d;
	  }

	  .card-front {
		transform: rotateY(180deg);
	  }

	  .card-back {
		transform: rotateY(0deg);
	  }
	`}</style>
    </div>
  );
}
