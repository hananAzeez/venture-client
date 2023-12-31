/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { useState } from "react";
import OpenAIComponent from "@/components/openAi/OpenAIComponent";
import OpenAI from "openai";
import { itinerarySchema } from "@/utility/openAiUtility";
import Itinerary from "@/components/itinerary";

const inter = Inter({ subsets: ["latin"] });
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

const dummyData = {
  places: "Delhi",
  numberOfDays: 4,
  description:
    "Welcome to Delhi, the capital city of India! Get ready for an unforgettable journey through this vibrant and historic metropolis. With a rich blend of ancient traditions and modern attractions, Delhi offers something for everyone. From awe-inspiring monuments to bustling markets and delicious street food, this itinerary will take you on a whirlwind adventure. Explore the iconic landmarks, experience the local culture, and immerse yourself in the vibrant atmosphere of Delhi.",
  days: [
    {
      day: 1,
      description:
        "Start your day with a visit to the magnificent Red Fort, a UNESCO World Heritage Site. Explore its beautiful architecture and learn about its historical significance. Afterward, head to Jama Masjid, one of the largest mosques in India, and soak in its grandeur. In the afternoon, visit Humayun's Tomb, a stunning mausoleum with beautiful gardens. End the day with a stroll at Lodi Gardens, a serene park filled with ancient tombs.",
      activities: [
        {
          time: "Morning",
          description: "Visit the Red Fort",
          name: "Red Fort",
          mapUrl: "https://goo.gl/maps/fAKvUed5rSXRD49E9",
        },
        {
          time: "Afternoon",
          description: "Explore Jama Masjid",
          name: "Jama Masjid",
          mapUrl: "https://goo.gl/maps/kRmcCV8eGMEXE2RdA",
        },
        {
          time: "Afternoon",
          description: "Discover Humayun's Tomb",
          name: "Humayun's Tomb",
          mapUrl: "https://goo.gl/maps/3C9L3xL1Rvt8UoPP7",
        },
        {
          time: "Evening",
          description: "Stroll at Lodi Gardens",
          name: "Lodi Gardens",
          mapUrl: "https://goo.gl/maps/xrzU1RKwgYjh8Hfb6",
        },
      ],
    },
    {
      day: 2,
      description:
        "On day 2, immerse yourself in the cultural heritage of Delhi. Start your day with a visit to Qutub Minar, the tallest brick minaret in the world. Next, explore the bustling streets of Chandni Chowk, one of the oldest and busiest markets in Delhi. Indulge in the local street food and shop for traditional goods. In the evening, enjoy a peaceful boat ride at India Gate, a famous war memorial.",
      activities: [
        {
          time: "Morning",
          description: "Visit Qutub Minar",
          name: "Qutub Minar",
          mapUrl: "https://goo.gl/maps/Hw4jWHDW6juZ449T8",
        },
        {
          time: "Afternoon",
          description: "Explore Chandni Chowk market",
          name: "Chandni Chowk",
          mapUrl: "https://goo.gl/maps/RM9b2ptTm781XjCw5",
        },
        {
          time: "Evening",
          description: "Boat ride at India Gate",
          name: "India Gate",
          mapUrl: "https://goo.gl/maps/qzTZtK21wYzJRSFr5",
        },
      ],
    },
    {
      day: 3,
      description:
        "Today, discover the architectural wonders of Delhi. Start your day with a visit to the Akshardham Temple, a stunning Hindu temple complex known for its intricate design. Next, head to the Lotus Temple, a beautiful Bahá'í House of Worship. In the afternoon, explore the National Museum, which houses a vast collection of art and artifacts. End the day with a visit to the bustling markets of Connaught Place.",
      activities: [
        {
          time: "Morning",
          description: "Visit Akshardham Temple",
          name: "Akshardham Temple",
          mapUrl: "https://goo.gl/maps/r4WhxcixWSTvfZPm6",
        },
        {
          time: "Afternoon",
          description: "Explore Lotus Temple",
          name: "Lotus Temple",
          mapUrl: "https://goo.gl/maps/iC6xt4ZdX7W9m4Ld6",
        },
        {
          time: "Afternoon",
          description: "Discover National Museum",
          name: "National Museum",
          mapUrl: "https://goo.gl/maps/Q4jL55TP9Cw8apWj7",
        },
        {
          time: "Evening",
          description: "Shop at Connaught Place",
          name: "Connaught Place",
          mapUrl: "https://goo.gl/maps/8XbBzGHwwtzRBYyf9",
        },
      ],
    },
    {
      day: 4,
      description:
        "On your last day, delve into the enchanting history of Delhi. Start your day with a visit to the historic India Gate, a war memorial dedicated to Indian soldiers. Next, explore the majestic Rashtrapati Bhavan, the official residence of the President of India. In the afternoon, visit the Gandhi Smriti, a museum dedicated to Mahatma Gandhi. End your trip with a visit to the bustling markets of Karol Bagh.",
      activities: [
        {
          time: "Morning",
          description: "Visit India Gate",
          name: "India Gate",
          mapUrl: "https://goo.gl/maps/M7zkt9Y8c31XjMkU7",
        },
        {
          time: "Morning",
          description: "Explore Rashtrapati Bhavan",
          name: "Rashtrapati Bhavan",
          mapUrl: "https://goo.gl/maps/H5RdJCTVyuHb3qjK7",
        },
        {
          time: "Afternoon",
          description: "Discover Gandhi Smriti",
          name: "Gandhi Smriti",
          mapUrl: "https://goo.gl/maps/17GRd8CFqw4pVTc96",
        },
        {
          time: "Evening",
          description: "Shop at Karol Bagh",
          name: "Karol Bagh",
          mapUrl: "https://goo.gl/maps/u7XuVzNrBpgakGYaA",
        },
      ],
    },
  ],
};

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Home() {
  const [promptData, setPromptData] = useState({
    place: "tajMahal",
    days: 1,
  });
  const handleSubmit = () => {
    console.log(process.env.NEXT_PUBLIC_API_KEY);
    // const { itinerary } = OpenAIComponent(promptData);
    // console.log(itinerary);
    getItinerary();
  };

  const [loading, setLoading] = useState(true);
  const [itinerary, setItinerary] = useState<any>(null);

  // Define the itinerary schema

  const getItinerary = async () => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful travel assistant. You create custom itineraries for clients based on their specified destination and days.",
          },
          {
            role: "user",
            content: `create an itinerary for Delhi for 4 days`,
          },
        ],
        functions: [
          {
            name: "get_itinerary",
            parameters: itinerarySchema,
            description:
              "create a itinary using the destination and number of Days",
          },
        ],
        function_call: "auto",
      });

      if (completion.choices[0].message.function_call?.arguments) {
        const response = JSON.parse(
          completion.choices[0].message.function_call?.arguments
        );
        console.log("response", response);
        setItinerary(response);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      setLoading(false);
    }
  };

  // console.log(itinerary);

  return (
    <div className="font-montserrat bg-hero lg:h-screen bg-cover flex flex-col justify-between">
      <Navbar />
      <div className="container mx-auto mb-20">
        <div className="grid grid-cols-2 ">
          <div className="col-span-1 ">
            <h1 className="font-bold text-5xl leading-tight">
              Spend your vacation with our activites
            </h1>
            <div className="flex flex-col gap-6 mt-12">
              <div className="flex justify-between items-center">
                <h2 className="font-medium text-2xl uppercase ">
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
              <div className="flex gap-6 p-4 bg-white bg-opacity-60 rounded-md">
                <div className="flex-1 flex items-center bg-white  rounded-xl gap-10">
                  <div className="flex items-center gap-5 p-3">
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
                      <select
                        name="place"
                        id="place"
                        className="bg-transparent text-secondary font-bold"
                        onChange={(e) =>
                          setPromptData({
                            ...promptData,
                            place: e.target.value,
                          })
                        }
                      >
                        <option value="tajMahal">Taj Mahal</option>
                        <option value="munnar">Munnar</option>
                        <option value="delhi">Delhi</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-[1px] h-full bg-secondary"></div>
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
                        className="bg-transparent text-secondary font-bold
                         outline-none border-none
                         pl-5"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  className="py-2 px-8 rounded-lg font-semibold text-lg bg-[#324C28] hover:bg-opacity-90"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Itinerary {...dummyData} />
      {/* <OpenAIComponent userPrompt={promptData} /> */}
    </div>
  );
}

// {
//     "places": "Delhi",
//     "numberOfDays": 4,
//     "description": "Welcome to Delhi, the capital city of India! Get ready for an unforgettable journey through this vibrant and historic metropolis. With a rich blend of ancient traditions and modern attractions, Delhi offers something for everyone. From awe-inspiring monuments to bustling markets and delicious street food, this itinerary will take you on a whirlwind adventure. Explore the iconic landmarks, experience the local culture, and immerse yourself in the vibrant atmosphere of Delhi.",
//     "days": [
//         {
//             "day": 1,
//             "description": "Start your day with a visit to the magnificent Red Fort, a UNESCO World Heritage Site. Explore its beautiful architecture and learn about its historical significance. Afterward, head to Jama Masjid, one of the largest mosques in India, and soak in its grandeur. In the afternoon, visit Humayun's Tomb, a stunning mausoleum with beautiful gardens. End the day with a stroll at Lodi Gardens, a serene park filled with ancient tombs.",
//             "activities": [
//                 {
//                     "time": "Morning",
//                     "description": "Visit the Red Fort",
//                     "name": "Red Fort",
//                     "mapUrl": "https://goo.gl/maps/fAKvUed5rSXRD49E9"
//                 },
//                 {
//                     "time": "Afternoon",
//                     "description": "Explore Jama Masjid",
//                     "name": "Jama Masjid",
//                     "mapUrl": "https://goo.gl/maps/kRmcCV8eGMEXE2RdA"
//                 },
//                 {
//                     "time": "Afternoon",
//                     "description": "Discover Humayun's Tomb",
//                     "name": "Humayun's Tomb",
//                     "mapUrl": "https://goo.gl/maps/3C9L3xL1Rvt8UoPP7"
//                 },
//                 {
//                     "time": "Evening",
//                     "description": "Stroll at Lodi Gardens",
//                     "name": "Lodi Gardens",
//                     "mapUrl": "https://goo.gl/maps/xrzU1RKwgYjh8Hfb6"
//                 }
//             ]
//         },
//         {
//             "day": 2,
//             "description": "On day 2, immerse yourself in the cultural heritage of Delhi. Start your day with a visit to Qutub Minar, the tallest brick minaret in the world. Next, explore the bustling streets of Chandni Chowk, one of the oldest and busiest markets in Delhi. Indulge in the local street food and shop for traditional goods. In the evening, enjoy a peaceful boat ride at India Gate, a famous war memorial.",
//             "activities": [
//                 {
//                     "time": "Morning",
//                     "description": "Visit Qutub Minar",
//                     "name": "Qutub Minar",
//                     "mapUrl": "https://goo.gl/maps/Hw4jWHDW6juZ449T8"
//                 },
//                 {
//                     "time": "Afternoon",
//                     "description": "Explore Chandni Chowk market",
//                     "name": "Chandni Chowk",
//                     "mapUrl": "https://goo.gl/maps/RM9b2ptTm781XjCw5"
//                 },
//                 {
//                     "time": "Evening",
//                     "description": "Boat ride at India Gate",
//                     "name": "India Gate",
//                     "mapUrl": "https://goo.gl/maps/qzTZtK21wYzJRSFr5"
//                 }
//             ]
//         },
//         {
//             "day": 3,
//             "description": "Today, discover the architectural wonders of Delhi. Start your day with a visit to the Akshardham Temple, a stunning Hindu temple complex known for its intricate design. Next, head to the Lotus Temple, a beautiful Bahá'í House of Worship. In the afternoon, explore the National Museum, which houses a vast collection of art and artifacts. End the day with a visit to the bustling markets of Connaught Place.",
//             "activities": [
//                 {
//                     "time": "Morning",
//                     "description": "Visit Akshardham Temple",
//                     "name": "Akshardham Temple",
//                     "mapUrl": "https://goo.gl/maps/r4WhxcixWSTvfZPm6"
//                 },
//                 {
//                     "time": "Afternoon",
//                     "description": "Explore Lotus Temple",
//                     "name": "Lotus Temple",
//                     "mapUrl": "https://goo.gl/maps/iC6xt4ZdX7W9m4Ld6"
//                 },
//                 {
//                     "time": "Afternoon",
//                     "description": "Discover National Museum",
//                     "name": "National Museum",
//                     "mapUrl": "https://goo.gl/maps/Q4jL55TP9Cw8apWj7"
//                 },
//                 {
//                     "time": "Evening",
//                     "description": "Shop at Connaught Place",
//                     "name": "Connaught Place",
//                     "mapUrl": "https://goo.gl/maps/8XbBzGHwwtzRBYyf9"
//                 }
//             ]
//         },
//         {
//             "day": 4,
//             "description": "On your last day, delve into the enchanting history of Delhi. Start your day with a visit to the historic India Gate, a war memorial dedicated to Indian soldiers. Next, explore the majestic Rashtrapati Bhavan, the official residence of the President of India. In the afternoon, visit the Gandhi Smriti, a museum dedicated to Mahatma Gandhi. End your trip with a visit to the bustling markets of Karol Bagh.",
//             "activities": [
//                 {
//                     "time": "Morning",
//                     "description": "Visit India Gate",
//                     "name": "India Gate",
//                     "mapUrl": "https://goo.gl/maps/M7zkt9Y8c31XjMkU7"
//                 },
//                 {
//                     "time": "Morning",
//                     "description": "Explore Rashtrapati Bhavan",
//                     "name": "Rashtrapati Bhavan",
//                     "mapUrl": "https://goo.gl/maps/H5RdJCTVyuHb3qjK7"
//                 },
//                 {
//                     "time": "Afternoon",
//                     "description": "Discover Gandhi Smriti",
//                     "name": "Gandhi Smriti",
//                     "mapUrl": "https://goo.gl/maps/17GRd8CFqw4pVTc96"
//                 },
//                 {
//                     "time": "Evening",
//                     "description": "Shop at Karol Bagh",
//                     "name": "Karol Bagh",
//                     "mapUrl": "https://goo.gl/maps/u7XuVzNrBpgakGYaA"
//                 }
//             ]
//         }
//     ]
// }
