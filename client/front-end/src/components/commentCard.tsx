import React, { useEffect, useState } from 'react';
import tempPicture from "../assets/blankProfile.jpg";
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL as string;

interface Comment {
    username: string;
    userID: string;
    comment: string;
}

const CommentCard: React.FC<Comment> = ({ username, userID, comment }) => {
    const [userPhoto, setUserPhoto] = useState<string | null>();

    const navigate = useNavigate();

    useEffect(() => {
        fetchUserPhoto(userID);
    }, [userID]);

    const fetchUserPhoto = async (userID: string) => {
        try {
            if (!userID) {
                setUserPhoto(tempPicture);
                return;
            }
            console.log("User ID: ", userID);
            const response = await fetch(`${API_URL}/api/user/get_user_profile_photo/${userID}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (!response.ok) {
                console.error('Failed to fetch user photo:', response.status);
                return;
            }

            const userData = await response.json();
            setUserPhoto(`${userData}`);
        } catch (error) {
            console.error('Failed to fetch user photo:', error);
        }
    };

    return (
        <div className="comment-card flex items-start">
            <img
                className="w-[3rem] h-[3rem] mt-2 rounded-full shadow-lg mr-4 self-start" 
                src={userPhoto ? userPhoto : tempPicture}
                alt="User Profile"
                onClick={() => navigate(`/profile/${username}`)}
                style={{ cursor: 'pointer' }}
            />
            <div className="comment-text">
                <h3 className="font-bold">{username}</h3>
                <p>{comment}</p>
            </div>
        </div>
    );
}

export default CommentCard;