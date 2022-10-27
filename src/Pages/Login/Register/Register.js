import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../../hooks/useTitle';



const Register = () => {
    const { createUser, profile,emailVerification } = useContext(AuthContext)
    const [error, setError] = useState('')
     const[accepted,setAccepted]=useState(false)
     
     useTitle('Register')
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const photoURL = form.photoURL.value
        console.log(email, photoURL);

        createUser(email, password)
            .then(result => {
                const user = result.user
                console.log(user);
                setError('')
                form.reset()
                profile(name, photoURL)
                    .then(() => {
                        // Profile updated!
                        // ...
                    })
                    .catch(error => setError(error.message))
                    handleEmailVerification()
                    toast.success('please verify your email address')
            })
            .catch(error => setError(error.message))

    }
    const handleEmailVerification=()=>{
        
        emailVerification()
        .then(()=>{})
        .catch(error=>console.error(error.message))
    }
    const handleAccepted=(e)=>{
           setAccepted(e.target.checked)
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

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" onClick={handleAccepted}
                label={<>Accept <Link to='/terms'>terms and conditions</Link></>} />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!accepted}>
                Register
            </Button>
            <Form.Text className="text-danger">
                {error}
            </Form.Text>
        </Form>
    );
};

export default Register;