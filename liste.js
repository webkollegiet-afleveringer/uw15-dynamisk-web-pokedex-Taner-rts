
let currentOffset = 0;
let limit = 20;
const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"


function fetchPokemon(offset) {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)

        .then(response => response.json())
        .then(data => {

            displayPokemon(data);
        })
}

const mainDom = document.querySelector("main");
function displayPokemon(data) {
    const results = data.results
    const pokemonsString = results.map((result) => {
        const { name, url } = result
        const id = getIdFromPokemon(url)

        return /* html */`
        <article>
        <a href="detail.html?id=${id}">
        
        <p>##${id}</p>
        <h2>${name}</h2>
        <img src="${artworkUrl}${id}.png" alt="${name}">
        </a>
        </article>

        `
    }).join("")


    mainDom.insertAdjacentHTML("beforeend", pokemonsString);

    let observedPokemon = document.querySelector("main article:nth-last-child(10)")
    observedPokemon.classList.add("red")
    observer.observe(observedPokemon)
}

function getIdFromPokemon(PokemonUrl) {
    return PokemonUrl.slice(0, -1).split("/").pop()


}

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            currentOffset = currentOffset + 20
            console.log(currentOffset);

            if (currentOffset < 1330) {
                observer.unobserve(entry.target)
                fetchPokemon(currentOffset)

            }
            else {
                console.log("End");
            }
        }
    })


}, {
    threshold: 1
})




fetchPokemon(currentOffset)