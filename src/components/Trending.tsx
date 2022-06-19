import React, { useEffect, useState } from "react";
import { Coin, CoinTrendingType } from "../constant/type/coingeckoResType";
import { getCoinTrending } from "../services/coinGecko";

const Trending = () => {
  const [trending, setTrending] = useState<Coin[]>([]);

  useEffect(() => {
    getCoinTrending().then((res) => setTrending(res));
  }, []);

  return (
    <div className="rounded-div m-12 py-8 text-primary">
      <h1 className="text-2xl font-bold py-4">Trending Coins</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {trending.map((coin, idx) => (
          <div
            key={coin.item.id}
            className="rounded-div flex justify-between p-4 hover:scale-105 ease-in-out duration-300"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex">
                <img
                  className="rounded-full"
                  src={coin.item.small}
                  alt="coinSmall"
                />
                <div className=" ml-4">
                  <p className="font-bold">{coin.item.name}</p>
                  <p>{coin.item.symbol}</p>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  className="w-4 mr-2 "
                  src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                  alt="/"
                />
                <p>{coin.item.price_btc.toFixed(7)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
