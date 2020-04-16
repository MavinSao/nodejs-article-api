const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
)

app.get('/',(req,res)=>{
    res.json({info: 'Article API'})
})

app.get('/articles',db.getArticles)
app.get('/articles/:id',db.getArticleById)
app.post('/articles',db.createArticles)
app.put('/articles/:id',db.updateArticle)
app.delete('/article/:id',db.deleteArticle)

app.listen(port, ()=>{
    console.log('Listening on port',port);
    
})