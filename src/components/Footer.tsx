import React from "react";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaFacebook, FaGithub, FaTiktok, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="rounded-div mt-8 pt-8  text-primary  ">
      <div className="grid sm:grid-cols-2">
        <div className="flex justify-evenly w-full sm:max-w-[300px] uppercase">
          <div>
            <h2 className="font-bold">Support</h2>
            <ul>
              <li className="text-sm py-2">Help Center</li>
              <li className="text-sm py-2">Contact Us</li>
              <li className="text-sm py-2">API Status</li>
              <li className="text-sm py-2">Documentation</li>
            </ul>
          </div>
          <div>
            <h2>Info</h2>
            <ul>
              <li className="text-sm py-2">About Us</li>
              <li className="text-sm py-2">Careers</li>
              <li className="text-sm py-2">Invest</li>
              <li className="text-sm py-2">Legal</li>
            </ul>
          </div>
        </div>
        <div className="text-right">
          <div className="w-full flex justify-end">
            <div className="w-full sm:w-[300px] py-4 relative">
              <div className="flex justify-center sm:justify-end py4 sm:py-0 sm:pb-4 mt-[-1rem] ">
                <ThemeToggle />
              </div>
              <p className="text-center sm:text-right">
                Sign up for crypto news
              </p>
              <div className="py-4">
                <form>
                  <input
                    className="bg-primary border border-input p-2 mr-2 w-full shadow-xl rounded-2xl sm:w-auto"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <button className="bg-button text-btnText px-4 p-2 w-full shadow-xl hover:shadow-2xl sm:w-auto my-2">
                    Sign Up
                  </button>
                </form>
              </div>
              <div className="flex py-4 justify-between text-accent">
                <AiOutlineInstagram />
                <FaTiktok />
                <FaTwitter />
                <FaFacebook />
                <FaGithub />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center p-4">Powered by Coin Gecko</p>
    </div>
  );
};

export default Footer;
