const express = require('express');
const router = express.Router();
const {Blog} = require('../models');

// Find All Blogs
router.get("/", (req, res) => {
    Blog.findAll({})
        .then(dbBlogs => {
            res.json(dbBlogs)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({msg: "an error occurred", err})
        })
})

// Find One Blog
router.get("/:id", (req, res) => {
    Blog.findByPk(req.params.id,{})
    .then(dbBlog => {
        res.json(dbBlog);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({msg: "an error occurred", err})
    })
})

// Create Blog
router.post("/", (req, res) => {
    if(!req.session.user){
        return res.redirect("../login")
    }

    Blog.create({
        title: req.body.title,
        body: req.body.body,
        UserId: req.session.user.id
    })
    .then(newBlog => {
        res.json(newBlog)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: "an error occurred", err})
    });
});

// Update Blog
router.put("/:id", (req,res) => {
    Blog.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(updatedBlog => {
        res.json(updatedBlog)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: "an error occurred", err})
    });
})

// Delete Blog
router.delete("/:id", (req, res) => {
    Blog.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(delBlog => {
        res.json(delBlog)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: "an error occurred", err})
    });
})

module.exports = router;