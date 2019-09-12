
var pixieapi={
    checkLogin:()=>{
        return new Promise(async(resolve,reject)=>{
            let username=localStorage.getItem("username")
            let sessionId = localStorage.getItem("sessionId")
            if(username&&sessionId){
                let resp=await makeRequest("https://pixie.jubi.ai/api/checkLogin",{
                    username:username,
                    sessionId:sessionId
                })
                if(resp.status=="success"&&resp.data.status=="success"&&resp.data.data.status=="success"){
                    return resolve({status:"success"})
                }
            }
            return resolve({status:"error"})
        })
        
    },
    signin: (username,password) => {
        return new Promise(async(resolve, reject) => {

            // localStorage.setItem("sessionId",sessionId)
            let resp = await makeRequest("https://pixie.jubi.ai/api/signin", {username:username,password:password})
            if (resp.status=="success" && resp.data.status=="success"&&resp.data.data.status=="success"){
                let user =resp.data.data.data
                localStorage.setItem("username",user.username)
                localStorage.setItem("sessionId",user.sessionId)
                return resolve({status:"success",data:user})
            }
            resp.status="error"
            return resolve(resp)

        })
    },
    signup:(username,password,confirmPassword,referral)=>{
        return new Promise(async(resolve,reject)=>{
            if(password==confirmPassword && referral.length >0 )
            {
                // console.log("MAKING REQUEST")
                let resp = await makeRequest("https://pixie.jubi.ai/api/signup", {username:username,password:password,referral:referral})
                
                console.log(resp)
                if (resp.status=="success" && resp.data.status=="success"&&resp.data.data.status=="success"){
                    return resolve({status:"success",data:resp.data.data.data})
                }
                resp.status="error"
                return resolve(resp)
            }
            return resolve({status:"error",data:"Password does not match"})
        })
    }
}


function makeRequest(url,data){
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            contentType: "application.json",
            data: JSON.stringify(data),
            success:(resp)=>{
                return resolve({status:"success",data:data})
            },
            error:(err)=>{
                return resolve({status:"error",data:err})
            }
        });
    })
}
