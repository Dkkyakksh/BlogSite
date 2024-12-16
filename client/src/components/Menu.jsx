import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Menu = ({cat, postId}) =>{
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const res = await axios.get(`/api/posts/?cat=${cat}`);
                const recomPosts = res.data.filter((post)=> post.id!==Number(postId));
                setPosts(recomPosts);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [cat, postId]);


    return(
        <div className="menu">
            <h1>Other posts you may like</h1>
            {posts.map((post)=>(
                <div className="post" key={post.id}>
                    <img src={`../uploads/${post.img}`} alt="" />
                    <h2>{post.title}</h2>
                    <Link className="link" to={`/post/${post.id}`}>
                    <button>Read More</button>
                    </Link>
                </div>
            ))}
            </div>
    )
}

export default Menu;