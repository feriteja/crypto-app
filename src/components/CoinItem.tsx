import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { CoingMarketRes } from "../constant/type/coingeckoResType";
import { userStateContextProps, UserAuth } from "../context/UserStateContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const CoinItem = (props: CoingMarketRes) => {
  const { user, coins, deleteCoin } = UserAuth() as userStateContextProps;
  const [isSaved, setIsSaved] = useState(false);
  const navigation = useNavigate();

  const coinPath = doc(db, "users", `${user?.email}`);
  const saveCoin = async () => {
    if (!user) {
      alert("Please login first to save the coin");
      setTimeout(() => {
        navigation("/signin");
      }, 3000);
    }
    setIsSaved((prev) => !prev);
    try {
      if (!isSaved) {
        await updateDoc(coinPath, {
          watchList: arrayUnion({
            id: props.id,
            name: props.name,
            image: props.image,
            rank: props.market_cap_rank,
            symbol: props.symbol,
          }),
        });
      } else {
        await deleteCoin(props.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsSaved(coins.some((coin) => coin.id === props.id));
  }, []);

  return (
    <tr className="h-[80px] border-b overflow-hidden">
      <td onClick={saveCoin}>{isSaved ? <AiFillStar /> : <AiOutlineStar />}</td>
      <td>{props.market_cap_rank} </td>
      <td className="">
        <Link to={`/coin/${props.id}`}>
          <div className="flex items-center">
            <img
              className="w-6 mr-2 rounded-full"
              src={props.image}
              alt={props.id}
            />
            <p className="hidden sm:table-cell overflow-x-clip   ">
              {props.name}
            </p>
          </div>
        </Link>
      </td>
      <td>{props.symbol.toUpperCase()}</td>
      <td>${props.current_price.toLocaleString()}</td>
      <td>
        {props.price_change_percentage_24h > 0 ? (
          <p className="text-green-600">
            {props.price_change_percentage_24h.toFixed(2)}%
          </p>
        ) : (
          <p className="text-red-600">
            {props.price_change_percentage_24h.toFixed(2)}%
          </p>
        )}
      </td>
      <td className="w-[180px] hidden sm:table-cell">
        ${props.total_volume.toLocaleString()}
      </td>
      <td className="w-[180px] hidden sm:table-cell">
        ${props.market_cap.toLocaleString()}
      </td>
      <td>
        <Sparklines data={props.sparkline_in_7d.price}>
          <SparklinesLine color="teal" />
        </Sparklines>
      </td>
    </tr>
  );
};

export default CoinItem;
