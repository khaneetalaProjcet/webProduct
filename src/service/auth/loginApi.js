import router from "@/router";
import axios from "axios";

const LoginTemplate = axios.create({
  // baseURL: "https://khaneetala.ir/api",
  baseURL: "https://gateway.khanetala.ir/v1/main",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
});

// before request
LoginTemplate.interceptors.request.use(
  (config) => {
    console.log(`location is ${window.location.href}`)
    // if (window.location.href =  'https://khanetala.ir/Login') {
    //   window.location.href = 'https://app.khanetala.ir/Login';
    // }
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// before response
LoginTemplate.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 401) {
      localStorage.removeItem("token");
      router.replace("/login");
    }
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default LoginTemplate;
