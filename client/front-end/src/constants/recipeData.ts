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
  difficulty: number;
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
    difficulty: 0,
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
    difficulty: 0,
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
    difficulty: 0,
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
      "150 gram jamur merang",
      "3 siung bawang putih",
      "1/2 buah bawang bombay",
      "100 gram jagung manis",
      "2 buah wortel",
      "100 gram buncis",
      "1 sendok makan garam",
      "1/2 sendok teh pala bubuk",
      "1/2 sendok teh gula pasir",
      "1/4 sendok teh merica bubuk",
      "2 batang daun bawang",
      "2 batang seledri", 
      "1.500 ml kaldu ayam",
      "1 sendok makan minyak",
    ],
    time: '10 menit',
    servings: '2 porsi',
    difficulty: 0,
    id: '004',
    steps: [
      { instruction: 'Potong dan cincang bahan-bahan yang sudah disiapkan', time: 3.5},
      { instruction: 'Siram jamur merang dengan air panas agar lendirnya hilang dan tidak berbau langu. Setelah itu, tiriskan.', time: 1},
      { instruction: 'Masukkan kuah kaldu ke panci, tumisan bawang, dan tambahkan seledri, wortel, dan jagung. Masak sampai mendidih.', time: 7 },
      { instruction: 'Tambahkan garam, merica, gula. Masukkan buncis, jamur, dan bawang. Masak sampai matang. Terakhir taburkan daun bawang jika suka.', time: 3 },
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
    difficulty: 2,
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
    difficulty: 1,
    id: '006',
    steps: [
      { instruction: 'Prepare ingredients', time: 2 },
      { instruction: 'Mix dressing', time: 3.5 },
      { instruction: 'Toss salad', time: 4 },
    ],
  },
  // More recipes can be added here
];
