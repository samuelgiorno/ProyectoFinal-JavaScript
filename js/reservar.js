 const inputReservas = localStorage.pedidos ? JSON.parse(localStorage.pedidos) : [];

 // OBJETO PEDIDOS
 class Reservas {
     constructor(nombreCliente, nombredato, diaSeleccionado, diaSalida, horaSeleccionada, numeroHuespedes) {
         this.nombreCliente = nombreCliente,
             this.nombre = nombredato,
             this.dia = diaSeleccionado,
             this.salida = diaSalida,
             this.hora = horaSeleccionada,
             this.personas = numeroHuespedes,
             this.reservado = true
     }
 }

 // FUNCION PARA TOMAR RESERVA
 function tomoInputs() {

     let inputNombre = $("#inputNombre").val();
     let numeroHuespedes = Number($('#inputPersonas option:selected').text());
     let inputDia = $('#seleccionDia').val();
     let inputSalida = $('#seleccionSalida').val();
     let horaSeleccionada = $('#seleccionHora option:selected').text();
     let hospedajeSeleccionado = $("#datoName").val();

     if ((inputNombre === "") || (inputNombre === undefined)) {
         $('.invalid-feedback').show()
     } else {
         let diaSeleccionado = $('#seleccionDia').val();
         let diaSalida = $('#seleccionSalida').val();
         inputReservas.push(new Reservas(inputNombre, hospedajeSeleccionado, diaSeleccionado, diaSalida, horaSeleccionada, numeroHuespedes));
         localStorage.pedidos = JSON.stringify(inputReservas);
         confirmaReserva()
     }
 }

 const tomoModal = document.querySelector("#modalReserva");
 let confirmado

 function confirmaReserva() {
     localStorage.pedidos = JSON.stringify(inputReservas)
     $("#modalContent").empty()

     confirmado = inputReservas[inputReservas.length - 1]

     $("#modalContent").append(`<div class="p-5 my-2">
    <p class="titulo-confirm">Gracias por reservar con nosotros!</p><br>
    <p class="texto-confirm">Detalles de tu reserva: <br>
    Nombre y Apellido: ${confirmado.nombreCliente} <br>
    Hospedaje: ${confirmado.nombre} <br>
    Día de entrada: ${confirmado.dia.split("-")[2]}/${confirmado.dia.split("-")[1]}<br>
    Día de salida: ${confirmado.salida.split("-")[2]}/${confirmado.salida.split("-")[1]}<br>
    Hora de entrada: ${confirmado.hora}<br>
    Nº de personas: ${confirmado.personas}</p>
    
    <div class="mt-3">
    <button class="btn-confirm me-2" data-bs-dismiss="modal">Confirmar</button> 
    <button id="btn-cancel" class="btn-cancel" data-bs-dismiss="modal" onclick='cancelElement(${inputReservas.indexOf(confirmado)})'>Cancelar</button>
   </div>
    </div>`);
 }

 // CANCELAR ELEMENTO
 function cancelElement(i) {
     inputReservas.splice(i, 1);
     localStorage.pedidos = JSON.stringify(inputReservas);
 }

 $("btnCancel").click(cancelElement);

 let fecha

 // FUNCION MODAL
 function modalShow(index) {
     let modalReserva = datos[index];
     $("#exampleModal").empty();

     let hoy = moment().format('YYYY-MM-DD');
     $("#exampleModal").append(` <div class="modal-dialog modal-dialog-scrollable" id="modalReserva">
    <div class="modal-content" id="modalContent">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Tu Reserva en ${modalReserva.nombre} </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <form class="modal-body form-label row">
        <input type="text" value="${modalReserva.nombre}" id="datoName" hidden>
        <div class="input-nombre mb-3 mt-2"> 
            <label class="mb-2">Ingrese su nombre y Apellido</label>
            <div class="col-8 has-validation">
                <input class="form-control mb-3" type="text" name="" id="inputNombre" placeholder="Nombre y Apellido">
                <div class="invalid-feedback">
                    Por favor ingrese un nombre.
                </div>
            </div>
        </div>
        <div class="cant-personas mt-2 "> 
            <label class="mb-2">Seleccione la cantidad de personas</>
            <div class="col-3">
            <select class="form-control" name="" id="inputPersonas">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
            </div>
        </div>    
        <div class="seleccion-dia mt-4 has-validation "> 
            <label class="mb-2">Seleccione el día de ingreso</label>
            <div class="col-8 has-validation ">
                <input class="form-control" type="date" id="seleccionDia" value="" min=${hoy} onchange="changeDate(${datos.indexOf(modalReserva)})" required>
                <div class="invalid-feedback">
                Por favor elegí una fecha válida.
                </div>
            </div>
        </div>
        <div class="seleccion-dia mt-4 has-validation "> 
            <label class="mb-2">Seleccione el día de salida</label>
            <div class="col-8 has-validation ">
                <input class="form-control" type="date" id="seleccionSalida" value="" onchange="changeDate(${datos.indexOf(modalReserva)})" required>
                <div class="invalid-feedback">
                Por favor elegí una fecha válida.
                </div>
            </div>
        </div>
        <div class="seleccion-horario mt-4"> 
        <label class="mb-2">Seleccione la hora de entrada</label>
            <div class="col-8">
            <select class="form-control" name="" id="seleccionHora" required>
            ${disponibleHorario(datos.indexOf(modalReserva))}</select>
            </div>
        </div>
    </form>
    <div class="modal-footer">
        <button type="button" id="btn-confirm" class="btn-confirm" onclick="tomoInputs(${modalReserva.id})">Confirmar</button>
    </div>
    </div>
</div>`)

     $("#exampleModal").modal("show");
 }

 function changeDate(id) {
     fecha = $("#seleccionDia").val()
     disponibleHorario(id)
 }

 let pedidosExistentes

 function disponibleHorario(id) {
     let input = document.getElementById("seleccionHora") ? document.getElementById("seleccionHora") : undefined

     let dato = datos[id]
     let datoHorarios = ["11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"]

     pedidosExistentes = localStorage.pedidos ? JSON.parse(localStorage.pedidos) : []

     let existen = pedidosExistentes.filter(e => e.nombre === dato.nombre);

     let existenMasFecha = existen.filter(e => e.dia == fecha)

     for (let index = 0; index < existenMasFecha.length; index++) {
         const element = existenMasFecha[index].hora
         let ind = datoHorarios.indexOf(element)
         datoHorarios.splice(ind, 1)
     }
     if (input) {
         input.innerHTML = ""
         datoHorarios.forEach(e => {
             let option = document.createElement("option")
             option.value = e;
             option.innerHTML = e;
             input.appendChild(option)
         })
     }

 }