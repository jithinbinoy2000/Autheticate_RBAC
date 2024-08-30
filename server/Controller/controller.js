const jwt = require('jsonwebtoken');
const userData = [
    {
       adminUsername :"admin",
       adminPassword :'admin@123',
       role:"admin"
    },
    {
        editorUsername : "editor",
        editorPassword : 'editor@123',
        role:'editor'
    },
    {
        userUsername :"user",
        userPassword :"user@123",
        role:'user'
    }
]
exports.loginuser = async(request,response)=>{
 
    const {username,password} = request.headers
    
         
    try {
       
        if(username === userData[0].adminUsername){
            if(password === userData[0].adminPassword){
                let data = {username:username,role:userData[0].role}
                const token = jwt.sign(data,"abcd")
                response.status(200).json({message:'login Successfull',role:userData[0].role,token:token})
            }else{
                response.status(400).send('Incorrect password')
            }
        }else if(username===userData[1].editorUsername){
            if(password ===userData[1].editorPassword){
                let data = {username:username,role:userData[1].role}
                const token = jwt.sign(data,"abcd")
                response.status(200).json({message:'login Successfully',role:userData[1].role,token:token})
            }else{
                response.status(400).send('Incorrect password')
            }
        }else if(username===userData[2].userUsername){
            if(password ===userData[2].userPassword){
                let data = {username:username,role:userData[2].role}
                const token = jwt.sign(data,"abcd")
                response.status(200).json({message:'login Successfully',role:userData[2].role,token:token})
            }else{
                response.status(400).send("Invalid Credentials")
            }
        }else{
            response.status(400).send("Invalid Credentials")
        }
       
    } catch (error) {
        response.status(500).json({message:'server error',error:error})
        console.log(error);
        
    }
}   