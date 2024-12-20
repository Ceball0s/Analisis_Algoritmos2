const express = require('express');
const bodyParser = require('body-parser');

const { esCuadrada, convertirAFormato, convertirUbicaciones } = require('./utilidades');
const { solucion } = require('./proyecto');

const app = express();
const PORT = 3000;

// Middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Página principal con formulario
app.get('/', (req, res) => {
  res.send(`
    <h1>Enviar Datos</h1>
    <form action="/process" method="POST">
      <label for="matriz1">Matriz 1 (separado por espacios):</label><br>
      <textarea id="matriz1" name="matriz1" rows="5" cols="30"></textarea><br><br>
      
      <label for="matriz2">Matriz 2 (separado por espacios):</label><br>
      <textarea id="matriz2" name="matriz2" rows="5" cols="30"></textarea><br><br>
      
      <label for="ubicaciones">Ubicaciones existentes (Formato: (1,1) (2,2)):</label><br>
      <textarea id="ubicaciones" name="ubicaciones" rows="3" cols="30"></textarea><br><br>
      
      <label for="sedes">Número de sedes a agregar:</label><br>
      <input type="number" id="sedes" name="sedes" min="1" required><br><br>
      
      <button type="submit">Enviar</button>
    </form>
  `);
});

// Procesar datos enviados desde el formulario
app.post('/process', async (req, res) => {
  try {
    // Convertir las matrices
    const matriz1 = convertirAFormato(req.body.matriz1);
    const matriz2 = convertirAFormato(req.body.matriz2);

    // Validar matrices cuadradas y del mismo tamaño
    if (!esCuadrada(matriz1) || !esCuadrada(matriz2)) {
      return res.status(400).send('Ambas matrices deben ser cuadradas.');
    }
    if (matriz1.length !== matriz2.length) {
      return res.status(400).send('Ambas matrices deben tener el mismo tamaño.');
    }

    // Procesar ubicaciones existentes
    const ubicacionesTexto = req.body.ubicaciones.trim();
    const ubicacionesExistentes = convertirUbicaciones(ubicacionesTexto);

    // Validar número de sedes
    const sedes = parseInt(req.body.sedes, 10);
    if (isNaN(sedes) || sedes < 1) {
      return res.status(400).send('El número de sedes debe ser un entero positivo.');
    }
    // Llamar a la función de solución (simulada)
    const resultado = await solucion(matriz1, matriz2, ubicacionesExistentes, sedes);

    // Mostrar resultados
    res.send(`
      <h1>Resultado</h1>
      <pre>${resultado}</pre>
    `);
  } catch (error) {
    res.status(400).send('Error al procesar los datos. Verifica el formato y los valores ingresados.');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



// // const ubicacionesExistentes = [[6, 8], [8, 4], [10, 10]]
// const ubicacionesExistentes = [[1, 1]]

// // const resultado = fs.readFileSync('entrada.json', 'utf8')
// const matriz1 = generarMatriz(5, 0, 30);
// const matriz2 = generarMatriz(5, 0, 30);
// // const lectura = JSON.parse(resultado)
// // console.log(solucion(lectura["poblacion"], lectura["empresarial"], ubicacionesExistentes))

// solucion(matriz1, matriz2, ubicacionesExistentes, 3)
// .then((respuesta) => {
//   console.log(respuesta);
// })
// .catch((error) => {
//   console.error('Error al procesar la solución:', error);
// });
