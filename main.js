/** SELECCIÓN DE PERSONAJE DE UN VIDEOJUEGO **/

// Funcionalidad:

//1) Mostrar los personajes en el HTML usando DOM. (hecho)
//2) Seleccionar un personaje principal usando eventos. (hecho)
//3) Mostrar personaje elegido en HTML y consola. (hecho)
//4) guardar en localStorage los datos de usuario y su personaje.


// Creación de la clase para los personajes (clase y constructor)
class Personaje {
    constructor(id, nombre, vida, ataque, defensa, img) {
        this.id = id;
        this.nombre = nombre;
        this.vida = vida;
        this.ataque = ataque;
        this.defensa = defensa;
        this.img = img;
    }
}

// Creación de los personajes (objetos)
const Excalibur = new Personaje(1, "Excalibur", 300, 9, 7, "img/excal.png");
const Volt = new Personaje(2, "Volt", 300, 10, 4, "img/volt.png");
const Trinity = new Personaje(3, "Trinity", 500, 4, 8, "img/trinity.png");
const Nekros = new Personaje(4, "Nekros", 500, 6, 9, "img/nekros.png");
const Ember = new Personaje(5, "Ember", 300, 8, 4, "img/ember.png");
const Garuda = new Personaje(6, "Garuda", 200, 8, 4, "img/garuda.png");
const Loki = new Personaje(7, "Loki", 150, 8, 9, "img/loki.png");
const Nyx = new Personaje(8, "Nyx", 300, 8, 10, "img/nyx.png");


// Creación del catalogo de Personajes habilitados (array)
const Personajes = [Excalibur, Volt, Trinity, Nekros, Ember, Garuda, Loki, Nyx];
console.log(Personajes);

// Creo el array de selección de personaje
let seleccionPersonaje = [];


// Modifico el DOM para mostrar los personajes en una grilla
const contenedorPersonajes = document.getElementById("contenedorPersonajes");

// Mostrar personajes (función), creación de las tarjetas y selección de personaje.
const mostrarPersonajes = () => {
    Personajes.forEach(Personaje => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                         <div class="card border-5 border-warning" id="card${Personaje.id}">
                             <img src="${Personaje.img}" class="card-img-top imgPersonajes border border-warning-subtle border-2 rounded-circle" alt="${Personaje.nombre}">
                             <div class= "card-body text-center ">
                                 <h5 class="text-uppercase mb-4">${Personaje.nombre}</h5>
                                 <p> ${Personaje.vida} ${"Puntos de vida"} </p>
                                 <p> ${Personaje.ataque} ${"Puntos de ataque"} </p>
                                 <p> ${Personaje.defensa} ${"Puntos de defensa"} </p>
                                 <button class="btn btn-outline-secondary border-1 colorBoton" id="boton${Personaje.id}" > Seleccionar </button>
                             </div>
                         </div>
                                 `
        contenedorPersonajes.appendChild(card);
        //seleccionar personaje y borrar
        const boton = document.getElementById(`boton${Personaje.id}`)
        boton.addEventListener("click", () => {
            seleccionPersonaje.pop();
            seleccionPersonaje.push(Personaje);
            console.log("Seleccionaste personaje");
            console.log(seleccionPersonaje);
            mostrarEleccion();
        })
    })
}

// llamado a la función mostrarPersonajes.
mostrarPersonajes();

//Dom del contenedorPersonajeElegido

const contenedorPersonajeElegido = document.getElementById("contenedorPersonajeElegido");

//Función para mostrar en pantalla el personaje elegido
const mostrarEleccion = () => {
    contenedorPersonajeElegido.innerHTML = "";
    seleccionPersonaje.forEach(Personaje => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12", "mx-auto");
        card.innerHTML = `
                         <div class="card border-5 border-info ">
                             <img src="${Personaje.img}" class="card-img-top imgPersonajes border border-warning-subtle border-3 rounded-circle" alt="${Personaje.nombre}">
                             <div class= "card-body text-center ">
                                 <h5 class="text-uppercase mb-4">${Personaje.nombre}</h5>
                                 <p> ${Personaje.vida} ${"Puntos de vida"} </p>
                                 <p> ${Personaje.ataque} ${"Puntos de ataque"} </p>
                                 <p> ${Personaje.defensa} ${"Puntos de defensa"} </p>
                             </div>
                         </div>
                        
                                 `
        contenedorPersonajeElegido.appendChild(card);
    }
    )

}

//guardar datos de cuenta
//creo la clase usuario por las dudas, por si quiero agregar otros datos como nombre real, pais, edad, etc.
class Usuario {
    constructor(nombreUsuario, email, pseleccionado) { //pseleccionado guarda el ID del personaje que se seleccionó
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.pseleccionado = pseleccionado;
    }
}
const arrayUsuarios = [];
///LocalStorage:
if (localStorage.getItem("arrayUsuarios")) {
    arrayUsuarios = JSON.parse(localStorage.getItem("arrayUsuarios"));
}

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombreUsuario = document.getElementById("nombreUsuario");
    const email = document.getElementById("email");
    const pseleccionado = seleccionPersonaje[0];
    //creo el objeto usuario
    const usuario = new Usuario(nombreUsuario.value, email.value, pseleccionado.id);
    arrayUsuarios.push(usuario);
    console.log("usuarios:");
    console.log(arrayUsuarios);
    //reset de form
    formulario.reset();
    localStorage.setItem("arrayUsuario", JSON.stringify(arrayUsuarios));
});






///// codigo adicional: 

const contenedor = document.getElementById("contenedorUsuarios");
const verUsuarios = document.getElementById("verUsuarios")

verUsuarios.addEventListener("click", () => {
    mostrarUsuarios();
})

//Función para mostrar el carrillo: 

const mostrarUsuarios = () => {

    if (arrayUsuarios != 0) {

        contenedor.innerHTML = "";
        arrayUsuarios.forEach(usuario => {
            const card = document.createElement("li");
            card.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start");
            card.innerHTML = `
                <div class="ms-2 me-auto">
                <div class="fw-bold">${usuario.nombreUsuario}</div>
                ${usuario.email} -- Personaje:  ${Personajes[(usuario.pseleccionado - 1)].nombre}
                </div>`;
            contenedor.appendChild(card);
        })

    } else {

        contenedor.innerHTML = "";
        const card = document.createElement("li");
        card.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start");
        card.innerHTML = `
                    <div class="ms-2 me-auto">
                    <div class="fw-bold">NO HAY USUARIOS</div>
                    </div>`;
        contenedor.appendChild(card);
    }
}




