import Navbar from "@/components/layout/Navbar";
import {
  fetchImageFromKeyword,
  itinerarySchema,
} from "@/utility/openAiUtility";
import { useRouter } from "next/router";
import OpenAI from "openai";
import React, { useEffect, useRef, useState } from "react";
import dummyData from "../data/itinary.json";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

const Itinerary = () =>
  // { places, description, days,  }
  {
    const { query } = useRouter();
    const { destination, days } = query;
    const [loading, setLoading] = useState(false);
    const [itinerary, setItinerary] = useState<ItineraryProps | null>(null);
    const [itinaryFullData, setItinaryFullData] =
      useState<itinaryWithImage | null>(dummyData);

    // Define the itinerary schema

    // console.log(itinaryFullData);

    const getItinerary = async (destination: string, days: string) => {
      setLoading(true);
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
              content: `create an itinerary for ${destination} for ${days} days`,
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

    const dataConvert = async () => {
      if (itinerary) {
        const destinationImageUrl = await fetchImageFromKeyword(
          itinerary?.destination
        );
        const daysWithImages = await Promise.all(
          itinerary.days.map(async (day) => {
            const activitiesWithImages = await Promise.all(
              day.activities.map(async (activity) => ({
                ...activity,
                activityImg: await fetchImageFromKeyword(activity.name),
              }))
            );

            return {
              ...day,
              activities: activitiesWithImages,
            };
          })
        );

        const imagedAddedData = {
          ...itinerary,
          placeImg: destinationImageUrl,
          days: daysWithImages,
        };

        setItinaryFullData(imagedAddedData);
      }
    };

    useEffect(() => {
      if (destination) {
        // getItinerary(destination as string, days as string)
      }
    }, [destination, days]);

    if (loading) {
      return <div>Itinary Loading</div>;
    }

    if (!itinaryFullData) {
      return <div>no itinary</div>;
    }

    return (
      <div>
        <div
          className="w-full h-screen bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${itinaryFullData?.placeImg})`,
          }}
        >
          <div className="w-full h-full text-white backdrop-brightness-50 flex flex-col justify-between">
            <Navbar />
            <div className="flex flex-col gap-6 items-center justify-center">
              <p className="font-semibold tracking-[16.5px] text-3xl">
                EXPLORE
              </p>
              <h1 className="text-header font-bold leading-none -mt-10">
                {itinaryFullData?.destination}
              </h1>
            </div>
            <div className="days container mx-auto">
              <h6 className="font-bold text-4xl mb-16">
                {itinaryFullData?.numberOfDays} Days in Delhi
              </h6>
            </div>
          </div>
          <div className=" container mx-auto my-20">
            <h1 className="text-3xl font-bold mb-6 text-black text-center">
              Your Itinerary
            </h1>
            <p className="text-gray-700 mb-6 text-center">
              {itinaryFullData?.description}
            </p>
            {itinaryFullData?.days.map((day, index) => (
              <DayComponent key={index} day={day} />
            ))}
          </div>
          {/* <button onClick={() => handleGeneratePdf()}>Download PDF</button> */}
        </div>
      </div>
    );
  };

const DayComponent: React.FC<{ day: itinaryWithImageDay }> = ({ day }) => (
  <div className="mb-8 grid grid-cols-5">
    <h2 className="text-xl font-semibold bg-primary py-3 px-10 rounded-full text-white w-fit col-span-1 self-start">
      Day {day.day}
    </h2>
    {/* <p className=" mb-4 ">{day.description}</p> */}
    <div className="flex flex-col gap-10 col-span-4 ">
      {day.activities.map((activity, index) => (
        <ActivityComponent key={index} activity={activity} />
      ))}
    </div>
  </div>
);

const ActivityComponent: React.FC<{ activity: itinaryWithImageActivity }> = ({
  activity,
}) => (
  <div className="grid grid-cols-3 shadow-activity py-8 px-12 rounded-xl">
    <div className="col-span-2">
      <p className="text-light opacity-60 font-semibold text-2xl">
        {activity.time}
      </p>
      <p className="mt-4 text-dark font-bold text-4xl">{activity.name}</p>
      <h4 className="mt-4 text-light opacity-70 font-medium text-xl">
        {activity.description}
      </h4>
      <a
        href={activity.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        View on Map
      </a>
    </div>
    <div className="col-span-1">
      <div
        className="w-full bg-cover "
        // style={{ backgroundImage: `url(${activity.activityImg})` }}
      >
        <img
          src={activity.activityImg}
          alt={activity.name}
          className="aspect-[4/3] object-cover rounded-lg "
        />
      </div>
    </div>
  </div>
);

export default Itinerary;
