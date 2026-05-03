
const input = document.querySelector("#inputTarea");
const btnAgregar = document.querySelector("#btnAgregar");
const lista = document.querySelector("#listaTareas");


let tareas = JSON.parse(localStorage.getItem("tareas")) || [];


function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function renderizarTareas() {
    lista.innerHTML = "";

    tareas.forEach((tarea, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        const span = document.createElement("span");
        span.textContent = tarea.texto;

        if (tarea.completada) {
            span.style.textDecoration = "line-through";
        }


        span.addEventListener("click", () => {
            tareas[index].completada = !tareas[index].completada;
            guardarTareas();
            renderizarTareas();
        });


        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.className = "btn btn-danger btn-sm";

        btnEliminar.addEventListener("click", () => {
            tareas.splice(index, 1);
            guardarTareas();
            renderizarTareas();
        });

        li.appendChild(span);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
}


function agregarTarea() {
    const texto = input.value.trim();

    if (texto === "") return;


    const existe = tareas.some(t => t.texto === texto);
    if (existe) {
        alert("La tarea ya existe");
        return;
    }

    tareas.push({
        texto: texto,
        completada: false
    });

    guardarTareas();
    renderizarTareas();

    input.value = "";
}


btnAgregar.addEventListener("click", agregarTarea);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        agregarTarea();
    }
});


renderizarTareas();


