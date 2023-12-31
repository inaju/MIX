import { LucideDoorClosed, ShieldCloseIcon, SidebarClose } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const Navbar = (props: Props) => {
  const [showQuote, setShowQuote] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MIX
          </span>
        </Link>
        <div className="flex md:order-2">
          <button
            type="button"
            className="text-white bg-[#F61067] hover:bg-[#F61067]/[0.7] focus:ring-4 focus:outline-none focus:ring-[#F61067]/[0.4] font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-[#F61067] dark:focus:ring-blue-800"
          >
            Get started
          </button>
          <button
            onClick={() => setShowQuote(!showQuote)}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            {/* <span className="sr-only">Open main menu</span> */}
            {!showQuote ? (
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            )}
          </button>
        </div>
        {showQuote && (
          <div className="absolute top-20 bg-white h-screen w-full">
            <ul className="flex flex-col m-8 p-4 md:p-0 mt-4 font-medium   rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 ">
              <li>
                <Link
                  passHref
                  href="/"
                  className="block py-2 pl-3 pr-4 text-[#F61067]  rounded md:bg-transparent md:text-[#F61067]/[0.7] md:p-0 md:dark:text-[#F61067]"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.mitchelinaju.com/"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#F61067]/[0.7] md:p-0 md:dark:hover:text-[#F61067]/[0.7] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Who is Mitchel ?
                </Link>
              </li>
              <button
                type="button"
                className="mt-10 text-white bg-[#F61067] hover:bg-[#F61067]/[0.7] focus:ring-4 focus:outline-none focus:ring-[#F61067]/[0.4] font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-[#F61067] dark:focus:ring-blue-800"
              >
                Get started
              </button>
            </ul>
          </div>
        )}

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className="block py-2 pl-3 pr-4 text-white bg-[#F61067] rounded md:bg-transparent md:text-[#F61067]/[0.7] md:p-0 md:dark:text-[#F61067]"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="https://www.mitchelinaju.com/"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#F61067]/[0.7] md:p-0 md:dark:hover:text-[#F61067]/[0.7] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Who is Mitchel ?
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
