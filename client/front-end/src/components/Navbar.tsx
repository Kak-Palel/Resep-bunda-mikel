import { useState, useEffect } from 'react';
import Logo from '../assets/LogoITSRecipe.svg';
import UserLogo from '../assets/userLogo.svg'
import LoginModal from './loginModal';

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    // Retrieve email from localStorage when the component mounts
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const handleLoginSuccess = (email: string, token: string, username: string) => {
    setUserEmail(email);
    setUserToken(token);
    localStorage.setItem('email', email); // Save email to localStorage
    localStorage.setItem('jwtToken', token); // Save token to localStorage
    localStorage.setItem('username', username); // Save username to localStorage
    setShowModal(false);
  };

  const handleLogout = () => {
    setUserEmail('');
    setUserToken('');
    localStorage.removeItem('email'); // Remove email from localStorage
    localStorage.removeItem('jwtToken'); // Remove token from localStorage
    localStorage.removeItem('username'); // Remove username from localStorage
  };

  // Retrieve user data from localStorage
    const userData = localStorage.getItem('user');
    let username = '';

    // Check if userData exists and parse it
    if (userData) {
        const user = JSON.parse(userData);
        username = user.username; // Extract the username
    }

    // Construct the profile URL
    const profileUrl = `/profile/${username}`;

  return (
    <>
      <nav className="bg-dark fixed dark:bg-darkfixed w-full z-20 top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-8" alt="ITSRecipe Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              ITSRecipe
            </span>
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {userEmail ? (
              <div className="flex items-center space-x-2">
                <span className="text-white">{userEmail}</span>
                <button
                  type="button"
                  className="text-white bg-orange hover:bg-light_orange focus:bg-light_orange font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange dark:hover:bg-light_orange dark:focus:bg-light_orange"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <a href={profileUrl} className="px-8">
                  <img src={UserLogo} />
                </a>
              </div>
            ) : (
              <button
                type="button"
                className="text-white bg-orange hover:bg-light_orange focus:bg-light_orange font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange dark:hover:bg-light_orange dark:focus:bg-light_orange"
                onClick={() => setShowModal(true)}
              >
                Login
              </button>
            )}
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col items-center p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <a
                  href="/home"
                  className="block py-2 px-3 mx-3 text-light hover:text-orange md:p-0"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/recipe"
                  className="block py-2 px-3 mx-3 text-light hover:text-orange md:p-0"
                >
                  Recipe
                </a>
              </li>
              {userEmail && (
                <li>
                  <a
                    href="/inputRecipe"
                    className="block py-2 px-3 mx-3 text-light hover:text-orange md:p-0"
                  >
                    Input Recipe
                  </a>
                </li>
              )}
              <li>
                <a
                  href="/jamBiasa"
                  className="block py-2 px-3 mx-3 text-light hover:text-orange md:p-0"
                >
                  Ini Jam Biasa
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <LoginModal onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
