import axios from "axios";
import URLS from "./URLS";
import pageRoutes from "./routes";
import { toast } from "react-toastify";

const API_URL = URLS.API_URL;

const clearAuthStorage = () => {
  if (typeof window === "undefined") return;

  [
    "authToken",
    "authUser",
    "authUser?._id",
    "auth",
    "userId",
  ].forEach((key) => localStorage.removeItem(key));
};

class Axios {
  defaultOptions = () => {
    const user = JSON.parse(localStorage.getItem("authUser") || "{}");

    if (typeof window === "undefined") {
      return {
        baseURL: `${API_URL}`,
        headers: {
          token: "",
          customerid: "",
        },
      };
    }

    const authToken =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : "";

    return {
      baseURL: `${API_URL}`,
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : "",
        token: authToken,
        customerid: user?._id,
      },
    };
  };

  LogoutUser = () => {
    clearAuthStorage();
    toast.warning("Session expired. Please login again.");
    window.location.replace(pageRoutes.HOME);
  };

  checkResponse = (res) => {
    if (!res) return null;

    if (res.status === 401) {
      this.LogoutUser();
      return null;
    }
    if (
      ["Auth token is required", "Not Authorized"]?.includes(res?.data?.message)
    ) {
      this.LogoutUser();
      return null;
    }
    return res;
  };

  handleError = (err) => {
    if (err.response?.status === 401) {
      this.LogoutUser();
    }
    return (
      err.response || {
        status: 500,
        data: { message: "Network Error" },
      }
    );
  };

  get = (url, options = {}) => {
    return axios
      .get(url, { ...this.defaultOptions(), ...options })
      .then(this.checkResponse)
      .catch(this.handleError);
  };

  post = (url, data, options = {}) => {
    return axios
      .post(url, data, { ...this.defaultOptions(), ...options })
      .then(this.checkResponse)
      .catch(this.handleError);
  };

  put = (url, data, options = {}) => {
    return axios
      .put(url, data, { ...this.defaultOptions(), ...options })
      .then(this.checkResponse)
      .catch(this.handleError);
  };

  patch = (url, data, options = {}) => {
    return axios
      .patch(url, data, { ...this.defaultOptions(), ...options })
      .then(this.checkResponse)
      .catch(this.handleError);
  };

  delete = (url, options = {}) => {
    return axios
      .delete(url, { ...this.defaultOptions(), ...options })
      .then(this.checkResponse)
      .catch(this.handleError);
  };
}

export default new Axios();
