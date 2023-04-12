import express from "express";
import *  as dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";
import Post from "../mongodb/models/post.js"


dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: "dunhusrvr",
    api_key: "293655964736638",
    api_secret: "WtezUzb2wT38rb_1IPuxgxxpJxg"
})

router.route("/").get(async(req, res) => {
    
    try {
        const posts = await Post.find({});
        console.log(posts);
        res.status(200).json({success: true, data: posts});
    } catch (error) {
        res.status(500).json({success: false, error: error});
    }

})

router.route("/").post(async (req, res) => {
    console.log(req)
    try{
    
    const {name, prompt, photo} = req.body;
    const photoURL = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
        name,
        prompt,
        photo: photoURL.url,
        })
        res.status(201).json({success: true, data: newPost});
    } catch(err){
        res.status(500).json({success: false, error: err});
    }
})

export default router