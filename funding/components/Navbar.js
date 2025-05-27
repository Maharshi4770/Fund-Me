"use client";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchSingleUser } from "@/actions/useraction";
import { useSession, signIn, signOut } from "next-auth/react";
const Navbar = () => {
  const { data: session } = useSession();
  const [add, setAdd] = useState(true);
  const [file, setFile] = useState();
  const [Users, setUsers] = useState([]);
  const [showdrop, setshowdrop] = useState(false);
  const [search, setsearch] = useState("");

  const handlepost = async () => {
    const formData = new FormData();
    formData.append("Post", file);
    formData.append("email", session.user.email);
    // formData.append("email", "Hello");
    formData.append("username", session.user.name);
    // formData.append("username", "Hello");

    const res = await fetch(`http://127.0.0.1:5000/post`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      toast.success("Posted Successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setAdd(true);
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    setsearch("");  
  }, []);

  return (
    <div className="flex justify-between p-3 items-center">
      <Link href={"/"}>
        <div className="text-xl font-bold flex items-center gap-3 cursor-pointer">
          <span className="material-symbols-outlined">crowdsource</span>Funding
        </div>
      </Link>
      <div className="flex gap-4">
        <div className="rounded-3xl p-4 absolute left-[50%] translate-x-[-50%] bg-white/15 overflow-auto scroll-smooth no-scrollbar">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="Search"
              value={search}
              id="floating_Search"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              autoComplete="off"
              required
              onChange={async (e) => {
                setsearch(e.target.value);
                let users = await fetchSingleUser(search);
                setUsers(users);
              }}
            />
            <label
              htmlFor="floating_Search"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Search user
            </label>
          </div>

          {search.length > 0 &&
            Users.map((user) => {
              return (
                <Link href={`/${user.username}`}>
                  <div
                    key={user._id}
                    className="rounded-full p-3 flex gap-5 hover:bg-black/25 hover:cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span>{user.username}</span>
                      <span className=" text-sm text-white/25">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          {/*  */}
        </div>
        {session && (
          <div className="flex flex-col relative">
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white hover:bg-blue-800 focus:ring-4 focus:outline-none text-sm md:py-2.5 text-center inline-flex items-center px-2 w-[95%] ml-1 md:ml-0 md:w-auto md:px-4 md:p-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-700 font-bold"
              type="button"
              onClick={() => {
                setshowdrop(!showdrop);
              }}
            >
              Welcome {session.user.email}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className={` z-10 ${
                showdrop ? "" : "hidden"
              } absolute top-11 right-0  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${session.user.name}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Your Page
                  </Link>
                </li>
                <li
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    setAdd(false);
                  }}
                >
                  Add Post
                </li>
                <li>
                  <Link
                    onClick={() => signOut()}
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
        {session && (
          <button
            className="px-4 p-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-700 font-bold hidden md:block"
            onClick={() => signOut()}
          >
            Logout
          </button>
        )}
        {!session && (
          <Link href={"/login"}>
            <button className="px-4 p-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-700 font-bold">
              Log in
            </button>
          </Link>
        )}
        <div
          hidden={add}
          className="md:w-[35%] w-[90%] z-10 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <div className="bg-black p-5 rounded-2xl flex flex-col gap-5 items-center">
            <div className="flex w-full justify-between">
              <h1 className=" font-black text-xl">ADD POST</h1>
              <span
                className="material-symbols-outlined invert-0 cursor-pointer"
                onClick={() => {
                  setAdd(true);
                }}
              >
                cancel
              </span>
            </div>
            <div className=" w-full">
              <label
                className="block mb-2 text-sm font-medium text-gray-500 "
                htmlFor="file_input"
              >
                Upload Post Image
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                name="Post"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handlepost}
            >
              POST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;