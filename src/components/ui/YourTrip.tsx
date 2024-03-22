import { apiInstance } from "@/utility/axiosUtility";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const data = [
  {
    title: "Delhi",
    peopleCount: 2,
  },
  {
    title: "Munnar",
    peopleCount: 1,
  },
  {
    title: "Agra",
    peopleCount: 7,
  },
];

const YourTrip = () => {
  const [tripData, setTripData] = useState<
    { venture: itinaryWithImage; _id: string }[]
  >([]);

  const getItinary = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await apiInstance.get(
          "http://139.59.76.189:4000/venture",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTripData(response.data.result);
      } else {
        toast.error("Please login to save !");
      }
    } catch (error) {
      console.log((error as any).response.data.message);
      toast.error("Error:" + (error as any).response.data.message);
    }
  };

  useEffect(() => {
    getItinary();
  }, []);

  return (
    <section>
      <div className="flex items-center gap-[10px] font-[500] text-[32px] ml-16 my-10 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
        >
          <path
            d="M22.266 30H9.75C7.6815 30 6 28.3185 6 26.25C6 24.1815 7.6815 22.5 9.75 22.5H20.25C23.145 22.5 25.5 20.145 25.5 17.25C25.5 14.355 23.145 12 20.25 12H12.9585C12.4076 13.0798 11.7255 14.0875 10.9275 15H20.25C21.4905 15 22.5 16.0095 22.5 17.25C22.5 18.4905 21.4905 19.5 20.25 19.5H9.75C6.0285 19.5 3 22.5285 3 26.25C3 29.9715 6.0285 33 9.75 33H24.1395C23.4034 32.0741 22.7749 31.0677 22.266 30ZM7.5 3C5.019 3 3 5.019 3 7.5C3 12.282 7.5 15 7.5 15C7.5 15 12 12.2805 12 7.5C12 5.019 9.981 3 7.5 3ZM7.5 9.75C7.20443 9.7499 6.91177 9.69159 6.63873 9.57839C6.3657 9.46518 6.11763 9.29931 5.9087 9.09024C5.69977 8.88117 5.53406 8.63299 5.42104 8.35988C5.30802 8.08677 5.2499 7.79407 5.25 7.4985C5.2501 7.20293 5.30841 6.91027 5.42162 6.63723C5.53482 6.3642 5.70069 6.11613 5.90976 5.9072C6.11883 5.69827 6.36701 5.53256 6.64012 5.41954C6.91323 5.30652 7.20593 5.2484 7.5015 5.2485C8.09844 5.2487 8.67084 5.48602 9.0928 5.90826C9.51476 6.3305 9.7517 6.90306 9.7515 7.5C9.7513 8.09694 9.51398 8.66934 9.09174 9.0913C8.6695 9.51326 8.09694 9.7502 7.5 9.75Z"
            fill="black"
          />
          <path
            d="M28.5 21C26.019 21 24 23.019 24 25.5C24 30.282 28.5 33 28.5 33C28.5 33 33 30.2805 33 25.5C33 23.019 30.981 21 28.5 21ZM28.5 27.75C28.2044 27.7499 27.9118 27.6916 27.6387 27.5784C27.3657 27.4652 27.1176 27.2993 26.9087 27.0902C26.6998 26.8812 26.5341 26.633 26.421 26.3599C26.308 26.0868 26.2499 25.7941 26.25 25.4985C26.2501 25.2029 26.3084 24.9103 26.4216 24.6372C26.5348 24.3642 26.7007 24.1161 26.9098 23.9072C27.1188 23.6983 27.367 23.5326 27.6401 23.4195C27.9132 23.3065 28.2059 23.2484 28.5015 23.2485C29.0984 23.2487 29.6708 23.486 30.0928 23.9083C30.5148 24.3305 30.7517 24.9031 30.7515 25.5C30.7513 26.0969 30.514 26.6693 30.0917 27.0913C29.6695 27.5133 29.0969 27.7502 28.5 27.75Z"
            fill="black"
          />
        </svg>
        <p className="text-dark">Your Trip</p>
      </div>
      <div className="mt-10 ml-16">
        <div className="flex gap-10 ">
          {tripData.length
            ? tripData.map((el, i) => (
                <Link
                  href={`/itinerary?savedItinaryId=${el._id}`}
                  className="flex gap-2 flex-col rounded-xl bg-[#ffffff99]	shadow-md text-primary p-3 cursor-pointer max-w-[250px]"
                  key={i}
                >
                  <img
                    src={el.venture.placeImg}
                    alt={`${el.venture.destination}`}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h3 className="text-base font-medium">
                      {el.venture.destination}
                    </h3>
                    <p className="text-xs font-light flex gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                      >
                        <path
                          d="M11.3737 3.1202H10.2037V2.5352C10.2037 2.38004 10.1421 2.23125 10.0324 2.12154C9.92266 2.01183 9.77386 1.9502 9.61871 1.9502C9.46356 1.9502 9.31476 2.01183 9.20505 2.12154C9.09535 2.23125 9.03371 2.38004 9.03371 2.5352V3.1202H5.52371V2.5352C5.52371 2.38004 5.46208 2.23125 5.35237 2.12154C5.24266 2.01183 5.09386 1.9502 4.93871 1.9502C4.78356 1.9502 4.63476 2.01183 4.52505 2.12154C4.41534 2.23125 4.35371 2.38004 4.35371 2.5352V3.1202H3.18371C2.71826 3.1202 2.27187 3.3051 1.94274 3.63422C1.61361 3.96335 1.42871 4.40974 1.42871 4.8752V11.8952C1.42871 12.3607 1.61361 12.807 1.94274 13.1362C2.27187 13.4653 2.71826 13.6502 3.18371 13.6502H11.3737C11.8392 13.6502 12.2856 13.4653 12.6147 13.1362C12.9438 12.807 13.1287 12.3607 13.1287 11.8952V4.8752C13.1287 4.40974 12.9438 3.96335 12.6147 3.63422C12.2856 3.3051 11.8392 3.1202 11.3737 3.1202ZM11.9587 11.8952C11.9587 12.0503 11.8971 12.1991 11.7874 12.3089C11.6777 12.4186 11.5289 12.4802 11.3737 12.4802H3.18371C3.02856 12.4802 2.87976 12.4186 2.77005 12.3089C2.66034 12.1991 2.59871 12.0503 2.59871 11.8952V7.8002H11.9587V11.8952ZM11.9587 6.6302H2.59871V4.8752C2.59871 4.72004 2.66034 4.57125 2.77005 4.46154C2.87976 4.35183 3.02856 4.2902 3.18371 4.2902H4.35371V4.8752C4.35371 5.03035 4.41534 5.17914 4.52505 5.28885C4.63476 5.39856 4.78356 5.4602 4.93871 5.4602C5.09386 5.4602 5.24266 5.39856 5.35237 5.28885C5.46208 5.17914 5.52371 5.03035 5.52371 4.8752V4.2902H9.03371V4.8752C9.03371 5.03035 9.09535 5.17914 9.20505 5.28885C9.31476 5.39856 9.46356 5.4602 9.61871 5.4602C9.77386 5.4602 9.92266 5.39856 10.0324 5.28885C10.1421 5.17914 10.2037 5.03035 10.2037 4.8752V4.2902H11.3737C11.5289 4.2902 11.6777 4.35183 11.7874 4.46154C11.8971 4.57125 11.9587 4.72004 11.9587 4.8752V6.6302Z"
                          fill="#023F76"
                        />
                      </svg>
                      &nbsp;
                      {el.venture.numberOfDays} Days
                    </p>
                  </div>
                </Link>
              ))
            : null}
        </div>
        <div className="bg-[#ffffff99] shadow-md h-[226px] w-[180px] rounded-xl mt-12 cursor-pointer">
          <div className="flex justify-center items-center h-full flex-col gap-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="62"
              height="62"
              // className="my-auto"
              viewBox="0 0 62 62"
              fill="none"
            >
              <g filter="url(#filter0_b_220_918)">
                <path
                  d="M31.0398 0.55957C23.0498 0.656518 15.4143 3.87363 9.76409 9.52386C4.11387 15.1741 0.896752 22.8095 0.799805 30.7996C0.896752 38.7896 4.11387 46.4251 9.76409 52.0753C15.4143 57.7255 23.0498 60.9426 31.0398 61.0396C39.0298 60.9426 46.6653 57.7255 52.3155 52.0753C57.9657 46.4251 61.1829 38.7896 61.2798 30.7996C61.1829 22.8095 57.9657 15.1741 52.3155 9.52386C46.6653 3.87363 39.0298 0.656518 31.0398 0.55957ZM48.3198 32.9596H33.1998V48.0796H28.8798V32.9596H13.7598V28.6396H28.8798V13.5196H33.1998V28.6396H48.3198V32.9596Z"
                  fill="#023F76"
                />
              </g>
              <defs>
                <filter
                  id="filter0_b_220_918"
                  x="-3.5202"
                  y="-3.76043"
                  width="69.1205"
                  height="69.1205"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="2.16" />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_220_918"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_220_918"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <p className="text-[#023F76] text-[18px] font-[500] ">New Trip</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YourTrip;
