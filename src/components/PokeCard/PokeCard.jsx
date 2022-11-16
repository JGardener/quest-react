import styles from "./PokeCard.module.css";

export const PokeCard = (props) => {
  const backgroundColorFromType = {
    "Bug": {
      backgroundColor: "#3B9950",
    },
    "Dark": {
      backgroundColor: "#5A5A77",
    },
    "Dragon": {
      backgroundColor: "#448B95",
    },
    "Electric": {
      backgroundColor: "#E3E429",
      fontColor: "#000",
    },
    "Fairy": {
      backgroundColor: "#981844",
    },
    "Fighting": {
      backgroundColor: "#994025",
    },
    "Fire": {
      backgroundColor: "#AB1F23",
    },
    "Flying": {
      backgroundColor: "#4A677D",
    },
    "Ghost": {
      backgroundColor: "#8E688E",
    },
    "Grass": {
      backgroundColor: "#27CB4F",
    },
    "Ground": {
      backgroundColor: "#A9702C",
    },
    "Ice": {
      backgroundColor: "#84D2F7",
      fontColor: "#000",
    },
    "Normal": {
      backgroundColor: "#CA98A7",
    },
    "Poison": {
      backgroundColor: "#9B69D9",
    },
    "Psychic": {
      backgroundColor: "#F81D8F",
    },
    "Rock": {
      backgroundColor: "#8B3E21",
    },
    "Steel": {
      backgroundColor: "#D1D1E0",
      fontColor: "#000",
    },
    "Water": {
      backgroundColor: "#86A8FC",
      fontColor: "#000",
    },
  };
  return (
    <div
      className={styles.pokeCard}
      style={{
        backgroundColor: backgroundColorFromType[props.type].backgroundColor,
        color: backgroundColorFromType[props.type].fontColor,
      }}
    >
      <p className={styles.pokeName}>{props.name}</p>
      <div className={styles.pokeCardContent}>
        <div className={styles.statsLeft}>
          <p>HP: {props.hp}</p>
          <p>ATK: {props.attack}</p>
          <p>DEF: {props.defense}</p>
        </div>
        <div className={styles.pokeSprite}>
          <img alt="pokémon sprite" src={props.sprite} />
        </div>
        <div className={styles.statsRight}>
          <p>SP ATK: {props.specialAttack}</p>
          <p>S DEF: {props.specialDefense}</p>
          <p>SPEED: {props.speed}</p>
        </div>
      </div>
      <p>{props.type}</p>
    </div>
  );
};
