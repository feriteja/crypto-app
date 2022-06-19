import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { CoingMarketRes } from "./constant/type/coingeckoResType";
import AuthContextProvider from "./context/UserStateContext";
import { ThemeProvider } from "./context/ThemeContext";
import Account from "./pages/Account";
import SignUp from "./pages/auth/SignUp";
import SingIn from "./pages/auth/SingIn";
import CoinPage from "./pages/CoinPage";
import Home from "./pages/Home";
import { getCoinMarket } from "./services/coinGecko";

const App = () => {
  const [coins, setCoins] = useState<CoingMarketRes[]>([]);

  useEffect(() => {
    getCoinMarket().then((res) => {
      setCoins(res);
    });
  }, []);

  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home coins={coins} />} />
          <Route path="/signin" element={<SingIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
          <Route path="/coin/:coinId" element={<CoinPage />}>
            {/* <Route path=":coinId" /> */}
          </Route>
        </Routes>
        <Footer />
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
