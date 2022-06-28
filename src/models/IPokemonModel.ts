export interface IPokemonModel {
    id: number;
    name: string;
    url: string;
    urlImage?: string;
    height?: string;
    weight?: string;
    types?: any[];
    abilities?: any[];
    stats?: any;
    color?: string;
    eggGroups?: string[];
    habitat?: string;
}
