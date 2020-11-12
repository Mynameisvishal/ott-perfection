import React, { useState,useEffect } from 'react';
import "./Register.css";
import { Button, Form, Grid,Image,Message,Segment } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../images/MovieBuzzLogo.png';

function Register(props) {
    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('location') === 'home') {
            history.push('/');
        }
    }, []);

    const handleChange = (event) => {
        if (event.target.name === "username") {
            setUsername(event.target.value);
        } else if (event.target.name === "mail"){
            setMail(event.target.value);
        } else if (event.target.name === 'password') {
            setPassword(event.target.value);
        } else {
            setConfirmPassword(event.target.value);
        }
    }

    const onSubmit = () => {
        if (mail === "" || username === "" || password === "" || confirmPassword === ""){
            setErrors("Fill in all Fields.")

        } else if (password !== confirmPassword) {
            setErrors("Password do not match.");

        } else if (password.length < 6 && confirmPassword.length < 6) {
            setErrors('Password length should be minimum 6 characters');    

        } else {

            const user = {
                mail: mail,
                password: password,
            }

            const users = JSON.parse(localStorage.getItem('users'));
            if (users) {
                const currentUser = { ...users, ...user };
                localStorage.setItem('users', JSON.stringify(currentUser));    
                setUsername('');
                setMail('');
                setPassword('');
                setConfirmPassword('');
                localStorage.setItem('location', 'home');
                props.history.push('/');
            } else { 
                localStorage.setItem('users', JSON.stringify(user));
                setUsername('');
                setMail('');
                setPassword('');
                setConfirmPassword('');
                localStorage.setItem('location', 'home');
                props.history.push('/');
            }

        }
    }
    return (
        <React.Fragment>
            
            <Image className="register__logo" src={logo} alt="logo"/>
           
            <Grid textAlign="center" verticalAlign="middle" className="register__grid">
                <Grid.Row style={{ minWidth: 450, marginTop: 0 }}>
                    <Form onSubmit={()=>{onSubmit()}}>
                        <Segment stacked>

                            <h1 className="Register__title">Register to Movie Buzz</h1>
                            <Form.Input
                                
                                name="username"
                                icon="user"
                                iconPosition="left"
                                placeholder="Username"
                                onChange={handleChange}
                                value={username}
                                type="text"
                                />
                            <Form.Input
                                name="mail"
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email"
                                onChange={handleChange}
                                value={mail}
                                type="email"
                                />
                            <Form.Input
                                fluid
                                name="password"
                                icon="key"
                                iconPosition="left"
                                placeholder="Password"
                                onChange={handleChange}
                                value={password}
                                type="password"
                            />
                            <Form.Input
                                fluid
                                name="confirmPassword"
                                icon="key"
                                iconPosition="left"
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                value={confirmPassword}
                                type="password"
                                />
                            <Button color="green" name="submit" onClick={()=>{onSubmit()}}>
                                Submit
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Row>

                <Grid.Row>
                    <Segment>
                        { errors ?
                            
                            <Message error>
                                {errors}
                            </Message>:""
                        }
                        <h5>Aldready have an account <Link to="/login">Click here.</Link></h5>
                    </Segment>

                </Grid.Row>
            </Grid>
            
        </React.Fragment>
    )
}

export default Register
