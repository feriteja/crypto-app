import { FirebaseError } from "firebase/app";
import React, { SyntheticEvent, useState } from "react";

import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  userStateContextProps,
  UserAuth,
} from "../../context/UserStateContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = UserAuth() as userStateContextProps;
  const navigation = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signUp({ email, password });
      navigation("/account");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <div className="max-w-[400px] mx-auto min-h-screen px-4 py-20">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        {error && <p className="bg-red-300 p-3 my-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label>Email</label>
            <div className=" flex justify-between items-center my-2 w-full bg-primary  rounded-2xl border border-input shadow-xl p-2">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none bg-inherit mr-2   "
                type="email"
              />
              <AiOutlineMail className=" text-gray-400" />
            </div>
          </div>
          <div className="my-4">
            <label>Password</label>
            <div className=" flex justify-between items-center my-2 w-full bg-primary  rounded-2xl border border-input shadow-xl p-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none bg-inherit mr-2   "
                type="password"
              />
              <AiFillLock className=" text-gray-400" />
            </div>
          </div>
          <button
            className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl "
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="my-4 text-center ">
          already have an account?
          <Link className="text-accent" to={"/signin"}>
            Sign in
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
