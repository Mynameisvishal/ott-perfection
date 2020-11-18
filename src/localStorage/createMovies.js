import { useEffect } from 'react';

export default function CreateMovies(value) {
    useEffect(() => {
        value(JSON.parse(localStorage.getItem('Movies')))
    }, []);
}