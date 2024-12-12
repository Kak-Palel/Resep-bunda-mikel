import React, { useEffect, useState } from 'react';
import RecipeCard from '../RecipeCard';

const API_URL = import.meta.env.VITE_API_BASE_URL as string;

// Define the Recipe type
type Recipe = {
  id: string;
  image: string;
  title: string;
  time: string;
  servings: string;
  difficulty: number;
};

const RecipeSlide = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Type recipes as an array of Recipe
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 8;
  const slides = [];

  // Fetch recipes from the backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const amount = 16;
        const response = await fetch(`${API_URL}/api/recipes/get_some/${amount}`);
        if (!response.ok) throw new Error("Failed to fetch recipes");
        
        const fetchedData = await response.json();

        // Map data to ensure `id` is a string and other fields are properly set
        const mappedRecipes = fetchedData.map((recipe: any) => ({
          id: recipe._id.toString(),
          image: recipe.image,
          title: recipe.title,
          time: recipe.timeToCreate,
          servings: recipe.servings,
          difficulty: recipe.difficulty
        }));

        setRecipes(mappedRecipes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipes();
  }, []);

  // Divide recipes into slides
  for (let i = 0; i < recipes.length; i += itemsPerSlide) {
    slides.push(recipes.slice(i, i + itemsPerSlide));
  }

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-4">Temukan, Buat, dan Bagikan</h2>
      <p className="text-gray-600 mb-6">Ayo lihat resep-resep paling populer minggu ini</p>
      
      <div className="relative w-full overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {slides.map((slide, slideIndex) => (
            <div key={slideIndex} className="grid grid-cols-4 grid-rows-2 gap-4 w-full shrink-0">
              {slide.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  image={recipe.image}
                  title={recipe.title}
                  time={recipe.time}
                  servings={recipe.servings}
                  difficulty={recipe.difficulty}
                />
              ))}
            </div>
          ))}
        </div>

        <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" onClick={handlePrev} disabled={currentIndex === 0}>
          &#10094;
        </button>
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" onClick={handleNext} disabled={currentIndex === slides.length - 1}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default RecipeSlide;
