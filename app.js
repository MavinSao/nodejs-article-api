require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const db = require('./queries');
const port = 3000;


const options = {
  definition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Article API', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'Article API Infomation',
      
    },
  },
  // Path to the API docs
  apis: ['./Models/Article.js','./app.js'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
app.use('/api/v1',swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
)

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/',(req,res)=>{
    res.json({info: 'Article API'})
})

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     description: Returns articles
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: articles
 */
app.get('/articles',db.getArticles)

/**
 * @swagger
 * /article/{aid}:
 *  get:
 *    tags: [Articles]
 *    summary: Get an article
 *    parameters:
 *    - in: path
 *      name: aid
 *      schema:
 *        type: integer
 *      required: true
 *      description: Use to return an article
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: articles
 */

app.get('/article/:aid',db.getArticleById)

/**
 * @swagger
 *  /articles:
 *    post:
 *      summary: Create a new article
 *      tags: [Articles]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Article'
 *      responses:
 *        "200":
 *          description: A article schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Article'
 */
app.post('/articles',db.createArticles)

/**
 * @swagger
 * /article/{aid}:
 *  put:
 *    tags: [Articles]
 *    summary: Update Article
 *    parameters:
 *    - in: path
 *      name: aid
 *      schema:
 *        type: integer
 *      required: true
 *      description: Update Article
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Article'
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: articles
 */
app.put('/article/:id',db.updateArticle)

/**
 * @swagger
 * /article/{aid}:
 *  delete:
 *    tags: [Articles]
 *    summary: Delete an article
 *    parameters:
 *    - in: path
 *      name: aid
 *      schema:
 *        type: integer
 *      required: true
 *      description: Use to delete an article
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: articles
 */
app.delete('/article/:id',db.deleteArticle)

app.listen(port, ()=>{
    console.log('Listening on port',port);
    
})