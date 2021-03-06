import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SavedCoin from "../components/SavedCoin";
import { userStateContextProps, UserAuth } from "../context/UserStateContext";

const Account = () => {
  const { user, logOut } = UserAuth() as userStateContextProps;
  const navigation = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigation("/");
    } catch (error) {}
  };

  useEffect(() => {
    if (!user) navigation("/signin");
  }, [user]);

  return (
    <div className="max-w-[1140px] mx-auto">
      <div className="flex justify-between items-center my-7 py-4   rounded-div">
        <div>
          <h1 className="text-2xl font-bold">Account</h1>
          <div>
            <p>Wellcome, {user?.email}</p>
          </div>
        </div>
        <div>
          <button
            onClick={handleSignOut}
            className="border rounded-2xl px-6 py-2 shadow-lg hover:shadow-2xl"
          >
            Sign Out
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center my-12 py-4 rounded-div">
        <div className="w-full min-h-[300px]">
          <h1 className="text-2xl font-bold py-4">Watch List</h1>
          <SavedCoin />
        </div>
      </div>
    </div>
  );
};

export default Account;
