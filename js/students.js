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
        students.forEach((student, index) => {
          let studentDiv = document.createElement("div");
          studentDiv.setAttribute("data-index", index);
          studentDiv.innerHTML = `
            <img src="${student.photo}" alt="Foto de ${student.name}">
            <p>${student.name}</p>
            <p>${student.email}</p>
            <p>${student.phone}</p>
            <p>${student.enrollnumber}</p>
            <p>${student.date}</p>
            <img class="editIcon" src="../storage/img/editIcon.svg" alt="Edit">
            <img class="deleteIcon" src="../storage/img/deleteIcon.svg" alt="Delete">
          `;
  
          // Listener para editar
          const editIcon = studentDiv.querySelector(".editIcon");
          editIcon.addEventListener("click", () => {
            openEditModal(student, index);
          });
  
          // Listener para eliminar
          const deleteIcon = studentDiv.querySelector(".deleteIcon");
          deleteIcon.addEventListener("click", async () => {
            if (confirm("¿Estás seguro de que deseas eliminar este estudiante?")) {
              try {
                let deleteResponse = await fetch(`http://localhost:3000/students/${index}`, {
                  method: "DELETE"
                });
                if (deleteResponse.ok) {
                  alert("Estudiante eliminado exitosamente!");
                  loadStudents(); // Recargar la lista actualizada
                } else {
                  alert("Error al eliminar estudiante");
                }
              } catch (error) {
                console.error("Error al eliminar estudiante:", error);
              }
            }
          });
  
          studentListContainer.appendChild(studentDiv);
        });
      } else {
        console.warn("No hay estudiantes en la base de datos.");
      }
    } catch (error) {
      console.error("Error al cargar los estudiantes:", error);
    }
  }

// Función para manejar la apertura y cierre del modal de agregar estudiante
async function setupStudentModal() {
  console.log("button its working");
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

  // Manejar el envío del formulario para agregar un estudiante
  studentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("photo", document.getElementById("photo").files[0]);
    formData.append("name", document.getElementById("name").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("phone", document.getElementById("phone").value);
    formData.append("enrollnumber", document.getElementById("enrollnumber").value);
    formData.append("date", document.getElementById("date").value);

    try {
      let response = await fetch("http://localhost:3000/students", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        alert("Estudiante agregado exitosamente!");
        studentModal.close();
        loadStudents(); // Recargar la lista actualizada
      } else {
        alert("Error al agregar estudiante");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
}

// Función para abrir el modal de edición y cargar los datos del estudiante
async function openEditModal(student, index) {
  const editModal = document.getElementById("editStudentModal");
  const editForm = document.getElementById("editStudentForm");
  const closeEditModal = document.getElementById("closeEditModal");

  // Prellenar los campos del formulario con los datos del estudiante
  document.getElementById("editName").value = student.name;
  document.getElementById("editEmail").value = student.email;
  document.getElementById("editPhone").value = student.phone;
  document.getElementById("editEnrollnumber").value = student.enrollnumber;
  document.getElementById("editDate").value = student.date;

  // Abrir el modal
  editModal.showModal();

  // Asignar el evento de cierre (usando onclick para reemplazar cualquier listener previo)
  closeEditModal.onclick = () => {
    editModal.close();
  };

  // Manejar el envío del formulario para actualizar el estudiante
  editForm.onsubmit = async function(e) {
    e.preventDefault();

    const updatedStudent = {
      name: document.getElementById("editName").value,
      email: document.getElementById("editEmail").value,
      phone: document.getElementById("editPhone").value,
      enrollnumber: document.getElementById("editEnrollnumber").value,
      date: document.getElementById("editDate").value,
      // Se mantiene la foto actual, o se puede implementar la actualización si se requiere
      photo: student.photo 
    };

    try {
      // Suponiendo que implementas un endpoint PUT para actualizar el estudiante:
      let response = await fetch(`http://localhost:3000/students/${index}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedStudent)
      });

      if (response.ok) {
        alert("Estudiante actualizado exitosamente!");
        editModal.close();
        loadStudents(); // Recargar la lista actualizada
      } else {
        alert("Error al actualizar estudiante");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
}

// Iniciar la carga y configuración una vez que se haya cargado el DOM
loadStudents();
setupStudentModal();