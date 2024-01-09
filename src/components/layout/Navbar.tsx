/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between py-6">
        <Link href="/">
          <img src="/img/logo-white.png" alt="logo"></img>
        </Link>
        <ul className="flex items-center justify-center gap-16">
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
        </ul>

        <Link
          href="/login"
          className="px-10 py-3 border border-white rounded-xl font-medium hover:bg-white hover:text-secondary text-white"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
