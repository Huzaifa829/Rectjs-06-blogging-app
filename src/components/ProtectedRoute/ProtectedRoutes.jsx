import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../../configs/FirebaseMethod';
import { useNavigate } from 'react-router-dom';
import loginerrorImg from '../../assets/loginerror.png'

function ProtectedRoutes(props) {
    const { component } = props
    const [ShowComponent, setShowComponent] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
            
                const uid = user.uid;
                console.log(uid);
                setShowComponent(true)
                
                // ...
            } else {
                navigate('/authForm')
                setShowComponent(false)
            }
        });


    }, [])

    return (
        
            ShowComponent ? component : <img src={loginerrorImg} className='text-center' />
        
    )
}

export default ProtectedRoutes