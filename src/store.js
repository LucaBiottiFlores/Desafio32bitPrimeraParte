/*   Dentro del store vamos a tener toda la data que se va usar en el proyecto, 
  en este caso es un objeto state que contiene un valor de "busqueda", que será ingresado por el usuario
  en la vista de "Busquedas", además, dentro del state, tenemos un arreglo de juegos, y cada juego tiene
  datos específicos que los diferencian entre sí.

  Finalmente el store cuenta con un arreglo de ventas[], servirá para utilizarlo en conjunto con
  getters, mutaciones y acciones, para poder registrar y realizar ventas de los productos (videojuegos).
  Esta lógica permite además hacer modificaciones al stock de un producto y todo lo asociado a lo que ocurre
  cuando se realiza una  venta.

*/

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


// El mismisimo store //
const store = new Vuex.Store({
  state: {
    search: "",
    games: [
      {
        codigo: "0001",
        nombre: "Sekiro",
        stock: 1,
        precio: 30000,
        color: "red",
        destacado: true,
        url: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2723/knxU5uU5aKvQChKX5OvWtSGC.png'
      },
      {
        codigo: "0002",
        nombre: "Fifa 21",
        stock: 0,
        precio: 25000,
        color: "blue",
        destacado: false,
        url: 'https://i.blogs.es/5fe30d/fifa-21-intros_1/1366_2000.jpeg'
      },
      {
        codigo: "0003",
        nombre: "Gears of War 4",
        stock: 5,
        precio: 15000,
        color: "green",
        destacado: true,
        url: 'https://i.blogs.es/fe973b/gearsofwar401/1366_2000.jpg'
      },
      {
        codigo: "0004",
        nombre: "Mario Tennis Aces",
        stock: 5,
        precio: 35000,
        color: "yellow",
        destacado: false,
        url: 'https://i.ytimg.com/vi/7-6UBoyylNU/maxresdefault.jpg'
      },
      {
        codigo: "0005",
        nombre: "Bloodborne",
        stock: 5,
        precio: 10000,
        color: "blue",
        destacado: false,
        url: 'https://depor.com/resizer/dRAIfiPQ387ThVu2opAvI_uvV-g=/1200x800/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/HI653K7WA5EDBIYTNNNCKR7WIA.jpg'
      },
      {
        codigo: "0006",
        nombre: "Forza Horizon 4",
        stock: 5,
        precio: 20000,
        color: "red",
        destacado: true,
        url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1293830/extras/FH4_Deluxe_TitledHero_HD_1920x1080.png?t=1622068013'
      },
    ],
    sales: [],
  },

 ////GETTERS////

  getters: {
    stockTotal(state) {
      return state.games.reduce((accumulator, game) => {
        accumulator = accumulator + game.stock;

        return accumulator;
      }, 0);
    },
    gamesBySearch(state) {
      /* El usuario ingresará su búsqueda en un input, entonces:
        state.busqueda = valor que ingresa el usuario.
        si este valor está en blanco, devolver arreglo vacío.

        Si no, retornar un juego filtrado del arreglo del state,
        el juego será devuelto en minusculas y con el booleando del includes
        true: lo ingresado por el usuario existe en el arreglo.  ==> esto significa que es igual a juego.nombre.toLowerCase
        false: lo ingresado por el usuario no existe en el arreglo.  ==> significa que lo ingresado es diferente del nombre que tiene el juego en el arreglo, es decir diferente de juego.nombre.toLowerCase
      */
      if (state.search === "") {
        return [];
      } else {
        return state.games.filter((game) =>
          game.nombre.toLowerCase().includes(state.search.toLowerCase())
        );
      }
    },
    
  },
  mutations: {
    // Establece que 'state.search' tome el valor ingresado por el usuario.
    SET_SEARCH(state, newSearch) {
      state.search = newSearch;
    },
    
  },
  actions: {
    /* 
     Desde el componente searchs.vue, se emite un dispatch asociado a un input en el que se ingresa
     la búsqueda del usuario.
     Este dispatch desata la acción "setsearch" en esta define que:
     si newsearch es una string, entonces se le realiza un commit a "SET_SEARCH",
     mutación que recive el valor de la string "newsearch", y se lo asigna a state.search,
     primer valor disponible en nuestra store.
    */
    setSearch(context, newSearch) {
      if (typeof newSearch === "string") {
        context.commit("SET_SEARCH", newSearch);
      } else {
        console.warn(
          `newSearch debiese de ser de tipo string y recibí un tipo ${typeof newSearch}`
        );
      }
    },
    
  },
});

export default store;