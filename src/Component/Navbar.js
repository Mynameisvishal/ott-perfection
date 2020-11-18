import React,{useState,useEffect} from 'react'
import './Navbar.css';
import { Button, Image } from "semantic-ui-react";
import logo from '../images/HomeLogo.png';
import { useHistory } from 'react-router-dom';
import Sort from './Sort';

function Navbar({setSorting}) {
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
            <div className={`${show && "nav__flex"}`}>
                {show ? <Sort setSorting={setSorting} />:""}
                <Button color="red" onClick={() => {
                    localStorage.removeItem('location');
                    localStorage.removeItem('admin');
                    history.push('/login');
                }}>Log out</Button>
            </div>
        </div>
    );
}

export default Navbar
