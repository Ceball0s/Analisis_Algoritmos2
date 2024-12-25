
 
//  funciones para generar Matrices
function generarMatrizCuadrada(n) {
  let matriz = []
  for (let i = 0; i < n; i++) {
    let fila = []
    for (let j = 0; j < n; j++) {
      fila.push(0) // Puedes inicializar con el valor que desees
    }
    matriz.push(fila)
  }
  return matriz
}


function mostrarArreglo(arreglo) {
  for (let y = 0; y < arreglo.length; y++) { 
    let fila = ''
    for (let x = 0; x < arreglo[y].length; x++) { 
      let elemento = String(arreglo[y][x])
      fila += elemento + ' '.repeat(3 - elemento.length) + ' |'
    }
    console.log(fila)
  } 
}


function armarArreglo(arreglo) {
  resultado = ""
  for (let y = 0; y < arreglo.length; y++) { 
    let fila = ''
    for (let x = 0; x < arreglo[y].length; x++) { 
      let elemento = String(arreglo[y][x])
      fila += elemento + ' '.repeat(2 - elemento.length) + ' | '
    }
    resultado = resultado + fila + "\n"
  } 
  return resultado
}


function agregar_ubicaciones_matriz(array,ubicaciones_existentes) {
  for (var i = 0; i < ubicaciones_existentes.length; i++) {
    y = ubicaciones_existentes[i][1]
    x = ubicaciones_existentes[i][0]
    array[y][x] = 1
  }
  return array
}


function calcular_ganancia(array,y,x) {
  sumatoria = 0
  for (var jy = Math.max(0,y-1); jy < Math.min(array.length,y+2); jy++) {
    for (var jx = Math.max(0,x-1); jx < Math.min(array.length,x+2); jx++) {
      sumatoria = sumatoria + array[jy][jx]
    }
  }
  return sumatoria
}

function esContiguo(x, y, ubicacionesExistentes, n) { 
  for (let i = 0; i < ubicacionesExistentes.length; i++) { 
    const [ux, uy] = ubicacionesExistentes[i]
    if (Math.max(y - 1, 0) <= uy && uy <= Math.min(y + 1, n - 1) && 
        Math.max(x - 1, 0) <= ux && ux <= Math.min(x + 1, n - 1)) { 
        return true
    } 
  } 
  return false
}

function generar_matriz_ganancias(array,ubicaciones_existentes,minimo_numero) {
  // Ejemplo de uso
  let matriz = generarMatrizCuadrada(array.length)
  for (var y = 0; y < array.length; y++) {
    for (var x = 0; x < array.length; x++) {
      if (esContiguo(x, y, ubicaciones_existentes,array.length) || calcular_ganancia(array,y,x) < minimo_numero){
        matriz[y][x] = 0
      } else{
        matriz[y][x] = calcular_ganancia(array,y,x)
      }
    }
  }
  return matriz
}

function encontrarPosicionesDeUnos(matriz) {
  const posiciones = []
  for (let y = 0; y < matriz.length; y++) {
    for (let x = 0; x < matriz[y].length; x++) {
      if (matriz[y][x] === 1) {
        posiciones.push([y, x])
      }
    }
  }
  return posiciones
}
function ganancia_cotigua(arreglo, y, x) {
  let sumatoria = 0

  for (let jy = Math.max(y - 1, 0); jy < Math.min(y + 2, arreglo.length); jy++) {
      for (let jx = Math.max(x - 1, 0); jx < Math.min(x + 2, arreglo[jy].length); jx++) {
          sumatoria += arreglo[jy][jx]
      }
  }

  return sumatoria
}


function ganancia(matriz1, matriz2, ubicacionesExistentes) { 
  let suma = 0
  for (let i = 0; i < ubicacionesExistentes.length; i++) { 
    const [ux, uy] = ubicacionesExistentes[i]
    suma = suma + ganancia_cotigua(matriz1,uy,ux)
    suma = suma + ganancia_cotigua(matriz2,uy,ux)
  } 
  return suma 
}

function formatearPosiciones(posiciones) { 
  return posiciones.map(pos => `(${pos[0]}, ${pos[1]})`).join(', ')
}

// Función para generar una matriz cuadrada con valores aleatorios entre un rango dado
function generarMatriz(n, min = 0, max = 100) {
  const matriz = [];
  
  for (let i = 0; i < n; i++) {
    const fila = [];
    for (let j = 0; j < n; j++) {
      // Genera un número aleatorio entre min y max (inclusive)
      const valorAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
      fila.push(valorAleatorio);
    }
    matriz.push(fila);
  }
  
  return matriz;
}
// fin funciones para generar las matrices

// validaciones

// Función para validar si una matriz es cuadrada
function esCuadrada(matriz) {
  if (!Array.isArray(matriz)) return false;
  const n = matriz.length;
  return matriz.every(row => Array.isArray(row) && row.length === n);
}

// Función para convertir la cadena en matriz bidimensional
function convertirAFormato(cadena) {
  const filas = cadena.trim().split('\n'); // Dividir por líneas
  return filas.map(fila => fila.trim().split(/\s+/).map(Number)); // Dividir por espacios y convertir a números
}

// Función para convertir ubicaciones de formato (1,1) (2,2) a [[1,1], [2,2]]
function convertirUbicaciones(cadena) {
  return cadena
    .split(')') // Separar las coordenadas por ')'
    .filter(par => par.trim()) // Filtrar posibles entradas vacías
    .map(par => par.replace('(', '').trim()) // Eliminar los paréntesis '('
    .map(par => par.split(',').map(Number)); // Separar por ',' y convertir a número
}
// fin validaciones

// Exportar las funciones 
module.exports = {
  generarMatrizCuadrada,
  mostrarArreglo,
  calcular_ganancia, 
  esContiguo, 
  generar_matriz_ganancias,
  encontrarPosicionesDeUnos,
  ganancia,
  formatearPosiciones,
  generarMatriz,
  esCuadrada,
  convertirAFormato,
  convertirUbicaciones,
  armarArreglo,
  agregar_ubicaciones_matriz
};