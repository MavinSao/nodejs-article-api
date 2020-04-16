const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'article_db',
    password: '1234',
    port: 5432,
})

const getArticles = (req,res)=>{
    pool.query('SELECT * FROM articles ORDER BY id ASC', (error,result)=>{
        if(error) throw error;
        res.status(200).json(result.rows)
    })
}

const getArticleById = (req,res)=>{
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM articles WHERE id = $1',[id],(error,result)=>{
        if(error) throw error;
        res.status(200).json(result.rows)
    })
}

const createArticles = (req, res) => {
    const { title, description, create_date, image_url } = req.body
  
    pool.query('INSERT INTO articles (title, description, create_date, image_url) VALUES ($1, $2, $3, $4)', [title, description, create_date, image_url], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Article added with ID: ${results.insertId}`)
    })
}

const updateArticle = (req, res) => {
    const id = parseInt(req.params.id)
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

  const deleteArticle = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM articles WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Article deleted with ID: ${id}`)
    })
  }

    module.exports = {
        getArticles,
        getArticleById,
        createArticles,
        updateArticle,
        deleteArticle
    }