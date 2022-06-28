import * as React from 'react';
import Header from '../../src/components/Header/Header';
import { PokemonsDataProvider } from '../../src/services/PokemonsDataProvider';
import { IPokedexProps } from './IPokedexProps';
import { IPokedexState } from './IPokedexState';
import styles from "./Pokedex.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Input } from 'reactstrap';
import "react-widgets/styles.css";
import { css } from 'office-ui-fabric-react';
import { DropdownList } from 'react-widgets/cjs';
import PokemonItem from '../../src/components/Pokemon/PokemonItem';

export default class Pokedex extends React.Component<IPokedexProps, IPokedexState> {

  constructor(props: IPokedexProps) {
    super(props);

    this.state = {
      pokemons: [],
      page: 1,
      next: "",
      totalPages: 0,
      isLoading: true,
      filterNameValue: 'Pesquise pelo nome',
      allPokemonsName: [],
      width: null,
      isMobile: false
    };
  }

  public async componentDidMount(): Promise<void> {
    await this.handleWindowSizeChange();
    const { page } = this.state;
    await this.getPokemons(null, page, 24);
    let pagedPokemons = await PokemonsDataProvider.get(null, page, 24)
    var totalPages = Math.ceil(pagedPokemons.count / 24);
    var allPokemonsName = ["Pesquise pelo nome"];
    var arrAllPokemonsName = await PokemonsDataProvider.getAllPokemonsName(pagedPokemons.count);
    await Promise.all(arrAllPokemonsName.map((pokemon) => {
      allPokemonsName.push(pokemon);
    }))
    this.setState({ totalPages, allPokemonsName })
  }

  getPokemons = async (next, page, take) => {
    let items = await PokemonsDataProvider.get(next, page, take)
    this.setState({ pokemons: items.pokemons, next: items.next, page, isLoading: false });
  }

  prevPokemons = async (currentPage) => {
    var next = null;

    if (currentPage != 1) {
      var offset = (currentPage - 1) * 24;
      next = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${24}`;
    }

    this.setState({ isLoading: true }, async () => {
      await this.getPokemons(next, currentPage, 24);
    })
  }

  nextPokemons = async (currentPage) => {
    const { next } = this.state;
    this.setState({ isLoading: true }, async () => {
      await this.getPokemons(next, currentPage, 24);
    })
  }

  backFirstPage = async () => {
    await this.getPokemons(null, 1, 24);
    window.scrollTo(0, 0);
  }

  filterName = async (name) => {
    if (name == "Pesquise pelo nome") {
      await this.getPokemons(null, 1, 24);

      let pagedPokemons = await PokemonsDataProvider.get(null, 1, 24)
      var totalPages = Math.ceil(pagedPokemons.count / 24);
      this.setState({ totalPages })
    } else {

      var nameFilter = name.toLowerCase();
      var pokemon = await PokemonsDataProvider.getByName(nameFilter);
      var pokemons = [];
      pokemons.push(pokemon);
      this.setState({ pokemons, next: '', page: 1, isLoading: false, filterNameValue: name, totalPages: 1 });
    }

  }

  handleWindowSizeChange = async () => {
    console.log(window.innerWidth)
    console.log(window.innerWidth < 768 ? true : false)
    this.setState({
      width: window.innerWidth,
      isMobile: window.innerWidth < 768 ? true : false
    });
  }

  public render(): React.ReactElement<IPokedexProps> {
    const { pokemons, page, isLoading, totalPages, filterNameValue, allPokemonsName, isMobile } = this.state;

    return (
      <>
        <Header />
        <div className={styles.page}>
          <div className={css('pt-4 px-4', styles.container)}>
            <div className={css('row mb-4 w-100 rounded', styles.filtros)}>
              <div className='col-sm-12 col-md-4'>
                <DropdownList
                  placeholder='Pesquise pelo nome'
                  defaultValue={filterNameValue}
                  data={allPokemonsName}
                  onChange={this.filterName}
                />
              </div>
            </div>
            <div className={css('row mb-4 w-100', styles.pokemons)}>
              {!isLoading ?
                pokemons && pokemons.length > 0 ?
                  pokemons.map((pokemon) => (
                    <PokemonItem pokemon={pokemon} />
                  ))
                  :
                  <p>
                    Nenhum pokemon encontrado!
                  </p>
                :
                <p>
                  Carregando...
                </p>
              }

              {isMobile ?
                <div className='col-sm-12 col-md-4 col-lg-3'>
                  <div className='col-sm-10 col-md-10'>
                    <div className='row'>
                      <Button color='secondary' disabled={page == 1 ? true : false} className='mb-2' onClick={this.backFirstPage} >Back to first page</Button>
                      <Button color='primary' disabled={page == 1 ? true : false} className='mb-2' onClick={() => { this.prevPokemons(page - 1) }} >Prev</Button>
                      <Button color='primary' disabled={page == totalPages ? true : false} className='mb-2' onClick={() => { this.nextPokemons(page + 1) }} >Next</Button>
                    </div>
                  </div>
                  <div className='col-sm-2 col-md-2 text-end'>
                    <span>Page ({page} of {totalPages})</span>
                  </div>
                </div>
                :
                <div className='row d-flex justify-content-between'>
                  <div className='col-sm-10 col-md-10'>
                    <div>
                      <Button color='secondary' disabled={page == 1 ? true : false} className='mb-2 me-2' onClick={this.backFirstPage} >Back to first page</Button>
                      <Button color='primary' disabled={page == 1 ? true : false} className='mb-2 me-2' onClick={() => { this.prevPokemons(page - 1) }} >Prev</Button>
                      <Button color='primary' disabled={page == totalPages ? true : false} className='mb-2' onClick={() => { this.nextPokemons(page + 1) }} >Next</Button>
                    </div>
                  </div>
                  <div className='col-sm-2 col-md-2 text-end'>
                    <span>Page ({page} of {totalPages})</span>
                  </div>
                </div>
              }

            </div>
          </div>
        </div>
      </>

    );
  }
}
