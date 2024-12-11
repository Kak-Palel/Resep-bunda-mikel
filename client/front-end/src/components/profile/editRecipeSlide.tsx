import React, { useEffect, useState } from 'react';
import EditRecipeCard from '../editRecipeCard.tsx';

type Recipe = {
  id: string;
  image: string;
  title: string;
  time: string;
  servings: string;
  difficulty: number;
};

interface ProfileRecipeCardProps {
  ids: string[];
}

const EditRecipeSlide: React.FC<ProfileRecipeCardProps> = ({ids}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 8;
  const slides: Recipe[][] = [];

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!ids || ids.length === 0) {
        console.warn('No recipesCreated available for the user.');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/recipes/get_some_by_id', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ids: ids }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }

        const fetchedData = await response.json();

        const mappedRecipes = fetchedData.map((recipe: any) => ({
          id: recipe._id,
          image: recipe.image || '',
          title: recipe.title || 'Untitled',
          time: recipe.timeToCreate || 'N/A',
          servings: recipe.servings || 'N/A',
          difficulty: recipe.difficulty || 1,
        }));

        setRecipes(mappedRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  });

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
    <div>
      <h2 className="text-3xl font-bold text-center mb-4">Edit Resep</h2>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              className="grid grid-cols-4 grid-rows-2 gap-4 w-full shrink-0"
            >
              {slide.map((recipe) => (
                <EditRecipeCard
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

        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          &#10094;
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={handleNext}
          disabled={currentIndex === slides.length - 1}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default EditRecipeSlide;
