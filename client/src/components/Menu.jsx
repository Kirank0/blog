import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Menu = ({cat}) => {

    // const posts=[
    //     {
    //       id:1,
    //       title:"lorem Ipsum",
    //       desc: "lorem Ipsum Lore mauris just me inc habitant morbi tristique senectus et netus et",
    //       img: "https://img.freepik.com/free-vector/abstract-hand-painted-modern-minimal-canvas-design_1048-20200.jpg?uid=R102894738&ga=GA1.1.1720286399.1684075791&semt=sph" 
    //     },
    //     {
    //       id:2,
    //       title:"lore tellus ", 
    //       desc: "lorem Ipsum Lore mauris just me inc habitant morbi tristique senectus et netus et",
    //       img: "https://img.freepik.com/free-vector/hand-drawn-soft-earth-tones-background_23-2151168407.jpg?uid=R102894738&ga=GA1.1.1720286399.1684075791&semt=ais_user" 
    //     },
    //     {
    //       id:3,
    //       title:"lore del",
    //       desc: "lorem Ipsum Lore mauris just me inc habitant morbi tristique senectus et netus et",
    //       img: "https://img.freepik.com/free-vector/gold-botanical-cover-collection-template_23-2148825548.jpg?uid=R102894738&ga=GA1.1.1720286399.1684075791&semt=sph" 
    //     },
    //     {
    //       id:4,
    //       title:"louted e nature",
    //       desc: "lorem Ipsum Lore mauris just me inc habitant morbi tristique senectus et netus et",
    //       img: "https://img.freepik.com/free-photo/autumn-leaves-fall-gracefully-painting-nature-canvas-generative-ai_188544-9370.jpg?uid=R102894738&ga=GA1.1.1720286399.1684075791&semt=sph" 
    //     },
    //     {
    //       id:5,
    //       title:"lorvr par dqlite",
    //       desc: "lorem Ipsum Lore mauris just me inc habitant morbi tristique senectus et netus et",
    //       img: "https://img.freepik.com/free-photo/abstract-eye-portrait-young-women-elegance-generated-by-ai_188544-9712.jpg?uid=R102894738&ga=GA1.1.1720286399.1684075791&semt=sph" 
    //     }
    //   ]

    const [posts, setPosts]= useState([]);



  useEffect(()=>{
    //we are creating new function rather than writing in the useEffect bcoz we cant write async directly in useEffect
     const fetchData= async ()=>{
       try{
         const res= await axios.get(`/posts/?cat=${cat}`)
         setPosts(res.data)
       }catch(err){
        console.log(err)
       }
     }
     fetchData();
  },[cat])


  return (
    <div className='menu'>
      <h1>Other posts you may like</h1>
      {
        posts.map((post) =>{
            return (
            <div className='post' key={post.id}>
             <img src={post.img} alt=""/>  
             <h2>{post.title}</h2> 
             <button>Read More</button>
            </div>
            )
        })
      }
    </div>
  )
}

export default Menu
