import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RecipeSlide from "../components/home/RecipeSlide";
import AuthorLogo from "../assets/authorLogo.svg";

// For cooking instructions
interface Step {
  instruction: string;
  time: number; // int or float for the amount of time required
}

// Define the type for the recipe data
interface Recipe {
  id: string;
  author: string;
  image: string;
  title: string;
  description: string;
  ingredients: string[];
  time: string;
  servings: string;
  difficulty: number;
  steps: Step[]; // Add steps as an array of Step
}

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/recipes/get/${id}`);
        if (!response.ok) throw new Error("Failed to fetch recipe");
        const data = await response.json();
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        setError("Recipe not found");
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const startSteps = () => {
    if (recipe && recipe.steps.length > 0) {
      setIsStarted(true);
      setCurrentStep(0);
      setTimer(recipe.steps[0].time > 0 ? recipe.steps[0].time * 60 : null);
    }
  };

  const handleNextStep = () => {
    if (recipe && currentStep < recipe.steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
      const nextStep = recipe.steps[currentStep + 1];
      setTimer(nextStep.time > 0 ? nextStep.time * 60 : null);
    } else {
      setIsStarted(false);
      setTimer(null);
    }
  };

  useEffect(() => {
    if (timer !== null && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev && prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  if (loading) return <div>Loading...</div>;
  if (error || !recipe) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-[6rem] px-[8rem]">
        <div className="flex">
          <div className="flex-row w-[50%] mx-auto my-auto">
            <div className="flex items-center justify-center">
              <p className="text-3xl font-bold">{recipe.title}</p>
            </div>
            <div className="flex items-center justify-center mt-[1rem]">
              <div className="text-sm text-green-600 my-auto px-[8px]">🕒 {recipe.time}</div>
              <div className="text-sm text-gray-500 my-auto px-[8px]">🍽 {recipe.servings}</div>
              <div className="text-sm text-yellow-600 my-auto px-[8px]">
                ⚡{recipe.difficulty === 0 ? "Mudah" : recipe.difficulty === 1 ? "Sedang" : "Sulit"}
              </div>
            </div>
            <div className="mt-[2rem] flex justify-center items-center">
              <img src={AuthorLogo} alt="Author Logo" />
              <p className="mx-[1rem]">{recipe.author}</p>
            </div>
          </div>
          <div className="w-[50%]">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 object-cover mb-6 rounded-lg border-[4px] border-dark"
            />
          </div>
        </div>

        <p className="text-2xl font-semibold mt-2">Deskripsi</p>
        <p className="mt-2 text-gray-4">{recipe.description}</p>

        <p className="text-2xl font-semibold mt-6">Bahan-bahan</p>
        <ul className="list-inside list-decimal text-gray-4 mt-2">
          {recipe.ingredients.map((ingredient: string, index: number) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <p className="text-2xl font-semibold mt-6">Instruksi</p>
        {isStarted ? (
          <div className="rounded-lg mt-2 h-[10rem] overflow-y-auto">
            <h2 className="text-xl text-gray-2 font-semibold mt-2">Langkah {currentStep + 1}:</h2>
            <p className="mt-2 text-gray-4">{recipe.steps[currentStep].instruction}</p>
            {timer !== null && (
              <div className="text-lg font-bold text-red-600 mt-2">
                [Waktu yang diperlukan: {formatTime(timer)}]
              </div>
            )}
            <button
              onClick={handleNextStep}
              className="bg-orange text-white px-4 py-2 font-medium rounded-lg mt-2"
            >
              {currentStep < recipe.steps.length - 1 ? "Langkah selanjutnya" : "Hidangkan!"}
            </button>
          </div>
        ) : (
          <div className="h-[10rem]">
            <button
              onClick={startSteps}
              className="bg-orange font-medium text-white px-4 py-2 rounded-lg mt-2"
            >
              Mulai memasak!
            </button>
          </div>
        )}
      </div>

      <div className="w-full pt-[1rem] px-[8rem]">
        <RecipeSlide />
      </div>
      <div className="mt-[5rem] w-full">
        <Footer />
      </div>
    </div>
  );
};

export default RecipePage;
