import React from "react";
import tempPicture from "../../assets/blankProfile.jpg";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL as string;

interface ProfileCardProps {
  id: string;
  name: string;
  email: string;
  image: string;
  followers: number;
  following: number;
  followState: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ id, name, email, image, followers, following, followState }) => {
  const navigate = useNavigate();
  const handleFollowUnfollow = async () => {
    const route = followState === 1 ? "follow" : "unfollow";
    const response = await fetch(`${API_URL}/api/social/${route}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem('jwtToken')}`
      },
      body: JSON.stringify({ "user_id": id })
    });

    if(!response.ok) {
      console.error("Failed to send Follow/Unfollow request");
      return;
    }

    const data = await response.json();
    console.log(data.message);

    // Update logged user's following list
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const updated_logged_user_res = await fetch(
      `${API_URL}/api/user/profile/${loggedUser.username}`, // Use dynamic name from URL
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!updated_logged_user_res.ok) {
      throw new Error(`Failed to fetch user profile: ${updated_logged_user_res.status}`);
    }
    const updated_logged_user = await updated_logged_user_res.json();
    localStorage.Item('user', JSON.stringify(updated_logged_user));

    window.location.reload();
  }

  return (
    <div className="mx-auto w-[40%]">
      <div className="flex items-center">
        <img
          className="w-[10rem] h-[10rem] mb-auto rounded-full shadow-lg"
          src={image ? image : tempPicture} // Replace with user's image if available
          alt={name}
        />
        <div className="flex flex-col w-full h-[13rem] px-8">
          <div className="flex">
            <h3 className="mb-1 text-[2rem] font-bold text-dark">{name}</h3>
          </div>
          <p className="text-lg text-gray-4">{email}</p>
          <div className="flex items-center mt-auto">
            <div className="flex text-lg mr-8 cursor-pointer" onClick={() => navigate(`/viewFollow/${id}`)}> 
              <p className="font-bold text-dark">Followers</p>
              <h4 className="ml-4 text-gray-4 text-center">{followers}</h4>
            </div>
            <div className="flex text-lg ml-8 cursor-pointer" onClick={() => navigate(`/viewFollow/${id}`)}>
              <p className="font-bold text-dark">Following</p>
              <h4 className="ml-4 text-gray-4 text-center">{following}</h4>
            </div>
          </div>
          {
            followState === 0 ? (
              <button
                className="mt-6 w-auto bg-gray-300 text-gray-4 py-2 px-4 rounded-full font-medium"
                onClick={() => navigate("/editProfile")}>
                Edit Profil
              </button>
            ) : followState === 1 ? (
              <button 
                className="mt-6 w-auto bg-orange hover:bg-light_orange text-light py-2 px-4 rounded-full font-medium"
                onClick={handleFollowUnfollow}>
                Follow
              </button>
            ) : (
              <button
                className="mt-6 w-auto bg-gray-300 text-gray-4 py-2 px-4 rounded-full font-medium"
                onClick={handleFollowUnfollow}>
                Unfollow
              </button>
            )
          }
          </div>
      </div>
    </div>
  );
};

export default ProfileCard;
