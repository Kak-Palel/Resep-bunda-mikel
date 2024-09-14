import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  time: string;
  servings: string;
  difficulty: string;
}

// RecipeCard component
const RecipeCard: React.FC<CardProps> = ({ id, image, title, description, time, servings, difficulty }) => {
  const navigate = useNavigate();

  // Handle card click
  const handleCardClick = () => {
    // Scroll to top before navigating
    window.scrollTo(0, 0);

    // Navigate to the specific recipe page
    navigate(`/${id}`);
  };

  return (
    <div
      className="rounded-lg shadow-lg overflow-hidden bg-white m-3 w-64 cursor-pointer"
      onClick={handleCardClick} // Navigate on click
    >
      <img src={image} alt={title} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-green-600">🕒 {time}</div>
          <div className="text-sm text-gray-500">🍽 {servings}</div>
          <div className="text-sm text-yellow-600">⚡ {difficulty}</div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
