import React,{useReducer,useState,useEffect} from 'react';
import "./App.css";
import Banner from './Component/Banner';
import Navbar from './Component/Navbar';
import { movies } from './request';
import Row from "./Component/Row";
import useLocalStorage from './localStorage/useLocalStorage';

export const ACTIONS = {
  ADD_RATING: "Add-rating",
  FILTER:"filter"
}

function reducer(handler, action) {
  switch (action.type) {
    // case ACTIONS.FILTER:
    //   return [ ...handler,setFilter(action.payload.action, action.payload.crime, action.payload.comedy, action.payload.romantic)];
    case ACTIONS.ADD_RATING:
      return [...handler, addRating(action.payload.rating, action.payload.movie, action.payload.setDefaultMovies,action.payload.defaultMovies)];
    default:
      return handler
  }
}

// function setFilter(action, crime, comedy, romantic) {
//   return { action: action, crime: crime, comedy: comedy, romantic: romantic };
// }

function addRating(rating, movie, setDefaultMovies, defaultMovies) {
  defaultMovies[movie.callby].rating = rating;
  localStorage.setItem('Movies', JSON.stringify(defaultMovies));
  return setDefaultMovies(defaultMovies);
}

export default function App() {
  const [handler, dispatch] = useReducer(reducer, []);
  const [defaultMovies, setDefaultMovies] = useLocalStorage('Movies', movies);
  // const [inside, getinside] = useState(true);
  const [sorting, setSorting] = useState('');
  const [action, setActionB] = useState(true);
  const [comedy, setComedyB] = useState(true);
  const [crime, setCrimeB] = useState(true);
  const [romantic, setRomanticB] = useState(true);
  const [english, setEnglish] = useState(false);
  const [hindi, setHindi] = useState(false);
 
  useEffect(() => {
    console.log(handler);
    console.log(handler.action);
  },[])
  const genrelist = (genre) => {
    var currentGenreMovies = [];
    for (const [key, value] of Object.entries(defaultMovies)) {
        value.genre.map((g1) => (
          (g1 === genre) ?    
            currentGenreMovies.push(value)
            : ""    
        ))
    }
    if (sorting === "recent") {
      currentGenreMovies.sort((movie1, movie2) => {
        return parseInt(movie2.addedTime)- parseInt(movie1.addedTime)
      });
    }
    if (sorting ==="rating") {
      currentGenreMovies.sort((movie1, movie2) => {
        return parseInt(movie2.rating) - parseInt(movie1.rating)
      });
    }
    if (english) {
      var sortedlang = [];
      currentGenreMovies.map((movie) => {
        if (movie.language === "English") {
          sortedlang.push(movie);
        }
      })
      return sortedlang
    }
    if (hindi) {
       sortedlang = [];
      currentGenreMovies.map((movie) => {
        if (movie.language === "Hindi") {
          sortedlang.push(movie);
        }
      })
      return sortedlang
    }
    return currentGenreMovies
     
  };
  

  return (
    <div>
      <Navbar setSorting={setSorting} setEnglish={setEnglish} setHindi={setHindi} setActionB={setActionB} setComedyB={setComedyB} setCrimeB={setCrimeB} setRomanticB={setRomanticB}/>
      <Banner />
      {action ? <Row title={"Action Movie"} defaultMovies={defaultMovies} setDefaultMovies={setDefaultMovies} fetchURL={genrelist("Action Movie")} dispatch={dispatch}
        handler={handler} Largeone /> :""}
      {romantic ? <Row title={"Romantic Movie"} defaultMovies={defaultMovies} setDefaultMovies={setDefaultMovies} fetchURL={genrelist("Romantic Movie")} dispatch={dispatch}
        handler={handler} /> : ""}
      {comedy ? <Row title={"Comedy Movie"} defaultMovies={defaultMovies} setDefaultMovies={setDefaultMovies} fetchURL={genrelist("Comedy Movie")} dispatch={dispatch}
        handler={handler} /> : ""}
      { crime ? <Row title={"Crime Movie"} defaultMovies={defaultMovies} setDefaultMovies={setDefaultMovies} fetchURL={genrelist("Crime Movie")} dispatch={dispatch}
        handler={handler} /> : ""}

   </div>
  )
}


