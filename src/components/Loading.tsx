/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";

const Loadingdata = [
  {
    id: 1,
    quote:
      "Venture into the unknown; let curiosity be your compass. Travel is the gateway to infinite possibilities and unforgettable experiences.",
    author: "Mark Twain",
    image: "img/loading/ld-5.jpg",
  },
  {
    id: 2,
    quote:
      "In travel, we discover the essence of life. Each journey is a chapter, written with moments of wonder, growth, and connection.",
    author: "Ibn Battuta",
    image: "img/loading/ld-3.jpg",
  },
  {
    id: 3,
    quote:
      "Embark on the odyssey of self-discovery through travel. Each destination is a lesson, each journey a transformative experience.",
    author: "J.R.R. Tolkien",
    image: "img/loading/ld-4.jpg",
  },
  {
    id: 4,
    quote:
      "Travel makes one modest. You see what a tiny place you occupy in the world.",
    author: "Gustave Flaubert",
    image: "img/loading/ld-2.jpg",
  },
];

const Loading = () => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 12 / 3; // Total duration divided by number of steps
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= 3) {
        const newProgress = (currentStep / 3) * 100;
        setProgress(newProgress);
      } else {
        clearInterval(timer);
      }
    }, interval * 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % Loadingdata.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <div className="w-full h-screen p-10  overflow-hidden">
        <div className="grid grid-cols-7 gap-10 items-start h-full">
          {/* TEXT👇 */}
          <div className="col-span-3 flex flex-col gap-10 text-dark mt-10 px-6">
            <img
              src="/img/venture-logo-loading.png"
              alt="logo"
              className="max-w-52"
            ></img>
            <h3 className="font-semibold text-2xl mt-10">
              {Loadingdata[index].quote}
            </h3>
            <h5 className="font-medium text-xl -mt-3">
              - {Loadingdata[index].author}
            </h5>
          </div>
          {/* TEXT👆 */}
          {/* IMAGE👇 */}
          <div className="col-span-4 h-full overflow-hidden relative">
            <img
              src={Loadingdata[index].image}
              alt="travel"
              className="w-full h-full object-cover object-center rounded-2xl"
            />
            <div className="absolute bottom-4 left-[2%]  w-[96%] bg-gray-300 bg-opacity-60 backdrop:blur-md h-3 rounded-full">
              <div
                className="bg-gradient-to-r from-emerald-500 to-emerald-900 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          {/* IMAGE👆 */}
        </div>
      </div>
    </main>
  );
};

export default Loading;
