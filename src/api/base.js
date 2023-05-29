import axios from "axios";

const oneInchBaseApi = axios.create({
  baseURL: import.meta.env.VITE_1INCH_API,
});

const coinpaprikaBaseApi = axios.create({
  baseURL: import.meta.env.VITE_COINPAPRIKA_API,
});

export { oneInchBaseApi, coinpaprikaBaseApi };
