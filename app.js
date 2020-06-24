const express = require('express');
const bodyParser= require('body-parser');
const request = require('request');
const e = require('express');
const port =3000;
const app= express();
const https = require('https');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/signup.html');
})

app.post('/',(req,res)=>{

    const firstName= req.body.fName;
    const lastName= req.body.lName;
    const email= req.body.email;
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }
    const jsonData= JSON.stringify(data);
    // adding mailchimp url request
    const url="https://us10.api.mailchimp.com/3.0/lists/9616331974";

    const option={
        method:'POST',
        auth:'mo:333278db54f4d7f5ae97bf2316ba31d7-us10'
    }

    const request=https.request(url,option,(response)=>{
       if( response.statusCode===200){
           res.sendFile(__dirname+'/success.html');
       }else{
           res.sendFile(__dirname+'/failure.html');
       }

        response.on('data', (data)=>{
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.post('/failure',(req,res)=>{
    res.redirect('/');
})

app.listen(process.env.PORT || port,()=>console.log('server is running on port 3000'));




// api key
// 333278db54f4d7f5ae97bf2316ba31d7-us10

// list id
// 9616331974