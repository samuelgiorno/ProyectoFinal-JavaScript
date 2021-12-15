let datos = [];

document.addEventListener('DOMContentLoaded', cargaInicial);

function cargaInicial() {
    $.ajax({
        url: 'js/datos.json',
        success: function(response) {
            console.log(response);
            datos = response;
        },
        error: function(error, jqXHR, status) {
            console.log(error);
        }
    });
}

let textoBuscador = document.querySelector("#hotel-name");
let resultado = document.querySelector(".autocomplete");

function preventDefault(e) {
    e.preventDefault();
}

// GUARDO DEL STORAGE BUSCADOR
let itemBuscado = localStorage.getItem("buscado");

function linkItem(id) {
    itemBuscado = datos.find(i => i.id === id);
    console.log(itemBuscado);
    localStorage.buscado = JSON.stringify(itemBuscado)
    console.log(id);
}

// FUNCION BUSCAR ITEMS 
function buscadorPrincipal() {
    resultado.innerHTML = "";
    let textoIngresado = textoBuscador.value;
    let encontrados = [];
    encontrados = datos.filter(i => i.nombre.toUpperCase().includes(textoIngresado.toUpperCase()));

    if (textoIngresado.length == 0) {
        resultado.innerHTML = "";
    } else {
        encontrados.forEach(item => {
            resultado.innerHTML += `<li onclick="linkItem(${item.id})" id="${item.id}" class="liSearch">
                                        <img src="/images/icono/ico180.png" style="max-width: 30px;"> <a href="find.html">${item.nombre}</a>
                                    </li>`;
        });
    }
}