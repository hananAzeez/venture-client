import Image from "next/image";
import React from "react";

const Profile = ({ data }: { data: Person | null }) => {
  if (!data) {
    return <h1>data laoding</h1>;
  } else
    return (
      <section>
        <div className="flex justify-center px-16">
          <div className="w-full bg-[#3A556A] rounded-lg mt-3">
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
                  Hello <br />{" "}
                  <span className="text-[24px]"> {data.fname} </span>
                </p>
              </div>
              <div className="flex items-center justify-center py-1 px-4 rounded-full bg-[#F0EFFA]">
                <button className="flex">Upload</button>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-16 my-12 rounded-xl border border-primary p-6">
          <ul className="flex flex-col gap-6 font-medium">
            <li className="flex flex-col gap-5">
              <div className="">
                <p className="text-[18px] text-[#1f1f1f] opacity-70 ">
                  Your Name
                </p>
                <p className="text-[18px] text-[#222222] opacity-80 font-semibold">
                  {data.fname} {data.lname}
                </p>
              </div>
            </li>
            <li className="flex flex-col gap-5">
              <div className="">
                <p className="text-[18px] text-[#1f1f1f] opacity-70">Email</p>
                <p className="text-[18px] text-[#222222] opacity-80 font-semibold">
                  {data.email}
                </p>
              </div>
            </li>
            <li className="flex flex-col gap-5">
              <div className="">
                <p className="text-[18px] text-[#1f1f1f] opacity-70">
                  Phone Number
                </p>
                <p className="text-[18px] text-[#222222] opacity-80 font-semibold">
                  {data.phone}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    );
};

export default Profile;
