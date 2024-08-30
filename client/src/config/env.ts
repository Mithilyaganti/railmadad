const config: { [key: string]: any } = {
    FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173",
    API_URL: import.meta.env.VITE_API_URL || "https://localhost:3000",
  };
  
  export default config;