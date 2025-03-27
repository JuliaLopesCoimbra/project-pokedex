import React, { useState } from 'react';
import './App.css';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const pokemons = [
    "bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon",
    "charizard", "squirtle", "wartortle", "blastoise", "pikachu"
  ];

  const fetchPokemonData = (name) => {
    if (!name) return; // Alterado para aceitar nome como parâmetro.
    
    setLoading(true);
    setError(null);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }
        return response.json();
      })
      .then(data => {
        setPokemonData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
        setPokemonData(null);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchPokemonData(pokemonName);
  };

  const handlePokemonSelect = (name) => {
    setPokemonName(name);  // Atualiza o input com o nome selecionado
    fetchPokemonData(name);
  };

  return (
    <div className="app">
      <div className="pokemon-list">
        <h2>Pokemon List</h2>
        <ul>
          {pokemons.map(pokemon => (
            <li key={pokemon} onClick={() => handlePokemonSelect(pokemon)}>
              {pokemon.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>
      <div className="pokemon-search">
        <h1>Pokemon Search</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            placeholder="Enter pokemon name"
          />
          <button type="submit">Search</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {pokemonData && (
          <div className="pokemon-card">
            <h2>{pokemonData.name.toUpperCase()}</h2>
            <p>Pokédex Number: #{pokemonData.id}</p>
            <p>Peso: {pokemonData.weight / 10} kg</p>
            <p>Altura: {pokemonData.height / 10} m</p>
            <p>Tipo: {pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
