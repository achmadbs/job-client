import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Headers"] = "*";

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default instance;
