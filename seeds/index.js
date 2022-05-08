const sequelize = require("../config/connection")
const {User,Blog} = require("../models")


const users = [
    {
        username:"nolan",
        password:"password"
    },
    {
        username:"zeke",
        password:"zekeriah"
    },
    {
        username:"zayla",
        password:"nopenopenope"
    }
]

const blogs = [
    {
        title:"my first blog",
        body:"Welcome to my blog! Don't forget to smash that like button",
        UserId:1
    },
    {
        title:"my final blog",
        body:"After my most recent cancelling, I've decided to retire from blogging",
        UserId:1
    },
    {
        title:"Bunnies Under the Deck",
        body:"There are definitely some bunnies living under the deck.",
        UserId:2
    }
]

const comments = [
    {
        body:"Totally, I saw that too!",
        UserId:3,
        BlogId:3,
        postedTime:"3/15/21 8:53pm"
    }
]

const feedMe = async ()=>{
    try{
        await sequelize.sync({force:true})
        await User.bulkCreate(users,{
            individualHooks:true
        });
        await Blog.bulkCreate(blogs);
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

feedMe()