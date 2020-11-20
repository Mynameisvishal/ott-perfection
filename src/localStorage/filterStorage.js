import { useState, useEffect } from 'react';

function getFilter(key, initialValue) {
    const filterGenre = JSON.parse(localStorage.getItem(key));
    if (filterGenre) {
        return filterGenre
    } 
    return initialValue
}

export default function filterStorage(key, initialValue) {
    const [filter, setFilter] = useState(() => {
        return getFilter(key, initialValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(movie))
    }, [filter])

    return [filter, setFilter]
}