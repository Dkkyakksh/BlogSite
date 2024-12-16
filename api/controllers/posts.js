import jwt from 'jsonwebtoken'
import {db} from '../db.js'
export const getAllPosts = (req,res)=>{
    const q = req.query.cat 
    ? "SELECT * FROM posts WHERE category=?"
    : "SELECT * FROM posts"
    db.query(q, [req.query.cat], (err, data)=>{
        if(err) return res.status(500).send(err);

        return res.status(200).json(data);
    })
} 
export const getPost = (req,res)=>{
    const q = "SELECT p.id, u.username, p.title, p.description, p.img as post_image, p.date, p.category, u.image as user_image FROM posts p LEFT JOIN `user` u ON p.uid=u.id WHERE p.id = ?"
    db.query(q, [req.params.id], (err, data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(data[0]); 
    })
} 
export const addPost = (req,res)=>{
    const token = req.cookies.access_token
    if(!token)return res.status(401).json("Not authenticated!");
    
    //verification
    jwt.verify(token,"jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid");
        
        const q = "INSERT INTO posts (title, description, img, category,date, uid) VALUES (?,?,?,?,?,?)";
        const {title, description, img, cat, date} = req.body;
        db.query(q,[title, description, img, cat, date, userInfo.id], (err, data)=>{
            if(err) return res.status(500).json(err);
            
            return res.status(200).json("Post added successfully !")
        })
    })
} 
export const deletePost = (req,res)=>{
    const token = req.cookies.access_token
    if(!token)return res.status(401).json("Not authenticated!");

    //verification
    jwt.verify(token,"jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid");
        
        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE id=? AND uid=?";
        
        db.query(q,[postId, userInfo.id], (err, data)=>{
            if(err) return res.status(403).json("You can only delete you own posts!");
            
            return res.status(200).json("Post successfully deleted!")
        })
    })
} 
export const updatePost = (req,res)=>{
    const token = req.cookies.access_token
    if(!token)return res.status(401).json("Not authenticated!");
    
    //verification
    jwt.verify(token,process.env.JWT_SECRET, (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid");
        
        const q = "UPDATE posts SET title=?, description=?, img=?, category=? WHERE id=? AND uid=?";
        const {title, description, img, cat} = req.body;
        db.query(q,[title, description, img, cat, req.params.id, userInfo.id], (err, data)=>{
            if(err) return res.status(500).json(err);
            
            return res.status(200).json("Post updated successfully !")
        })
    })
} 