// Array para almacenar los estudiantes seleccionados obtenidos del almacenamiento local
let estudiantesSeleccionados = JSON.parse(localStorage.getItem('estudiantesSeleccionados')) || [];

// Array de estudiantes 
const estudiantes = [
    {
        nombre: "Esteban",
        foto: "./img/img01.jpg",
        telefono: "Cel: 1231233",
        tutor: "Tutor 1",
        telefonoTutor: "Cel: 1232134",
        asistencia: "90%", // Porcentaje de asistencia
        materias: [
            { nombre: "Matemáticas", nota: 8 },
            { nombre: "Ciencias", nota: 7 },
            { nombre: "Historia", nota: 9 }
        ]
    },
    {
        nombre: "Jacinto",
        foto: "./img/img02.jpg",
        telefono: "Cel: 1231233",
        tutor: "Tutor 2",
        telefonoTutor: "Cel: 1232134",
        asistencia: "85%", // Porcentaje de asistencia
        materias: [
            { nombre: "Matemáticas", nota: 7 },
            { nombre: "Ciencias", nota: 9 },
            { nombre: "Historia", nota: 8 }
        ]
    },
    {
        nombre: "Alberto",
        foto: "./img/img01.jpg",
        telefono: "Cel: 1231233",
        tutor: "Tutor 3",
        telefonoTutor: "Cel: 1232134",
        asistencia: "95%", // Porcentaje de asistencia
        materias: [
            { nombre: "Matemáticas", nota: 9 },
            { nombre: "Ciencias", nota: 8 },
            { nombre: "Historia", nota: 7 }
        ]
    },

    {
        nombre: "Claudio",
        foto: "./img/img01.jpg",
        telefono: "Cel: 1231233",
        tutor: "Tutor 1",
        telefonoTutor: "Cel: 1232134",
        asistencia: "90%", // Porcentaje de asistencia
        materias: [
            { nombre: "Matemáticas", nota: 8 },
            { nombre: "Ciencias", nota: 7 },
            { nombre: "Historia", nota: 9 }
        ]
    },
    {
        nombre: "Valentino",
        foto: "./img/img02.jpg",
        telefono: "Cel: 1231233",
        tutor: "Tutor 2",
        telefonoTutor: "Cel: 1232134",
        asistencia: "85%", // Porcentaje de asistencia
        materias: [
            { nombre: "Matemáticas", nota: 7 },
            { nombre: "Ciencias", nota: 9 },
            { nombre: "Historia", nota: 8 }
        ]
    },
    {
        nombre: "Benicio",
        foto: "./img/img01.jpg",
        telefono: "Cel: 1231233",
        tutor: "Tutor 3",
        telefonoTutor: "Cel: 1232134",
        asistencia: "95%", // Porcentaje de asistencia
        materias: [
            { nombre: "Matemáticas", nota: 9 },
            { nombre: "Ciencias", nota: 8 },
            { nombre: "Historia", nota: 7 }
        ]
    },
    // Agregar más estudiantes según sea necesario
];

// Función para cargar estudiantes en la página y aplicar filtrado
const cargarEstudiantes = () => {
    const contenedorEstudiantes = document.getElementById("estudiantes");
    const inputBusqueda = document.getElementById("busqueda");
    contenedorEstudiantes.innerHTML = ""; // Limpiar el contenido existente

    // Recorrer cada estudiante y agregar su información al HTML
    estudiantes.forEach((estudiante) => {
        // Filtrar estudiantes por el término de búsqueda
        if (inputBusqueda.value.trim() === '' || estudiante.nombre.toLowerCase().includes(inputBusqueda.value.trim().toLowerCase())) {
            const divEstudiante = document.createElement("div");
            divEstudiante.classList.add("estudiante");

            const img = document.createElement("img");
            img.src = estudiante.foto;
            divEstudiante.appendChild(img);

            const h3 = document.createElement("h3");
            h3.textContent = estudiante.nombre;
            divEstudiante.appendChild(h3);

            const button = document.createElement("button");
            button.textContent = "Seleccionar";
            button.addEventListener("click", () => seleccionarEstudiante(estudiante));
            divEstudiante.appendChild(button);

            contenedorEstudiantes.appendChild(divEstudiante);
        }
    });
};

// Función para seleccionar un estudiante
const seleccionarEstudiante = (estudiante) => {
    // Verificar si el estudiante ya está seleccionado
    if (!estudiantesSeleccionados.find(selected => selected.nombre === estudiante.nombre)) {
        // Verificar si ya se seleccionaron tres estudiantes
        if (estudiantesSeleccionados.length < 3) {
            estudiantesSeleccionados.push(estudiante);
            localStorage.setItem('estudiantesSeleccionados', JSON.stringify(estudiantesSeleccionados));
            mostrarDetalles();
        } else {
            alert("Solo se pueden seleccionar hasta tres estudiantes.");
        }
    } else {
        alert("Este estudiante ya ha sido seleccionado.");
    }
};

// Función para mostrar los detalles de los estudiantes seleccionados
const mostrarDetalles = () => {
    const detallesEstudiante = document.getElementById("detalles-estudiante");
    detallesEstudiante.style.display = "flex"; // Mostrar la sección de detalles

    // Limpiar la lista de detalles antes de mostrar los nuevos
    detallesEstudiante.innerHTML = "";

    // Mostrar los detalles de cada estudiante seleccionado
    estudiantesSeleccionados.forEach((estudiante) => {
        const divEstudianteDetalles = document.createElement("div");
        divEstudianteDetalles.classList.add("estudiante-detalles");

        let detallesHTML = `
            <h3>${estudiante.nombre}</h3>
            <p><strong>Teléfono:</strong> ${estudiante.telefono}</p>
            <p><strong>Tutor:</strong> ${estudiante.tutor}</p>
            <p><strong>Teléfono del tutor:</strong> ${estudiante.telefonoTutor}</p>
            <p><strong>Asistencia:</strong> ${estudiante.asistencia}</p>
            <p><strong>Materias:</strong></p>
            <ul>
        `;

        estudiante.materias.forEach((materia) => {
            detallesHTML += `<li>${materia.nombre}: ${materia.nota}</li>`;
        });

        detallesHTML += `</ul>`;
        divEstudianteDetalles.innerHTML = detallesHTML;
        detallesEstudiante.appendChild(divEstudianteDetalles);
    });

    // Agregar botón para limpiar lista
    const limpiarListaButton = document.createElement("button");
    limpiarListaButton.textContent = "Limpiar Lista";
    limpiarListaButton.addEventListener("click", limpiarLista);
    detallesEstudiante.appendChild(limpiarListaButton);
};

// Función para limpiar la lista de estudiantes seleccionados
const limpiarLista = () => {
    localStorage.removeItem('estudiantesSeleccionados');
    estudiantesSeleccionados = []; // Limpiar la lista de estudiantes seleccionados
    const detallesEstudiante = document.getElementById("detalles-estudiante");
    detallesEstudiante.style.display = "none"; // Ocultar la sección de detalles
};

// Escuchar el evento de entrada del usuario en la barra de búsqueda
document.getElementById("busqueda").addEventListener("input", cargarEstudiantes);

// Cargar estudiantes cuando se cargue la página
window.addEventListener("DOMContentLoaded", cargarEstudiantes);
