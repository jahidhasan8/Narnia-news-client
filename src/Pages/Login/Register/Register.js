import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { getAuth } from "firebase/auth";

const auth = getAuth();
const Register = () => {
    const {createUser,profile}=useContext(AuthContext)

    const handleSubmit=(e)=>{
        e.preventDefault()
        const form=e.target 
        const name=form.name.value 
        const email=form.email.value 
        const password=form.password.value
        const photoURL=form.photoURL.value 
        console.log(email,photoURL);

        createUser(email,password)
        .then(result=>{
            const user=result.user
            console.log(user);

            profile(name,photoURL)
              .then(() => {
                // Profile updated!
                // ...
              })
              .catch(error=>console.error(error.message))

            form.reset()

            
        })
        .catch(error=>console.error(error.message))
        
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name='name' placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>photo URL</Form.Label>
                <Form.Control type="text" name="photoURL" placeholder="photo URL" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" required />
               
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" required />
            </Form.Group>
           
            <Button variant="primary" type="submit">
                Register
            </Button>
            <Form.Text className="text-muted">
                   
                </Form.Text>
        </Form>
    );
};

export default Register;