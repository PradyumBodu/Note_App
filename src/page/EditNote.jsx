import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { toast } from "react-toastify";

function EditNote() {

    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [category,setCategory] = useState('')
    const {slug} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        async function fetchdata() {
            try{
                const res = await axios.get(`http://127.0.0.1:8000/notesapi/${slug}/`);
                setTitle(res.data.title);
                setContent(res.data.body);
                setCategory(res.data.category);
            }catch(err){
                console.log(err);          
            }
        }
        fetchdata()
    },[slug])

    const handlesubmit = (e) => {
        e.preventDefault()

        const notedata = {
            title : title,
            body : content,
            category : category,
        }

        async function fetchdata(){
            try{
                const res = await axios.put(`http://127.0.0.1:8000/notesapi/${slug}/`,notedata);
                toast.success("Note updated successfully!");
                navigate("/");  
            }catch(err){
                toast.error("Failed to update note ❌");   
            }
        }
        fetchdata()
    }

  return (
    <div>
        <Navbar />
        <div className='addnote'>
            <h1 className='font-bold text-2xl mt-7'>Edit Note</h1>
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

                <button className='text-center mt-5 bg-blue-800 p-2 w-full text-white' type='submit'> Edit Notes </button>

            </form>
        </div>
    </div>
  )
}

export default EditNote