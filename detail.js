const params = new URLSearchParams(window.location.search);
const name = params.get("name");

const nameEl = document.getElementById("pokemonName");
const imgEl = document.getElementById("pokemonImg");

if (!name) {
  nameEl.textContent = "vælg en pokemon fra listen";
} else {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(res => res.json())
    .then(pokemon => {
      nameEl.textContent = pokemon.name;
      imgEl.src = pokemon.sprites.front_default;
    })
    .catch(err => {
      console.error(err);
      nameEl.textContent = "fejl ved indlæsning af pokemon";
    });
}