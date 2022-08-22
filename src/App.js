import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import CountryInfoCard from "./Component/CountryInfoCard/CountryInfoCard";
import ErrorMsg from "./Component/ErrorMsg/ErrorMsg";

const searchByOptions = [
  "Please select a search option",
  "name",
  "alpha",
  "currency",
  "lang",
  "capital",
  "region",
  "subregion",
];

function App() {
  const [inputData, setInputData] = useState({
    inputText: "",
    searchOption: "",
  });
  const [countryList, setCountryList] = useState([]);
  const [error, setError] = useState("")

  const handleChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };

  const fetchApi = () => {
    const apiurl = `https://restcountries.com/v3.1/${inputData.searchOption}/${inputData.inputText}`;
    axios.get(apiurl).then((response) => {
      // console.log(response.data);
      setCountryList(response.data);
      setError("")
    }).catch((error)=>{
      setError(<ErrorMsg/>)
    });
  };


  return (
    <div className="app-container h-full lg:h-screen flex flex-col items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-12">
      <h2 className="font-semibold text-3xl p-2 mb-4">Search country info based on <span className="inline-block font-extrabold text-purple-500 p-2 rounded-lg bg-amber-400 underline underline-offset-4">search option</span>  and <span className="inline-block font-extrabold text-purple-500 p-2 rounded-lg bg-amber-400 underline underline-offset-4">user input</span>.</h2>
      <div className="app-header bg-slate-100 lg:w-1/2 rounded-lg p-4 mb-2 shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="">
            <select
              name="searchOption"
              onChange={handleChange}
              id=""
              className="outline-none p-4 rounded-lg shadow-md font-medium"
            >
              {searchByOptions.map((item) => (
                <option
                  value={
                    item !== "Please select a search option" ? item : "null"
                  }
                  className=""
                  key={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <div className="relative w-full shadow-md rounded-lg">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none ">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block p-4 pl-10 w-full text-md font-medium text-gray-900 bg-gray-50 rounded-lg outline-none border-2 border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 transition-all ease-in-out duration-200"
                placeholder="Search country, currency, capital, region..."
                required
                name="inputText"
                onChange={handleChange}
                value={inputData.inputText}
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-emerald-500 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition-all ease-in-out duration-200"
                onClick={fetchApi}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      <p className="mt-2 pt-4 text-center">
        Made by{" "}
        <a
          className="underline underline-offset-2 text-emerald-500"
          href="https://ashutoshdash.netlify.app/"
        >
          Ashutosh Dash
        </a>
      </p>
      </div>
      {error}
      <section className="country-results flex flex-col p-4 h-96 overflow-y-auto mt-12">
        {countryList.map(
          (item) => (
            // console.log(item.name.official);
            <CountryInfoCard
              key={item.name.official}
              officialName={item.name.official}
            />
          )
          // <p>{item.name.official}</p>
        )}
      </section>
    </div>
  );
}

export default App;
