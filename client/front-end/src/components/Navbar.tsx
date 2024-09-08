import Logo from '../assets/LogoITSRecipe.svg';

function Navbar() {
  return(
    <>
      <nav className="bg-dark fixed dark:bg-darkfixed w-full z-20 top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-8" alt="ITSRecipe Logo"></img>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ITSRecipe</span>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <button type="button" className="text-white bg-orange hover:bg-light_orange focus:bg-light_orange font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange dark:hover:bg-light_orange dark:focus:bg-light_orange">
                Login
            </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col items-center p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
                <a href="#" className="block py-2 px-3 mx-3 text-light hover:text-orange md:p-0" aria-current="page">
                    Home
                </a>
            </li>
            <li>
                <a href="#" className="block py-2 px-3 mx-3 text-light hover:text-orange md:p-0">
                    Recipe
                </a>
            </li>
            <li>
                <a href="#" className="block py-2 px-3 mx-3 text-light hover:text-orange md:p-0">
                    Community
                </a>
            </li>
            <li>
                <a href="#" className="block py-2 px-3 mx-3 text-light hover:text-orange md:p-0">
                    About Us
                </a>
            </li>
            </ul>
            <div className="flex mx-12 text-gray-2 border border-gray-4 rounded-xl bg-gray-4 dark:bg-gray-2 dark:border-gray-2 dark:placeholder-gray-4 dark:text-light">
                <div className="flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-4 dark:text-gray-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span className="sr-only">Search icon</span>
                </div>
                <input 
                    type="text" 
                    id="search-navbar" 
                    className="block w-full p-2 ps-10 text-sm bg-transparent border-none rounded-none outline-none focus:ring-0" 
                    placeholder="Search..."
                />
            </div>
        </div>
        </div>
      </nav>
    </>
    )
}

export default Navbar