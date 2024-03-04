"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useAppSelector } from "@/store";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logoutRequest } from "@/store/action/authAction";

const Header = () => {
  const auth = useAppSelector<any>((state: any) => state?.auth?.user) ?? null;
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutRequest());
    console.log(auth);
  };

  return (
    <div className="flex flex-row justify-between items-center h-12">
      <div className="flex items-center border border-solid border-black w-2/5 h-full relative">
        <div className="w-[100px] relative h-full">
          <Image
            className=""
            src="/blog.jpg"
            layout="fill"
            objectFit="contain"
            alt="logo"
          />
        </div>
        <Link
          href="/login"
          className="ml-2 hover:underline font-bold text-orange-400">
          Blog Website
        </Link>
      </div>
      <div className="bg-gray-300 border border-solid border-black w-1/5 flex-grow h-full text-center flex items-center justify-center">
        <h4>Blogs</h4>
      </div>
      {auth ? (
        <div className="flex items-center border border-solid border-black w-2/5 h-full relative">
          <div
            className="flex items-center justify-center ml-auto mr-4 h-full"
            onClick={() => setShowDropdown(!showDropdown)}>
            <div className="w-[100px] relative h-full">
              <Image
                className=""
                src="https://picsum.photos/50/50"
                layout="fill"
                objectFit="contain"
                alt="logo"
              />
            </div>
            <div>{auth?.name}</div>
            {showDropdown && (
              <div className="absolute top-10 right-0 bg-white border border-solid border-gray-300 p-2 rounded-md shadow-lg">
                <button
                  onClick={() => handleLogout()}
                  className="px-4 py-2 text-black rounded-md hover:bg-white-600 transition duration-300">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center border border-solid border-black w-2/5 h-full relative">
          <div className="flex items-center justify-center ml-auto mr-4 h-full">
            <div className="w-[100px] relative h-full">
              <Image
                src="https://a0.anyrgb.com/pngimg/1912/680/icon-user-profile-avatar-ico-facebook-user-head-black-icons-circle.png"
                alt="Avatar"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <Link href="/login" className="ml-2 hover:underline">
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
