import React, { useEffect, useState } from 'react';
import Button from './components/Button';
import Header from './components/Header';
import ListPokeCard from './components/ListPokeCard';
import Loader from './components/Loader';
import { FetchData, GetURL } from './services/api';
import './styles/global.scss'

interface Data {
    next: string;
    previous: string;
    results: [];
}
interface ResultsData {
    name: string;
    url: string;
}

function App() {
    //Hook para Guardar os Pokémons
    const [AllPokemon, setAllPokemon] = useState([])
    const [next, setNext] = useState('');
    const [previous, setPrevious] = useState('');
    const [loading, setLoading] = useState(true);

    const GetAllPokemon = async (array: []) => {
        let _pokedata: any = await Promise.all(array.map(async (item: ResultsData) => {
            let dataurl = await GetURL(item.url)
            return dataurl;
        }))
        setAllPokemon(_pokedata)
        setLoading(true);
    }
    useEffect(() => {
        const fecthAPI = async () => {
            let data: Data = await FetchData();
            setNext(data.next)
            setPrevious(data.previous)
            await GetAllPokemon(data.results)
        }
        fecthAPI();
    }, [])
    const handleNext = async () => {
        setLoading(false)
        const response: Data = await FetchData(next)
        await GetAllPokemon(response.results)
        setNext(response.next);
        setPrevious(response.previous);
    }
    const handlePrevious = async () => {
        if (previous) {
            setLoading(false)
            const response: Data = await FetchData(previous)
            await GetAllPokemon(response.results)
            setNext(response.next);
            setPrevious(response.previous);
        }
    }
    return (
        <div className="App">
            <Header />
            <Button next={handleNext} previous={handlePrevious} />
            {!loading ? <Loader /> : <ListPokeCard data={AllPokemon} />}
        </div>
    );
}
export default App;
