console.log("work work");

async function loadStudents() {
    try {
        console.log("work work2");

        let response = await fetch("../databases/students.json");
        let students = await response.json();

        const studentListContainer = document.querySelector(".studentlistcontainer");

        if (!studentListContainer) {
            console.error("No se encontró el contenedor de estudiantes.");
            return;
        }

        if (students.length > 0) {
            students.forEach(student => {
                let studentDiv = document.createElement("div");
                studentDiv.innerHTML = `
                    <img src="${student.photo}" alt="Foto de ${student.name}">
                    <p>${student.name}</p>
                    <p>${student.email}</p>
                    <p>${student.phone}</p>
                    <p>${student.enrollnumber}</p>
                    <p>${student.date}</p>
                    <img src="../storage/img/edit.png" alt="Edit">
                    <img src="../storage/img/delete.png" alt="Delete">
                `;
                studentListContainer.appendChild(studentDiv);
            });
        } else {
            console.warn("No hay estudiantes en la base de datos.");
        }
    } catch (error) {
        console.error("Error al cargar los estudiantes:", error);
    }
}

// Espera a que el JS sea importado y ejecutado
loadStudents();