import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Jam from "../components/IniJam"

const JamBiasa: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-light w-full min-h-screen overflow-clip">
      <Navbar />
      
      <div className="w-full py-[14rem] h-[20rem]">
        <Jam />
      </div>

      <div className="w-full mt-[7rem]">
        <Footer />
      </div>
    </main>
  );
};

export default JamBiasa;
