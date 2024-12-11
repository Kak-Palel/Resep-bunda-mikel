import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileRecipes from "../components/profile/ProfileRecipes"
import LikedRecipes from "../components/profile/likedRecipes";

const Profile: React.FC = () => {
  const { name } = useParams<{ name: string }>(); // Get the username from the URL
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [followState, setFollowState] = useState<number>();

  
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

        const loggedUserStr = localStorage.getItem('user');

        if(loggedUserStr)
        {
          const loggedUser = JSON.parse(loggedUserStr);
          if(name === loggedUser.username) {
            setFollowState(0);
            localStorage.setItem('user', JSON.stringify(data));
          }
          else if(loggedUser.following.includes(data._id)) {
            setFollowState(2);
          }
          else if(!loggedUser.following.includes(data._id)) {
            setFollowState(1);
          }
        }
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
          <ProfileCard id={user._id} name={user.username} email={user.email} image={user.image} followers={user.followers.length}
                       following={user.following.length} followState={followState} />
        </div>
        <div className="w-full pt-[4rem] px-[8rem]">
          <ProfileRecipes ids = {user.recipesCreated} />
        </div>
        { user.recipesLiked.length > 0 &&
        <div className="w-full pt-[4rem] px-[8rem]">
          <LikedRecipes ids = {user.recipesLiked} />
        </div>
        }
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
