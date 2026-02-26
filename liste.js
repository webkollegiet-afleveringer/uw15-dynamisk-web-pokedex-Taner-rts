const listElement = document.getElementById("pokemonlist");

const url = new URL("https://pokeapi.co/api/v2/pokemon")

fetch(url)
    .then(response => response.json())
    .then(data => data.results.forEach( pokemon => {

        const listItem = document.createElement("li");
        const link = document.createElement("a");

        link.href = `detail.html?name=${pokemon.name}`;
        link.textContent = pokemon.name; 

        listItem.appendChild(link);
        listElement.append(listItem);
            
    
    }));

    