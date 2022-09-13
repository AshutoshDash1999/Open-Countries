import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';
import CountryInfoCard from '../../Component/CountryInfoCard/CountryInfoCard';
import ErrorMsg from '../../Component/ErrorMsg/ErrorMsg';

const searchOptions = {
  'Please select a search option': [
    'null',
    'Search country, currency, capital, region...',
  ],
  Name: ['name', 'Search India, Russia...'],
  Code: ['alpha', 'Search by country code... '],
  Currency: ['currency', 'Search rupee, dollar...'],
  Language: ['lang', 'Search tamil, hindi...'],
  Capital: ['capital', 'Search Delhi, Moscow, Tokyo...'],
  Demonym: ['demonym', 'Search Indian, Japanese...'],
  Region: ['region', 'Search Asia, africa, antartica...'],
  Subregion: ['subregion', 'Search south asia, north america...'],
};

function Home() {
  const [inputData, setInputData] = useState({
    inputText: '',
    searchOption: '',
  });
  const [countryList, setCountryList] = useState([]);
  const [error, setError] = useState('');
  const [placeholderText, setPlaceholderText] = useState(
    'Search country, currency, capital, region...'
  );

  const handleChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });

    if (`${event.target.value}` in searchOptions) {
      setInputData({
        ...inputData,
        [event.target.name]: `${searchOptions[event.target.value][0]}`,
      });
      setPlaceholderText(searchOptions[event.target.value][1]);
    }
  };

  const fetchApi = () => {
    const apiurl = `https://restcountries.com/v3.1/${inputData.searchOption}/${inputData.inputText}`;
    if (
      inputData.searchOption === 'Please select a search option' ||
      inputData.inputText === ''
    ) {
      toast.error('Please select a search option');
    } else {
      axios
        .get(apiurl)
        .then((response) => {
          // console.log(response.data);
          setCountryList(response.data);
          setError('');
          toast.success(
            `Fetched ${response.data.length} item(s) Successfully!`
          );
        })
        .catch((error) => {
          console.log(error.response);
          setError(<ErrorMsg />);
          toast.error(`Error: ${error}`);
        });
    }
  };

  const submitFormOnEnter = (event) => {
    if (event.keyCode === 13) {
      fetchApi();
    }
  };

  return (
    <div className='app-container h-full lg:h-screen flex flex-col items-center p-12'>
      <ToastContainer />

      <h2 className='font-semibold text-3xl text-center p-2 mb-4 entrance-animate'>
        Search country info based on{' '}
        <span className='inline-block font-extrabold text-yellow-400 p-2 rounded-lg underline underline-offset-4'>
          search option
        </span>{' '}
        and{' '}
        <span className='inline-block font-extrabold text-yellow-400 p-2 rounded-lg underline underline-offset-4'>
          user input
        </span>
      </h2>
      <div className='app-header bg-slate-100 lg:w-1/2 rounded-lg p-4 mb-2 shadow-lg entrance-animate'>
        <div className='flex flex-col items-center space-y-4'>
          <div className=''>
            <select
              name='searchOption'
              onChange={handleChange}
              id=''
              className='outline-none p-4 rounded-lg shadow-md font-medium'
            >
              {Object.keys(searchOptions).map((item) => (
                <option
                  value={
                    item !== 'Please select a search option' ? item : 'null'
                  }
                  className=''
                  key={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className='w-full'>
            <div className='relative w-full shadow-md rounded-lg'>
              <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none '>
                <svg
                  className='w-5 h-5 text-gray-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  ></path>
                </svg>
              </div>
              <input
                type='search'
                id='default-search'
                className='block p-2 pl-10 w-full text-xl font-medium text-gray-900 bg-gray-50 rounded-lg outline-none border-2 border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 transition-all ease-in-out duration-200'
                placeholder={placeholderText}
                required
                name='inputText'
                onChange={handleChange}
                value={inputData.inputText}
                onKeyDown={(e) => submitFormOnEnter(e)}
              />
              <button
                type='submit'
                className='text-white absolute right-2.5 bottom-1.5 bg-emerald-500 hover:bg-emerald-700 shadow-emerald-500/50 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 transition-all ease-in-out duration-200'
                onClick={fetchApi}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <p className='mt-2 pt-4 text-center'>
          Made by{' '}
          <a
            className='underline underline-offset-2 text-emerald-500'
            href='https://ashutoshdash.netlify.app/'
          >
            Ashutosh Dash
          </a>
        </p>
      </div>
      {error}

      <div>
        <p
          className={
            countryList.length === 0 ? 'hidden' : 'font-bold text-gray-200 p-2'
          }
        >
          Items({countryList.length})
        </p>
      </div>
      <section className='country-results flex flex-col p-2 h-96 overflow-y-auto mt-12'>
        {countryList.length !== 0
          ? countryList.map(
              (item) => (
                // console.log(item.name.official);
                <Link
                  to={`/aboutCountry/${item.name.common}`}
                  state={item.name.common}
                  key={item.name.common}
                >
                  <CountryInfoCard
                    commonName={item.name.common}
                    officialName={item.name.official}
                    flag={item.flags.png}
                    currencyName={Object.values(item.currencies)[0].name}
                    currencySymbol={Object.values(item.currencies)[0].symbol}
                    capital={item.capital}
                    subRegion={item.subregion}
                    population={Number(item.population).toLocaleString()}
                    timezones={item.timezones}
                    demonyms={item.demonyms.eng.f}
                  />
                </Link>
              )
              // <p>{item.name.official}</p>
            )
          : 'Please search for a country'}
      </section>
    </div>
  );
}

export default Home;
