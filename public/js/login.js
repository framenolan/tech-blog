document.querySelector("#login").addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        username:document.querySelector("#loginUsername").value,
        password:document.querySelector("#loginPassword").value,
    }
    console.log(userObj)
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.href="/profile"
        } else {
            res.status(500).json({msg: "an error occurred"})
        }
    })
})

document.querySelector("#signup").addEventListener("submit",e=>{
    e.preventDefault();

    if(document.querySelector("#signupPassword").value!==document.querySelector("#signupConfirm").value) {
        alert("Passwords do not match, please try again")
    }

    const userObj = {
        username:document.querySelector("#signupUsername").value,
        password:document.querySelector("#signupPassword").value,
    }
    console.log(userObj)
    fetch("/api/users/",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.href="/profile"
        } else {
            res.status(500).json({msg: "an error occurred"})
        }
    })
})