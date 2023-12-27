/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between py-6">
        <img src="/img/logo-white.png" alt="logo"></img>
        <ul className="flex items-center justify-center gap-16">
          <li className="font-medium text-sm text-white">Activities</li>
          <li className="font-medium text-sm text-white">Destinations</li>
          <li className="font-medium text-sm text-white">About Us</li>
          <li className="font-medium text-sm text-white">Contact</li>
        </ul>

        <Link
          href="#"
          className="px-10 py-3 border border-white rounded-xl font-medium"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
