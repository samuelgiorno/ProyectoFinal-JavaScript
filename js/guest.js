//BUSCADOR DE RESERVA
let guests = [ '', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let pasajeros = document.getElementById('pasajeros'); 

function opciones(lista, opcion){
    let elemento = "";
    for (let i = 0; i < lista.length; i++){
        elemento += "<option>" + lista[i] + "</option>";
    }
    opcion.innerHTML = elemento
} 
opciones(guests, pasajeros)

//PASAJEROS
function obtenerPasajero(){
    let pasajeroSelect = document.getElementById("pasajeros");
    localStorage.setItem(pasajeroSelect.id, pasajeroSelect.value)
}

//FECHAS
let checkIn = document.getElementById("check-in");
let checkOut = document.getElementById("check-out");

function obtenerFecha(){   
    localStorage.setItem(checkIn.id,checkIn.value);
    localStorage.setItem(checkOut.id, checkOut.value);
   
    let checkInDate = new Date(checkIn.value);
    let checkOutDate = new Date(checkOut.value);
    let dateTotal = checkOutDate - checkInDate;
    localStorage.setItem("dateTotal", Math.floor(dateTotal / (1000 * 60 * 60 * 24)));

}

function pasajeroDatos(){
    obtenerPasajero()
    obtenerFecha()
    
    if(checkIn.value,checkOut.value,pasajeros.value === null || checkIn.value,checkOut.value,pasajeros.value === ''){
        alert("Select a date and guests to continue")
    } else{
        window.location.href = "find.html";
    }
}
