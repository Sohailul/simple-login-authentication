import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import app from "./firebase.init";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameBlur = event =>{
    setName(event.target.value);
  }

  const handleEmailBlur = event => {
    setEmail(event.target.value);
  }

  const handlePasswordBlur = event => {
    setPassword(event.target.value);
  }

  const handleRegisteredChange = event => {
    setRegistered(event.target.checked);
  }

  const handleFormSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if(registered){
      signInWithEmailAndPassword(auth, email, password)
          .then(result => {
            const user = result.user;
            console.log(user);
          })
          .catch(error => {
            console.log(error);
            setError(error.message);
          });
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setEmail('');
        setPassword('');
        setUserName('');
        verifyEmail();
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      })
    }
    event.preventDefault();
  }

  const handlePasswordReset = () =>{
    sendPasswordResetEmail(auth, email)
    .then(()=>{
      console.log("Password Reset Email Sent!");
    })
    .catch((error)=>{
      console.log(error);
      setError(error.message);
    })
  }
  const setUserName = ()=>{
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(()=>{
      console.log("Updating name");
    })
    .catch(error=>{
      setError(error.message);
      console.log(error);
    })
  }

  const verifyEmail = ()=>{
    sendEmailVerification(auth.currentUser)
    .then(()=>{
      console.log("Verification email sent");
    })
  }


  return (
    <div className="registration w-50 mx-auto mt-5">
      <h2 className="text-primary">Please {registered ? 'Login' : 'Register'} !!</h2>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        { !registered && 
          <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control onBlur={handleNameBlur} type="text" placeholder="Enter Name" required/>
        </Form.Group>
        }
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Control.Feedback type="invalid">
          Please provide a valid email.
        </Form.Control.Feedback>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required/>
        </Form.Group>
        <Form.Control.Feedback type="invalid">
          Please provide a valid Password.
        </Form.Control.Feedback>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check onClick={handleRegisteredChange} type="checkbox" label="Already Registered?" />
        </Form.Group>
        <Button onClick={handlePasswordReset} variant="link">Forget Password?</Button>
        <p className='text-danger'>{error}</p>
        <Button variant="primary" type="submit">
          {registered ? 'Login' : 'Register'}
        </Button>
      </Form>
    </div>
  );
}

export default App;
