datos = [];

let buscadoIndex = localStorage.buscado ? JSON.parse(localStorage.getItem("buscado")) : false;

let filtroCusco
let filtroMachupicchu
let filtroChecacupe
let filtroOllantaytambo
let filtroQuillabamba
let filtroUrubamba

let cusco = document.getElementById("cusco");
let machuPicchu = document.getElementById("machuPicchu");
let checacupe = document.getElementById("checacupe");
let ollantaytambo = document.getElementById("ollantaytambo");
let quillabamba = document.getElementById("quillabamba");
let urubamba = document.getElementById("urubamba");
let btnTodos = document.getElementById("todos");

// FILTRO CALIFICACION
let filtroCalificacion7
let filtroCalificacion8
let filtroCalificacion9
let filtroCalificacion10

let calificacion7 = document.getElementById("calificacion7");
let calificacion8 = document.getElementById("calificacion8");
let calificacion9 = document.getElementById("calificacion9");
let calificacion10 = document.getElementById("calificacion10");

// FILTRO OFERTA 
let filtroOferta

// FILTRO PRECIO
let filtroTo20
let filtroTo40
let filtroTo50
let filtroPlus50
let to20 = document.getElementById("to20");
let to40 = document.getElementById("to40");
let to50 = document.getElementById("to50");
let plus50 = document.getElementById("plus50");

// BARRA DE BUSQUEDA

let resultadoFind = document.querySelector(".autocomplete-find");
let inputTexto = document.querySelector("#hotel-name-find");


function buscadorPrincipal() {
    resultadoFind.innerHTML = "";
    let textoIngresado = inputTexto.value;

    $(".autocomplete-find").parent().show();

    encontrados = [];
    encontrados = datos.filter(i => i.nombre.toUpperCase().includes(textoIngresado.toUpperCase()));

    if (textoIngresado.length == 0) {
        resultadoFind.innerHTML = "";
        $(".autocomplete-find").parent().hide();
    } else {
        encontrados.forEach(item => {
            resultadoFind.innerHTML += `<li id="${item.id}">
                                       <img src="/images/icono.png" style="max-width: 30px;"> <a href="find.html" onclick="preventDefault(event);findIndex(${item.id})">${item.nombre}</a>
                                    </li>`
        });
    }
}

function findIndex(id) {

    let prueba = datos.find(i => i.id == id)

    filtroBuscado(datos.indexOf(prueba))
}

// OFERTA
function ofertados() {
    for (let i = 0; i < datos.length; i++) {
        if (datos[i].nombre.startsWith("La")) {
            datos[i].oferta = true;
        }
        if (datos[i].oferta === true) {
            $(`.badges${datos[i].id}`).append(`<span class="badge rounded-pill bg-danger mb-3 badge-oferta">OFERTA</span>`)
        }
    }
}

document.addEventListener('DOMContentLoaded', cargaInicial);

function cargaInicial() {
    $.ajax({
        url: 'js/datos.json',
        success: function(response) {
            console.log(response)
            datos = response;
            if (buscadoIndex) {
                let prueba = datos.findIndex(i => i.id == buscadoIndex.id)
                filtroBuscado(prueba)
                localStorage.removeItem("buscado")
            } else {
                nuevaCard();
            }
            buscadorPrincipal();
            listaFavoritos();

            // FILTRO UBICACIÓN
            filtroCusco = datos.filter(i => i.tipo === "Cusco");
            filtroMachupicchu = datos.filter(i => i.tipo === "Machu Picchu");
            filtroChecacupe = datos.filter(i => i.tipo === "Checacupe");
            filtroOllantaytambo = datos.filter(i => i.tipo === "Ollantaytambo");
            filtroQuillabamba = datos.filter(i => i.tipo === "Quillabamba");
            filtroUrubamba = datos.filter(i => i.tipo === "Urubamba");

            // FILTRO CALIFICACION
            filtroCalificacion7 = datos.filter(i => i.calificacion < 8);
            filtroCalificacion8 = datos.filter(i => i.calificacion >= 8 && i.calificacion < 9);
            filtroCalificacion9 = datos.filter(i => i.calificacion >= 9 && i.calificacion < 10);
            filtroCalificacion10 = datos.filter(i => i.calificacion == 10);

            // FILTRO PRECIO 
            filtroTo20 = datos.filter(i => i.precioMedio <= 150);
            filtroTo40 = datos.filter(i => i.precioMedio > 150 && i.precioMedio <= 200);
            filtroTo50 = datos.filter(i => i.precioMedio > 200 && i.precioMedio <= 300);
            filtroPlus50 = datos.filter(i => i.precioMedio > 300);

            // FILTRO OFERTA
            filtroOferta = datos.filter(i => i.oferta === true);
            console.log(filtroOferta);

        },
        error: function(error, jqXHR, status) {
            console.log(error);
        }
    })
}

// FUNCIONES CARD Y FILTRO
function nuevaCard() {
    $("#todosCards").empty();
    datos.forEach(dato => {
        $("#todosCards").append(
            `<div class="mt-4">
           <div class="card shadow ${dato.tipo}" style="max-width: 1000px;">
               <div class="row g-0">
                   <div class="col-md-5">
                   <img src="images/cabania-${dato.id}.jpg" class="card-img-top">
               </div>
               <div class="col-md-7">
                   <div class="card-body">
                      <div class="d-flex justify-content-between"> 
                            <div class="badges${dato.id}">
                                <span class="badge rounded-pill bg-secondary mb-3">${dato.tipo.toUpperCase()}</span>
                            </div>
                            <p>	&#11088 ${dato.calificacion}</p>
                       </div>
                       <div class="d-flex align-items-center">
                           <h2 class="card-title" style="font-size: 25px; color: #003F4A;"> ${dato.nombre}</h2>
                           <a id="${dato.id}" class="mx-2 btnFavoritos" onclick="preventDefault(event); agregarFavorito(${datos.indexOf(dato)})" href=""><i class="far fa-heart"></i></a>
                       </div>
                   <p class="card-text text-muted my-0"> ${dato.barrio}</p>
                   <p class="card-text my-0"> Precio por noche: S/${dato.precioMedio}</p>
                   <br>
                   <button onclick="book(${dato.id})" class="_1a5fl1v btn btn-room" style="border: 1px solid #003F4A; color: #003F4A; margin-right: 1rem;">Cotizar</button><button onclick="modalShow(${datos.indexOf(dato)})" class="btn btn-room" style="border: 1px solid #003F4A; color: #003F4A;">Continuar Reserva</button>
                   </div>
               </div>
           </div>
       </div>`
);
    });
    ofertados();
}

// NUEVACARD
function filtrosBusqueda(filtro) {
    $("#todosCards").empty();

    filtro.forEach(dato => {
        $("#todosCards").append(
            `<div class="mt-4">
           <div class="card shadow ${dato.tipo}" style="max-width: 1000px;">
               <div class="row g-0">
                   <div class="col-md-5">
                   <img src="images/cabania-${dato.id}.jpg" class="card-img-top">
               </div>
               <div class="col-md-7">
                   <div class="card-body">
                      <div class="d-flex justify-content-between"> 
                        <div class="badges${dato.id}">
                           <span class="badge rounded-pill bg-secondary mb-3">${dato.tipo.toUpperCase()}</span>
                        </div>
                           <p> &#11088 ${dato.calificacion}</p>
                       </div>
                       <div class="d-flex align-items-center">
                           <h2 class="card-title" style="font-size: 25px; color: #003F4A;"> ${dato.nombre}</h2>
                           <a id="${dato.id}" class="mx-2 btnFavoritos" onclick="preventDefault(event); agregarFavorito(${datos.indexOf(dato)})" href=""><i class="far fa-heart"></i></a>
                       </div>
                   <p class="card-text text-muted my-0"> ${dato.barrio}</p>
                   <p class="card-text my-0"> Precio por noche: S/${dato.precioMedio}</p>
                   <br>
                   <button onclick="book(${dato.id})" class="btn btn-room" style="border: 1px solid #003F4A; color: #003F4A; margin-right: 1rem;">Cotizar</button><button onclick="modalShow(${datos.indexOf(dato)})" class="btn btn-room" style="border: 1px solid #003F4A; color: #003F4A;">Continuar Reserva</button>
                   </div>
               </div>
           </div>
       </div>`)
    })
    ofertados()
}

function filtroBuscado(index) {
    let buscado = datos[index]
    console.log(buscado);
    $("#todosCards").empty();

    $("#todosCards").append(
        `<div class="mt-4">
           <div class="card shadow ${buscado.tipo}" style="max-width: 1000px;">
               <div class="row g-0">
                   <div class="col-md-5">
                   <img src="images/cabania-${buscado.id}.jpg" class="card-img-top">
               </div>
               <div class="col-md-7">
                   <div class="card-body">
                      <div class="d-flex justify-content-between"> 
                        <div class="badges${buscado.id}">
                           <span class="badge rounded-pill bg-secondary mb-3">${buscado.tipo.toUpperCase()}</span>
                        </div>
                           <p>	&#11088 ${buscado.calificacion}</p>
                       </div>
                       <div class="d-flex align-items-center">
                           <h2 class="card-title" style="font-size: 25px; color: #003F4A;"> ${buscado.nombre}</h2>
                           <a id="${buscado.id}" class="mx-2 btnFavoritos" onclick="preventDefault(event); agregarFavorito(${index})" href=""><i class="far fa-heart"></i></a>
                       </div>
                   <p class="card-text text-muted"> ${buscado.barrio}</p>
                   <p class="card-text"> Precio por noche: S/${buscado.precioMedio}</p>
                   <br>
                   <button onclick="book(${buscado.id})" class="btn btn-room" style="border: 1px solid #003F4A; color: #003F4A; margin-right: 1rem;">Cotizar</button><button onclick="modalShow(${index})" class="btn btn-room" style="border: 1px solid #003F4A; color: #003F4A;">Continuar Reserva</button>
                   </div>
               </div>
           </div>
       </div>`)
    ofertados()

};

//DOM
let checkInP = document.getElementById("check-in-p")    
let selectCheckIn = document.createElement("p")
    selectCheckIn.innerText = localStorage.getItem("check-in")
    checkInP.appendChild(selectCheckIn)

let checkOutP = document.getElementById("check-out-p")
let selectCheckOut = document.createElement("p")
    selectCheckOut.innerText = localStorage.getItem("check-out")
    checkOutP.appendChild(selectCheckOut)

let guestSelect = document.getElementById("pasajero-select")
let guestSelectOut = document.createElement("p")
    guestSelectOut.innerText = localStorage.getItem("pasajeros")
    guestSelect.appendChild(guestSelectOut)
let continueToBook = document.getElementById("booking")

//PRECIO HABITACIÓN
function book(id){
    let i = 0
    while(datos[i].id !== id){
        i++
    }
    continueToBook.classList.remove('invisible')
    let precioMedio = ""
        document.getElementById("valor-total").innerText = "Total: S/" + datos[i].precioMedio * localStorage.getItem("dateTotal") 
}