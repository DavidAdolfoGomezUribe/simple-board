const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 3000;
const DATA_FILE = "./databases/students.json";

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Guarda en la carpeta de imágenes de estudiantes
    cb(null, "./storage/img/students/");
  },
  filename: function (req, file, cb) {
    // Guarda el archivo con su nombre original
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

// Ruta para obtener estudiantes
app.get("/students", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer el archivo" });
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para agregar un estudiante (con subida de imagen)
app.post("/students", upload.single("photo"), (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer el archivo" });
    }

    let students = JSON.parse(data);
    const newStudent = {
      photo: `../storage/img/students/${req.file.filename}`, // ruta de la imagen subida
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      enrollnumber: req.body.enrollnumber,
      date: req.body.date
    };

    students.push(newStudent);

    fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2), "utf8", (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al guardar el archivo" });
      }
      res.status(201).json({ message: "Estudiante agregado", student: newStudent });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Endpoint para actualizar un estudiante (usando índice, por ejemplo)
app.put("/students/:index", (req, res) => {
    fs.readFile(DATA_FILE, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Error al leer el archivo" });
      }
  
      let students = JSON.parse(data);
      const index = parseInt(req.params.index, 10);
      if (index < 0 || index >= students.length) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
      }
  
      // Actualiza el estudiante (puedes ajustar según tus necesidades)
      students[index] = { ...students[index], ...req.body };
  
      fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2), "utf8", (err) => {
        if (err) {
          return res.status(500).json({ error: "Error al guardar el archivo" });
        }
        res.json({ message: "Estudiante actualizado", student: students[index] });
      });
    });
  });

// Delete para eliminar un estudiante
app.delete("/students/:index", (req, res) => {
    fs.readFile(DATA_FILE, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Error al leer el archivo" });
      }
  
      let students = JSON.parse(data);
      const index = parseInt(req.params.index, 10);
      if (index < 0 || index >= students.length) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
      }
  
      // Elimina el estudiante
      students.splice(index, 1);
  
      fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2), "utf8", (err) => {
        if (err) {
          return res.status(500).json({ error: "Error al guardar el archivo" });
        }
        res.json({ message: "Estudiante eliminado exitosamente" });
      });
    });
  });