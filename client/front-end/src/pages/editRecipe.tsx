import React, { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL as string;

const EDIT_ROUTE = `${API_URL}/api/recipes/update/`;

const EditRecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState<string>('recipe'); // Store the image URL
  const [description, setDescription] = useState<string>(''); // Store the description
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<{ step: string; time: number }[]>([{ step: '', time: 0 }]);
  const [cookingtime, setCookingTime] = useState<number>(0); // Store the image URL
  const [difficulty, setDifficulty] = useState<number>(0); // Store the image URL
  const [servings, setServings] = useState<number>(0); // Store the image URL
  const [image, setImage] = useState<string>('https://via.placeholder.com/150'); // Store the image URL

  const navigate = useNavigate();

  // To check either the user is logged in or not before entering the page
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    console.log('Token in localStorage:', token);

    const fetchData = async () => {
      const recipeResponse = await fetch(`${API_URL}/api/recipes/get/${id}`, {});
      
      if (!recipeResponse.ok) {
        alert('Failed to fetch recipe');
        return;
      }

      const recipeData = await recipeResponse.json();

      setTitle(recipeData.title);
      setDescription(recipeData.description);
      setIngredients(recipeData.ingredients);
      setSteps(recipeData.instructions);
      setCookingTime(recipeData.timeToCreate);
      setDifficulty(recipeData.difficulty);
      setServings(recipeData.servings);
      setImage(recipeData.image);
    };

    fetchData();
  }, []);

  // Handle title change
  const handleTitleChange = (value: string) => {
    // Update the title
    setTitle(value);
  };

  const handleDescriptionChange = (value: string) => {
    // Update the description
    setDescription(value);
  }

  // Handle difficulty change
  const handleDifficultyChange = (value: number) => {
    // Update the difficulty
    setDifficulty(value);
  }

  const handleServingsChange = (value: number) => {
    // Update the servings
    setServings(value);
  }

  // Add ingredient
  const handleAddIngredient = () => setIngredients([...ingredients, '']);

  // Remove ingredient (ensure at least one remains)
  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const updatedIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(updatedIngredients);
    }
  };

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  // Add step
  const handleAddStep = () => setSteps([...steps, { step: '', time: 0 }]);

  // Remove step (ensure at least one remains)
  const handleRemoveStep = (index: number) => {
    if (steps.length > 1) {
      const updatedSteps = steps.filter((_, i) => i !== index);
      setSteps(updatedSteps);
    }
  };

  const handleStepChange = (index: number, field: string, value: any) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setSteps(updatedSteps);
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `${localStorage.getItem('jwtToken')}`
          },
          body: formData
        }).then(response => {
          if (response.status === 200) {
            response.json().then(data => {
              setImage(data.url);
            });
          } else {
            alert('Error uploading image' + response.status);
            console.log('Error:', response);
          }
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // Handle cooking time change
  const handleCookingTimeChange = (value: string) => {
    // Update the cooking time
    const cookingtime = parseInt(value);
    setCookingTime(cookingtime);
  };

  // Submit the recipe
  const handleSubmit = () => {
    const recipe = {
      title: title, // Add the recipe title
      description: description, // Add the recipe description
      ingredients: ingredients.filter(ingredient => ingredient.trim() !== ""), // Remove empty ingredients
      instructions: steps.filter(step => step.step.trim() !== ""), // Remove empty steps
      timeToCreate: cookingtime, // Add the cooking time
      difficulty: difficulty, // Add the difficulty level
      servings: servings, // Add the servings
      image: image // Add the image URL
    };

    console.log('Submitting recipe...');
    console.log(JSON.stringify(recipe));
    console.log(`${EDIT_ROUTE}${id}`)
    fetch(`${EDIT_ROUTE}${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwtToken')}`
      },
      body: JSON.stringify(recipe)
    }).then(response => {
      if (response.status === 200) {
        alert('Recipe updated successfully!');
        navigate('/home');
      } else {
        console.log('Error:', response);
      }
    }).catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="bg-light w-full min-h-screen overflow-clip">
      <Navbar />

      <div className="max-w-4xl mx-auto py-[6rem] px-[8rem]">
        <h1 className="text-3xl font-bold mb-6">Modifikasi Resepmu</h1>

        <form className="space-y-6">
          {/* Recipe Title */}
          <div>
            <label className="block text-2xl font-medium mb-2">Nama Resep:</label>
            <input
              type="text"
              className="w-full p-2 border-[2px] rounded-lg border-dark_green focus:border-orange focus:outline-none"
              placeholder="Masukkan nama resep"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              onKeyPress={(e) => {e.key === 'Enter' && e.preventDefault();}}
            />
          </div>

          {/* Recipe Image */}
          <div>
            <label className="block text-2xl font-medium mb-2">Foto Makanan / Minuman:</label>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 border rounded overflow-hidden">
                {/* Display uploaded image or placeholder */}
                <img src={image} alt="Recipe" className="object-cover w-full h-full" />
              </div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                <span className="p-2 bg-orange text-white font-medium rounded-lg">Tambahkan Foto</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-2xl font-medium mb-2">Deskripsi:</label>
            <textarea
              className="w-full p-2 border-[2px] rounded-lg border-dark_green focus:border-orange focus:outline-none"
              rows={4}
              value={description}
              placeholder="Masukkan deskripsi resep"
              onChange={(e) => handleDescriptionChange(e.target.value)}
              onKeyPress={(e) => {e.key === 'Enter' && e.preventDefault();}}
            ></textarea>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-2xl font-medium mb-2">Bahan-bahan:</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  className="w-full p-2 border-[2px] rounded-lg border-dark_green focus:border-orange focus:outline-none"
                  value={ingredient}
                  placeholder="Masukkan bahan-bahan"
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  onKeyPress={(e) => {e.key === 'Enter' && e.preventDefault();}}
                />
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    className="text-red-600"
                    onClick={() => handleRemoveIngredient(index)} 
                  >
                    Hapus
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="text-orange"
              onClick={ () => handleAddIngredient()}
            >
              + Tambah Bahan
            </button>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-2xl font-medium mb-2">Instruksi:</label>
            {steps.map((step, index) => (
              <div key={index} className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <span>Langkah {index + 1}</span>
                  <input
                    type="text"
                    className="w-full p-2 border-[2px] rounded-lg border-dark_green focus:border-orange focus:outline-none"
                    value={step.step}
                    placeholder="Masukkan instruksi"
                    onChange={(e) => handleStepChange(index, 'step', e.target.value)}
                  />
                  {steps.length > 1 && (
                    <button
                      type="button"
                      className="text-red-600"
                      onClick={() => handleRemoveStep(index)}
                    >
                      Hapus
                    </button>
                  )}
                </div>
                <input
                  type="number"
                  className="w-full p-2 border-[2px] rounded-lg border-dark_green focus:border-orange focus:outline-none"
                  value={step.time}
                  placeholder="Waktu dalam menit"
                  onChange={(e) => handleStepChange(index, 'time', parseFloat(e.target.value))}
                />
              </div>
            ))}
            <button type="button" className="text-orange" onClick={handleAddStep}>
              + Tambah langkah
            </button>
          </div>

          {/* Cooking Time */}
          <div>
            <label className="block text-2xl font-medium mb-2">Waktu Memasak:</label>
            <input
              type="number"
              className="w-full p-2 border-[2px] rounded-lg border-dark_green focus:border-orange focus:outline-none"
              placeholder="Waktu dalam menit"
              value={cookingtime}
              onChange={(e) => handleCookingTimeChange(e.target.value)}
              onKeyPress={(e) => {e.key === 'Enter' && e.preventDefault();}}
              />
          </div>

          {/* Servings */}
          <div>
            <label className="block text-2xl font-medium mb-2">Porsi:</label>
            <input
              type="number"
              className="w-full p-2 border-[2px] rounded-lg border-dark_green focus:border-orange focus:outline-none"
              placeholder="Jumlah sajian"
              value={servings}
              onChange={(e) => handleServingsChange(parseInt(e.target.value))}
              onKeyPress={(e) => {e.key === 'Enter' && e.preventDefault();}}
              />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-2xl font-medium mb-2">Tingkat Kesulitan:</label>
            <select
              className="w-full p-2 border-[2px] rounded-lg border-dark_green focus:border-orange focus:outline-none"
              value={difficulty}
              onChange={(e) => handleDifficultyChange(parseInt(e.target.value))}
            >
              <option value="0">Mudah</option>
              <option value="1">Sedang</option>
              <option value="2">Sulit</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="button"
              className="px-4 py-2 bg-orange font-medium text-white rounded-lg"
              onClick={() => handleSubmit()}
            >
              Update
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default EditRecipePage;
