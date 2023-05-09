const button100 = document.querySelector('#btn');
const lista100 = document.querySelector('#lista');
let listaAbierta = false; // variable booleana para indicar si la lista está abierta o cerrada

// EVENTO AL HACER CLICK AL BOTON DE MOSTRAR/OCULTAR LOS 100 PRIMEROS POKEMON
button100.addEventListener('click', function () {
  if (listaAbierta) {
    // Si la lista está abierta, eliminar todos los elementos de la lista
    while (lista100.firstChild) {
      lista100.removeChild(lista100.firstChild);
    }
    listaAbierta = false; // actualizar la variable booleana
  } else {
    // Si la lista está cerrada, mostrar los nombres de los primeros 100 Pokémon
    getPokemons();
    listaAbierta = true; // actualizar la variable booleana
  }
});

//FUNCION PARA LLAMAR LA LISTA DE LOS 100 PRIMEROS POKEMON
async function getPokemons() {
  const respuesta = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100"
  );
  const datos = await respuesta.json();
  console.log(datos);
  datos.results.forEach(pokemon => {

    // Crear un elemento de lista para cada nombre de Pokémon
    const itemLista = document.createElement('button');
    itemLista.textContent = pokemon.name.toUpperCase();
    itemLista.classList.add('class'); 

    //funcion para ejecutar que se muestren los datos de bulbasaur al hacer click
    itemLista.addEventListener('click', async function() {
        const pokemonRespuesta = await fetch('https://pokeapi.co/api/v2/pokemon/1/');
        const pokemonDatos = await pokemonRespuesta.json();
        mostrarDatosPokemon(pokemonDatos);
      });

    //FUNCION PARA MANIPULAR LO QUE HACE AL CLICAR CADA POKEMON
    // itemLista.addEventListener('click', function() {
    //     console.log(`Se ha seleccionado el Pokemon ${pokemon.name}`);
    //     while (lista100.firstChild) {
    //         lista100.removeChild(lista100.firstChild);
    //       }
    //       const nuevoParrafo = document.createElement('p');
    //   nuevoParrafo.textContent = `Has seleccionado a ${pokemon.name.toUpperCase()}`;
    //   lista100.appendChild(nuevoParrafo);
    //   });

    // Agregar el elemento de lista a la lista existente
    lista100.appendChild(itemLista);
  });
  
}

function mostrarDatosPokemon(pokemonDatos) {
    // Mostrar los datos del Pokemon en algún lugar de la página
    const nombrePokemon = document.createElement('h2');
    nombrePokemon.textContent = pokemonDatos.name;
    datosPokemon.appendChild(nombrePokemon);
    
    // Aquí puedes agregar más elementos para mostrar otros datos del Pokemon, como su imagen, estadísticas, etc.
    //   En este ejemplo, he agregado un nuevo elemento div con el ID datos-pokemon en el HTML para mostrar los datos del Pokemon. Cuando se hace clic en un botón de Pokemon, se llama a la función mostrarDatosPokemon, que crea un nuevo h2 con el nombre del Pokemon y lo agrega al div de datos-pokemon. Puedes agregar más elementos y datos según sea necesario para mostrar la información del Pokemon que desees.
  }
  
// const URLbase = 'https://pokeapi.co/api/v2/pokemon';
// const limiteApi = 20;
// const pokemonList = [];

// async function getPokemonList() {
//   for (let i = 0; i < 100; i += limiteApi) {
//     const response = await fetch(`${URLbase}?offset=${i}&limit=${limiteApi}`);
//     const data = await response.json();
//     pokemonList.push(...data.results);
//   }
//   console.log(pokemonList); // lista completa de los primeros 100 Pokémon
// }
// getPokemonList().catch(error => console.log(error));