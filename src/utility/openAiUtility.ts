export const itinerarySchema = {
  type: "object",
  properties: {
    places: {
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

                //   quantity: {
                //     type: "integer",
                //     minimum: 1,
                //     description: "Quantity of the product",
                //   },
                //   unitAmount: {
                //     type: "number",
                //     minimum: 0,
                //     description: "Unit amount (price) of the product",
                //   },
              },
              required: ["time", "description", "name", "mapUrl"],
              additionalProperties: false,
            },
            description:
              "List of all activities based on correct timeline of the specified date",
          },

          //   quantity: {
          //     type: "integer",
          //     minimum: 1,
          //     description: "Quantity of the product",
          //   },
          //   unitAmount: {
          //     type: "number",
          //     minimum: 0,
          //     description: "Unit amount (price) of the product",
          //   },
        },
        required: ["day", "description", "activities"],
        additionalProperties: false,
      },
      description: "List of days and thier in the itinerary",
    },
    // preferences: {
    //   type: "array",
    //   items: {
    //     type: "string",
    //   },
    //   description:
    //     "List of travel preferences or interests, e.g., 'cultural landmarks', 'food experiences'.",
    // },
    // accommodationType: {
    //   type: "string",
    //   description:
    //     "Preferred type of accommodation, e.g., 'hotel', 'hostel', 'ryokan'.",
    //   default: "hotel",
    // },
    // additionalNotes: {
    //   type: "string",
    //   description:
    //     "Any additional notes or special requests for the itinerary.",
    //   default: "",
    // },
  },
  required: [
    "places",
    "numberOfDays",
    "description",
    "days",
    // "preferences",
    // "accommodationType",
    // "additionalNotes",
  ],
  additionalProperties: false,
};
