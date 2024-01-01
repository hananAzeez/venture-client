import axios from "axios";

export const itinerarySchema = {
  type: "object",
  properties: {
    destination: {
      type: "string",
      description: "Name of the destination for the itinerary.",
    },
    numberOfDays: {
      type: "integer",
      description: "Number of days for the trip.",
      minimum: 1,
    },
    description: {
      type: "string",
      description:
        "Provide a captivating introduction for this trip in a professional voice,introduce the place, make the description atleast 60 words",
    },
    days: {
      type: "array",
      items: {
        type: "object",
        properties: {
          day: {
            type: "integer",
            description: "day number",
          },
          description: {
            type: "string",
            description: "description of the activity in that day",
          },
          activities: {
            type: "array",
            items: {
              type: "object",
              properties: {
                time: {
                  type: "string",
                  description: "time of the day",
                },
                description: {
                  type: "string",
                  description:
                    "Detailed description of that place and the activity in that place in atleast 60 words",
                },
                name: {
                  type: "string",
                  description: "name of the place",
                },
                mapUrl: {
                  type: "string",
                  description: "map url of that place",
                },
              },
              required: ["time", "description", "name", "mapUrl"],
              additionalProperties: false,
            },
            description:
              "List of all activities based on correct timeline of the specified date",
          },
        },
        required: ["day", "description", "activities"],
        additionalProperties: false,
      },
      description: "List of days and thier in the itinerary",
    },
  },
  required: [
    "places",
    "numberOfDays",
    "description",
    "days",
  
  ],
  additionalProperties: false,
};



export const fetchImageFromKeyword = async (keyword: string) => {
  const data = await axios.get(`https://api.pexels.com/v1/search?query=${keyword}`, { headers: { Authorization: process.env.NEXT_PUBLIC_PEXEL_KEY } })
  return data.data.photos[0].src.original
}

// {
//   "page": 1,
//   "per_page": 15,
//   "photos": [
//       {
//           "id": 1542620,
//           "width": 5240,
//           "height": 3496,
//           "url": "https://www.pexels.com/photo/brown-and-black-mosque-under-white-and-blue-cloudy-sky-1542620/",
//           "photographer": "Yogendra  Singh",
//           "photographer_url": "https://www.pexels.com/@yogendras31",
//           "photographer_id": 217645,
//           "avg_color": "#6A5957",
//           "src": {
//               "original": "https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg",
//               "large2x": "https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//               "large": "https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
//               "medium": "https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg?auto=compress&cs=tinysrgb&h=350",
//               "small": "https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg?auto=compress&cs=tinysrgb&h=130",
//               "portrait": "https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
//               "landscape": "https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
//               "tiny": "https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
//           },
//           "liked": false,
//           "alt": "Brown and Black Mosque Under White and Blue Cloudy Sky"
//       },
      
//   ],
//   "total_results": 786,
//   "next_page": "https://api.pexels.com/v1/search/?page=2&per_page=15&query=Delhi"
// }