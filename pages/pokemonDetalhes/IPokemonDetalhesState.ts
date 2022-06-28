import { IPokemonModel } from "../../src/models";

export interface IPokemonDetalhesState {
    pokemon: IPokemonModel;
    isLoading: boolean;
    width: number;
    isMobile: boolean;
}
