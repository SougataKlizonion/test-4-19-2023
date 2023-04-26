export default function Validation(name,email,phone,password){
    const message={ }
    const email_patterns =/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/
    const password_patterns =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/
    if(name=== ""){
        console.log(message.name);
            message.name="Name is required"
    }else{
        
    }
}