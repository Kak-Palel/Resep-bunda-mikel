import React from "react";
import tempPicture from "../../assets/templateFoto.png"
import Edit from "../../assets/edit.svg"

interface ProfileCardProps {
  name: string;
  email: string;
  followers: number;
  following: number;
  recipesCreated: string[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, followers, following, recipesCreated }) => {
  return (
    <div className="mx-auto w-[40%]">
      <div className="flex items-center">
        <img
          className="w-[10rem] h-[10rem] mb-auto rounded-full shadow-lg"
          src={tempPicture} // Replace with user's image if available
          alt={name}
        />
        <div className="flex flex-col w-full h-[13rem] px-8">
          <div className="flex">
            <h3 className="mb-1 text-[2rem] font-bold text-dark">{name}</h3>
            <img src={Edit} className="h-[2rem] w-[2rem] ml-auto" />
          </div>
          <p className="text-lg text-gray-4">{email}</p>
          <div className="flex items-center mt-auto">
            <div className="flex text-lg mr-8"> 
              <p className="font-bold text-dark">Followers</p>
              <h4 className="ml-4 text-gray-4 text-center">{followers}</h4>
            </div>
            <div className="flex text-lg ml-8">
              <p className="font-bold text-dark">Following</p>
              <h4 className="ml-4 text-gray-4 text-center">{following}</h4>
            </div>
          </div>
          <button className="mt-6 w-auto bg-orange hover:bg-light_orange text-light py-2 px-4 rounded-full font-medium">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
