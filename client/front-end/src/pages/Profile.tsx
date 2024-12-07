import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileRecipes from "../components/profile/ProfileRecipes"

// interface User {
//   username: string;
//   email: string;
//   followers: string[];
//   following: string[];
//   recipesCreated: string[];
// }

const Profile: React.FC = () => {
  const { name } = useParams<{ name: string }>(); // Get the username from the URL
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!name) {
      console.error("No username provided in the route.");
      return;
    }
    
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/user/profile/${name}`, // Use dynamic name from URL
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch user profile: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/404"); // Redirect to 404 page if the profile is not found
      }
    };
    
    fetchUserProfile();
  }, [name, navigate]);
  
  return (
    <main className="bg-light w-full min-h-screen overflow-clip">
      <Navbar />

    {user ? (
      <div>
        <div className="flex flex-col items-center pt-[7rem]">
          <ProfileCard name={user.username} email={user.email} followers={user.followers.length}
                       following={user.following.length} recipesCreated={user.recipesCreated} />
        </div>
        <div className="w-full pt-[4rem] px-[8rem]">
          <ProfileRecipes />
        </div>
      </div>
      ) : (
        <p>User not found</p>
      )}

      <div className="w-full mt-[5rem]">
        <Footer />
      </div>
    </main>
  );
};

export default Profile;
