import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';
import moment from 'moment'
const Write = ()=>{


    const state= useLocation().state
    console.log(state);
    const [value, setValue] = useState(state?.description ||'');
    const[title, setTitle] = useState(state?.title || "");
    const[file, setFile] = useState(state?.post_image || null);
    const[cat, setCat] = useState(state?.category ||"");  
    // console.log(value);
    const categories = ['art', 'science', 'technology', 'cinema', 'design','food']; 
    const upload = async()=>{
        try{
            const formData = new FormData();
            formData.append("file", file)
            const res = await axios.post("/api/upload", formData)
            return res.data;
        }catch(err){
            console.log(err);
        }
    }
    const handleSubmit= async e=>{
        e.preventDefault();
        const imgUrl = await upload();
        try{
            state ? axios.patch(`/api/posts/${state.id}`, {
                title,description:value, cat, img:file?state.post_image:""
            })
            :
            axios.post(`/api/posts/`, {
                title,description:value, cat, img:file?imgUrl:"", date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
            })
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div className='add'>
            <div className="content">
                <input type='text' value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
                <div className="editorContainer">
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span><b>Status: </b> Draft</span>
                    <span><b>Visibility: </b> Public</span>
                    <input style={{display:'none'}} type='file' name='' id='file' onChange={e=>setFile(e.target.files[0])}></input>
                    <label className='file' htmlFor='file'> Upload Image</label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handleSubmit}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    {categories.map((category)=>(
                        <div className='cat' key={category}>
                            <input type='radio'
                                checked={cat === category}
                                name='cat'
                                value = {category}
                                onChange={(e)=>setCat(e.target.value)}
                            />
                            <label htmlFor={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </label>
                        </div>
                    ))}
                    {/* <div className="cat">
                    <input type='radio' name='cat' value='art' onChange={e=>setCat(e.target.value)}></input>
                    <label htmlFor='art'>Art</label>
                    </div>
                    <div className="cat">
                    <input type='radio' name='cat' value='science' onChange={e=>setCat(e.target.value)}></input>
                    <label htmlFor='art'>Science</label>
                    </div>
                    <div className="cat">
                    <input type='radio' name='cat' value='technology' onChange={e=>setCat(e.target.value)}></input>
                    <label htmlFor='art'>Technology</label>
                    </div>
                    <div className="cat">
                    <input type='radio' name='cat' value='cinema' onChange={e=>setCat(e.target.value)}></input>
                    <label htmlFor='art'>Cinema</label>
                    </div>
                    <div className="cat">
                    <input type='radio' name='cat' value='design' onChange={e=>setCat(e.target.value)}></input>
                    <label htmlFor='art'>Design</label>
                    </div>
                    <div className="cat">
                    <input type='radio' name='cat' value='food' onChange={e=>setCat(e.target.value)}></input>
                    <label htmlFor='art'>Food</label>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Write