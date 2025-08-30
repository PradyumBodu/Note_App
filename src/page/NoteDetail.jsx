import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";


function NoteDetail() {

    const[data,setData] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()
    const [confirm,setConfirm] = useState(false)

    useEffect(()=>{
        async function api() {

            try{
                const apidata = await axios.get(`http://127.0.0.1:8000/notesapi/${slug}/`) 
                setData(apidata.data);
            }catch(err){
                console.log(err);                
            }
        }
        api()

    },[slug])

    const handleDelete = async() => {
        try{
            await axios.delete(`http://127.0.0.1:8000/notesapi/${slug}/`)
            toast.success('Note Delete Successfully!')
            navigate('/')
        }catch(err){
            console.log(err);
            
        }
    }


    const handleEdit = async() => {

    }

    function formatDate(dateStr) {
         const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

  return (
    <div>
        <Navbar />
        <div className='flex justify-center items-center mt-5'>
            <div className='bg-white w-[1000px]'>
                <h1 className='text-3xl font-bold text-center mt-5'>{data.title}</h1>
                <div className='flex justify-around mt-5'>
                    <p>{formatDate(data.created)}</p>
                    <p>{formatDate(data.updated)}</p>
                </div>
                <div className='flex justify-center gap-5 mt-5'>
                    <button onClick={()=>navigate(`/edit/${data.slug}`)} className='bg-blue-800 text-white icons'><i className="fa-solid fa-pen-to-square mr-2"></i>Edit</button>
                    <button onClick={()=>setConfirm(true)} className='bg-red-700 text-white  icons'><i className="fa-solid fa-trash mr-2"></i>Delete</button>
                </div>
                <p className='pl-5 pr-5 mt-5 pb-5'>{data.body}</p>
            </div>
        </div>
        {confirm && (
            <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
                <div className='bg-white rounded-2xl w-[500px]'>
                    <h1 className='text-2xl font-bold ml-5 mt-5'>Delete Note</h1>
                    <p className='ml-5 mt-1'>Are you want to delete this note?</p>
                    <div className='flex justify-center items-center gap-5 mt-5 mb-5'>
                        <button className='bg-red-700 text-white  icons' onClick={handleDelete}>Delete</button>
                        <button className='bg-blue-800 text-white icons' onClick={()=>setConfirm(false)}>cancle</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default NoteDetail
