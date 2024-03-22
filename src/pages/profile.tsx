/* eslint-disable react-hooks/rules-of-hooks */
import Profile from "@/components/ui/Profile";
import YourTrip from "@/components/ui/YourTrip";
import { apiInstance } from "@/utility/axiosUtility";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const profile = () => {
  const [index, setIndex] = useState(1);

  const [userData, setUserData] = useState<Person | null>(null);

  const fetchProfileData = async () => {
    try {
      const response = await apiInstance.get("/user/profile");
      // Handle the response
      setUserData(response.data);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfileData();
    } else {
      router.push("/");
    }
  }, []);

  const logout = (e: any) => {
    e.preventDefault();
    localStorage.removeItem("token")
    router.push("/");
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="max-w-[375px] w-full bg-[#f7f7f7] flex-col flex shadow-xl z-10 pl-20 py-12">
        <Link href="/">
          <Image
            src="/img/logo-black.png"
            className=""
            alt="logo"
            width={165}
            height={50}
          />
        </Link>
        <div className="mt-12 flex flex-col justify-between h-full">
          <ul className="text-[22px] w-56 text-dark font-[500] ">
            <li
              className=" profile-item flex items-center justify-between py-4 cursor-po hover:bg-primary2 hover:text-white rounded-xl px-6 transition-all duration-200 cursor-pointer"
              onClick={() => {
                setIndex(1);
              }}
            >
              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.72222 4.27778C4.72222 3.27585 5.12024 2.31496 5.82871 1.60649C6.53718 0.898015 7.49807 0.5 8.5 0.5C9.50193 0.5 10.4628 0.898015 11.1713 1.60649C11.8798 2.31496 12.2778 3.27585 12.2778 4.27778C12.2778 5.27971 11.8798 6.2406 11.1713 6.94907C10.4628 7.65754 9.50193 8.05556 8.5 8.05556C7.49807 8.05556 6.53718 7.65754 5.82871 6.94907C5.12024 6.2406 4.72222 5.27971 4.72222 4.27778ZM4.72222 9.94444C3.46981 9.94444 2.2687 10.442 1.38311 11.3276C0.497518 12.2131 0 13.4143 0 14.6667C0 15.4181 0.298511 16.1388 0.829864 16.6701C1.36122 17.2015 2.08189 17.5 2.83333 17.5H14.1667C14.9181 17.5 15.6388 17.2015 16.1701 16.6701C16.7015 16.1388 17 15.4181 17 14.6667C17 13.4143 16.5025 12.2131 15.6169 11.3276C14.7313 10.442 13.5302 9.94444 12.2778 9.94444H4.72222Z"
                    fill="black"
                  />
                </svg>
                <p>Profile</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="#9197B3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>
            <li
              className=" profile-item flex items-center justify-between cursor-pointer py-4 hover:bg-primary2 hover:text-white rounded-xl px-6 transition-all duration-200 cursor-pointer"
              onClick={() => {
                setIndex(2);
              }}
            >
              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M14.844 20H6.5C5.121 20 4 18.879 4 17.5C4 16.121 5.121 15 6.5 15H13.5C15.43 15 17 13.43 17 11.5C17 9.57 15.43 8 13.5 8H8.639C8.27175 8.71988 7.81697 9.39164 7.285 10H13.5C14.327 10 15 10.673 15 11.5C15 12.327 14.327 13 13.5 13H6.5C4.019 13 2 15.019 2 17.5C2 19.981 4.019 22 6.5 22H16.093C15.6023 21.3828 15.1833 20.7118 14.844 20ZM5 2C3.346 2 2 3.346 2 5C2 8.188 5 10 5 10C5 10 8 8.187 8 5C8 3.346 6.654 2 5 2ZM5 6.5C4.80295 6.49993 4.60785 6.46106 4.42582 6.38559C4.2438 6.31012 4.07842 6.19954 3.93913 6.06016C3.79984 5.92078 3.68937 5.75533 3.61403 5.57325C3.53868 5.39118 3.49993 5.19605 3.5 4.999C3.50007 4.80195 3.53894 4.60685 3.61441 4.42482C3.68988 4.2428 3.80046 4.07742 3.93984 3.93813C4.07922 3.79884 4.24467 3.68837 4.42675 3.61303C4.60882 3.53768 4.80395 3.49893 5.001 3.499C5.39896 3.49913 5.78056 3.65735 6.06187 3.93884C6.34317 4.22033 6.50113 4.60204 6.501 5C6.50087 5.39796 6.34265 5.77956 6.06116 6.06087C5.77967 6.34217 5.39796 6.50013 5 6.5Z"
                    fill="black"
                  />
                  <path
                    d="M19 14C17.346 14 16 15.346 16 17C16 20.188 19 22 19 22C19 22 22 20.187 22 17C22 15.346 20.654 14 19 14ZM19 18.5C18.803 18.4999 18.6078 18.4611 18.4258 18.3856C18.2438 18.3101 18.0784 18.1995 17.9391 18.0602C17.7998 17.9208 17.6894 17.7553 17.614 17.5733C17.5387 17.3912 17.4999 17.196 17.5 16.999C17.5001 16.802 17.5389 16.6068 17.6144 16.4248C17.6899 16.2428 17.8005 16.0774 17.9398 15.9381C18.0792 15.7988 18.2447 15.6884 18.4267 15.613C18.6088 15.5377 18.804 15.4989 19.001 15.499C19.399 15.4991 19.7806 15.6573 20.0619 15.9388C20.3432 16.2203 20.5011 16.602 20.501 17C20.5009 17.398 20.3427 17.7796 20.0612 18.0609C19.7797 18.3422 19.398 18.5001 19 18.5Z"
                    fill="black"
                  />
                </svg>
                <p>Your Trips</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="#9197B3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>
          </ul>
          <ul className="text-[22px] w-56 text-dark font-[500] ">
            <li

              className="log-out-btn profile-item flex items-center justify-between py-4 cursor-po hover:bg-primary2 hover:text-white rounded-xl px-6 transition-all duration-200 cursor-pointer"
              onClick={logout}
            >
              <div className="flex items-center gap-4">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.4999 12.0999L0.899902 6.4999L6.4999 0.899902" stroke="#FF7171" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12.1 12.0999L6.5 6.4999L12.1 0.899902" stroke="#FC5050" stroke-opacity="0.972549" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <p>Logout</p>
              </div>
            </li>

          </ul>
        </div>
      </div>
      <div className="bg-[#f7f7f7] w-screen z-0">
        <div className="flex items-center justify-between px-16 py-10">
          <div className="flex items-center gap-4 font-[500] text-[32px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              className=""
              viewBox="0 0 32 32"
              fill="#333"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.88889 7.11111C8.88889 5.22513 9.63809 3.41639 10.9717 2.0828C12.3053 0.749204 14.114 0 16 0C17.886 0 19.6947 0.749204 21.0283 2.0828C22.3619 3.41639 23.1111 5.22513 23.1111 7.11111C23.1111 8.9971 22.3619 10.8058 21.0283 12.1394C19.6947 13.473 17.886 14.2222 16 14.2222C14.114 14.2222 12.3053 13.473 10.9717 12.1394C9.63809 10.8058 8.88889 8.9971 8.88889 7.11111ZM8.88889 17.7778C6.53141 17.7778 4.27049 18.7143 2.6035 20.3813C0.936505 22.0483 0 24.3092 0 26.6667C0 28.0812 0.561903 29.4377 1.5621 30.4379C2.56229 31.4381 3.91885 32 5.33333 32H26.6667C28.0812 32 29.4377 31.4381 30.4379 30.4379C31.4381 29.4377 32 28.0812 32 26.6667C32 24.3092 31.0635 22.0483 29.3965 20.3813C27.7295 18.7143 25.4686 17.7778 23.1111 17.7778H8.88889Z"
                fill="black"
              />
            </svg>
            <p className="text-dark">Profile</p>
          </div>
          <div className="flex gap-[22px] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="35"
              viewBox="0 0 34 35"
              fill="none"
              className="cursor-pointer"
            >
              <path
                d="M9.91667 13.2653L15.2292 17.5153C15.7317 17.9176 16.3563 18.1369 17 18.1369C17.6437 18.1369 18.2683 17.9176 18.7708 17.5153L24.0833 13.2653M29.75 24.5986V10.432C29.75 9.68052 29.4515 8.95985 28.9201 8.4285C28.3888 7.89714 27.6681 7.59863 26.9167 7.59863H7.08333C6.33189 7.59863 5.61122 7.89714 5.07986 8.4285C4.54851 8.95985 4.25 9.68052 4.25 10.432V24.5986C4.25 25.3501 4.54851 26.0708 5.07986 26.6021C5.61122 27.1335 6.33189 27.432 7.08333 27.432H26.9167C27.6681 27.432 28.3888 27.1335 28.9201 26.6021C29.4515 26.0708 29.75 25.3501 29.75 24.5986Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31"
              height="32"
              viewBox="0 0 31 32"
              fill="none"
              className="cursor-pointer"
            >
              <path
                d="M15.5 29.0781C8.02125 29.0781 1.9375 22.9944 1.9375 15.5156C1.9375 8.03688 8.02125 1.95312 15.5 1.95312C22.9788 1.95312 29.0625 8.03688 29.0625 15.5156C29.0625 22.9944 22.9788 29.0781 15.5 29.0781ZM15.5 3.89062C9.08687 3.89062 3.875 9.1025 3.875 15.5156C3.875 21.9287 9.08687 27.1406 15.5 27.1406C21.9131 27.1406 27.125 21.9287 27.125 15.5156C27.125 9.1025 21.9131 3.89062 15.5 3.89062Z"
                fill="black"
              />
              <path
                d="M15.5 8.73438C13.3494 8.73438 11.625 10.4588 11.625 12.6094H13.5625C13.5625 11.5438 14.4344 10.6719 15.5 10.6719C16.5656 10.6719 17.4375 11.5438 17.4375 12.6094C17.4375 14.5469 14.5312 14.3144 14.5312 17.4531H16.4688C16.4688 15.2831 19.375 15.0312 19.375 12.6094C19.375 10.4588 17.6506 8.73438 15.5 8.73438Z"
                fill="black"
              />
              <path
                d="M15.5001 22.5295C16.1635 22.5295 16.7013 21.9916 16.7013 21.3282C16.7013 20.6648 16.1635 20.127 15.5001 20.127C14.8366 20.127 14.2988 20.6648 14.2988 21.3282C14.2988 21.9916 14.8366 22.5295 15.5001 22.5295Z"
                fill="black"
              />
              <path
                d="M12.5938 13.5781C13.1288 13.5781 13.5625 13.1444 13.5625 12.6094C13.5625 12.0743 13.1288 11.6406 12.5938 11.6406C12.0587 11.6406 11.625 12.0743 11.625 12.6094C11.625 13.1444 12.0587 13.5781 12.5938 13.5781Z"
                fill="black"
              />
              <path
                d="M15.5 18.4219C16.035 18.4219 16.4688 17.9882 16.4688 17.4531C16.4688 16.9181 16.035 16.4844 15.5 16.4844C14.965 16.4844 14.5312 16.9181 14.5312 17.4531C14.5312 17.9882 14.965 18.4219 15.5 18.4219Z"
                fill="black"
              />
            </svg>
            <div>
              <Image
                src="/img/user-icon.png"
                className="rounded-full cursor-pointer"
                alt="logo"
                width={32}
                height={32}
              />
            </div>
          </div>
        </div>
        {index == 1 ? <Profile data={userData} /> : <YourTrip />}
      </div>
    </div>
  );
};

export default profile;
