import axios from "axios";
import {
  CoinDetail,
  CoingMarketRes,
  CoinTrendingType,
} from "../constant/type/coingeckoResType";

const uriCoin = {
  uriCoinTrending: `https://api.coingecko.com/api/v3/search/trending`,
  uriCoinMarket:
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true",
};

const getCoinMarket = async () => {
  const response = await axios.get<CoingMarketRes[]>(uriCoin.uriCoinMarket);
  return response.data;
};

const getCoinTrending = async () => {
  const response = await axios.get<CoinTrendingType>(uriCoin.uriCoinTrending);
  return response.data.coins;
};

const getCoinDetail = async (coinName = "bitcoin") => {
  const uriCoinName = `https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&sparkline=true`;
  const response = await axios.get<CoinDetail>(uriCoinName);
  return response.data;
};

export { getCoinMarket, getCoinTrending, getCoinDetail };
