import Link from 'next/link';
import { useRouter } from 'next/router'
import { css } from 'office-ui-fabric-react';
import { useState, useEffect, createRef } from 'react';
import Header from '../../src/components/Header/Header';
import { PokemonsDataProvider } from '../../src/services/PokemonsDataProvider';
import styles from "./PokemonDetalhes.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'reactstrap';
import { IPokemonModel } from '../../src/models';
import { Radar } from "react-chartjs-2";
function PokemonDetalhes() {
    const router = useRouter()
    const pokemonName = router.query['pokemonName'];
    const [pokemon, setPokemon] = useState<IPokemonModel>(null)
    const [isMobile, setIsMobile] = useState<boolean>(false)

    useEffect(() => {
        if (router.isReady) {
            handleWindowSizeChange();
            if (pokemonName != null && pokemonName != "") {
                getPokemonByName(pokemonName);
            }
        }
    }, [router.isReady]);

    const getPokemonByName = async (name) => {
        var nameFilter = name.toLowerCase();
        var pokemon = await PokemonsDataProvider.getByName(nameFilter);
        setPokemon(pokemon);
        console.log(pokemon)
    }

    const handleWindowSizeChange = async () => {
        setIsMobile(window.innerWidth < 768 ? true : false);
    }

    return (
        <div>
            <Header />
            <div className={styles.page}>
                <div className={css('pt-4 px-4', styles.container)}>
                    {pokemon ?
                        <>
                            <div className='row'>
                                <div className='col-sm-12'>
                                    <Link href="/pokedex">
                                        <Button color='secondary' className='mb-2 btn-sm' >Back</Button>
                                    </Link>
                                    <hr />
                                </div>
                            </div>
                            <div className='row'>
                                <h1 className={css('text-decoration-none', styles.name)}>{`${pokemon.name}`}</h1>
                                <Card className={css("col-sm-12 col-lg-3 border-0 mb-3", styles.card)}>
                                    <div className={css("rounded row d-flex", styles.divPokemon)}>
                                        <div className={css('col-sm-12 col-md-4 d-flex align-items-sm-center', isMobile ? styles.radarMobile : null)}>
                                            <Radar
                                                data={pokemon.stats}
                                                width={400}
                                                height={400}
                                            />
                                        </div>
                                        <div className='col-sm-12 col-md-5'>
                                            <img
                                                className={styles.img}
                                                src={pokemon.urlImage}
                                                width={450}
                                                height={450}
                                            />
                                        </div>
                                        <div className={css('col-sm-12 col-md-3', isMobile ? styles.bioMobile : styles.bioBrowser)}>
                                            <div className={isMobile ? '' : 'ps-4'}>
                                                <div className={isMobile ? 'row ps-3' : 'row'}>
                                                    <div className='col-sm-12 p-0'>
                                                        <span className='fw-bolder'>Types:</span>
                                                        <span>
                                                            {pokemon.types && pokemon.types.length > 0 && pokemon.types.map((item, index) => {
                                                                return index + 1 == pokemon.types.length ? <span > {item.type.name} </span> : <span > {item.type.name}, </span>
                                                            })}
                                                        </span>
                                                    </div>
                                                    <div className='col-sm-12 p-0'>
                                                        <span className='fw-bolder'>Abilities:</span>
                                                        <span>
                                                            {pokemon.abilities && pokemon.abilities.length > 0 && pokemon.abilities.map((item, index) => {
                                                                return index + 1 == pokemon.abilities.length ? <span > {item.ability.name} </span> : <span > {item.ability.name}, </span>
                                                            })}
                                                        </span>
                                                    </div>
                                                    <div className='col-sm-12 p-0'>
                                                        <span className='fw-bolder'>Height:</span>
                                                        <span> {pokemon.height}</span>
                                                    </div>
                                                    <div className='col-sm-12 p-0'>
                                                        <span className='fw-bolder'>Weight:</span>
                                                        <span> {pokemon.weight}</span>
                                                    </div>
                                                    <div className='col-sm-12 p-0'>
                                                        <span className='fw-bolder'>Color:</span>
                                                        <span> {pokemon.color}</span>
                                                    </div>
                                                    <div className='col-sm-12 p-0'>
                                                        <span className='fw-bolder'>Egg groups:</span>
                                                        <span>
                                                            {pokemon.eggGroups && pokemon.eggGroups.length > 0 && pokemon.eggGroups.map((item, index) => {
                                                                return index + 1 == pokemon.eggGroups.length ? <span > {item} </span> : <span > {item}, </span>
                                                            })}
                                                        </span>
                                                    </div>
                                                    <div className='col-sm-12 p-0'>
                                                        <span className='fw-bolder'>Habitat:</span>
                                                        <span> {pokemon.habitat}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                        </>
                        :
                        <p>Não foi possível obter os detalhes deste pokemon, contate um administrador!</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default PokemonDetalhes