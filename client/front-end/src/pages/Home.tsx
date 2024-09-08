import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import HomeTitle from "../components/HomeTitle"

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-light w-full min-h-screen overflow-clip">
      <Navbar />
      <div className="pt-[4rem] w-full">
        <HomeTitle />
      </div>

      <div className="w-full mt-[5rem]">
        <Footer />
      </div>
    </main>
  );
};

export default Home;
