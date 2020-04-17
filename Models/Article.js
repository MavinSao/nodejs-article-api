/**
 * @swagger
 *  components:
 *    schemas:
 *      Article:
 *        type: object
 *        required:
 *          - title
 *          - description
 *          - create_date
 *          - image_url
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *            description: Description for article.
 *          create_date:
 *            type: string 
 *          image_url:
 *            type: string 
 *        example:
 *           title: Gogo
 *           description: fake@email.com
 *           create_date: 11-11-2020
 *           image_url: https://
 */