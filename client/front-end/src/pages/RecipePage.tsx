import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { recipeData } from "../constants/recipeData";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// Format jam:menit:waktu
const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // Resep berdasarkan id
  const recipe = recipeData.find((r) => r.id === id);
  const [currentStep, setCurrentStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  // Timer
  const [timer, setTimer] = useState<number | null>(null);

  // Kalau resep tidak ada, return error page
  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  // Steps memasak. Setiap kali tombol start di tekan, reset ke step pertama
  const startSteps = () => {
    setIsStarted(true);
    // Reset ke step pertama
    setCurrentStep(0); 
    if (recipe.steps[0].time > 0) {
      // Mulai timer jika ada
      setTimer(recipe.steps[0].time * 60); 
    } else {
      setTimer(null);
    }
  };

  // Untuk transisi ke step selanjutnya
  const handleNextStep = () => {
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
      const nextStep = recipe.steps[currentStep + 1];
      setTimer(nextStep.time > 0 ? nextStep.time * 60 : null);
    } else {
      // Jika sudah mencapai step terakhir, clear step
      setIsStarted(false); 
      setTimer(null);
    }
  };

  // useEffect untuk countdown timer dalam satuan detik
  useEffect(() => {
    if (timer !== null && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev && prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(interval); // Clear interval ketika terjadi perubahan
    }
  }, [timer]);

  return (
    <div>
      <Navbar />

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover mb-6 rounded-lg"
        />
        <p className="mb-6">{recipe.description}</p>

        {isStarted ? (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Step {currentStep + 1}:</h2>
            <p className="mb-4">{recipe.steps[currentStep].instruction}</p>

            {timer !== null && (
              <div className="text-2xl font-bold text-red-600 mb-4">
                Time Remaining: {formatTime(timer)}
              </div>
            )}

            <button
              onClick={handleNextStep}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              {currentStep < recipe.steps.length - 1 ? "Next Step" : "Finish"}
            </button>
          </div>
        ) : (
          <button
            onClick={startSteps}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Start Cooking
          </button>
        )}
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default RecipePage;
