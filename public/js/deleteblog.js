document.querySelector(".deletePost").addEventListener("click",e=>{
    e.preventDefault()
    
    const id = this.value
    console.log(`This id value is ${id}`)

    fetch(`/api/blogs/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            res.status(500).json({msg: "an error occurred"})
        }
    })
})