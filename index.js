import { tag, letter, pokerBall } from "./svg-expoprt.js"

const main = document.querySelector("#big-wrapper")
let baseUrl = "https://pokeapi.co/api/v2/pokemon";

let searchMethod = "name";
let pokemons = [];

main.insertAdjacentHTML("beforeend", `<div id="pokemon-wrapper"><div class="pokemon-inner-wrapper"></div></div>`);

const pokemonWrapperDom = document.querySelector("#pokemon-wrapper .pokemon-inner-wrapper");

async function init(baseUrl) {

    const numberOfPokemons = 1350
    const url = `${baseUrl}?limit=${numberOfPokemons}`

    const res = await fetch(url);
    const data = await res.json();

    pokemons = data.results;
    // console.log(pokemons);

    // Display the first 10 Pokémon initially
    displayPokemon(pokemons.slice(0, 10));

    renderHeader(letter);

    const searchDom = document.querySelector("#search");

    shiftSearchMethod(searchDom);


    searchPokemon(searchDom);


}

init(baseUrl);

function shiftSearchMethod(searchDom) {

    const sortButtonDom = document.querySelector("#sort-button");
    // console.log(searchDom);

    sortButtonDom.addEventListener("click", () => {

        searchMethod = searchMethod === "name" ? "id" : "name";
        shiftSearchIcon(searchMethod, sortButtonDom)

        //runSearch(searchDom.value);




    });
}

function shiftSearchIcon(searchMethod, sortButtonDom) {

    const inputDOm = sortButtonDom.closest("header").querySelector("label input")
    inputDom.value = ""


    if (searchMethod === "id") {
        sortButtonDom.innerHTML = ""
        sortButtonDom.innerHTML = tag
    } else {
        sortButtonDom.innerHTML = ""
        sortButtonDom.innerHTML = letter
    }

}



function searchPokemon(searchDom) {
    // console.log(searchDom);
    searchDom.addEventListener("input", (event) => {
        const inputValue = event.target.value.toLowerCase();
        runSearch(inputValue);





    }

    )

}


function runSearch(inputvalue) {


    const value = inputvalue.trim();

    if (!value) {
        displayPokemon(pokemons.slice(0, 10));
        return;
    }

    let pokemonSearchArray;

    if (searchMethod === "name") {
        pokemonSearchArray = searchByname(pokemons, value)

    } else {

        pokemonSearchArray = searchById(pokemons, value)
    }
    // console.log(runSearch);

    displayPokemon(pokemonSearchArray);

}

function searchById(pokemonsArray, id) {
    id = Number(id)
    let searchResult = pokemonsArray.filter((pokemon, index) => {
        let pokemonUrlNumber = Number(getIdFromPokemon(pokemon.Url))

        let searchIndex;
        searchIndex = index + 1

        if (pokemonUrlNumber == 10001) {
            id += 8975
            console.log(`pokemonUrlNumber = ${pokemonUrlNumber}`);
            console.log(`id = ${id}`);


        }
        return pokemonUrlNumber == id


    });

    return searchResult
}

function displayPokemon(data) {

    pokemonWrapperDom.innerHTML = "";

    const pokemons = data
        .map((pokemon) => {
            const pokemonIndex = getIdFromPokemon(pokemon.url);
            const basePath = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
            const imgPath = `${basePath}${pokemonIndex}.png`;

            const pokemonTemplate = /*html*/`
                <figure class="pokemon">
                    <span class="pokemon-number">${formatPokemonNumber(pokemonIndex)}</span>

                    <img src="${imgPath}" alt="{pokemon.name}" />

                    <figcaption>
                        <span>${pokemon.name}</span>

                        <a href="detail.html?id=${pokemonIndex}&url=${pokemon.url}&name=${pokemon.name}" class="pokemon-link"> SE MERE </a>

                    </figcaption>
                </figure>`

            return pokemonTemplate;

        })
        .join("");
    pokemonWrapperDom.insertAdjacentHTML("beforeend", pokemons)
}


// console.log(data);
// console.log(displayPokemon);

function renderHeader(SearchIcon) {

    //     const headerDom = document.querySelector(".header");

    //     if (headerDom) {
    //         headerDom.remove();
    //     }
    //     const header = /*html*/ `

    // <header class="header">

    // <h1 class="header__title">
    // <span>${pokerBall}</span> 
    // <span>Pokedex</span>
    // </h1>

    // <label for="search">
    // <span class ="search-icon">${search}</span> 
    // <input type"search" id="search" placeholder="search">
    // </label>

    // <button id="sort-button">${SearchIcon}</button>
    // </header>`

    //     main.insertAdjacentHTML("afterbegin", header);
}


function searchByname(pokemonsArray, letter) {
    return pokemonsArray.filter((element) =>
        // const thisName = element.name
        element.name.includes(letter.toLowerCase())

    )
}

function getIdFromPokemon(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop();
}

function formatPokemonNumber(id) {
    return "#" + String(id).padStart(3, "0");
}
