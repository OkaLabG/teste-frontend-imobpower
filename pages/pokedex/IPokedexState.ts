import { IPokemonModel } from "../../src/models";

export interface IPokedexState {
    pokemons: IPokemonModel[];
    page: number;
    totalPages: number;
    next: string;
    isLoading: boolean;
    filterNameValue: string;
    allPokemonsName: string[];
    width: number;
    isMobile: boolean;
}
