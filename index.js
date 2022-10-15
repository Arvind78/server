const express = require('express');
const mongoose = require('mongoose');
const bcript = require('bcrypt')
const cors = require("cors")
const env = require('dotenv').config()
const user = require('./UserSchema')
const app = express();
const userToken= require("jsonwebtoken")
app.use(express.json())
app.use(cors())

app.listen(process.env.Port, () => {
    console.log("Server is runing");
})

mongoose.connect(process.env.dataBaseUrl)
    .then(() => {
        console.log("Database  Sucessfully Connected");
    }).catch((err) => {

        console.log("Database  Sucessfully Connected" + err)
    })

app.post("/signup", async (req, res) => {
    try {

        if (!req.body.Name || !req.body.Email || !req.body.Password || !req.body.Confirm_Password) {
            return res.status(400).json({ massage: "User Invalid" })
        }
        req.body.Password = await bcript.hash(req.body.Password, 10);
        req.body.Confirm_Password = await bcript.hash(req.body.Confirm_Password, 10);
        let userAuth = await user.findOne({ Email: req.body.Email })
        if (userAuth) {

            return res.status(400).json({ massage: "user already reagisterd" })

        }
        var datas = await user.create(req.body)

        res.status(200).json({ massage: "user sucessfully ragisterd" })

        console.log(datas)
    } catch (err) {
        return res.status(404).json({ massage: "server not response" })

    }

})


//  ========================================================================

 app.post("/login",async(req,res)=>{
    let userAuthEmail = await user.findOne({Email:req.body.Email})
    if(!userAuthEmail){
        res.status(404).json({massage:"Email or Password Invalid"})
        return;
      }
    let userAuthPassword =userAuthEmail.Password;
     let userAuthPassword1 =await bcript.compare(req.body.Password, userAuthPassword);
     console.log(userAuthPassword1)
    // console.log(userAuthEmail)
 
    if(!userAuthPassword1){
        res.status(404).json({massage:"Email or Password Invalid"})
        return;
      }
      const Token=userToken.sign({userAuthEmail},process.env.Scritkey)
      res.status(200).json({token:Token})
    //   console.log(Token)
})






