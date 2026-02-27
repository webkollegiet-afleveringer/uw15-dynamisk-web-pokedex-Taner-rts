const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const mainDom = document.querySelector("main");
const url = `https://pokeapi.co/api/v2/pokemon/${id}`
const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

async function getData() {
  const [pokemon, species] = await Promise.all([
    fetch(url).then(result => result.json()),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(result => result.json())
  ]);

  console.log(pokemon);
  console.log(species);
  createPage(pokemon, species)
}

getData()

// fetch(url)
//   .then(res => res.json())
//   .then(data => {
//     createPage(data)
//   })

function createPage(data, species) {
  console.log(data);



  const abilitiesType = data.types.map(abilityTypes => abilityTypes.type.name).join(", ");


  const abilitiesStrong = data.abilities.map(abilityKey => abilityKey.ability.name).join(", ");

  const abilitiesNumber = data.stats.map(abilityNumbs => abilityNumbs.base_stat).join(", ");

  const textPokemon = species.flavor_text_entries.map(textInsert => textInsert.flavor_text).join(", ");
  console.log(textPokemon);


  const contentString = `<h1>${data.name}</h1>
  <img src="${artworkUrl}${id}.png" alt="${name}">
  <p>${abilitiesType}</p>  
  <h2> About </h2>
  <p>Weight : ${data.weight}</p>
  <p>Height : ${data.height}</p>
  <p> Moves:${abilitiesStrong}</p>
  
  <ul> Base Stats </ul>
  <li> ${abilitiesNumber} </li>
  
  <p> Moves:${textPokemon}</p>
  
  `
  mainDom.insertAdjacentHTML("beforebegin", contentString)
}