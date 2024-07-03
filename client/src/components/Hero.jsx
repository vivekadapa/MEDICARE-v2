import hero1 from "../assets/hero_3.jpg";
import hero2 from "../assets/hero_2.jpg";
import hero3 from "../assets/hero_1.jpg";
import hero4 from "../assets/hero_4.jpg";
import Services from "./Services";
import { Contact } from "../pages";
import React, { useState, useEffect } from "react";
import CarouselComponent from "./Carousel.jsx"

const Hero = () => {

  return (
    <>
      <div className="mx-auto max-w-[88rem] px-6">
        <div className="min-h-[92vh] justify-center flex flex-col-reverse gap-12 md:flex-row md:gap-24  items-center ">
          <div className="w-full md:w-1/2">
            <h1 className="max-w-2xl text-4xl font-bold text-teal-800 tracking-tight sm:text-6xl">
              We are changing the way people live...
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-grey-800">
              Prioritize well-being with exceptional healthcare. Refuse
              compromise, embrace personalized treatments. Choose vitality,
              longevity, and proactive well-being. Invest in yourself—discover
              transformative healthcare today.
            </p>
          </div>
          <div className="md:w-1/2 w-full lg:block space-x-4">
            <CarouselComponent />
          </div>
        </div>

        <Services></Services>
      </div>

    </>
  );
};
export default Hero;
