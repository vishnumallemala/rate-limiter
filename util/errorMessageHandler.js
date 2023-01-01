const errorMessages = require('./error.json');
const language = process.env.LANGUAGE || "english";

module.exports={
    getErrorMessage:(errCode)=>{
        const errMessage = errorMessages[language][errCode];
        return errMessage;
    },
    getFormattedMessage:(errCode,value)=>{
        let errMessage = errorMessages[language][errCode];
        const result = errMessage.replace("#message#", value.toString());
        return result;
    }
}