import { useState } from "react";
import { PokeCard } from "./components/PokeCard/PokeCard";
import names from "./PokemonNames/names.json";
import { AutoCompleteName } from "./components/AutoCompleteName/AutoCompleteName";
import "./App.css";

function App() {
  const [inputValue, getInputValue] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [autoCompleteNames, updateAutoCompleteNames] = useState([]);

  const handleChange = (something) => {
    getInputValue(something);
  };

  const capitaliseFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  async function querySinglePokemon() {
    let query = inputValue.toLowerCase();
    console.log("Query: ", query);
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
    updateAutoCompleteNames([]);
    console.log(autoCompleteNames);
  }

  const filterPokemon = () => {
    const result = names.filter((element) => element.includes(inputValue));
    return updateAutoCompleteNames(result.slice(0, 5));
  };

  return (
    <div className="App">
      <h1>PokéQuest</h1>
      <p>Search for a Pokémon</p>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => {
          getInputValue(event.target.value);
          filterPokemon();
          if (inputValue.length < 2) {
            updateAutoCompleteNames([]);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            querySinglePokemon();
          }
        }}
      />
      <div style={{ width: "270px" }}>
        {autoCompleteNames.map((item) => {
          return (
            <AutoCompleteName
              name={item}
              key={item}
              query={querySinglePokemon}
              update={handleChange}
              capitalise={capitaliseFirstLetter}
              value={inputValue}
            />
          );
        })}
      </div>
      <button onClick={querySinglePokemon}>Search</button>
      <p>{error}</p>
      <div className="pokeContainer">
        {data.map((item) => {
          return (
            <PokeCard
              name={capitaliseFirstLetter(item.name)}
              type={capitaliseFirstLetter(item.types[0].type.name)}
              sprite={
                item.sprites.versions["generation-vi"][
                  "omegaruby-alphasapphire"
                ].front_default
              }
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
