import React,{useState} from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

const Register=()=>{
  //const navigate=useNavigate();
  const[exists,setExists]=useState("");    
  const[details,setDetails]=useState(false);  
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })
    const Input=(e)=>{
        setExists("");
        setDetails(false);
        const{name,value}=e.target;
        // console.log(name,value);
        setData({...data,[name]:value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {name,email,password}=data;
        console.log(name,email,password);
      
        try{
            if(name&&email&&password){
                const register=await axios({
                    method:"post",
                    url:"http://localhost:8800/api/auth/signup",
                    data:{
                        name,email,password
                    }            
                })
                
                  //  alert(register.data.message);
                    console.log(register.data);
            }
          
                else{
                    window.alert("Enter the details");
                    setDetails(true);
                }
                 setData({name:"",email:"",password:""});
            }catch(e){
        console.log(e.message);
        setExists(e.response.data.message);
       
    }
}   
    
    // const login=()=>{
    //     navigate("/login");
    // }
     
        
    
    return(
        <>
        <form action="" onSubmit={handleSubmit} className='form'>
            <h2 className='heading'>Sign Up!</h2>

            {
                    exists&&(
                        <p className="para bg-danger">{exists}</p>
                    )
                    
                }
                {
                    details&&(
                        <p className="para bg-danger">Enter the details</p>
                    )
                }
            <label htmlFor="name">Name</label>
            <input value={data.name} type="text"   className="input" onChange={Input} name="name" />
            <label htmlFor="email">Email</label>
            <input value={data.email} type="email" className="input" onChange={Input} name="email"/>
            <label htmlFor="password">Password</label>
            <input value={data.password} type="password" className="input"  onChange={Input} name="password"/>
            <input type="submit" className="submit" value="Submit" />
          {/* <button onClick={login}>Already have an account</button> */}
        </form>
        </>
    )
}

export default Register;


