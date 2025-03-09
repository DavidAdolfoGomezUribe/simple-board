console.log("work work");

// Función para cargar los estudiantes y mostrarlos en la página
async function loadStudents() {
    try {
        let response = await fetch("http://localhost:3000/students");
        let students = await response.json();

        const studentListContainer = document.querySelector(".studentlistcontainer");

        if (!studentListContainer) {
            console.error("No se encontró el contenedor de estudiantes.");
            return;
        }

        // Limpiar la lista antes de volver a cargar
        studentListContainer.innerHTML = "";

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



// Función para manejar la apertura y cierre del modal
async function setupStudentModal() {
    console.log("button its working")
    const studentModal = document.getElementById("studentModal");
    const studentForm = document.getElementById("studentForm");
    const closeModal = document.getElementById("closeModal");
    const addStudentButton = document.getElementById("addStudentButton"); // Botón "ADD NEW STUDENT"

    if (!studentModal || !studentForm || !addStudentButton) {
        console.error("No se encontró el modal o el formulario.");
        return;
    }

    // Abrir modal al hacer clic en "ADD NEW STUDENT"
    addStudentButton.addEventListener("click", () => {
        studentModal.showModal();
    });

    // Cerrar modal con el botón "Cancel"
    closeModal.addEventListener("click", () => {
        studentModal.close();
    });

    // Manejar el envío del formulario
    studentForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const newStudent = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            enrollnumber: document.getElementById("enrollnumber").value,
            date: document.getElementById("date").value
        };

        try {
            let response = await fetch("http://localhost:3000/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newStudent)
            });

            if (response.ok) {
                alert("Estudiante agregado exitosamente!");
                studentModal.close();
                loadStudents(); // Recargar la lista
            } else {
                alert("Error al agregar estudiante");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
}



loadStudents();
setupStudentModal();