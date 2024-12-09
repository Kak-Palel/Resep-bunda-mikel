import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RecipeSlide from "../components/home/RecipeSlide";
import AuthorLogo from "../assets/authorLogo.svg";
import CommentCard from "../components/commentCard";

// For cooking instructions
interface Step {
  instruction: string;
  time: number; // int or float for the amount of time required
}

// Define comment type
interface Comment {
  comment: string;
  user: string;
  username: string;
}

// Define the type for the recipe data
interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: Step[]; // Add steps as an array of Step
  time: string;
  difficulty: number;
  servings: string;
  image: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
  author: string;
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
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
  const fetchRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/recipes/get/${id}`);
      if (!response.ok) throw new Error("failed to fetch recipe: " + response.status.toString());
      
      const data = await response.json();

      // Transform steps to match the Step interface
      const transformedSteps = data.instructions.map((instruction: any) => ({
        instruction: instruction.step || "No instruction provided",
        time: instruction.time || 0, // Default to 0 if no time is provided
      }));

      // Transform comments to match the Comment interface
      const transformedComments = data.comments.map((comment: Comment) => ({
        comment: comment.comment,
        user: comment.user,
        username: comment.username,
      }));

      console.log("Data:", data); // This will log the previous state
      // fetch author
      const authorResponse = await fetch(`http://localhost:8080/api/user/profile_by_id/${data.createdBy}`);
      if (!authorResponse.ok)
      {
        setRecipe({
          id: data._id.$oid,
          title: data.title,
          description: data.description,
          ingredients: data.ingredients,
          steps: transformedSteps,
          time: `${Math.floor(data.timeToCreate / 60)}h ${data.timeToCreate % 60}m`,
          difficulty: data.difficulty,
          servings: data.servings.toString(),
          image: data.image,
          likes: data.likes,
          comments: transformedComments,
          createdAt: new Date(data.createdAt.$date),
          author: "Unknown",
        });
      }
      else
      {
        const authorData = await authorResponse.json();
        setRecipe({
          id: data._id.$oid,
          title: data.title,
          description: data.description,
          ingredients: data.ingredients,
          steps: transformedSteps,
          time: `${Math.floor(data.timeToCreate / 60)}h ${data.timeToCreate % 60}m`,
          difficulty: data.difficulty,
          servings: data.servings.toString(),
          image: data.image,
          likes: data.likes,
          comments: transformedComments,
          createdAt: new Date(data.createdAt.$date),
          author: authorData.username,
        });
      }

      console.log("Recipe:", recipe); // This will log the previous state

      setLoading(false);
    } catch (error) {
      setError("error fetching recipe: " + error);
      setLoading(false);
    }
  };
  fetchRecipe();
  }, [id]);

  const navigate = useNavigate();

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/social/comment`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify({
          'recipe_id': `${id}`,
          'comment': `${comment}`,
        }),
      });
      if (!response.ok) throw new Error(response.status.toString());  

    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  }

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
              <p
                className="mx-[1rem]"
                style={{ cursor: 'pointer' }}
                onClick={() => { recipe.author === "Unknown" ? alert("unknown author") : navigate(`/profile/${recipe.author}`); }}
                >{recipe.author}
              </p>
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

        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Komentar</h2>
          {recipe.comments.map((comment, index) => (
            <CommentCard username={comment.username} userID={comment.user} comment={comment.comment} />
          ))}
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Tambahkan Komentar</h2>
          <form>
            <textarea
              className="w-full h-24 mt-4 p-2 border border-gray-300 rounded-lg"
              placeholder="Tulis komentar Anda"
              onChange={(e) => setComment(e.target.value)}
              onKeyPress={(e) => {e.key === 'Enter' && e.preventDefault();}}
            ></textarea>
            <button
              className="bg-orange text-white px-4 py-2 font-medium rounded-lg mt-2"
              onClick={() => {if(comment){handleCommentSubmit();}}}
              >Kirim
            </button>
          </form>
        </div>
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
