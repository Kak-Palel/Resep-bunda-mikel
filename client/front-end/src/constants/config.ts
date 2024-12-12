const getApiUrl = (): string => {
  if (process.env.NODE_ENV === "production") {
    return window.location.origin;
  }

  return import.meta.env.VITE_API_BASE_URL || "http://localhost:5014";
};

export default getApiUrl;
