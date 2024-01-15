/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/layout/Navbar";
import { useState } from "react";
import OpenAIComponent from "@/components/openAi/OpenAIComponent";
import OpenAI from "openai";
import {
  fetchImageFromKeyword,
  itinerarySchema,
} from "@/utility/openAiUtility";
import { redirect } from "next/navigation";
import Itinerary from "./itinerary";
import { useRouter } from "next/router";

const data = [
  {
    title: "Delhi",
    peopleCount: 31,
  },
  {
    title: "Munnar",
    peopleCount: 27,
  },
  {
    title: "Agra",
    peopleCount: 20,
  },
];

// fetchImageFromKeyword("Delhi")

console.log("hi");

export default function Home() {
  const [promptData, setPromptData] = useState({
    destination: "tajMahal",
    days: 1,
  });
  const router = useRouter();

  const handleSubmit = () => {
    console.log("loading");
    // const { itinerary } = OpenAIComponent(promptData);
    // getItinerary();

    router.push(
      `/itinerary?destination=${promptData.destination}&days=${promptData.days}`
    );

    // dataConvert().then((el) => {
    //   // console.log(el);
    //   setItinaryFullData(el)
    // })
  };

  return (
    <div>
      <div className="font-montserrat bg-hero lg:h-screen bg-cover flex flex-col justify-between">
        <Navbar />
        <div className="container mx-auto mb-20">
          <div className="grid grid-cols-2 ">
            <div className="col-span-1 ">
              <h1 className="font-bold text-5xl leading-tight text-white">
                Spend your vacation with our activites
              </h1>
              <div className="flex flex-col gap-6 mt-12">
                <div className="flex justify-between items-center">
                  <h2 className="font-medium text-2xl uppercase text-white">
                    Most Popular
                  </h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M16.0003 29.3334C23.3641 29.3334 29.3337 23.3639 29.3337 16.0001C29.3337 8.63628 23.3641 2.66675 16.0003 2.66675C8.63653 2.66675 2.66699 8.63628 2.66699 16.0001C2.66699 23.3639 8.63653 29.3334 16.0003 29.3334Z"
                      stroke="white"
                      strokeOpacity="0.8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 21.3334L21.3333 16.0001L16 10.6667"
                      stroke="white"
                      strokeOpacity="0.8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.667 16H21.3337"
                      stroke="white"
                      strokeOpacity="0.8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex gap-10 ">
                  {data.map((el, i) => (
                    <div
                      className="flex gap-2 flex-col rounded-xl bg-white bg-opacity-60 text-primary p-3"
                      key={i}
                    >
                      <img src={`/img/place/${i + 1}.png`} alt={`img ${el}`} />
                      <div>
                        <h3 className="text-base font-medium">{el.title}</h3>
                        <p className="text-xs font-light flex gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="12"
                            viewBox="0 0 13 12"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_74_1217)">
                              <path
                                d="M1.5 11C1.5 9.93913 1.92143 8.92172 2.67157 8.17157C3.42172 7.42143 4.43913 7 5.5 7C6.56087 7 7.57828 7.42143 8.32843 8.17157C9.07857 8.92172 9.5 9.93913 9.5 11H8.5C8.5 10.2043 8.18393 9.44129 7.62132 8.87868C7.05871 8.31607 6.29565 8 5.5 8C4.70435 8 3.94129 8.31607 3.37868 8.87868C2.81607 9.44129 2.5 10.2043 2.5 11H1.5ZM5.5 6.5C3.8425 6.5 2.5 5.1575 2.5 3.5C2.5 1.8425 3.8425 0.5 5.5 0.5C7.1575 0.5 8.5 1.8425 8.5 3.5C8.5 5.1575 7.1575 6.5 5.5 6.5ZM5.5 5.5C6.605 5.5 7.5 4.605 7.5 3.5C7.5 2.395 6.605 1.5 5.5 1.5C4.395 1.5 3.5 2.395 3.5 3.5C3.5 4.605 4.395 5.5 5.5 5.5ZM9.642 7.3515C10.3447 7.66796 10.941 8.18062 11.3593 8.82785C11.7776 9.47509 12.0001 10.2294 12 11H11C11.0001 10.422 10.8333 9.85625 10.5195 9.37079C10.2058 8.88533 9.75854 8.50083 9.2315 8.2635L9.6415 7.3515H9.642ZM9.298 1.7065C9.80176 1.91415 10.2325 2.26677 10.5355 2.71961C10.8385 3.17246 11.0002 3.70512 11 4.25C11.0002 4.93617 10.7438 5.59761 10.2813 6.10441C9.8187 6.61121 9.18334 6.92673 8.5 6.989V5.9825C8.87047 5.92944 9.21418 5.75901 9.48065 5.49623C9.74713 5.23345 9.92235 4.89216 9.98058 4.52247C10.0388 4.15277 9.97699 3.77415 9.80419 3.44218C9.6314 3.1102 9.35672 2.84237 9.0205 2.678L9.298 1.7065Z"
                                fill="#023F76"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_74_1217">
                                <rect
                                  width="12"
                                  height="12"
                                  fill="white"
                                  transform="translate(0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          &nbsp;
                          {el.peopleCount} people going
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <div className="flex gap-6 p-4 bg-white bg-opacity-60 rounded-md">
                    <div className="flex-1 flex items-center bg-white  rounded-xl">
                      <div className="flex items-center gap-5 p-3 ml-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="29"
                          height="28"
                          viewBox="0 0 29 28"
                          fill="none"
                        >
                          <g opacity="0.5" clipPath="url(#clip0_74_1259)">
                            <path
                              d="M24.7891 23.3334C24.7891 23.6428 24.6662 23.9396 24.4474 24.1584C24.2286 24.3772 23.9318 24.5001 23.6224 24.5001H4.95573C4.64631 24.5001 4.34956 24.3772 4.13077 24.1584C3.91198 23.9396 3.78906 23.6428 3.78906 23.3334V11.0717C3.78894 10.894 3.82945 10.7185 3.9075 10.5588C3.98555 10.399 4.09907 10.2592 4.2394 10.1501L13.5727 2.89107C13.7775 2.73176 14.0296 2.64526 14.2891 2.64526C14.5485 2.64526 14.8006 2.73176 15.0054 2.89107L24.3387 10.1501C24.4791 10.2592 24.5926 10.399 24.6706 10.5588C24.7487 10.7185 24.7892 10.894 24.7891 11.0717V23.3334ZM22.4557 22.1667V11.6411L14.2891 5.28974L6.1224 11.6411V22.1667H22.4557Z"
                              fill="#3E4958"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_74_1259">
                              <rect
                                width="28"
                                height="28"
                                fill="white"
                                transform="translate(0.289062)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <div className="flex flex-col gap-1">
                          <p className="ml-1 text-secondary text-sm font-medium">
                            Location
                          </p>
                          <input
                            type="text"
                            id="destination"
                            className="bg-transparent text-secondary font-bold placeholder:opacity-50 placeholder:font-medium outline-none"
                            placeholder="Search"
                            onChange={(e) =>
                              setPromptData({
                                ...promptData,
                                destination: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="ml-10 mr-6 w-[1px] h-full bg-secondary opacity-40"></div>
                      <div className="flex items-center gap-5 p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="29"
                          height="28"
                          viewBox="0 0 29 28"
                          fill="none"
                        >
                          <g opacity="0.5" clipPath="url(#clip0_184_1320)">
                            <path
                              d="M19.8506 3.49984H24.5173C24.8267 3.49984 25.1234 3.62275 25.3422 3.84155C25.561 4.06034 25.6839 4.35708 25.6839 4.6665V23.3332C25.6839 23.6426 25.561 23.9393 25.3422 24.1581C25.1234 24.3769 24.8267 24.4998 24.5173 24.4998H3.51725C3.20783 24.4998 2.91109 24.3769 2.69229 24.1581C2.4735 23.9393 2.35059 23.6426 2.35059 23.3332V4.6665C2.35059 4.35708 2.4735 4.06034 2.69229 3.84155C2.91109 3.62275 3.20783 3.49984 3.51725 3.49984H8.18392V1.1665H10.5173V3.49984H17.5173V1.1665H19.8506V3.49984ZM17.5173 5.83317H10.5173V8.1665H8.18392V5.83317H4.68392V10.4998H23.3506V5.83317H19.8506V8.1665H17.5173V5.83317ZM23.3506 12.8332H4.68392V22.1665H23.3506V12.8332Z"
                              fill="#3E4958"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_184_1320">
                              <rect
                                width="28"
                                height="28"
                                fill="white"
                                transform="translate(0.0170898)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <div className="flex flex-col gap-1">
                          <p className="ml-1 text-secondary text-sm font-medium">
                            No. of Days
                          </p>
                          <input
                            type="number"
                            value={promptData.days}
                            onChange={(e) =>
                              setPromptData({
                                ...promptData,
                                days:
                                  +e.target.value > 0
                                    ? +e.target.value
                                    : promptData.days,
                              })
                            }
                            className="bg-transparent text-secondary font-bold pl-2 outline-none border-none"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="py-2 px-8 text-white rounded-lg font-semibold text-lg bg-[#324C28] hover:bg-opacity-90"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {itinerary ? <Itinerary {...itinerary} /> : null} */}
        {/* <OpenAIComponent userPrompt={promptData} /> */}
      </div>
      {/* {itinaryFullData ? <Itinerary {...itinaryFullData} /> : null} */}
    </div>
  );
}
