const express = require('express');
const router = express.Router();
const {Comment} = require('../models');

// Find All Comments
router.get("/", (req, res) => {
    Comment.findAll({})
        .then(dbComments => {
            res.json(dbComments)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({msg: "an error occurred", err})
        })
})

// Find One Comment
router.get("/:id", (req, res) => {
    Comment.findByPk(req.params.id,{})
    .then(dbComment => {
        res.json(dbComment);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({msg: "an error occurred", err})
    })
})

// Create Comment
router.post("/", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({msg: "Please login to post"})
        // redirect to login page perhaps?
    }

    Comment.create({
        title: req.body.title,
        body: req.body.body,
        UserId: req.session.user.id
    })
    .then(newComment => {
        res.json(newComment)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: "an error occurred", err})
    });
});

// Update Comment
router.put("/:id", (req,res) => {
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(updatedComment => {
        res.json(updatedComment)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: "an error occurred", err})
    });
})

// Delete Comment
router.delete("/:id", (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(delComment => {
        res.json(delComment)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: "an error occurred", err})
    });
})

module.exports = router;