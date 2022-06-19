import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { userStateContextProps, UserAuth } from "../context/UserStateContext";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user, logOut } = UserAuth() as userStateContextProps;
  const navigation = useNavigate();

  const handleNav = () => {
    setToggleMenu((prev) => !prev);
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      navigation("/");
    } catch (error) {}
  };

  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold">
      <Link to={"/"}>
        <h1 className="text-2xl">CryptoBase</h1>
      </Link>
      <div className="hidden sm:block">
        <ThemeToggle />
      </div>
      {user ? (
        <div>
          <Link to={"/account"} className="p-4">
            Account
          </Link>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div className="hidden sm:block">
          <Link className="p-4 hover:text-accent" to={"/signin"}>
            Sign In
          </Link>
          <Link
            className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl "
            to={"/signup"}
          >
            Sign Up
          </Link>
        </div>
      )}
      {/* mobile */}
      <div onClick={handleNav} className="block sm:hidden cursor-pointer z-10 ">
        {toggleMenu ? (
          <AiOutlineClose size={25} />
        ) : (
          <AiOutlineMenu size={25} />
        )}
      </div>
      <div
        className={
          toggleMenu
            ? "sm:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary  z-10 ease-in duration-300"
            : "fixed left-[100%] top-20  h-[90%] w-full flex flex-col items-center justify-between ease-in duration-300"
        }
      >
        <ul className="w-full p-4">
          <li onClick={handleNav} className="border-b p-4 ">
            <Link to={"/"}>Home</Link>
          </li>
          <li onClick={handleNav} className="border-b p-4 ">
            <Link to={"/account"}>Account</Link>
          </li>
          <li onClick={handleNav} className="border-b p-4 ">
            <ThemeToggle />
          </li>
        </ul>
        <div className="flex flex-col w-full p-4  ease-in duration-300">
          <Link to={"/signin"}>
            <button
              onClick={handleNav}
              className="w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl "
            >
              Sign In
            </button>
          </Link>
          <Link to={"/signup"}>
            <button
              onClick={handleNav}
              className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
            >
              Sign UP
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
