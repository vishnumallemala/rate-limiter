const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const swaggerUi = require('swagger-ui-express');
const getUtil = require('./util/genericUtil');
const { rateLimiter } = require('./middleware/middleware');
const swaggerDocument = require('./swagger.json');
const port = process.env.PORT || 3000;

app.use(express.json());
// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/getRate', rateLimiter, async (req, res)=>{
    await getUtil.addDataToCache(req.ip);
    let count = await getUtil.getCachedData(req.ip);
    let respObj = {
        "no_of_requests": count
    }
    res.status(200).send(respObj);
});

const server = app.listen(port, ()=>{
    console.log("Web Application is running on port", port);
    console.log("Access Swagger Explorer http://localhost:"+port+"/explorer");
});

module.exports = server;