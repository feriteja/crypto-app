import React, { useState } from "react";
import { CoingMarketRes } from "../constant/type/coingeckoResType";
import CoinItem from "./CoinItem";

interface props {
  coins: CoingMarketRes[];
}

const CoinSearch: React.FC<props> = ({ coins }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="rounded-div my-4">
      <div className="flex flex-col sm:flex-row justify-between pt-4 pb-6 text-center sm:text-right">
        <h1 className="text-2xl font-bold my-2">Seach Crypto</h1>
        <form>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl"
            type="text"
            placeholder="search a coin"
          />
        </form>
      </div>
      <table className="w-full border-collapse text-center">
        <thead>
          <tr className="border-b">
            <th></th>
            <th className="px-4">#</th>
            <th className="text-left">Coin</th>
            <th></th>
            <th>Price</th>
            <th>24h</th>
            <th className="hidden sm:table-cell">24h Volume</th>
            <th className="hidden sm:table-cell">Mkt</th>
            <th>last 7days</th>
          </tr>
        </thead>
        <tbody>
          {coins
            .filter((val) => {
              if (searchText === "") return val;
              return val.name
                .toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase());
            })
            .map((coin, idx) => (
              <CoinItem key={coin.id} {...coin} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinSearch;
