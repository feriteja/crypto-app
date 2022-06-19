import React from "react";
import CoinSearch from "../components/CoinSearch";
import Trending from "../components/Trending";
import { CoingMarketRes } from "../constant/type/coingeckoResType";

interface props {
  coins: CoingMarketRes[];
}

const Home: React.FC<props> = ({ coins }) => {
  return (
    <div>
      <CoinSearch coins={coins} />
      <Trending />
    </div>
  );
};

export default Home;
