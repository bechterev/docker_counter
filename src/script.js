const express = require('express');
const redis = require('redis');
const REDIS_URL = process.env.REDIS_URL || 'localhost';
const client = redis.createClient(`redis://${REDIS_URL}`);

const app = express();
app.use(express.json());


app.get('/counter/:bookId',(req,res)=>{
    const {bookId} = req.params;
    console.log('book id', bookId)
    client.get(bookId,(err,count)=>{
        if(err){res.status(500).json({err:`erorr redis: ${err}`});}
        else res.json({counter:count})
    })
  })
  app.post('/counter/:bookId/incr',(req,res)=>{
    const {bookId} = req.params;
    console.log('update',bookId)
    client.incr(String(bookId),(err,count)=>{
        if(err){res.status(500).json({err:`erorr redis: ${err}`});}
        else {
            res.json({counter:count})
    }
    })
  })
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`app start`)
})
