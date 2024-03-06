const jwt= require('jsonwebtoken');//used to faciliate the secure communication between client and server(using token)

const JWT_SECREAT ='Mayureshx@123'


const fetchuser=(req,res,next)=>{
 
    const token = req.header("auth-token");
    if(!token)
    {
        res.status(401).send({error : "Please authenticate using valid token"});
    }

    try {
        const data = jwt.verify(token,JWT_SECREAT);//verify token and secret key
        req.user = data.user;//once verified get userId
        next();//use to run next fun(async)
    
        
    } catch (error) {
        
        res.status(401).send({error : "Please authenticate using valid token"});
    }
   
}


module.exports= fetchuser;