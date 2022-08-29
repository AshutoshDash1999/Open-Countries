import { Disclosure } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

function AboutCountry() {
  let location = useLocation();
  const countryFullName = location.state;
  const [countryData, setCountryData] = useState();
  useEffect(() => {
    const launch_url = `https://restcountries.com/v3.1/name/${countryFullName}?fullText=true`;
    axios
      .get(launch_url)
      .then((response) => {
        setCountryData(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [countryFullName]);

  console.log(countryData);
  return (
    <div className="about_country h-screen flex justify-center items-center">
      <div className="p-8 rounded-lg shadow-xl w-11/12 md:w-10/12 lg:w-8/12 xl:w-2/5">
        {typeof countryData != "undefined" ? (
          <div className="p-8 bg-transparent flex flex-col md:flex-row md:justify-evenly">
            <div className="border-none">
              <h2 className="text-3xl font-bold">
                {countryData[0]["name"]["official"]}
              </h2>
              <h2 className="text-3xl font-bold italic text-gray-700 mb-4">
                ({countryData[0]["name"]["common"]})
              </h2>
              <h3 className="text-xl">
                {" "}
                <span className="font-semibold">Capital:</span>{" "}
                <span>{countryData[0]["capital"][0]}</span>
              </h3>
              <h3 className="text-xl">
                {" "}
                <span className="font-semibold">Continent:</span>{" "}
                <span>{countryData[0]["continents"][0]}</span>
                <span>({countryData[0]["subregion"]})</span>
              </h3>
              <p className="text-xl font-semibold">Languages:</p>
              <ul className="list-disc">
                {Object.values(countryData[0]["languages"]).map((item) => (
                  <li className="ml-8" key={item}>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xl">
                <span className="font-semibold">Demonyms:</span>{" "}
                <span>{countryData[0]["demonyms"]["eng"].f}</span>
              </p>
              <p className="text-xl">
                <span className="font-semibold">Population:</span>{" "}
                <span>
                  {Number(countryData[0]["population"]).toLocaleString()}
                </span>
              </p>
              <p className="text-xl">
                <span className="font-semibold">Currency:</span>{" "}
                <span className="capitalize">
                  {Object.values(countryData[0]["currencies"])[0].name}
                </span>{" "}
                <span className="capitalize">
                  ({Object.values(countryData[0]["currencies"])[0].symbol})
                </span>
              </p>
              <p>
                <a
                  className="cursor-pointer underline underline-offset-2 text-emerald-500"
                  href={countryData[0]["maps"]["googleMaps"]}
                >
                  View Map
                </a>
              </p>
            </div>
            <div className="px-8 flex flex-col justify-center items-center space-y-4 ">
              <div>
                <img
                  className="h-36 object-cover shadow-md rounded-lg border-2 p-4 w-full"
                  src={countryData[0]["flags"]["png"]}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-36 object-cover p-4"
                  src={countryData[0]["coatOfArms"]["png"]}
                  alt=""
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <HashLoader color="#9333ea" loading={true} size={100} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AboutCountry;
