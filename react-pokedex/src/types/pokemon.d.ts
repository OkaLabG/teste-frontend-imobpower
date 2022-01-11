
export interface Pokemon {
    id: number;
    name: string;
    weight: number;
    types: Types[]
    sprites: {
        front_default: string;
        front_female: string;
    };
};
export interface Types {
    type: {
        name: string;
    }
}
