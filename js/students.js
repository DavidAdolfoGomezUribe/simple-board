document.addEventListener("DOMContentLoaded", async function () {
    try {
        let response = await fetch("../databases/students.json");
        let students = await response.json();

        const studentListContainer = document.querySelector(".studentlistcontainer");

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
});