// src/constants/recipeData.ts
import CreamySalad from '../assets/creamySalad.jpg';
import TofuTomato from '../assets/tofuTomato.jpeg';
import CrunchyPotatoes from '../assets/crunchyPotatoes.jpeg';
import MushroomSoup from '../assets/mushroomSoup.jpeg';
import RaspberryCake from '../assets/raspberryCake.jpg';
import BeefTeriyaki from '../assets/beefTeriyaki.jpg';

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
  difficulty: string;
  steps: Step[]; // Add steps as an array of Step
}

// Recipe data array
export const recipeData: Recipe[] = [
  {
    image: CreamySalad,
    author: 'Pookie Bear',
    title: 'Salad Creamy',
    description: 'Salad creamy yang cocok untuk memulai hari',
    ingredients: [
      "Love",
      "Hug",
      "Kiss",
      "Palel",
    ],
    time: '10 menit',
    servings: '2 porsi',
    difficulty: 'Mudah',
    id: '001',
    steps: [
      { instruction: 'Prepare ingredients', time: 2 },
      { instruction: 'Mix dressing', time: 3.5 },
      { instruction: 'Toss salad', time: 4 },
    ],
  },
  {
    image: TofuTomato,
    author: 'Pookie Bear',
    title: 'Sup Tofu Tomat',
    description: 'Sup hangat isi tofu dan tomat',
    ingredients: [
      "Love",
      "Hug",
      "Kiss",
      "Palel",
    ],
    time: '15 menit',
    servings: '3 porsi',
    difficulty: 'Mudah',
    id: '002',
    steps: [
      { instruction: 'Prepare ingredients', time: 2 },
      { instruction: 'Mix dressing', time: 3.5 },
      { instruction: 'Toss salad', time: 4 },
    ],
  },
  {
    image: CrunchyPotatoes,
    author: 'Pookie Bear',
    title: 'Kentang Crispy',
    description: 'Kentang panggang yang cocok untuk ngemil',
    ingredients: [
      "Love",
      "Hug",
      "Kiss",
      "Palel",
    ],
    time: '10 menit',
    servings: '2 porsi',
    difficulty: 'Mudah',
    id: '003',
    steps: [
      { instruction: 'Prepare ingredients', time: 2 },
      { instruction: 'Mix dressing', time: 3.5 },
      { instruction: 'Toss salad', time: 4 },
    ],
  },
  {
    image: MushroomSoup,
    author: 'Pookie Bear',
    title: 'Mushroom Soup',
    description: 'Sup jamur dengan rempah yang nikmat',
    ingredients: [
      "Love",
      "Hug",
      "Kiss",
      "Palel",
    ],
    time: '10 menit',
    servings: '2 porsi',
    difficulty: 'Mudah',
    id: '004',
    steps: [
      { instruction: 'Prepare ingredients', time: 2 },
      { instruction: 'Mix dressing', time: 3.5 },
      { instruction: 'Toss salad', time: 4 },
    ],
  },
  {
    image: RaspberryCake,
    author: 'Pookie Bear',
    title: 'Kue Raspberry',
    description: 'Kue lembut rasa raspberry, cocok untuk menghilangkan stress',
    ingredients: [
      "Love",
      "Hug",
      "Kiss",
      "Palel",
    ],
    time: '15 menit',
    servings: '3 porsi',
    difficulty: 'Sulit',
    id: '005',
    steps: [
      { instruction: 'Prepare ingredients', time: 2 },
      { instruction: 'Mix dressing', time: 3.5 },
      { instruction: 'Toss salad', time: 4 },
    ],
  },
  {
    image: BeefTeriyaki,
    author: 'Pookie Bear',
    title: 'Beef Teriyaki',
    description: 'Daging sapi empuk yang dimasak dengan bumbu teriyaki',
    ingredients: [
      "Love",
      "Hug",
      "Kiss",
      "Palel",
    ],
    time: '10 menit',
    servings: '2 porsi',
    difficulty: 'Sedang',
    id: '006',
    steps: [
      { instruction: 'Prepare ingredients', time: 2 },
      { instruction: 'Mix dressing', time: 3.5 },
      { instruction: 'Toss salad', time: 4 },
    ],
  },
  // More recipes can be added here
];
