import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import tempPicture from "../assets/blankProfile.jpg";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import getApiUrl from "../constants/config";

const API_URL = getApiUrl();

const ViewFollow: React.FC = () => {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFollowData = async () => {
      try {
        // Fetch following data
        const followingResponse = await fetch(
          `${API_URL}/api/social/view_following`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: id }),
          }
        );
        const followingData = await followingResponse.json();
        setFollowing(followingData);

        // Fetch followers data
        const followersResponse = await fetch(
          `${API_URL}/api/social/view_followers`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: id }),
          }
        );
        const followersData = await followersResponse.json();
        setFollowers(followersData);
      } catch (error) {
        console.error("Error fetching follow data:", error);
      }
    };

    fetchFollowData();
  }, []);

  return (
    <main>
      <Navbar />
      <div className="max-w-4xl mx-auto py-[6rem] px-[8rem]">
        <h1 className="text-3xl font-bold mb-6">Follower</h1>
        {followers.map((follower: any) => (
          <div className="comment-card flex items-start">
            <img
              className="w-[3rem] h-[3rem] mt-2 rounded-full shadow-lg mr-4 self-start"
              src={follower.image ? follower.image : tempPicture}
              alt="User Profile"
              onClick={() => navigate(`/profile/${follower.username}`)}
              style={{ cursor: "pointer" }}
            />
            <div className="comment-text">
              <h3 className="font-bold">{follower.username}</h3>
              <p>{follower.email}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto py-[6rem] px-[8rem]">
        <h1 className="text-3xl font-bold mb-6">Following</h1>
        {following.map((following: any) => (
          <div className="comment-card flex items-start">
            <img
              className="w-[3rem] h-[3rem] mt-2 rounded-full shadow-lg mr-4 self-start"
              src={following.image ? following.image : tempPicture}
              alt="User Profile"
              onClick={() => navigate(`/profile/${following.username}`)}
              style={{ cursor: "pointer" }}
            />
            <div className="comment-text">
              <h3 className="font-bold">{following.username}</h3>
              <p>{following.email}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
};

export default ViewFollow;
