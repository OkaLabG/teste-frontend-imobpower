import { IPokemonModel } from "./IPokemonModel";

export interface IPagedPokemonModel {
    next: string;
    count: number;
    pokemons: IPokemonModel[];
}
