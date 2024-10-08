import React, { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig.js';

const InputPage: React.FC = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<{ step: string; time: number }[]>([{ step: '', time: 0 }]);
  const [image, setImage] = useState<string>('https://via.placeholder.com/150'); // Store the image URL

  // To check either the user is logged in or not before entering the page
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log('Auth state changed:', user);
      if (user) {
        console.log('Setting authenticated to true');
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        alert("You need to log in first to access this page.");
        navigate('/home');
      }
    });
  }, [navigate]);

  if (!authenticated) {
    return <div></div>; // or return null, or a loading indicator, etc.
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Update the image with the uploaded image
      };
      reader.readAsDataURL(file); // Read the image as a data URL
    }
  };

  return (
    <div className="bg-light w-full min-h-screen overflow-clip">
      <Navbar />

      <div className="max-w-4xl mx-auto py-[6rem] px-[8rem]">
        <h1 className="text-3xl font-bold mb-6">Bagikan Resepmu!</h1>

        <form className="space-y-6">
          {/* Recipe Title */}
          <div>
            <label className="block text-2xl font-medium mb-2">Nama Resep:</label>
            <input
              type="text"
              className="w-full p-2 border-[2px] rounded-lg border-dark_green focus:border-orange focus:outline-none"
              placeholder="Masukkan nama resep"
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
              placeholder="Masukkan deskripsi resep"
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
              onClick={handleAddIngredient}
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
            <input type="number" className="w-full p-2 border-[2px] rounded-lg border-dark_green focus:border-orange focus:outline-none" placeholder="Waktu dalam menit" />
          </div>

          {/* Servings */}
          <div>
            <label className="block text-2xl font-medium mb-2">Porsi:</label>
            <input type="number" className="w-full p-2 border-[2px] rounded-lg border-dark_green focus:border-orange focus:outline-none" placeholder="Jumlah sajian" />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-2xl font-medium mb-2">Tingkat Kesulitan:</label>
            <select
              className="w-full p-2 border-[2px] rounded-lg border-dark_green focus:border-orange focus:outline-none"
              defaultValue=""
            >
              <option value="0">Mudah</option>
              <option value="1">Sedang</option>
              <option value="2">Sulit</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className="px-4 py-2 bg-orange font-medium text-white rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default InputPage;
