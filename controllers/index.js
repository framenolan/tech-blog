const express = require('express');
const router = express.Router();

const userRoutes = require("./userRoutes");
router.use("/api/users",userRoutes)

const blogRoutes = require("./blogRoutes");
router.use("/api/blogs",blogRoutes)

const commentRoutes = require("./commentRoutes");
router.use("/api/comments",commentRoutes)

const frontEnd = require("./frontEndRoutes");
router.use("/",frontEnd)

router.get("/showsession",(req,res)=>{
    res.json(req.session)
})

// Logout User
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
    location.reload();
  })

router.get("/secretclub",(req,res)=>{
    if(!req.session.user){
        return res.status(401).json({msg:"ya gotta login to join the club!"})
    }
    res.json({msg:`welcome to the club ${req.session.user.username}`})
})



module.exports = router;