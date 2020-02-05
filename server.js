const express =require('express')
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv').config();
const passport=require('passport')
const path=require('path');


const app =express()
const port =process.env.PORT || 5000

app.use(cors())
app.use(express.json())
const uri =process.env.ATLAS_URI

app.use(passport.initialize())
require('./passport')(passport)
// user route
app.use('/user',require('./routes/userRoute'))

//guest route
app.use('/guest',require('./routes/guestRoute'))

//server static assets if in production

if(process.env.NODE_ENV==='production'){
    //Set static folder

    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','indext.html'));
    })
}


mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true });

const connection =mongoose.connection;
connection.once('open',()=>{
    console.log('mongodb connection establish succesfully')
});
app.listen(port,()=>{console.log(`The app is running on port ${port}`)})