let btnVehiculos = document.querySelector('#btnVehiculos');
btnVehiculos.addEventListener("click", load);

let btnAutos = document.querySelector('#btnAutos');
btnAutos.addEventListener("click", () => {
    loadByType('Auto');
})

let btnCamionetas = document.querySelector('#btnCamionetas');
btnCamionetas.addEventListener("click", () => {
    loadByType('Camioneta');
})

let btnBuscarPatente = document.querySelector('#btnBuscarPatente');
btnBuscarPatente.addEventListener("click", () => {
    let indexBuscarPatente = document.querySelector('#buscarPatente').value;
    document.querySelector('#buscarPatente').value = "";
    loadByPatente(indexBuscarPatente);
})

let btnAgregarVehiculo = document.querySelector("#btnAgregar");
btnAgregarVehiculo.addEventListener("click", agregar);

let btnGuardarVehiculo = document.querySelector("#btnGuardar");
btnGuardarVehiculo.addEventListener("click", agregar);

let vehiculos = [];
load();

async function load() {
    try {
        let r = await fetch('/vehiculo');
        let json = await r.json();
        vehiculos = json;
        mostrarTablaVehiculo();
    } catch (err) {
        alert(err.message);
    }
}

async function loadByType(tipo) {
    try {
        let r = await fetch(`/vehiculo/${tipo}`);
        let json = await r.json();
        vehiculos = json;
        mostrarTablaVehiculo();
    } catch (err) {
        alert(err.message);
    }
}

async function loadByPatente(indexBuscarPatente) {
    try {
        let r = await fetch(`/vehiculo/p/${indexBuscarPatente}`);
        let json = await r.json();
        vehiculos = [];
        vehiculos.push(json);
        mostrarTablaVehiculo();
    } catch (err) {
        alert("patente no encontrada");
    }
}

function agregar() {
    let tipo = document.querySelector('#tipo').value;
    let patente = document.querySelector('#patente').value;
    let marca = document.querySelector('#marca').value;
    let modelo = document.querySelector('#modelo').value;
    let anio = document.querySelector('#anio').value;
    let precio = document.querySelector('#precio').value;
    let capacidad = document.querySelector('#capacidad').value;
    let renglon = {
        "tipo": tipo,
        "patente": patente,
        "marca": marca,
        "modelo": modelo,
        "anio": anio,
        "precio": precio,
        "capacidad": capacidad
    }
    let isDisabled = document.querySelector("#btnAgregar").disabled;
    if (!isDisabled)
        agregarAServidor(renglon, "POST");
    else {
        document.querySelector("#btnGuardar").disabled = true;
        document.querySelector("#btnAgregar").disabled = false;
        agregarAServidor(renglon, "PUT");
        
    }
    load();
}

async function agregarAServidor(renglon, peticion) {
    try {
        let r = await fetch(`/vehiculo/`, {
            "method": `${peticion}`,
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(renglon)
        });
        return 'ok';
    } catch (err) {
        alert(err.message);
    }
}

function editar() {
    let datos = this.getAttribute("datos").split(',');
    document.querySelector("#tipo").value = datos[0];
    document.querySelector("#patente").value = datos[1];
    document.querySelector("#marca").value = datos[2];
    document.querySelector("#modelo").value = datos[3];
    document.querySelector("#anio").value = datos[4];
    document.querySelector("#precio").value = datos[5];
    document.querySelector("#capacidad").value = datos[6];
    document.querySelector("#btnGuardar").disabled = false;
    document.querySelector("#btnAgregar").disabled = true;
}

async function eliminar(patente) {
    // let patente = this.getAttribute("patente");
    try {
        let r = await fetch(`/vehiculo/${patente}`, {
            "method": "DELETE",
            "headers": { "Content-Type": "application/json" },
        });
        return 'ok';
    } catch (err) {
        alert(err.message);
    }
}

function mostrarTablaVehiculo() {
    let html = "";
    let capacidad, tipo;

    for (let r of vehiculos) {
        if (r != null) {
            if (r.capacidadBaul) {
                capacidad = r.capacidadBaul;
                tipo = "Auto";
            }
            else {
                capacidad = r.capacidadCarga;
                tipo = "Camioneta";
            }
            html += `
            <tr>
                <td>${r.patente}</td>
                <td>${r.marca}</td>
                <td>${r.modelo}</td>
                <td>${r.anio}</td>
                <td>${r.precio}</td>
                <td>${capacidad}</td>
                <td>
                    <button class="btnModificar" datos=${tipo},${r.patente},${r.marca},${r.modelo},${r.anio},${r.precio},${capacidad},>M</button>
                    <button class="btnEliminar" patente=${r.patente}>B</button>
                </td>
            </tr>
            `;
        }
    }
    document.querySelector("#tblVehiculos").innerHTML = html;
    let btnModificar = document.querySelectorAll(".btnModificar");
    btnModificar.forEach(btn => {
        btn.addEventListener("click", editar);
    })
    let btnEliminar = document.querySelectorAll(".btnEliminar");
    btnEliminar.forEach(btn => {
        btn.addEventListener("click", function() {
            eliminar(this.getAttribute('patente'));
            load();
        });
    })
}

