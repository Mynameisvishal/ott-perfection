import React,{useReducer,useState,useEffect} from 'react';
import "./App.css";
import Banner from './Component/Banner';
import Navbar from './Component/Navbar';
import { movies } from './request';
import Row from "./Component/Row";
import useLocalStorage from './localStorage/useLocalStorage';

export const ACTIONS = {
  ADD_RATING: "Add-rating",
}

function reducer(handler, action) {
  switch (action.type) {
    case ACTIONS.ADD_RATING:
      return [...handler, addRating(action.payload.rating, action.payload.movie, action.payload.setDefaultMovies,action.payload.defaultMovies)];
    default:
      return handler
  }
}

function addRating(rating, movie, setDefaultMovies, defaultMovies) {
  defaultMovies[movie.callby].rating = rating;
  localStorage.setItem('Movies', JSON.stringify(defaultMovies));
  return setDefaultMovies(defaultMovies);
}

export default function App() {
  const [handler, dispatch] = useReducer(reducer, []);
  const [defaultMovies, setDefaultMovies] = useLocalStorage('Movies', movies);
  const [sorting, setSorting] = useState('');
 
  const genrelist = (genre) => {
    var currentGenreMovies = [];
    for (const [key, value] of Object.entries(defaultMovies)) {
        value.genre.map((g1, key) => (
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
    return currentGenreMovies
     
  };
  

  return (
    <div>
      <Navbar setSorting={ setSorting}/>
      <Banner />
      <Row title={"Action Movie"} defaultMovies={defaultMovies} setDefaultMovies={setDefaultMovies} fetchURL={genrelist("Action Movie")} dispatch={dispatch}
      handler={handler} Largeone />
      <Row title={"Romantic Movie"} defaultMovies={defaultMovies} setDefaultMovies={setDefaultMovies} fetchURL={genrelist("Romantic Movie")} dispatch={dispatch}
      handler={handler} />
      <Row title={"Comedy Movie"} defaultMovies={defaultMovies} setDefaultMovies={setDefaultMovies} fetchURL={genrelist("Comedy Movie")} dispatch={dispatch}
      handler={handler} />
      <Row title={"Crime Movie"} defaultMovies={defaultMovies} setDefaultMovies={setDefaultMovies} fetchURL={genrelist("Crime Movie")} dispatch={dispatch}
      handler={handler} />

   </div>
  )
}


