import React,{useState,useEffect} from 'react'
import './Navbar.css';
import { Button, Image } from "semantic-ui-react";
import logo from '../images/HomeLogo.png';
import { useHistory } from 'react-router-dom';

function Navbar() {
    const [show, setShow] = useState(false);
    const history = useHistory();
    
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 120) {
                setShow(true);
            } else setShow(false);
        });
        return () => {
            window.removeEventListener("scroll",()=>{});
        };  
    }, [])
    
    useEffect(() => {
        if (localStorage.getItem('location')!=="home") {
            history.push('/login');
        } 
    }, [])
    
    return (
        <div className={`navbar ${show && "nav__black"} `}>
            <Image src={logo} alt="MovieBuzz" />
            <Button color="red" onClick={() => {
                localStorage.removeItem('location');
                history.push('/login');
                }}>Log out</Button>
        </div>
    )
}

export default Navbar
