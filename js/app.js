
const input = document.querySelector("#inputTarea");
const btnAgregar = document.querySelector("#btnAgregar");
const lista = document.querySelector("#listaTareas");


let tareas = JSON.parse(localStorage.getItem("tareas")) || [];


function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

