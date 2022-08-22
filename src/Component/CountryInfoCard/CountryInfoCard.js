import React from 'react'
import "./CountryInfoCard.css"

function CountryInfoCard({commonName, officialName, currency, capital, subRegion, region, map, population, timezones, flag}) {
  return (
    <div className='country-card bg-white shadow-lg rounded-lg p-8 my-2'>
        <p>{officialName}</p>
        <p>{currency}</p>
        <p>{capital}</p>
        <p>{region}</p>
        
    </div>
  )
}

export default CountryInfoCard