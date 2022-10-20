import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';


const Login = () => {
    const{signIn,setLoading}=useContext(AuthContext)
    const navigate=useNavigate()
    const[error,setError]=useState('')
     const location=useLocation();

      const from=location.state?.from?.pathname || '/'
    const handleSubmit=(e)=>{
       e.preventDefault()
       const form =e.target
       const email=form.email.value 
       const password=form.password.value 

       signIn(email,password)
       .then(result=>{ 
        const user=result.user 
        console.log(user)
        setError('')
        form.reset()
       if(user.emailVerified){
        navigate(from,{replace:true})
       }
       else {
        toast.error('your email is not verified,please verify your email ')
       }

       })
       .catch(error=>{
        setError(error.message)
       })

       .finally(()=>{
        setLoading(false);
       })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" required/>
               
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" required/>
            </Form.Group>
           
            <Button variant="primary" type="submit">
                Login
            </Button>
            <Form.Text className="text-danger">
                   {error}
                </Form.Text>
        </Form>
    );
};

export default Login;