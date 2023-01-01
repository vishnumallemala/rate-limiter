const NodeCache = require('node-cache');
const myCache = new NodeCache();
const genUtil = require('./genericUtil');
const { getFormattedMessage } = require('./errorMessageHandler');
const rateLimit = process.env.RATE_LIMIT;

let timer = 60;

exports.rateLimiter = async function(req, res, next){
    try{
        let ip = req.ip;
        let data = await genUtil.getCachedData(ip);
        if(data>=rateLimit){
            res.setHeader("X-RATE-LIMIT", rateLimit);
            res.setHeader("X-WAIT-TILL", timer);
            let errObj = {
                "error":{
                    "code": "RATE_LIMIT_EXCEEDED",
                    "description": getFormattedMessage('RATE_LIMIT_EXCEEDED', timer)
                }
            }
            return res.send(errObj);
        }
        else{
            next();
        }
    } catch(error){
        next(error);
    }
}

setInterval(()=>{
    genUtil.flushCache();
    timer = 60;
}, 60000);

setInterval(()=>{
    timer--;
},1000);