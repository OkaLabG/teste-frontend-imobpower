import { Api } from "../api/Api";
import { IPokemonModel } from "../models";
import { IPagedPokemonModel } from "../models/IPagedPokemonModel";

export class PokemonsDataProvider {

    public static async get(nextResults, page, take): Promise<IPagedPokemonModel> {
        var data = await Api.get(nextResults && page != 1 ? nextResults : `https://pokeapi.co/api/v2/pokemon/?limit=${take}`);
        var response: IPagedPokemonModel = {} as IPagedPokemonModel;
        response.pokemons = [];
        if (data && data.results.length > 0) {
            await Promise.all(data.results.map(async (pokemon) => {
                var item = await this.getIdByUrl(pokemon.url);
                var name = pokemon.name;
                name = name.charAt(0).toUpperCase() + name.slice(1);

                pokemon.name = name;
                pokemon.id = item;
                pokemon.urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item}.png`;
                response.pokemons.push(pokemon);
            }));

            response.pokemons.sort(function (a, b) {
                var x = a.id;
                var y = b.id;
                if (x > y) { return 1; }
                if (x < y) { return -1; }
                return 0;
            });

            response.next = data.next;
            response.count = data.count;

            return response;
        }
    }

    public static async getIdByUrl(url): Promise<any> {
        var data = await Api.get(url);
        return data.id;
    }

    public static async getByName(nameFilter): Promise<IPokemonModel> {
        var data = await Api.get(`https://pokeapi.co/api/v2/pokemon/${nameFilter}`);
        var response: IPokemonModel = {} as IPokemonModel;
        console.log(data)
        if (data) {

            response.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            response.urlImage = data.urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
            response.id = data.id;
            response.height = data.height;
            response.weight = data.weight;
            if (data.types != null && data.types.length > 0) {
                response.types = [];
                await Promise.all(data.types.map((item) => {
                    item.type.name = item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1);
                    response.types.push(item);
                }))
            }
            if (data.abilities != null && data.abilities.length > 0) {
                response.abilities = [];
                await Promise.all(data.abilities.map((item) => {
                    item.ability.name = item.ability.name.charAt(0).toUpperCase() + item.ability.name.slice(1);
                    response.abilities.push(item);
                }))
            }
            if (data.stats) {
                var stats = {
                    labels: ['HP', 'Attack', 'Special-Attack', 'Defense', 'Special-Defense', 'Speed'],
                    datasets: [
                        {
                            label: 'Stats',
                            backgroundColor: 'rgba(179,181,198,0.2)',
                            borderColor: 'rgba(179,181,198,1)',
                            pointBackgroundColor: 'rgba(179,181,198,1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(179,181,198,1)',
                            data: [data.stats[0].base_stat, data.stats[1].base_stat, data.stats[3].base_stat, data.stats[2].base_stat, data.stats[4].base_stat, data.stats[5].base_stat]
                        },
                    ]
                };
                response.stats = stats;
            }
            var species = await Api.get(`https://pokeapi.co/api/v2/pokemon-species/${nameFilter}`);
            response.color = species.color.name.charAt(0).toUpperCase() + species.color.name.slice(1);;

            if (species.egg_groups != null && species.egg_groups.length > 0) {
                response.eggGroups = [];
                await Promise.all(species.egg_groups.map((item) => {

                    var name = item.name.charAt(0).toUpperCase() + item.name.slice(1);
                    response.eggGroups.push(name);
                }))
            }
            response.habitat = species.habitat.name.charAt(0).toUpperCase() + species.habitat.name.slice(1);;

        }
        return response;

    }

    public static async getAllPokemonsName(count): Promise<string[]> {
        var data = await Api.get(`https://pokeapi.co/api/v2/pokemon/?limit=${count}`);
        var response = [];
        if (data && data.results.length > 0) {

            await Promise.all(data.results.map(async (pokemon) => {
                var name = pokemon.name;
                name = name.charAt(0).toUpperCase() + name.slice(1);
                response.push(name);
            }));
            return response;
        }
    }

}
