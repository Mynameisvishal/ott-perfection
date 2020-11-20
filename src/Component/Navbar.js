import React,{useState,useEffect} from 'react'
import './Navbar.css';
import { Button, Image } from "semantic-ui-react";
import logo from '../images/HomeLogo.png';
import { useHistory } from 'react-router-dom';
import Sort from './Sort';
import Filter from './Filter';

function Navbar({setSorting,setActionB,setComedyB,setCrimeB,setRomanticB,setEnglish,setHindi }) {
    const [show, setShow] = useState(false);
 
    // const [dispatchh, setDispatch] = useState({});
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
            <div className="nav__flex">
                {show ? <Sort setSorting={setSorting} /> : ""}
                <Filter show={show} setEnglish={setEnglish} setHindi={setHindi} setActionB={setActionB} setComedyB={setComedyB} setCrimeB={setCrimeB} setRomanticB={setRomanticB}/>
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
