const express = require('express');
const app = express();
const port = 6125;
const IP = "127.0.0.1";
let path = require("path");
const parser = require('body-parser');
var request = require('request');


var uuid = require('uuid');

app.listen(port, IP, () => console.log(`Pixie listening on port ${port}!`));


app.use(parser.json());

app.use(parser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname + '/assets')));



app.post('/checklogin',async (req,res) => {
   res.json(await dbOperation("checkLogin", {username: req.body.username,sessionId: req.body.sessionId}))
});


app.post('/signin', async(req, res) => {
    
    let resp = await dbOperation("readByUsername",{username:req.body.username})
    if(resp.data&&resp.status=="success"&&resp.data.status=="success"){
        for(let data of resp.data.data){
            if(data.password==req.body.password){
                delete data.password;
                data.sessionId=uuid.v4()
                res.json({status:'success',data:data});
                await dbOperation("setSessionId",{username:data.username,sessionId:data.sessionId})
                return
            }
        }
    }
    return res.json({status:"denied"});
});




app.post('/signup', async(req, res) => {
    let referral=req.body.referral;
    let username=req.body.username;
    let password=req.body.password;
    let resp=await dbOperation("readByReferral", {referral: referral})
    let errMessage=""
    if(resp.status=="success"&&resp.data.status=="success"){
        if(resp.data&&resp.data.data&&resp.data.data.length>0){
            resp= await dbOperation("readByUsername", {username: username})
            if(resp.status=="success"&&resp.data.status=="success"){
                if(resp.data&&resp.data.data&&resp.data.data.length==0){
                    let user={
                        username:username,
                        password:password,
                        referral:uuid.v4()
                    }
                    resp=await dbOperation("createUser",user)
                    console.log(JSON.stringify(resp));
                    if(resp.status=="success"&&resp.data.status=="success"){
                        console.log("SUCCESS")
                        return res.json({status: "success"});
                    }
                    errMessage="Something went wrong"
                }
                errMessage="User exists"
            } 
            errMessage="DB User read Failed"
        }
        errMessage="No referral"
    }
    errMessage="DB Referral read Failed"
    console.log(errMessage)
    console.log(JSON.stringify(resp,null,3))
    res.json({status: "error",data:errMessage});
});



function dbOperation(type,body){
    return new Promise(async(resolve,reject)=>{
        return resolve(await makeRequest({
            uri: 'https://pixie.jubi.ai/db/'+type,
            method: 'POST',
            json: body
          }))
        
    })
}


function makeRequest(options){
    return new Promise((resolve,reject)=>{
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              return resolve({status:"success",data:body})
            }
            return resolve({status:"error",data:error})
          });
    })
}

