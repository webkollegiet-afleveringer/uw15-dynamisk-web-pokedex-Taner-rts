const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const mainDom = document.querySelector("main");
const url = `https://pokeapi.co/api/v2/pokemon/${id}`
const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

// Type colors for background
const typeColors = {
  grass: '#74cb48',
  fire: '#ff6b35',
  water: '#4a90e2',
  electric: '#ffd700',
  psychic: '#ff69b4',
  ice: '#87ceeb',
  dragon: '#8a2be2',
  dark: '#2f4f4f',
  fairy: '#ffb6c1',
  normal: '#a9a9a9',
  fighting: '#dc143c',
  poison: '#9932cc',
  ground: '#daa520',
  flying: '#87ceeb',
  bug: '#9acd32',
  rock: '#696969',
  ghost: '#8b008b',
  steel: '#c0c0c0'
};

async function getData() {
  const [pokemon, species] = await Promise.all([
    fetch(url).then(result => result.json()),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(result => result.json())
  ]);

  // console.log(pokemon);
  // console.log(species);
  createPage(pokemon, species)


}

getData()

// fetch(url)
//   .then(res => res.json())
//   .then(data => {
//     createPage(data)
//   })

function createPage(data, species) {
  // console.log(data);

  

  // jeg fik hjælp af af ai til dette
  const wrapper = document.getElementById('wrapper');
  const primaryType = data.types[0].type.name;
  const backgroundColor = typeColors[primaryType] || '#74cb48';
  wrapper.style.background = backgroundColor;
  wrapper.style.setProperty('--type-color', backgroundColor);

  
  const typesHtml = data.types
    .map(t => {
      const typeName = t.type.name;
      const typeColor = typeColors[typeName] || '#666';
      return `<span class="type-badge" style="background:${typeColor};">${typeName}</span>`;
    })
    .join("");

  const abilitiesStrong = data.abilities.map(abilityKey => abilityKey.ability.name).join(", ");

  const abilitiesNumber = data.stats.map(abilityNumbs => abilityNumbs.base_stat).join(", ");

// stop her ai hjjælp 

  const contentString = `

  <header class="back">
    
  <a href="index.html"> <img src="img/arrow_back.svg" class="back-icon" alt="arrow_back"></a>
  <h1>${data.name}</h1>
  <h3 class ="numbers">##00${id}</h3>
    

    </header>

  <div class="card">
    <img src="${artworkUrl}${id}.png" class="pokemon-img" alt="${name}">

    <div class="types">${typesHtml}</div>
    <h2> About </h2>
   
    <div class="grids">
    
    <div class="info-item">
      <div class="info-top">
        <img src="img/weight.svg" alt="vægt">
        <h4>${data.weight} kg</h4>
      </div>
      <p>Weight</p>
    </div>

    <div class="info-item">
      <div class="info-top">
        <img src="img/straighten.svg" alt="højde">
        <h4>${data.height} m</h4>
      </div>
      <p>Height</p>
    </div>

    <div class="info-item moves-item">
      <h4>${abilitiesStrong}</h4>
      <p>Moves</p>
    </div>
    
    </div>


    <p class="text-hey"> ${species.flavor_text_entries[0].flavor_text} </P>
    <h2>Base Stats</h2>
    <div class="stats">
      ${data.stats.map(stat => {
    const name = stat.stat.name.toUpperCase();
    const value = stat.base_stat;
    const percent = Math.round((value / 255) * 100);
    return `
        <div class="stat-row">
          <span class="stat-name">${name}</span>
          <span class="stat-value">${value}</span>
          <div class="stat-bar-bg">
            <div class="stat-bar" style="width:${percent}%"></div>
          </div>
        </div>`;
  }).join("")}
    </div>
  </div>
  
  

  
  `
  // const textString = `<p>${species.flavor_text_entries.flavor_text}</p>



  //  `
  // console.log(textString);




  // put the generated markup inside the <main> element so it lives in the white card
  mainDom.insertAdjacentHTML("beforeend", contentString)
}