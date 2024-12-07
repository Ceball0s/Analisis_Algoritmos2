const MiniZinc = require('minizinc')
const { generar_matriz_ganancias,encontrarPosicionesDeUnos, ganancia } = require('./utilidades')
const fs = require('fs')


// function retornarPromesa(solve){
//   // Transforma `solve` en una promesa
//   const solvePromise = new Promise((resolve, reject) => {
//     // Escucha cuando se encuentre una solución
//     solve.on('solution', solution => {
//       resolve({
//         solution: solution.output.json,
//         statistics: solution.statistics
//       });
//     });

//     // Escucha si ocurre un error
//     solve.on('error', (error) => {
//       reject(error);
//     });

//     //Escucha estadísticas, puedes usarlas si es necesario
//     solve.on('statistics', stats => {
//       console.log(stats.statistics);
//     });
//   });
//   return solvePromise;
// }


// funciones minimaz

function generarSolucion(matriz1, matriz2){
  const model = new MiniZinc.Model()
  const n = matriz1.length
  model.addString(`int: n = ${n};`)// tamaño matriz
  // Convertir matriz en una sola dimensión 
  const matriz1EnUnaDimension = matriz1.flatMap(fila => fila).join(", ")
  const matriz2EnUnaDimension = matriz2.flatMap(fila => fila).join(", ")
  model.addString(`array[1..n, 1..n] of int: poblacion = array2d(1..${n}, 1..${n}, [${matriz1EnUnaDimension}]);`)
  model.addString(`array[1..n, 1..n] of int: empresas = array2d(1..${n}, 1..${n}, [${matriz2EnUnaDimension}]);`)

  model.addString(`
  % Variables de decisión: 1 si se construye una universidad en la zona, 0 en caso contrario
  array[1..n, 1..n] of var 0..1: universidades;

  % Restricción: solo se pueden construir 4 universidades
  constraint sum(i in 1..n, j in 1..n)(universidades[i,j]) = 4;

  %Restricción: no se puede construir en zonas adyacentes
  constraint forall(i in 1..n, j in 1..n)(
    if universidades[i,j] = 1 then
      forall(k in max(1,i-1)..min(n,i+2), l in max(1,j-1)..min(n,j+2))(
        if (i != k \\/ j != l) then
          universidades[k,l] = 0
        endif
      )
    endif
  );

  % Función objetivo: maximizar la suma ponderada de población y empresas
  var int: ganancia = sum(i in 1..n, j in 1..n)(
    universidades[i,j] * (poblacion[i,j] + empresas[i,j])
  );

  solve maximize ganancia;
  % Mostrar las ubicaciones de las universidades y la ganancia 
  output [ "Ubicaciones de las universidades:\\n", 
  show([universidades[i,j] | i in 1..n, j in 1..n]), "\\nGanancia: ", show(ganancia), "\\n" ];  
  `)
    
  // const solve = model.solve({
  //   options: {
  //     solver: 'Gecode',
  //     statistics: true
  //   }
  // })
  // let ultima_solucion = []
  // // Escucha si ocurre un error
  // solve.on('error', (error) => {
  //   console.log(error)
  // })
  // solve.on('solution', solution => {
  //   //console.log(solution.output.json)
  //   ultima_solucion = solution.output.json
  // })
  // solve.then(result => {
  //   console.log(result.status)
  //   console.log(ultima_solucion)
  // })
  let universidades = [
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0,
      0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 1, 0, 0, 0,
      0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0,
      0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 0, 0,
      0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0
    ]
  ]

  const posicionesDeUnos = encontrarPosicionesDeUnos(universidades)
  //console.log(posicionesDeUnos); // Salida: [[0, 0], [1, 1], [2, 2]]
  return posicionesDeUnos
}

const ubicacionesExistentes = [[6, 8], [8, 4], [10, 10]]
let posicionesNuevas = []
let matriz_ganancias_poblacion = []
let matriz_ganancias_empresas = []
try {
  const resultado = fs.readFileSync('entrada.json', 'utf8')
  const lectura = JSON.parse(resultado)
  matriz_ganancias_poblacion =  generar_matriz_ganancias(lectura["poblacion"],ubicacionesExistentes,25)
  matriz_ganancias_empresas =  generar_matriz_ganancias(lectura["empresarial"],ubicacionesExistentes,20)
  posicionesNuevas = generarSolucion(matriz_ganancias_poblacion,matriz_ganancias_empresas)
  //calcular ganancias
  ganancia_existente = ganancia(lectura["poblacion"], lectura["empresarial"], ubicacionesExistentes)
  console.log(`ganancia inicial ${ganancia_existente}`)
  ganancia_final = ganancia(lectura["poblacion"], lectura["empresarial"], posicionesNuevas)
  console.log(`ganancia inicial ${ganancia_existente+ganancia_final}`)
} catch (error) {
  console.error('Error al leer el archivo:', error)
}

