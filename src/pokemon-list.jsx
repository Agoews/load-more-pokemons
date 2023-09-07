import React, { useState, useEffect } from 'react';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=0`)
      .then((response) => response.json())
      .then((data) => {
        setTotal(data.count);
        setPokemon(data.results);
      });
  }, []);

  const loadMore = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${pokemon.length}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon([...pokemon, ...data.results]);
      });
  };

  return (
    <>
      <ul role="list">
        {pokemon.map((poke, index) => (
          <li role="listitem" key={index}>
            {poke.name}
          </li>
        ))}
      </ul>
      {pokemon.length < total ? (
        <button type="button" role="button" onClick={loadMore}>
          Load more
        </button>
      ) : null}
      <div>
        Displaying {pokemon.length} of {total} results
      </div>
    </>
  );
};

export default PokemonList;
