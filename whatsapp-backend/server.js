//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'

// app config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1129385",
    key: "2e3afc761ec73465655d",
    secret: "secret-key",
    cluster: "us2",
    useTLS: true
  });

// middleware
app.use(express.json())
app.use(cors())


//DB config
const connection_url = 'mongodb+srv://admin:<Password>@cluster0.xzplx.mongodb.net/<whatsappdb>?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})


//Pusher
const db = mongoose.connection
db.once('open',()=>{
    console.log('DB connected')
    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()
    changeStream.on('change',(change)=>{
        console.log(change)
        if (change.operationType ==='insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',{
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received
            }
            );
        }else{
            console.log('Error triggering Pusher')
        }
    });
});


// api routes
app.get('/',(req,res)=>res.status(200).send('hello world'))
app.post('/messages/new',(req,res)=>{
    const dbMessage  = req.body
    Messages.create(dbMessage,(err,data)=>{
        if (err){
            res.status(500).send(err)
        } else{
            res.status(201).send(data)
        }

    })
})
app.get('/messages/sync',(req,res)=>{
    
    Messages.find((err,data)=>{
        if (err){
            res.status(500).send(err)
        } else{
            res.status(200).send(data)
        }

    })
})


// listeners
app.listen(port,()=>console.log(`Listening on localhost:${port}`));



