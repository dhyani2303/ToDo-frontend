import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { userContext } from './ReactDom';

const ToDo = () => {


const [user, setUser] = useContext(userContext);
    const [todo, setTodo] = useState({
        task: ""
    })
    const [read, setRead] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    //  console.log(user);
    const Input = (e) => {
        const { name, value } = e.target;
        // console.log(name,value);
        setTodo({ ...todo, [name]: value })
    }
   
    const fetchData = async () => {
        try {
            // console.log(user.id);
          const res = await axios.get('http://localhost:8800/api/todo', {
          
            params: { userid: user.id }
          });
        //   console.log("Data fetched:", res.data.data);
          setRead(res.data.data);
        }
         catch (err) {
          console.log("Error while fetching data:", err);
          setRead([]);
        }
      };


    


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (todo.task) {
            setRead([...read, { task: todo.task }]);
        }
        try {
            const task = await axios({
                method: "post",
                url: "http://localhost:8800/api/todo",
                data: { userid: user.id, task: todo.task }
            })
            // console.log(task);
            
        }
        catch (e) {
            console.log(e);
        }  
        //   console.log(read);
        fetchData();
        setTodo({ task: "" });
    }

    const deletetask=async(key)=>{
        try{
            //  console.log("hello",key);
            const deletedtask= await axios({
                method: "delete",
                url: "http://localhost:8800/api/todo",
                 params: { _id:key }
            })
            console.log(deletedtask);
             fetchData();

        }catch(e){
            console.log(e);

        }

    }

    const toggleList=(e)=>{
        if(e.target.tagName==="LI"){
            e.target.classList.toggle("checked");
        }
            
    }




    return (
        <>
        <div className="container">
            <form action="">
            
           <div className="to-do">
                <h2>My Todo-s  <i className="fa-solid fa-square-check"></i></h2>
            <div class="row">
                <input type="text"  className="inputtask" placeholder="Add Your Task here!" value={todo.task} onChange={Input} name="task"/>
                <button onClick={handleSubmit} className='btn'>Add</button>
            </div>
            <div>
            <ul onClick={toggleList}>
            {read.length > 0 ? (
                 
                  

                      read.map((element,key) => {
                          return (
                              <li key={key}>{element.task}
                              <span onClick={()=>deletetask(element._id)}>&times;</span>
                              </li>

                          )
                      })
            ):(
                <li>No task found</li>
            )}
            
              
                        


                
                </ul>
            </div>
            </div>
            


            </form>
            </div>
           

           
        </>
    )
}

export default ToDo;