const NodeCache = require('node-cache');
const myCache = new NodeCache();

exports.addDataToCache = function(key){
    return new Promise((resolve,reject)=>{
        try{
            if(myCache.has(key)){
                let value = myCache.get(key);
                value++;
                myCache.set(key, value);
            }
            else{
                myCache.set(key, 1);
            }
            resolve();
        } catch (error){
            reject(error);
        }
    })
}

exports.getCachedData = function(key){
    return new Promise((resolve,reject)=>{
        // let obj = {};
        let obj = myCache.get(key);

        resolve(obj);
    })
}

exports.flushCache = function(){
    myCache.flushAll();
  }