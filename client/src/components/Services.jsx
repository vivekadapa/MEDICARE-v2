import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Services = () => {
  const [imageIndex, setImageIndex] = useState(0);



  const navigate = useNavigate();



  return (

    <section>
      <div className="items-center w-full px-4 py-24 mx-auto  max-w-7xl">
        <div className="text-left">
          <div className="items-center mx-auto lg:inline-flex">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
              <div>
                <p className="text-2xl font-medium tracking-tight text-teal-700 sm:text-4xl">
                  Our Services
                </p>
              </div>
              <div className="lg:ml-auto">
                <p className="mt-4 text-lg tracking-tight text-gray-600 lg:mt-0">
                  Discover a comprehensive range of wellness solutions tailored to enhance your physical and mental well-being, ensuring a holistic approach to health improvement
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative items-center w-full mx-auto mt-12">
          <img
            className="object-contain w-full h-96 transition-opacity duration-500 ease-in-out"
            src={"https://img.freepik.com/free-vector/people-sitting-waiting-room-medical-clinic-flat-illustration_74855-17095.jpg?w=1380&t=st=1706016658~exp=1706017258~hmac=aea50c23e790e3f4bb8f579f49b73605a390f4aeb7624aa0ad01b7c35cf3a5bd"}
            alt=""
          />
        </div>
        <div>
          <div className="pt-12 mx-auto lg:max-w-7xl">
            <div className="grid grid-cols-1 gap-6 space-y-0 lg:gap-20 lg:grid-cols-3">
              <button onClick={() => {
                navigate('/consultdoctor')
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }} className="hover:bg-gray-300 text-start p-4 shadow-md rounded-md">
                <div>
                  <p className="text-lg font-medium leading-6 text-black">
                    Consult Doctor
                  </p>
                </div>
                <div className="mt-2 text-[0.95rem] text-gray-500">
                  Connect with experienced healthcare professionals for personalized consultations, ensuring your health is in expert hands.
                </div>
              </button>
              <button onClick={() => {
                navigate('/buymedicines')
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }} className="hover:bg-gray-300 text-start p-4 shadow-md rounded-md">
                <div>
                  <p className="text-lg font-medium leading-6 text-black">
                    Buy Medicines
                  </p>
                </div>
                <div className="mt-2 text-[0.95rem] text-gray-500">
                  Effortlessly order your prescribed medications online, providing a convenient and reliable solution for all your pharmaceutical needs.
                </div>
              </button>
              <button onClick={() => {
                navigate('/display-hospitals')
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }} className="hover:bg-gray-300 text-start p-4 shadow-md rounded-md">
                <div>
                  <p className="text-lg font-medium leading-6 text-black">
                    Find Hospitals
                  </p>
                </div>
                <div className="mt-2 text-[0.95rem] text-gray-500">
                  Locate top-tier medical facilities in your vicinity, ensuring quick access to quality healthcare whenever you need it.
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

// const ServiceCard = ({ icon, title, details, linkTag }) => {
//   return (
//     <>
//       <div classNameName="w-full px-4 md:w-1/2 lg:w-1/3">
//         <div classNameName="mb-9 rounded-[20px] bg-white p-10 shadow-2 hover:shadow-lg dark:bg-dark-2 md:px-7 xl:px-10">
//           <Link to={`${linkTag}`}>
//             <h4 classNameName="mb-[14px] text-2xl font-semibold text-dark ">
//               {title}
//             </h4>
//           </Link>

//           <p classNameName="text-body-color dark:text-dark-6">{details}</p>
//         </div>
//       </div>
//     </>
//   );
// }; 
