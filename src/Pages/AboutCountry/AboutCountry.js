import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
  }, []);

  console.log(countryData);
  return (
    <div className="about_country h-screen flex justify-center items-center">
      <div className="p-8 rounded-lg shadow-xl">
        {typeof countryData != "undefined" ? (
          <div className="p-8 bg-transparent flex">
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
                <span>
                  {countryData[0]["demonyms"]["eng"].f}
                </span>
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
            </div>
            <div className="px-8 flex flex-col justify-center items-center">
                <img className="h-36 shadow-md rounded-lg border-2 p-4" src={countryData[0]["flags"]["png"]} alt="" />
                <img className="h-36 p-4" src={countryData[0]["coatOfArms"]["png"]} alt="" />
            </div>
          </div>
        ) : (
          <p>loading</p>
        )}
      </div>
    </div>
  );
}

export default AboutCountry;
