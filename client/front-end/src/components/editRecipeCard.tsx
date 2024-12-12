import React from "react";
import { useNavigate } from "react-router-dom";

import getApiUrl from "../constants/config";

const API_URL = getApiUrl();

interface CardProps {
  id: string;
  image: string;
  title: string;
  time: string;
  servings: string;
  difficulty: number;
}

// RecipeCard component
const EditRecipeCard: React.FC<CardProps> = ({
  id,
  image,
  title,
  time,
  servings,
  difficulty,
}) => {
  const navigate = useNavigate();

  // Handle card click
  const handleCardClick = () => {
    window.scrollTo(0, 0);
    navigate(`/${id}`);
  };

  const handleDelete = async () => {
    const proceed = window.confirm(
      "apakah anda yakin ingin menghapus resep ini?"
    );
    if (!proceed) {
      return;
    }

    const response = await fetch(`${API_URL}/api/recipes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application",
        Authorization: `${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      console.error("Failed to delete recipe");
      return;
    }

    const data = await response.json();
    console.log(data.message);

    // delete recipe from local storage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const recipes = user.recipes.filter((recipe: any) => recipe.id !== id);
    user.recipes = recipes;
    localStorage.setItem("user", JSON.stringify(user));

    window.location.reload();
  };

  return (
    <div className="rounded-lg shadow-lg overflow-hidden bg-white m-3 w-64">
      <img
        src={image}
        alt={title}
        className="w-full h-32 object-cover"
        onClick={handleCardClick}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {/* <h3 className="text-lg font-semibold">{id}</h3> */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-green-600">🕒 {time}</div>
          <div className="text-sm text-gray-500">🍽 {servings}</div>
          <div className="text-sm text-yellow-600 my-auto px-[8px]">
            ⚡
            {difficulty === 0 ? "Mudah" : difficulty === 1 ? "Sedang" : "Sulit"}
          </div>
        </div>
        <div className="mt-2 ml-7">
          <button
            className="w-[5rem] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
            onClick={() => navigate(`/editRecipe/${id}`)}
          >
            Edit
          </button>
          <button
            className="w-[5rem] bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRecipeCard;
