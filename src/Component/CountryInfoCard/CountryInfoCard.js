import React from "react";
import "./CountryInfoCard.css";

function CountryInfoCard({
  commonName,
  officialName,
  currencyName,
  currencySymbol,
  capital,
  subRegion,
  map,
  population,
  timezones,
  flag,
}) {
  return (
    <div className="country-card bg-white shadow-lg rounded-lg p-8 my-2 max-w-3xl break-all">
      <div className="flex items-center justify-between">
        <img className="h-8 shadow-md border-2" src={flag} alt="" />
        <p className="p-2 text-xl font-bold">
          {officialName}
          <span className="italic text-neutral-500">({commonName})</span>
        </p>
      </div>
      <div className="flex flex-col justify-start md:flex-row md:justify-between md:space-x-4">
        <div className="md:w-3/5">
          <p>
            <span className="font-bold">Currency: </span>
            <span>{currencyName}</span> <span>({currencySymbol})</span>
          </p>
          <p>
            <span className="font-bold">Population: </span>
            {population}
          </p>
          <p>
            <span className="font-bold">Time Zones: </span>
            {Object.values(timezones).join(', ')}
          </p>
        </div>
        <div>
          <p>
            <span className="font-bold">Capital: </span>
            {capital}
          </p>
          <p>
            <span className="font-bold">Region: </span>
            {subRegion}
          </p>
          <p>
            <a
              className="cursor-pointer underline underline-offset-2 text-emerald-500"
              href={map}
            >
              View Map
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CountryInfoCard;
