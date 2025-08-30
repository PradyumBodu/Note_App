import React, { useState } from 'react'
import {Link} from 'react-router-dom'

function Navbar({setSearch,search}) {

  const [query,setQuery] = useState('')

  const handleSearch = () => {
    setSearch(query);
  };

  return (
    <div className='flex justify-around items-center pt-5 pb-5 bg-white'>
        <div>
            <Link to={'/'} className='font-bold text-2xl'>Notey</Link>
        </div>
        <div>
            <input type="text" placeholder='Search' value={query} onChange={(e) => setQuery(e.target.value)}
            className='p-2 w-2xl border-1 border-gray-700'  />
            <button className='border-green-800 border-1 p-2 text-green-800 font-bold' onClick={handleSearch}>Search</button>
        </div>
        <div>
            <Link to={'/addnote'} className='border-blue-800 border-1 p-2 text-blue-800 font-bold'> <i className="fa-solid fa-plus"></i> Add Notes</Link>
        </div>
    </div>
  )
}

export default Navbar