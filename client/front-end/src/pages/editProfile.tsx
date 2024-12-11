import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import tempPicture from "../assets/blankProfile.jpg";
import EditRecipeSlide from '../components/profile/editRecipeSlide';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const EditProfile: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        setName(user.username);
        setEmail(user.email);
        setImage(user.image);
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const proceed = window.confirm('Apakah anda yakin dengan perubahan yang anda buat?');
        if (!proceed) {
            return;
        }

        // Update user info (password is not implemented yet)
        user.username = name ? name : user.username;
        user.email = email ? email : user.email;
        user.image = image ? image : user.image;

        localStorage.setItem('user', JSON.stringify(user));

        const response = await fetch('http://localhost:8080/api/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('jwtToken')}`,
            },
            body: JSON.stringify({
                username: name ? name : user.username,
                email: email ? email : user.email,
                image: image ? image : user.image,
            }),
        });

        if (!response.ok) {
            console.error('Failed to update user info');
            return;
        }

        const data = await response.json();
        console.log(data.message);

        navigate('/profile/' + name);
    };

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = fetch('http://localhost:8080/upload', {
            method: 'POST',
            headers: {
                'Authorization': `${localStorage.getItem('jwtToken')}`
            },
            body: formData
            }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                setImage(data.url);
                });
            } else {
                alert('Error uploading image' + response.status);
                console.log('Error:', response);
            }
            });
        } catch (error) {
            console.error('Error:', error);
        }
        }
    };

    return (
        <main className="bg-light w-full min-h-screen overflow-clip">
            <Navbar />
            <div className="flex flex-col md:flex-row w-full py-10 px-20 pt-[7rem]">
                <div className="flex flex-col items-center md:items-start md:w-1/4 ml-[3rem]">
                    <img
                        className="w-[15rem] h-[15rem] mb-4 rounded-full shadow-lg"
                        src={image ? image : (user.image ? user.image : tempPicture)}
                        alt="Profile"
                    />
                    <label className="flex items-center space-x-2 cursor-pointer ml-[4rem]">
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        <span className="p-2 bg-orange text-white font-medium rounded-full">Ubah Foto</span>
                    </label>
                </div>
                <div className="flex flex-col md:w-3/4 md:pl-10 ml-[-6rem]">
                    <h2 className="text-2xl font-bold mb-6">Edit Profil</h2>
                    <form  className="flex flex-col space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nama</label>
                            <input
                                className="mt-1 block w-[65rem] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                type="text"
                                placeholder={user.username}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                className="mt-1 block w-[65rem] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                type="email"
                                placeholder={user.email}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            className="w-[31rem] ml-[15rem] bg-orange hover:bg-light_orange text-white py-2 px-4 rounded-full font-medium"
                            onClick={handleSubmit}>
                            Submit
                        </button>
                        <div className="flex space-x-4 ml-[15rem]">
                            <button
                                className="w-[15rem] bg-red-500 hover:bg-red-300 text-white py-2 px-4 rounded-full font-medium">
                                Ubah Password
                            </button>
                            <button
                                className="w-[15rem] bg-red-500 hover:bg-red-300 text-white py-2 px-4 rounded-full font-medium">
                                Delete Akun
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-full pt-[4rem] px-[8rem]">
                <EditRecipeSlide ids={user.recipesCreated}/>
            </div>
            <div className="w-full mt-[5rem]">
                <Footer />
            </div>
            
        </main>
    );
};

export default EditProfile;