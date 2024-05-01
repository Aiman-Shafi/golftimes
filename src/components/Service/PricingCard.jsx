import { useState } from "react";

/* eslint-disable react/prop-types */
export default function PricingCard({ service }) {
  const [cart, setCart] = useState([]);
  let data = service.attributes;
  //   console.log(data);
  let features = data.features.split("\n");
  // console.log(features);
  return (
    <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
      <div className="p-6 sm:px-8">
        <h2 className="text-lg font-medium text-gray-900 uppercase tracking-widest">
          {data.package_type}
          <span className="sr-only">Plan</span>
        </h2>

        {/* <p className="mt-2 text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p> */}

        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {" "}
            {data.price}${" "}
          </strong>

          <span className="text-sm font-medium text-gray-700">/year</span>
        </p>

        <button
          className="mt-4 block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
          href="#"
          onClick={() => {
            setCart([...cart, service]);
            console.log(cart);
          }}
        >
          Get Started
        </button>
      </div>

      <div className="p-6 sm:px-8">
        <p className="text-lg font-medium text-gray-900 sm:text-xl">
          What&apos;s included:
        </p>

        <ul className="mt-2 space-y-2 sm:mt-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> {feature} </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
