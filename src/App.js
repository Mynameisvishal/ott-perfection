import React from 'react';
import "./App.css";
import Banner from './Component/Banner';
import Navbar from './Component/Navbar';
import { movies } from './request';
import Row from "./Component/Row";

function App() {

  const genrelist = (genre) => {
    var currentGenreMovies = [];
    var storedMovies = localStorage.getItem('Movies')
    if (!storedMovies) {
      localStorage.setItem('Movies', JSON.stringify(movies))
      storedMovies = JSON.stringify(movies)
    }
    storedMovies = JSON.parse(storedMovies)
    for (const [key, value] of Object.entries(storedMovies)) {
      value.genre.map((g1, key) => (
        (g1 === genre) ?
            
          currentGenreMovies.push(value)
          : ""
          
      ))
    }
    return currentGenreMovies
     
  };
  

  return (
    <div>
      <Navbar />
      <Banner />
      <Row title={"Action Movie"} fetchURL={genrelist("Action Movie")} Largeone />
      <Row title={"Romantic Movie"} fetchURL={genrelist("Romantic Movie")} />
      <Row title={"Comedy Movie"} fetchURL={genrelist("Comedy Movie")} />
      <Row title={"Crime Movie"} fetchURL={genrelist("Crime Movie")} />

   </div>
  )
}

export default App
