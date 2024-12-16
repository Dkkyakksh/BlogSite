import {db} from "../db.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const register = (req, res)=>{
    //check exitsing user
    const q = "SELECT * FROM user WHERE email = ? OR username = ?"
    db.query(q, [req.body.email, req.body.username], (err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("User already exists!");
        //409 stands for user already exists
        //hashing password and then creating user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO user (`username`, `email`, `password`) VALUES(?,?,?)"
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]
        db.query(q, [...values], (err, data)=>{
            if(err) return res.json(err);
            return res.status(200).json("User has been created.");
        })
    }) 
}

export const login = (req, res)=>{
//check user exists
const q = "SELECT * FROM user where username = ?";
db.query(q, [req.body.username], (err,data)=>{
    if(err) return res.json(err);
    if(data.length===0) return res.status(404).json("User not found!");
    //check password
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
    if(!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

    const {password, ...other} = data[0]; //now other stores user info except its password

    const token = jwt.sign({id:data[0].id}, process.env.JWT_SECRET);
    res.cookie("access_token", token,{
        httpOnly: true//any script in this browser or application cannot reach this cookie directly
    }).status(200).json(other)
})
}

export const logout = (req, res)=>{
    res.clearCookie("access_token", {
        sameSite:'none',
        secure:true
    }).status(200).json("User has been logged out.");
}