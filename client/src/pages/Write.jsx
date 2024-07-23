import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {

  const state=useLocation().state

  const navigate=useNavigate()

  const [value, setValue]=useState(state?.desc || '');
  const [title, setTitle]=useState(state?.title || '');
  const [file, setFile]=useState(null);
  const [cat, setCat]=useState(state?.cat || '');

  const upload= async ()=>{
    try{
      const formData = new  FormData(); //to upload any file firstly we should create a formdata
      formData.append("file",file)
      const res= await axios.post("/upload", formData)
      console.log(res.data)
      return res.data

    }catch(err){
      console.log(err)
    }
  } 

  const handleClick= async (e)=>{
    e.preventDefault();
    const imgUrl= await upload();
    console.log(imgUrl)

    try{
      state 
      ? await axios.put(`/posts/${state.id}`,{title,desc:value,img:file?`../upload/${imgUrl}`:"",cat,}): await axios.post(`/posts/`,{title,desc:value,img:file ? `../upload/${imgUrl}` : "",cat,
        date : moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });
      navigate("/")
    }catch(err){
       console.log(err)
    }
    
  }

  return (
    <div className='add'>
      <div className='content'>
        <input type='text'  value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
        <div className='editorContainer'>
         <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className='menu'>
        <div className='item'>
          <h1 >Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{display:"none"}} type='file' name="" id="file" onChange={e=>setFile(e.target.files[0])}/>
          <label className="file" htmlFor='file'>Upload Image</label>
          <div className='buttons'>
            <button>Save as a Draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className='item'>
          <h1>Category</h1>
          <div className='cat'>
          <input type='radio' checked={cat==="art"} name="cat" value="art" id="art"  onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='art'>Art</label>
          </div>
          <div className='cat'>
          <input type='radio' checked={cat==="science"} name="cat" value="science" id="science" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='science'>Science</label>
          </div>
          <div className='cat'>
          <input type='radio' checked={cat==="technology"} name="cat" value="technology" id="technology" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='technology'>Technology</label>
          </div>
          <div className='cat'>
          <input type='radio' checked={cat==="cinema"} name="cat" value="cinema" id="cinema" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='cinema'>Cinema</label>
          </div>
          <div className='cat'>
          <input type='radio' checked={cat==="design"} name="cat" value="design" id="design" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='design'>Design</label>
          </div>
          <div className='cat'>
          <input type='radio' checked={cat==="food"} name="cat" value="food" id="food" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='food'>Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write
