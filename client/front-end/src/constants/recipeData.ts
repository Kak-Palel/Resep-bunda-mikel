// src/constants/recipeData.ts
import CreamySalad from '../assets/creamy_salad.jpg';
import TofuTomato from '../assets/tofu_tomato.jpeg';
import CrunchyPotatoes from '../assets/crunchy_potatoes.jpeg';
import MushroomSoup from '../assets/mushroom_soup.jpeg';
import RaspberryCake from '../assets/raspberry_cake.jpg';
import BeefTeriyaki from '../assets/beef_teriyaki.jpg';

// For cooking instructions
interface Step {
  instruction: string;
  time: number; // int or float for the amount of time required
}

// Define the type for the recipe data
interface Recipe {
  id: string;
  image: string;
  title: string;
  description: string;
  time: string;
  servings: string;
  difficulty: string;
  steps: Step[]; // Add steps as an array of Step
}

// Recipe data array
export const recipeData: Recipe[] = [
  {
    image: CreamySalad,
    title: 'Salad Creamy',
    description: 'Salad creamy yang cocok untuk memulai hari',
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
    title: 'Sup Tofu Tomat',
    description: 'Sup hangat isi tofu dan tomat',
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
    title: 'Kentang Crispy',
    description: 'Kentang panggang yang cocok untuk ngemil',
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
    title: 'Mushroom Soup',
    description: 'Sup jamur dengan rempah yang nikmat',
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
    title: 'Kue Raspberry',
    description: 'Kue lembut rasa raspberry, cocok untuk menghilangkan stress',
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
    title: 'Beef Teriyaki',
    description: 'Daging sapi empuk yang dimasak dengan bumbu teriyaki',
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
