import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from "../components/Menu"
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext.js'

const Single = () => {

  const [post, setPost]= useState({});

  const location=useLocation()

  const navigate=useNavigate()

  const postId=location.pathname.split("/")[2]

  const {currentUser}=useContext(AuthContext)


  useEffect(()=>{
    //we are creating new function rather than writing in the useEffect bcoz we cant write async directly in useEffect
     const fetchData= async ()=>{
       try{
         const res= await axios.get(`/posts/${postId}`)
         setPost(res.data)
       }catch(err){
        console.log(err)
       }
     }
     fetchData();
  },[postId])

  const handleClick= async ()=>{
    try{
      const res= await axios.delete(`/posts/${postId}`)
      navigate("/")
    }catch(err){
     console.log(err)
    }
  }

  const getText=(html)=>{
    const doc= new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
  }
  


  return (
    <div className='single'>
      <div className='content'>
        <img src={post?.img} alt="" />
        <div className='user'>
         {post.userImg && <img src={post.userImg} alt="" />}
         <div className='info'>
          <span>{post.username}</span>
          <p>Posted {moment(post.date).fromNow()}</p>
        </div>
        <div className='edit'>
          <Link to={`/write?edit=2`} state={post}><img src="https://cdn-icons-png.freepik.com/256/5844/5844456.png?uid=R102894738&ga=GA1.1.1720286399.1684075791&semt=ais_hybrid" alt="" /></Link>
          <img src="https://cdn-icons-png.freepik.com/256/4980/4980658.png?uid=R102894738&ga=GA1.1.1720286399.1684075791&semt=ais_hybrid" alt="" onClick={handleClick}/>
        </div>
        </div>
        <h1>{post.title}</h1>
        <p>{getText(post.desc)}</p>
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single
