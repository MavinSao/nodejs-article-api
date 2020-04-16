require('dotenv').config()
const Pool = require('pg').Pool
const Joi = require('joi');

const pool = new Pool({
    user: process.env.USER_DB,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASS,
    port: process.env.PORT_DB,
})

//Get All Articles
const getArticles = (req,res)=>{
    pool.query('SELECT * FROM articles ORDER BY id ASC', (error,result)=>{
        if(error) throw error;
         //Validate
         const article = result.rows;
         if(article.length === 0) res.status(404).send('ARTICLE NOT FOUND')
         else res.status(200).json(article)
    })
}

//Get Article By ID
const getArticleById = (req,res)=>{
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM articles WHERE id = $1',[id],(error,result)=>{
        if(error) throw error;
        //Validate
        const article = result.rows;
        if(article.length === 0) res.status(404).send('ARTICLE NOT FOUND')
        else res.status(200).json(article)
    })
}

//Post Article 
const createArticles = (req, res) => {

    //Validate
    const { error } = validateArticle(req.body)
    if (error) {
      res.status(400).send(error.details[0].message)
      return
    }

    const { title, description, create_date, image_url } = req.body  

    pool.query('INSERT INTO articles (title, description, create_date, image_url) VALUES ($1, $2, $3, $4)', [title, description, create_date, image_url], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Article added with ID: ${results.insertId}`)
    })
}

//PUT
const updateArticle = (req, res) => {
    const id = parseInt(req.params.id)

    //Validate
    const { error } = validateArticle(req.body)
    if (error) {
      res.status(400).send(error.details[0].message)
      return
    }
    const { title, description, create_date, image_url } = req.body
  
    pool.query(
      'UPDATE articles SET title = $1, description = $2, create_date = $3, image_url = $4 WHERE id = $5',
      [title, description, create_date, image_url, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Article modified with ID: ${id}`)
      }
    )
  }

  //Delete Article
  const deleteArticle = (req, res) => {
    const id = parseInt(req.params.id)
    
    pool.query('DELETE FROM articles WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Article deleted with ID: ${id}`)
    })
  }

  const validateArticle = (article)=>{
    const schema = {
      title: Joi.string().min(3).required(),
      description: Joi.string().min(5).required(),
      create_date: Joi.string().required(),
      image_url: Joi.string().required()
    }
    return Joi.validate(article,schema);
  }

    module.exports = {
        getArticles,
        getArticleById,
        createArticles,
        updateArticle,
        deleteArticle
    }