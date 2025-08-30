import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

function All_Notes({category,search}) {
    const [data,setData] = useState([])
    useEffect(()=>{
        async function api() {

            try{
                const apidata = await axios.get('http://127.0.0.1:8000/notesapi/') 
                setData(apidata.data)
            }catch(err){
                console.log(err);                
            }
        }
        api()
    },[])

    function formatDate(dateStr) {
         const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
    });
}

    const filtercategory = category ? data.filter((note)=> note.category === category) : data;

    const filterdata = search ? filtercategory.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()) || 
            note.body.toLowerCase().includes(search.toLowerCase()) )   : filtercategory ; 

  return (
    <div className='m-5'>
        {data.length <= 0 ?( <p className='font-bold text-3xl text-center mt-10'>Notes Are Empty</p>) : ( 
        <div className='all'>
            {filterdata.map((data)=>(
                <Link className='all1' key={data.id} to={`/${data.slug}`}>
                    <div className='flex justify-end'>
                        <i className="fa-solid fa-note-sticky icon1"></i>
                    </div>
                
                    <h1 className='font-bold text-[20px]'>{data.title}</h1>
                    <p>{formatDate(data.created)}</p>
                    <p className='mt-3 line-clamp-2'>{data.body}</p>
                    <h3 className='pt-3'><i className="fa-solid fa-envelope text-green-800 icon"></i>{data.category}</h3>
                </Link>
            ))}   
        </div>
        )} 
    </div>
  )
}

export default All_Notes