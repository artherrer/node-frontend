import axios from "axios";

const createInstance = () => {
  const jwt = localStorage.getItem("token");

  const instance = axios.create({
    baseURL: "http://localhost:3333",
  });

  if (jwt) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }

  return instance;
};

export default createInstance();
