import { useState } from "react";
import { PokeCard } from "./components/PokeCard/PokeCard";
import "./App.css";

function App() {
  const [inputValue, getInputValue] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const capitaliseFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  async function querySinglePokemon() {
    let query = inputValue.toLowerCase();
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) {
      setError("Pokémon not found. Please check your spelling and try again.");
    } else {
      setError("Pokémon added!");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    let responseJSON = await response.json();
    setData([...data, responseJSON]);
    getInputValue("");
  }

  return (
    <div className="App">
      <h1>PokéQuest</h1>
      <p>Search for a Pokémon</p>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => getInputValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            querySinglePokemon();
          }
        }}
      />
      <button onClick={querySinglePokemon}>Search</button>
      <p>{error}</p>
      <div className="pokeContainer">
        {data.map((item) => {
          return (
            <PokeCard
              name={capitaliseFirstLetter(item.name)}
              type={capitaliseFirstLetter(item.types[0].type.name)}
              sprite={item.sprites.front_default}
              hp={item.stats[0].base_stat}
              attack={item.stats[1].base_stat}
              defense={item.stats[2].base_stat}
              specialAttack={item.stats[3].base_stat}
              specialDefense={item.stats[4].base_stat}
              speed={item.stats[5].base_stat}
              key={capitaliseFirstLetter(item.name)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
