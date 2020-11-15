import React, { useState, useEffect } from 'react';
import "./Login.css";
import logo from '../images/MovieBuzzLogo.png';
import { Button, Form, Grid,Image, Input, Message, Segment } from 'semantic-ui-react';
import { Link,useHistory } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('location') === 'home') {
            history.push('/');
        }
    }, []);

    const onSubmit = () => {
        const users = JSON.parse(localStorage.getItem('users'));
        if (users) {
            if (password ==='' && email === '') {
                setErrors('Enter all fields.');
            } else {
                if (formValid()) {
                    setEmail('');
                    setPassword("");
                    localStorage.setItem('location', 'home');
                    history.push("/");
                } else {
                    setErrors("Enter a valid mail and password");
                }
            }
        } else {
            setErrors('You are not Registered.');
            setEmail('');
            setPassword("");
        }
    }
    const formValid = () => {
        const users = JSON.parse(localStorage.getItem('users'));
        for (const [key, value] of Object.entries(users)) {
            if (value.mail === email && value.password === password) {
                return true;
            }
        }
        return false;
    }

    return (
        <div>
            <Image className="register__logo" src={logo} alt="logo"/>
            <Grid textAlign="center" verticalAlign="middle" className="login__grid">
                    <div>
                        <h1 style={{color:'white'}}>LOGIN Form</h1>
                        <Form className="login__flex"> 
                            <Input className="login__form"                     
                                type="email"
                                value={email}
                                placeholder="Enter mailid"
                                onChange={(e) => setEmail(e.target.value)} />
                            <Input className="login__form"
                                type="password"
                                value={password}
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)} />
                        </Form>
                    </div>
                    <div className="login__buttons">
                        <Button color="green" onClick={onSubmit} >
                            Login
                        </Button>
                        <Button color="red">
                            Forgot password
                        </Button>
                    </div>
            </Grid>
            <Segment className="login__segment">
                {
                    errors?
                    <Message error>
                    {errors}
                </Message>:""
                }
                Don't have an account <Link to="/register">Register here.</Link>
            </Segment>
        </div>
    )
}

export default Login
