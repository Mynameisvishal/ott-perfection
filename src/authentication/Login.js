import React, { useState, useEffect } from 'react';
import "./Login.css";
import logo from '../images/MovieBuzzLogo.png';
import { Button, Form,Image, Input, Message } from 'semantic-ui-react';
import { Link,useHistory } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminMail, setAdminMail] = useState('');
    const [adminPass, setAdminPass] = useState('');
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

    const adminSubmit = () => {
        if (adminMail===''|| adminPass ==="") {
            setErrors('Fill in all fields in admin');
        }else if (adminMail === 'root@gmail.com' && adminPass === 'root123') {
            setAdminMail('');
            setAdminPass('');
            localStorage.setItem('location', 'home');
            localStorage.setItem('admin', 1);
            history.push("/");
        } else {
            setErrors('Enter a valid email and password');
        }
    }

    return (
        <React.Fragment>
            <Image className="register__logo" src={logo} alt="logo" />

            <div className="login__center">
                <div className="login__login">
                    <div className="login__sub">

                        <h1 style={{ color: 'white' }}>Subscriber Login</h1>
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
                        <div className="login__buttons">
                            <Button color="green" onClick={onSubmit} >
                                Login
                         </Button>
                            <Button color="red">
                                Forgot password
                         </Button>
                        </div>
                    </div>
                    <div className="login__admin">
                        <h1 style={{ color: 'white' }}>Admin login</h1>
                        <Form className="login__flex" onSubmit={adminSubmit}>
                            <Input className="login__form"
                                type="email"
                                value={adminMail}
                                placeholder="Enter mailid"
                                onChange={(e) => setAdminMail(e.target.value)} />
                            <Input className="login__form"
                                type="password"
                                value={adminPass}
                                placeholder="Enter Password"
                                onChange={(e) => setAdminPass(e.target.value)} />
                        </Form>
                        <div className="login__buttons">
                            <Button color="green" onClick={adminSubmit} >
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="login__message">
                    {
                        errors ?
                            <Message error>
                                {errors}
                            </Message> : ""
                    }
                    <Message>Don't have an account <Link to="/register">Register here.</Link></Message>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Login
