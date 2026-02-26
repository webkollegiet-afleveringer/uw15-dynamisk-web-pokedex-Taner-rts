// const listElement = document.getElementById("pokemonlist");

// const url = new URL("https://pokeapi.co/api/v2/pokemon")

// fetch(url)
//     .then(response => response.json())
//     .then(data => data.results.forEach(pokemon => {

//         const listItem = document.createElement("li");
//         const link = document.createElement("a");

//         link.href = `detail.html?name=${pokemon.name}`;
//         link.textContent = pokemon.name;

//         listItem.appendChild(link);
//         listElement.append(listItem);


//     }));




let currentOffset = 0;
let limit = 20;
const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"


function fetchPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=${limit}`)

        .then(response => response.json())
        .then(data => {

            displayPokemon(data);
        })
}

const mainDom = document.querySelector("main");
function displayPokemon(data) {
    const results = data.results
    const pokemonsString = results.map((result) =>  { 
        const{name, url} = result
        const id = getIdFromPokemon (url)
        
        return /* html */`
        <article>
        <p>##${id}</p>
        <h2>${name}</h2>
        <img src="${artworkUrl.replace("1", id)}" alt="${name}">
        </article>

        `
        }).join("")

         let observedPokemon= document.querySelectorAll("main article:nth-last-child(5)")
         console.log(observedPokemon);
    
    console.log(pokemonsString);
    mainDom.insertAdjacentHTML("afterbegin", pokemonsString);
}
    
function getIdFromPokemon(PokemonUrl) {
   return PokemonUrl.slice(0, -1).split("/").pop()

    
}

const observer = new IntersectionObserver(entries => {
    enteries.forEach((entry) => {   
        if (entry.isIntersecting) {
            currentOffset += currentOffset + 20

            }
            })

        fetchPokemon();
    })



fetchPokemon()