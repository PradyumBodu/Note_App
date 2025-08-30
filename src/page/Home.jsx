import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import All_Notes from '../components/All_Notes'
import Filter from '../components/filter'

function Home() {

  const [category,setCategory] = useState('')
  const [search, setSearch] = useState("");
  console.log(search);
  
  
  

  return (
    <div className=''>
        <Navbar setSearch={setSearch} search={search}/>
        <Filter category={category} setCategory={setCategory} />
        <All_Notes category={category} search={search} />
    </div>
  )
}

export default Home