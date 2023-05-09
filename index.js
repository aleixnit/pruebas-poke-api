const button100 = document.querySelector("#btn");
const lista100 = document.querySelector("#lista");
let listaAbierta = false;
// variable booleana para indicar si la lista está abierta o cerrada

//variable donde se almacenan los datos del pokemon
const datosPokemon = document.querySelector("#datos-pokemon");

let tipoCreado = false;
let tipoPokemon;

// EVENTO AL HACER CLICK AL BOTON DE MOSTRAR/OCULTAR LOS 100 PRIMEROS POKEMON
button100.addEventListener("click", function () {
  if (listaAbierta) {
    // Si la lista está abierta, eliminar todos los elementos de la lista
    while (lista100.firstChild) {
      lista100.removeChild(lista100.firstChild);
    }
    // actualizar la variable booleana
    listaAbierta = false;
    // Eliminar el elemento de tipo del Pokemon si existe
    if (tipoPokemon !== null) {
      datosPokemon.removeChild(tipoPokemon);
      tipoPokemon = null;
    } 
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
  datos.results.forEach((pokemon) => {
    // Crear un elemento de lista para cada nombre de Pokémon
    const itemLista = document.createElement("button");
    itemLista.textContent = pokemon.name.toUpperCase();
    itemLista.classList.add("class");

    //funcion para ejecutar que se muestren los datos de bulbasaur al hacer click
    itemLista.addEventListener("click", async function () {
      const pokemonRespuesta = await fetch(
        "https://pokeapi.co/api/v2/pokemon/1/"
      );
      const pokemonDatos = await pokemonRespuesta.json();
      // mostrarDatosPokemon(pokemonDatos);
      const botones = document.querySelectorAll(".class");
      botones.forEach((boton) => {
        boton.style.display = "none";
      });

      if (!tipoCreado) {
        // Si el elemento de tipo no existe, crear uno nuevo
        tipoPokemon = document.createElement("p");
        datosPokemon.appendChild(tipoPokemon);
        tipoCreado = true;
      }

      // Actualizar el contenido del elemento de tipo
      tipoPokemon.textContent = `Tipo: ${pokemonDatos.types[0].type.name}`;
    });

    // Agregar el elemento de lista a la lista existente
    lista100.appendChild(itemLista);
  });
}
