const input = document.querySelector("#inputTarea");
const btnAgregar = document.querySelector("#btnAgregar");
const lista = document.querySelector("#listaTareas");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const nuevoInput = document.querySelector("#inputTarea");
const nuevoBtnAgregar = document.querySelector("#btnAgregar");
const nuevaLista = document.querySelector("#listaTareas");
const tablaTareas = document.querySelector("#tablaTareas");
const buscador = document.querySelector("#buscador");
const btnBuscar = document.querySelector("#btnBuscar");



function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}


function renderizarTabla(filtro = "") {

    tablaTareas.innerHTML = "";

    tareas
        .filter(t =>
            t.texto.toLowerCase().includes(filtro.toLowerCase())
        )
        .forEach(tarea => {

            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${tarea.texto}</td>

                <td>
                    ${tarea.estado === "iniciada"
                        ? '<i class="bi bi-asterisk"></i>'
                        : ""}
                </td>

                <td>
                    ${tarea.estado === "en progreso"
                        ? '<i class="bi bi-alarm"></i>'
                        : ""}
                </td>

                <td>
                    ${tarea.estado === "finalizada"
                        ? '<i class="bi bi-check2-square"></i>'
                        : ""}
                </td>
            `;

            tablaTareas.appendChild(tr);
        });
}


function renderizarTareas() {

    nuevaLista.innerHTML = "";

    tareas.forEach((tarea, index) => {

        const li = document.createElement("li");

        li.className =
            "list-group-item d-flex flex-column gap-3";


        const span = document.createElement("span");

        span.className = "fw-semibold";

        span.textContent = tarea.texto;

        if (tarea.estado === "iniciada") {
            span.classList.add("text-success");
        }

        if (tarea.estado === "en progreso") {
            span.classList.add("text-warning");
        }

        if (tarea.estado === "finalizada") {
            span.classList.add("text-primary");
        }


        const contenedorBotones = document.createElement("div");

        contenedorBotones.className =
            "d-flex flex-wrap gap-2";


        const btnIniciada =
            document.createElement("button");

        btnIniciada.textContent = "Iniciada";

        btnIniciada.className =
            "btn btn-success btn-sm";

        btnIniciada.addEventListener("click", () => {

            tareas[index].estado = "iniciada";

            guardarTareas();

            renderizarTareas();
        });



        const btnProgreso =
            document.createElement("button");

        btnProgreso.textContent = "En progreso";

        btnProgreso.className =
            "btn btn-warning btn-sm";

        btnProgreso.addEventListener("click", () => {

            tareas[index].estado = "en progreso";

            guardarTareas();

            renderizarTareas();
        });

        const btnFinalizada =
            document.createElement("button");

        btnFinalizada.textContent = "Finalizada";

        btnFinalizada.className =
            "btn btn-primary btn-sm";

        btnFinalizada.addEventListener("click", () => {

            tareas[index].estado = "finalizada";

            guardarTareas();

            renderizarTareas();
        });


        const btnEliminar =
            document.createElement("button");

        btnEliminar.textContent = "Eliminar";

        btnEliminar.className =
            "btn btn-danger btn-sm";

        btnEliminar.addEventListener("click", () => {

            tareas.splice(index, 1);

            guardarTareas();

            renderizarTareas();
        });



        contenedorBotones.appendChild(btnIniciada);
        contenedorBotones.appendChild(btnProgreso);
        contenedorBotones.appendChild(btnFinalizada);
        contenedorBotones.appendChild(btnEliminar);

        li.appendChild(span);
        li.appendChild(contenedorBotones);

        nuevaLista.appendChild(li);
    });

    renderizarTabla();
}



function agregarTarea() {

    const texto = nuevoInput.value.trim();

    if (texto === "") return;

    const existe = tareas.some(
        t => t.texto.toLowerCase() === texto.toLowerCase()
    );

    if (existe) {
        alert("La tarea ya existe");
        return;
    }

    tareas.push({
        texto: texto,
        estado: "pendiente"
    });

    guardarTareas();

    renderizarTareas();

    nuevoInput.value = "";
}



btnBuscar.addEventListener("click", () => {

    renderizarTabla(buscador.value);
});

buscador.addEventListener("keyup", () => {

    renderizarTabla(buscador.value);
});



nuevoBtnAgregar.addEventListener(
    "click",
    agregarTarea
);

nuevoInput.addEventListener(
    "keypress",
    (e) => {

        if (e.key === "Enter") {
            agregarTarea();
        }
    }
);


renderizarTareas();