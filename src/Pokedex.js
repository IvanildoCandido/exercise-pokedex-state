import React from 'react';
import Pokemon from './Pokemon';
import Button from './components/Button';
class Pokedex extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemonIndex: 0,
      pokemonFilter: 'All',
    };
    this.handleClick = this.handleClick.bind(this);
    this.filterPokemons = this.filterPokemons.bind(this);
    this.typesPokemons = this.typesPokemons.bind(this);
  }
  handleClick(totalPokemons) {
    this.setState((previous) => ({
      pokemonIndex: (previous.pokemonIndex + 1) % totalPokemons,
    }));
  }
  filterPokemons(type) {
    this.setState({
      pokemonIndex: 0,
      pokemonFilter: type,
    });
  }
  typesPokemons() {
    return this.props.pokemons.reduce((acc, pokemon) => {
      return acc.includes(pokemon.type) ? acc : [...acc, pokemon.type];
    }, []);
  }

  render() {
    const types = this.typesPokemons();
    let pokemonsFiltered = this.props.pokemons;
    if (this.state.pokemonFilter !== 'All') {
      pokemonsFiltered = this.props.pokemons.filter(
        (pokemon) => pokemon.type === this.state.pokemonFilter,
      );
    }
    return (
      <main>
        <div className="pokedex">
          <Pokemon
            key={pokemonsFiltered[this.state.pokemonIndex].id}
            pokemon={pokemonsFiltered[this.state.pokemonIndex]}
          />
        </div>
        <Button clickEvent={() => this.filterPokemons('All')} type={'All'} />
        {types.map((type) => (
          <Button clickEvent={() => this.filterPokemons(type)} type={type} />
        ))}
        <div>
          <button
            disabled={pokemonsFiltered.length <= 1}
            onClick={() => this.handleClick(pokemonsFiltered.length)}
          >
            Próximo
          </button>
        </div>
      </main>
    );
  }
}

export default Pokedex;
