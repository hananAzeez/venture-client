// Itinerary.tsx

import Navbar from "@/components/layout/Navbar";
import React from "react";

interface Activity {
  time: string;
  description: string;
  name: string;
  mapUrl: string;
}

interface Day {
  day: number;
  description: string;
  activities: Activity[];
}

interface ItineraryProps {
  places: string;
  numberOfDays: number;
  description: string;
  days: Day[];
}

const ActivityComponent: React.FC<{ activity: Activity }> = ({ activity }) => (
  <div className="shadow-activity py-8 px-12 rounded-xl">
    <p className="text-gray-600 mb-2">{activity.time}</p>
    <p className="text-gray-700 mb-2">{activity.name}</p>
    <h4 className="text-lg font-semibold mb-2 text-black">
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
);

const DayComponent: React.FC<{ day: Day }> = ({ day }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4 text-black">Day {day.day}</h2>
    <p className=" mb-4 ">{day.description}</p>
    <div>
      {day.activities.map((activity, index) => (
        <ActivityComponent key={index} activity={activity} />
      ))}
    </div>
  </div>
);

const Itinerary: React.FC<ItineraryProps> = ({ places, description, days }) => (
  <div>
    <div className="w-full h-screen bg-[url('/img/place/delhi.jpg')] bg-cover bg-center relative">
      <div className="w-full h-full text-white backdrop-brightness-50 flex flex-col justify-between">
        <Navbar />
        <div className="flex flex-col gap-6 items-center justify-center">
          <p className="font-semibold tracking-[16.5px] text-3xl">EXPLORE</p>
          <h1 className="text-header font-bold leading-none -mt-10">Delhi</h1>
        </div>
        <div className="days container mx-auto">
          <h6 className="font-bold text-4xl mb-16">3 Days in Delhi</h6>
        </div>
      </div>
      <div className=" container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black">
          {places} Itinerary
        </h1>
        <p className="text-gray-700 mb-6">{description}</p>
        {days.map((day, index) => (
          <DayComponent key={index} day={day} />
        ))}
      </div>
    </div>
  </div>
);

export default Itinerary;
