import { redirect } from "react-router-dom";
import { oneInchBaseApi, coinpaprikaBaseApi } from "./base";

async function getOneInchApi({ url, options }) {
  return oneInchBaseApi.get(url, options).then((res) => {
    if (res.status === 200) {
      return res.data;
    }

    throw redirect(url);
  });
}

async function getCoinpaprikaApi({ url, options }) {
  return coinpaprikaBaseApi.get(url, options).then((res) => {
    if (res.status === 200) {
      return res.data;
    }

    throw redirect(url);
  });
}

export { getOneInchApi, getCoinpaprikaApi };
