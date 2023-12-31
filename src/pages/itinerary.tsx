/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/layout/Navbar";
import {
  fetchImageFromKeyword,
  itinerarySchema,
} from "@/utility/openAiUtility";
import { useRouter } from "next/router";
import OpenAI from "openai";
import React, { useEffect, useRef, useState } from "react";
import dummyData from "../data/itinary.json";
import { DayComponent } from "@/components/Itinerary";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import * as htmlToImage from "html-to-image";

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

        setLoading(false);
        setItinaryFullData(imagedAddedData);
      }
    };

    useEffect(() => {
      if (destination) {
        // getItinerary(destination as string, days as string);
      }
    }, [destination, days]);

    // useEffect(() => {
    //   dataConvert();
    // }, [itinerary]);

    // const printDocument = () => {
    //   const input = document.getElementById("divToPrint");
    //   if (input)
    // html2canvas(input).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   console.log(canvas);

    //   const pdf = new jsPDF();
    //   pdf.addImage(imgData, "JPEG", 0, 0);
    //   // pdf.output('dataurlnewwindow');
    //   pdf.save("download.pdf");
    // });

    // var node = document.getElementById("my-node");
    // htmlToImage
    //   .toPng(input)
    //   .then(function (dataUrl) {
    // var img = new Image();
    // img.src = dataUrl;
    // console.log(dataUrl);

    // Create an <a> tag
    // var downloadLink = document.createElement("a");

    // Set the href attribute to the data URL
    // downloadLink.href = dataUrl;

    // Set the download attribute with a desired filename
    // downloadLink.download = "generated_image.png";

    // Optional: You can set other attributes or styles if needed
    // downloadLink.setAttribute('target', '_blank');
    // downloadLink.style.display = 'none';

    // Simulate a click on the link to open it in a new tab
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // document.body.removeChild(downloadLink);

    // const pdf = new jsPDF();
    // pdf.addImage(dataUrl, "JPEG", 0, 0, 1920);
    // pdf.output('dataurlnewwindow');
    //         pdf.save("download.pdf");
    //         console.log(dataUrl);

    //         // document.body.appendChild(img);
    //       })
    //       .catch(function (error) {
    //         console.error("oops, something went wrong!", error);
    //       });
    // };

    if (loading) {
      return (
        <div className="h-screen w-full flex items-center justify-center">
          {/* <h2>Itinerary Loading...</h2> */}
          <div className="lds-hourglass"></div>
        </div>
      );
    }

    if (!itinaryFullData) {
      return <div>no itinary</div>;
    }

    return (
      <div>
        <div
          id="divToPrint"
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
                {itinaryFullData?.destination ?? destination}
              </h1>
            </div>
            <div className="days container mx-auto">
              <h6 className="font-bold text-4xl mb-14 bg-white bg-opacity-10 px-5 py-3 rounded-xl w-fit">
                {itinaryFullData?.numberOfDays} Days in{" "}
                {itinaryFullData?.destination}
              </h6>
            </div>
          </div>
          <div className=" container mx-auto mt-20 pb-20">
            <h1 className="text-4xl font-bold mb-16 text-black text-center">
              Your Itinerary
            </h1>
            {/* <p className="text-gray-700 mb-6 text-center">
              {itinaryFullData?.description}
            </p> */}
            {itinaryFullData?.days.map((day, index) => (
              <DayComponent key={index} day={day} />
            ))}
            <button className="text-xl font-semibold bg-primary2 py-3 px-10 rounded-full text-white w-fit flex gap-2 items-center mx-auto">
              Download
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
              >
                <path
                  d="M28.5 22.5C27.6716 22.5 27 23.1716 27 24V27H9V24C9 23.1716 8.32843 22.5 7.5 22.5V22.5C6.67157 22.5 6 23.1716 6 24V27C6 28.65 7.35 30 9 30H27C28.65 30 30 28.65 30 27V24C30 23.1716 29.3284 22.5 28.5 22.5V22.5Z"
                  fill="white"
                />
                <path
                  d="M24.4415 17.5585C25.0261 16.9739 25.0261 16.0261 24.4415 15.4415V15.4415C23.8577 14.8577 22.9114 14.8568 22.3265 15.4394L19.5 18.255V7.5C19.5 6.67157 18.8284 6 18 6V6C17.1716 6 16.5 6.67157 16.5 7.5V18.255L13.6735 15.4394C13.0886 14.8568 12.1423 14.8577 11.5585 15.4415V15.4415C10.9739 16.0261 10.9739 16.9739 11.5585 17.5585L18 24L24.4415 17.5585Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          {/* <button onClick={() => handleGeneratePdf()}>Download PDF</button> */}
        </div>
      </div>
    );
  };

export default Itinerary;
