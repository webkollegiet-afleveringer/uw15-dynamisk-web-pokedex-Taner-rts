const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const mainDom = document.querySelector("main");
const url = `https://pokeapi.co/api/v2/pokemon/${id}`
const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

fetch(url)
  .then(res => res.json())
  .then(data => {
    createPage(data)
  })

function createPage(data) {
  console.log(data);

  const contentString = `<h1>${data.name}</h1>
  <p>weight : ${data.weight}</p>
  <img src="${artworkUrl}${id}.png" alt="${name}">
  
  `
  mainDom.insertAdjacentHTML("beforebegin", contentString)
}