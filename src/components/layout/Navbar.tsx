/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
// import type { MenuProps } from "antd";
// import { Button, Dropdown } from "antd";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
// import { Dropdown } from "antd";

// const items: MenuProps["items"] = [
//   {
//     key: "1",
//     label: (
//       <Link rel="noopener noreferrer" href="/profile">
//         Profile
//       </Link>
//     ),
//   },
//   {
//     key: "2",
//     label: (
//       <p
//         rel="noopener noreferrer"
//         className="text-[#ff4d4f]"
//         onClick={() => {
//           localStorage.removeItem("token");
//           // if (pathname !== "/") {
//           // }
//         }}
//       >
//         Logout
//       </p>
//     ),
//   },
// ];

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(token !== null && token !== undefined);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    if (pathname !== "/") {
      redirect("/");
    }
  };

  return (
    <div className="container mx-auto">
      <div className=" flex items-center justify-between py-6">
        <Link href="/">
          <img src="/img/logo-white.png" alt="logo"></img>
        </Link>
        {/* <ul className="hidden lg:flex items-center justify-center gap-16">
          <li className="font-medium text-sm text-white hover:opacity-85 cursor-pointer">
            Activities
          </li>
          <li className="font-medium text-sm text-white hover:opacity-85 cursor-pointer">
            Destinations
          </li>
          <li className="font-medium text-sm text-white hover:opacity-85 cursor-pointer">
            About Us
          </li>
          <li className="font-medium text-sm text-white hover:opacity-85 cursor-pointer">
            Contact
          </li>
        </ul> */}

        {loggedIn ? (
          // <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <img
            src="img/profilePreview.png"
            alt="profile"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        ) : (
          // {/* </Dropdown> */}
          <Link
            href="/login"
            className="px-10 py-3 border border-white rounded-xl font-medium hover:bg-white hover:text-secondary text-white"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
