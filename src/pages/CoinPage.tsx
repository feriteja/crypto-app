import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { CoinDetail } from "../constant/type/coingeckoResType";
import { getCoinDetail } from "../services/coinGecko";
import { FaFacebook, FaGithub, FaReddit, FaTwitter } from "react-icons/fa";
import DOMpurify from "dompurify";
import { useParams } from "react-router-dom";

type RouteParams = {
  coinId: string;
};

const CoinPage = () => {
  const [coin, setCoin] = useState<CoinDetail>();
  const { coinId } = useParams<RouteParams>();

  useEffect(() => {
    getCoinDetail(coinId).then((res) => setCoin(res));
  }, [coinId]);

  return (
    <div className="rounded-div my-4 py-2">
      <div className="flex py-8">
        <img className="w-20 mr-8" src={coin?.image.large} alt="coin" />
        <div>
          <p className="text-3xl font-bold">{coin?.name} price</p>
          <p>{coin?.symbol.toUpperCase()}/USD</p>
        </div>
      </div>

      <div className=" grid sm:grid-cols-2   ">
        <div>
          <div className="flex justify-between ">
            {coin?.market_data.current_price ? (
              <p className="text-3xl font-bold">
                ${coin.market_data.current_price.usd.toLocaleString()}
              </p>
            ) : null}
            <p>7 Days</p>
          </div>
          <div>
            <Sparklines data={coin?.market_data.sparkline_7d.price}>
              <SparklinesLine color="teal" />
            </Sparklines>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Market Cap</p>
              {coin?.market_data.market_cap && (
                <p>{coin.market_data.market_cap.usd.toLocaleString()}</p>
              )}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Volume (24h)</p>
              {coin?.market_data.market_cap && (
                <p>{coin.market_data.total_volume.usd.toLocaleString()}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">24h High</p>
              {coin?.market_data.high_24h && (
                <p>{coin.market_data.high_24h.usd.toLocaleString()}</p>
              )}
            </div>
            <div>
              <p className="text-gray-500 text-sm">24h Low</p>
              {coin?.market_data.low_24h && (
                <p>{coin.market_data.low_24h.usd.toLocaleString()}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <p className="text-xl font-bold">Market Stats</p>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Market Rank</p>
              {coin?.market_cap_rank}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Hashing Algorithm</p>
              {coin?.hashing_algorithm && <p>{coin.hashing_algorithm}</p>}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Trust Score</p>
              {coin?.tickers && <p>{coin.liquidity_score.toFixed(2)}</p>}
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Price Change (24h)</p>
              {coin?.market_data && (
                <p>
                  {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                </p>
              )}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (7d)</p>
              {coin?.market_data && (
                <p>{coin.market_data.price_change_percentage_7d.toFixed(2)}%</p>
              )}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (14d)</p>
              {coin?.market_data && (
                <p>
                  {coin.market_data.price_change_percentage_14d.toFixed(2)}%
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Price Change (30d)</p>
              {coin?.market_data && (
                <p>{coin.market_data.price_change_percentage_30d.toFixed(2)}</p>
              )}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (60d)</p>
              {coin?.market_data && (
                <p>{coin.market_data.price_change_percentage_60d.toFixed(2)}</p>
              )}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (1yr)</p>
              {coin?.market_data && (
                <p>{coin.market_data.price_change_percentage_1y.toFixed(2)}</p>
              )}
            </div>
          </div>
          <div className="flex justify-around p-8 text-accent">
            <FaTwitter />
            <FaFacebook />
            <FaReddit />
            <FaGithub />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="py-4">
        <p className="text-xl font-bold">About {coin?.name} </p>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMpurify.sanitize(
              coin?.description ? coin?.description.en : ""
            ),
          }}
        ></p>
      </div>
    </div>
  );
};

export default CoinPage;
