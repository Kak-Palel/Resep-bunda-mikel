import React, { useState } from 'react';
import { recipeData } from '../../constants/recipeData'; // Import the recipe data
import RecipeCard from '../RecipeCard';  // Assuming RecipeCard is in the same folder

const RecipeSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 8;
  const slides = [];
  
  for (let i = 0; i < recipeData.length; i += itemsPerSlide) {
    slides.push(recipeData.slice(i, i + itemsPerSlide));
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
    <div className="max-w-6xl">
      <h2 className="text-3xl font-bold mb-4">Temukan, Buat, dan Bagikan</h2>
      <p className="text-gray-600 mb-6">Ayo lihat resep-resep paling populer minggu ini</p>
      
      <div className="relative w-full overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {slides.map((slide, slideIndex) => (
            <div key={slideIndex} className="grid grid-cols-4 grid-rows-2 gap-4 w-full shrink-0">
              {slide.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  id={recipe.id}
                  image={recipe.image}
                  title={recipe.title}
                  description={recipe.description}
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
