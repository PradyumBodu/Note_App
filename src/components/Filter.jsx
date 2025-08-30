import React from 'react'

function Filter({category,setCategory}) {
  return (
    <div className='flex justify-center items-center mt-5 '>
        <select name="" id="" className='w-3xl bg-white rounded-1xl p-2' onChange={(e)=>setCategory(e.target.value)}>
            <option value="">All Notes</option>
            <option value="BUSINESS">Business</option>
            <option value="PERSONAL">Personal</option>
            <option value="IMPORTANT">Important</option>
        </select>
    </div>
  )
}

export default Filter