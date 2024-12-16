import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import Menu from '../components/Menu'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { AuthContext } from '../context/authContext'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const Single = ()=>{
    const [post, setPost] = useState({})
    const location = useLocation();
    const postId = location.pathname.split("/")[2]
    const {currentUser} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleDelete=async ()=>{
        try{
            await axios.delete(`/api/posts/${postId}`);
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const res = await axios.get(`/api/posts/${postId}`)
                setPost(res.data)
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [postId])

    const getText = (html)=>{
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent;
    }

    return(
        <div className='single'>
            <div className="content">
                <img src={`../uploads/${post?.post_image}`} alt="" />
            
            <div className="user">
                <img src={post?.user_image} alt="" />
            <div className="info">
                <span>{post.username}</span>
                <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {
                currentUser?.username===post.username &&
                    <div className="edit">
                        <Link to={`/write?edit=${postId}`} state={post}>
                            <img  src={Edit} alt="" />
                        </Link>
                        <img  onClick={handleDelete} src={Delete} alt="" />
                    </div>
            }
            </div>
            <h1>{post.title}</h1>
            <p>{getText(post.description)}</p>
            </div>
            {/* <div className="menu"> */}
                <Menu cat = {post.category} postId={postId}/>
                {/* m */}
            {/* </div> */}
        </div>
    )
}

export default Single