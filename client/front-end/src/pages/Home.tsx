import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-dark relative w-full min-h-screen overflow-clip">
      <div className="w-[100%]">
        HELLOOOOO
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </main>
  );
};

export default Home;
