import Image from "next/image";
import React from "react";

const Profile = () => {
  return (
    <section>
      <div className="flex items-center gap-4 font-[500] text-[32px] ml-24 my-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.88889 7.11111C8.88889 5.22513 9.63809 3.41639 10.9717 2.0828C12.3053 0.749204 14.114 0 16 0C17.886 0 19.6947 0.749204 21.0283 2.0828C22.3619 3.41639 23.1111 5.22513 23.1111 7.11111C23.1111 8.9971 22.3619 10.8058 21.0283 12.1394C19.6947 13.473 17.886 14.2222 16 14.2222C14.114 14.2222 12.3053 13.473 10.9717 12.1394C9.63809 10.8058 8.88889 8.9971 8.88889 7.11111ZM8.88889 17.7778C6.53141 17.7778 4.27049 18.7143 2.6035 20.3813C0.936505 22.0483 0 24.3092 0 26.6667C0 28.0812 0.561903 29.4377 1.5621 30.4379C2.56229 31.4381 3.91885 32 5.33333 32H26.6667C28.0812 32 29.4377 31.4381 30.4379 30.4379C31.4381 29.4377 32 28.0812 32 26.6667C32 24.3092 31.0635 22.0483 29.3965 20.3813C27.7295 18.7143 25.4686 17.7778 23.1111 17.7778H8.88889Z"
            fill="black"
          />
        </svg>
        <p>Profile</p>
      </div>
      <div className="flex justify-center mx-24">
        <div className="h-full w-full bg-[#3A556A] rounded-lg mt-3">
          <div className=" flex gap-5  flex-row items-center justify-between px-11">
            <div className="flex gap-7">
              <Image
                src="/img/annan.png"
                className="my-11 rounded-full"
                alt="logo"
                width={100}
                height={100}
              />
              <p className="text-[18px] text-white my-auto">
                Hello <br /> <span className="text-[24px]"> Shaan </span>
              </p>
            </div>
            <div className="flex items-center justify-center py-1 px-4 rounded-full bg-[#F0EFFA]">
              <button className="flex">Upload</button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-rows-2">
        <ul>
          <li className="flex justify-center">
            <div className="w-[550px] flex justify-between items-center mt-12 mb-24 py-5">
              <p className="text-[18px] text-[#3A556A]">First Name</p>
              <p className="text-[18px] text-[#3A556A]">Last Name</p>
            </div>
          </li>
          <li className="flex justify-center">
            <div className="w-[550px] flex justify-between items-center mt-12 mb-24 py-5">
              <p className="text-[18px] text-[#3A556A]">Email</p>
              <p className="text-[18px] text-[#3A556A]">Phone Number</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Profile;
