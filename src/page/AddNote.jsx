import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";


function AddNote() {
    

    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [category,setCategory] = useState('')

    const navigate = useNavigate()


    const handlesubmit = (e)=>{
        e.preventDefault()

        const notedata = {
            title : title,
            body : content,
            category : category,
        }

        async function apidata(){
            try{
                const res = await axios.post('http://127.0.0.1:8000/notesapi/',notedata,{
                    headers:{ "Content-Type": "application/json" },
                });
                console.log(res);
                setTitle("");
                setContent("");
                setCategory("");
                toast.success("Note added successfully!");
                navigate('/')
                
            }catch(err){
                console.log("Error:", err.response?.data || err.message);
                toast.error("Failed to add note");
                
            }
        }
        apidata()
        
    }

  return (
    <div>
        <Navbar />
        <div className='addnote'>
            <h1 className='font-bold text-2xl mt-7'>Add New Note</h1>
            <form className='flex flex-col items-start mt-10 mb-10' method='POST' onSubmit={handlesubmit}>
                <p>Title</p>
                <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter Note's Title" className='w-[400px] p-2 border-gray-600 border-1 rounded-1xl'/>
            
                <p className='mt-5'>Content</p>
                <textarea type='text' placeholder="Enter note's content" value={content} onChange={(e)=>setContent(e.target.value)} className='w-[400px] p-2 border-gray-600 border-1'/>
           
                <p className='mt-5'>Note's category</p>
                <select className='w-[400px] p-2 border-gray-600 border-1' value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <option value="">Pick a Category</option>
                    <option value="BUSINESS">Business</option>
                    <option value="PERSONAL">Personal</option>
                    <option value="IMPORTANT">Important</option>
                </select>

                <button className='text-center mt-5 bg-blue-800 p-2 w-full text-white' type='submit'> Add Notes </button>

            </form>
        </div>
    </div>
  )
}

export default AddNote