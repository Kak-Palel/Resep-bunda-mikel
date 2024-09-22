import React, { useState, useEffect, useRef } from "react";

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timezone, setTimezone] = useState("WIB (GMT+7)");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeByZone = () => {
    let offset = 7; // WIB (GMT+7)
    if (timezone === "WITA (GMT+8)") offset = 8;
    if (timezone === "WIT (GMT+9)") offset = 9;

    const localTime = new Date(currentTime);
    localTime.setHours(currentTime.getUTCHours() + offset);
    return localTime;
  };

  const time = getTimeByZone();

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTimezoneChange = (zone) => {
    setTimezone(zone);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="flex flex-col items-center">
      {/* Time Display with Custom Styling */}
      <div className="flex">
        <div className="mr-4">
          <span className="block text-center text-4xl text-dark font-bold">{hours}</span>
          <span className="block text-center text-lg text-gray-2">Jam</span>
        </div>
        <div className="text-4xl text-dark font-bold mr-4">
          :
        </div>
        <div className="mr-4">
          <span className="block text-center text-4xl text-dark font-bold">{minutes}</span>
          <span className="block text-center text-lg text-gray-2">Menit</span>
        </div>
        <div className="text-4xl text-dark font-bold mr-4">
          :
        </div>
        <div>
          <span className="block text-center text-4xl text-dark font-bold">{seconds}</span>
          <span className="block text-center text-lg text-gray-2">Detik</span>
        </div>
      </div>

      <div className="relative inline-block text-left mt-4" ref={dropdownRef}>
        <div className="w-full">
          <button
            onClick={toggleDropdown}
            className="inline-flex justify-center w-full rounded-md border-2 border-dark_green shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:border-orange"
            id="menu-button"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            {timezone}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.292 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isDropdownOpen && (
          <div
            className="rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="" role="none">
              <button
                className="text-gray-2 w-full block px-4 py-2 text-sm rounded-t-md hover:bg-orange hover:text-light"
                role="menuitem"
                onClick={() => handleTimezoneChange("WIB (GMT+7)")}
              >
                WIB (GMT+7)
              </button>
              <button
                className="text-gray-2 w-full block px-4 py-2 text-sm hover:bg-orange hover:text-light"
                role="menuitem"
                onClick={() => handleTimezoneChange("WITA (GMT+8)")}
              >
                WITA (GMT+8)
              </button>
              <button
                className="text-gray-2 w-full block px-4 py-2 text-sm rounded-b-md hover:bg-orange hover:text-light"
                role="menuitem"
                onClick={() => handleTimezoneChange("WIT (GMT+9)")}
              >
                WIT (GMT+9)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeDisplay;
