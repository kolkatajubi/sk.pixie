const express = require('express');
const app = express();
const port = 3000;
const IP = "127.0.0.1";
let path = require("path");
const parser = require('body-parser');


var uuid = require('uuid');

app.listen(port, IP, () => console.log(`Pixie listening on port ${port}!`));



app.use(parser.json());

app.use(parser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, '/')));


//const fs = require('fs');

let rawdata = fs.readFileSync('users.json');
let userData = JSON.parse(rawdata);

function dummyCheckLogin(session){
    return Promise((resolve,reject)=>{
        return resolve({status:"success"})
    })
}


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + "/Test.html"));
});


app.post('/checklogin',async (req,res) => {
   res.json(await checkLogin(req.body.username,req.body.sessionId))
});


app.post('/signin', async(req, res) => {
    
    let resp = await readByUsername(req.body.username)
    if(resp.status=="success"){
        for(let data of resp.data){
            if(data.password==req.body.password){
                delete data.password;
                data.sesssionId=uuid.v4()
                res.json({status:'success',data:data});
                await setSessionId(data.username,data.sesssionId)
                return
            }
        }
    }
    return res.json({status:"denied"});
});




app.post('/signup', async(req, res) => {
    let referral=req.body.referral;
    let username=req.body.username;
    let resp=await readByReferral(referral);
    let errMessage=""
    if(resp.status=="success"){
        if(resp.data.length>0){
            resp= await readByUsername(username)
            if(resp.status=="success"){
                if(resp.data.length==0){
                    return res.json({status: "success"});
                }
                else{
                    errMessage="User exists"
                }
            } 
        }
        else{
            errMessage="No referral"
        }
    }
    res.json({status: "error",data:errMessage});
});




// function dummyCreateUser(user){
//     return Promise((resolve,reject)=>{
//         return resolve({status:"success",data:user})
//     })
// }

// function dummySetSession(username,sessionId){
//     return Promise((resolve,reject)=>{
//         return resolve({status:"success"})
//     })
// }

// function dummyReadByReferral(ref){
//     return Promise((resolve,reject)=>{
//         return resolve({status:"success",data:[{},{}]})
//     })
// }

// function dummyReadByUsername(ref){
//     return Promise((resolve,reject)=>{
//         return resolve({status:"success",data:[{},{}]})
//     })
// }
