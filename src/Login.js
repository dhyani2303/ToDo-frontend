import { React, useContext, useState } from "react";
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import { userContext } from "./ReactDom";
const Login = () => {
//    const navigate = useNavigate();
   const [activeUser, setActiveUser] = useContext(userContext);
   const [exists,setExists]=useState("");
   const[details,setDetails]=useState(false);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });



    const Input = (e) => {
        const { name, value } = e.target;
        // console.log(email,password);
        setExists("");
        setDetails(false);
        console.log(name, value);
        setUser({ ...user, [name]: value })
    }
    //  console.log(user);

   
     

        const handleSubmit = async (e) => {
            e.preventDefault();
            user.email=user.email.toLowerCase();
            const { email, password } = user;
            console.log(email,password);
    
            try {
                if (email && password) {
                    try {
                        const login = await axios({
                            method: "post",
                            url: "http://localhost:8800/api/auth/signin",
                            data: {
                                email, password
                            }
                        })
                         console.log(login);
                        if(login.data){
                           localStorage.setItem("activeUser",JSON.stringify(login.data))
    						// alert(login.data.msg);
                           setActiveUser(login.data);
                          
                        }
                    }catch (e) {
                        
                        console.log(e.response.data);
                        setExists(e.response.data.message);
                    }
            }
            else{
                setDetails(true);
            }
            } catch(e){
                console.log(e);
                
        }
    
    }
    // const signup=()=>{
    //     navigate("/register");
    // }



return (
            <>
                <form action="" className="form" onSubmit={handleSubmit}>
                <h2 className='heading'>Sign In!</h2>
                < div>
         {
                exists &&(
                    <p className='para'>{exists}</p>
                )
            }
             {
                    details&&(
                        <p className="para">Enter the details</p>
                    )
                }
                </div>
                    <label htmlFor="email">Email</label>
                    <input type="email" className="input" value={user.email} onChange={Input} name="email" />
                    <label htmlFor="password">Password</label>
                    <input type="password" className="input" value={user.password} onChange={Input} name="password" />
                    <input type="submit" className="submit"/>
                    {/* <input type="button" className="submit" placeholder="Don't have an account" onClick={signup}/> */}
                </form>

            </>
        )
    }

    export default Login;