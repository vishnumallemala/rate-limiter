const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const swaggerUi = require('swagger-ui-express');
const getUtil = require('./util/genericUtil');
const { rateLimiter } = require('./util/middleware');
const swaggerDocument = require('./swagger.json');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/getRate', rateLimiter, async (req, res)=>{
    await getUtil.addDataToCache(req.ip);
    if(res.statusCode === 429){
        
    } else {
        let count = await getUtil.getCachedData(req.ip);
        let respObj = {
            "no_of_requests": count
        }
        res.status(200).send(respObj);
    }
});

const server = app.listen(port, ()=>{
    console.log("App running on", port);
});

module.exports = server;