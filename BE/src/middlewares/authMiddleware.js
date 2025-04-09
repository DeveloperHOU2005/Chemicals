
const API_KEY = process.env.API_KEY;


const userAther = (req, res, next)=>{
    next();
}

const adminAther = (req, res, next)=>{
    next();
}


export {userAther, adminAther}