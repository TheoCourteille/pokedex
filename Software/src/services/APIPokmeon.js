import axios from 'axios'

export async function fetchPokemonNames(search) {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
    const pokemons = response.data.results;
    const filtered = pokemons.filter(pokemon => pokemon.name.includes(search));
    const pokemonsWithId = filtered.map(pokemon => {
      const id = pokemon.url.split('/').filter(Boolean).pop();

      return {
        name: pokemon.name,
        id: Number(id)
      };
    });

    return pokemonsWithId;

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return [];
  }
}

export async function fetchPokemon(id) {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + id);
    const { data } = response;

    const name = data.forms[0].name;

    const types = data.types.map(type => type.type.name);

    const stats = data.stats.map(stat => ({
      name: stat.stat.name,
      value: stat.base_stat
    }));

    return {
      name,
      types,
      stats
    };
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return [];
  }
}


export const getPokemonSpriteUrl = (index) => {

  return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + index + '.png'
}

