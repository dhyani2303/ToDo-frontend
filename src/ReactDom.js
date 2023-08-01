
import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Task from './Task';
import Register from './Register';

export const userContext=createContext();
const ReactDom = () => {
    const [activeUser, setActiveUser] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = () => {
        if ('activeUser' in localStorage) {
            const log = JSON.parse(localStorage.getItem('activeUser'));
            console.log(log);
            setActiveUser(log);
        }
    }
    return (
        <>
            <BrowserRouter>
            <userContext.Provider value={[activeUser, setActiveUser]}>
                        <Routes>

                            <Route path='/register' element={<Register/>}/>
                          
                            {
                                Object.keys(localStorage).length === 0 ? (
                                    <>
                                        <Route path='login' element={<Login />} />
                                        <Route path='*' element={<Navigate to={'/login'} />} />

                                    </>
                                ) : (
                                    <>
                                    <Route path='/' element={<Task />} />
                                    <Route path="*" element={<Navigate to={'/'}/>}/>
                                    </>
                                )

                             }
                        </Routes>
                        </userContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default ReactDom;