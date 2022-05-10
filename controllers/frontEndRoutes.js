const express = require('express');
const router = express.Router();
const {User,Blog} = require('../models');

router.get("/",(req,res)=>{
    Blog.findAll({
        include:[User]
    }).then(blogs=>{
        const hbsBlogs = blogs.map(blog=>blog.get({plain:true}))
        const loggedIn = req.session.user?true:false
        let currentuser = null
        if(loggedIn) {
            currentuser = req.session.user.username
        }
        res.render("home",{blogs:hbsBlogs,loggedIn,currentuser})
    })
})

router.get("/login",(req,res)=>{
    if(req.session.user){
        return res.redirect("/profile")
    }
    res.render("login")
})

router.get("/profile",(req,res)=>{
    if(!req.session.user){
        return res.redirect("/login")
    }
    
    User.findByPk(req.session.user.id,{
        include:[Blog]
    }).then(userData=>{
        const hbsBlogs = userData.Blogs.map(blog=>blog.get({plain:true}))
        const loggedIn = req.session.user?true:false
        
        res.render("profile",{blogs:hbsBlogs,loggedIn,currentuser:req.session.user.username})
        
    })
})

module.exports = router;