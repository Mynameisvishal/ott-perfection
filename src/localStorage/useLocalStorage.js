import { useState, useEffect } from 'react';

function getSavedMovie(key, initialValue) {
    const savedMovie = JSON.parse(localStorage.getItem(key));
    if (savedMovie) {
        return savedMovie
    } 
    return initialValue
}

export default function useLocalStorage(key, initialValue) {
    const [movie, setMovie] = useState(() => {
        return getSavedMovie(key, initialValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(movie))
    }, [movie])

    return [movie, setMovie]
}