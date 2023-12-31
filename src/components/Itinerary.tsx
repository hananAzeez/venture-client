// Itinerary.tsx

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
  <div className="border p-4 mb-4 rounded-md">
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
  <div className="container mx-auto p-8  rounded-md shadow-md">
    <h1 className="text-3xl font-bold mb-6 text-black">{places} Itinerary</h1>
    <p className="text-gray-700 mb-6">{description}</p>
    {days.map((day, index) => (
      <DayComponent key={index} day={day} />
    ))}
  </div>
);

export default Itinerary;
