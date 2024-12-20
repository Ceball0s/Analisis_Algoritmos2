const MiniZinc = require('minizinc')
const { generar_matriz_ganancias,encontrarPosicionesDeUnos, ganancia, formatearPosiciones } = require('./utilidades')

// funciones minimaz

function conectorMinizinc(matriz1, matriz2, nuevas_sedes){
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
    constraint sum(i in 1..n, j in 1..n)(universidades[i,j]) <= ${nuevas_sedes};
  
    %Restricción: no se puede construir en zonas adyacentes ni en posiciones invalidas
    % si la posicion es 0 en ambas matrices entonces viola la restricion de menor o 
    % la restricion de cotiguidad con las sedes preestablecidas
    constraint forall(i in 1..n, j in 1..n)(
      if universidades[i,j] = 1 then
        if poblacion[i,j] != 0 /\\ empresas[i,j] != 0 then 
          forall(k in max(1,i-1)..min(n,i+2), l in max(1,j-1)..min(n,j+2))(
            if (i != k \\/ j != l) then
              universidades[k,l] = 0
            endif
          )
        else
          universidades[i,j] = 0
        endif
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
    const solve = model.solve({ options: { solver: 'Gecode', statistics: true } });
  
    return new Promise((resolve, reject) => {
        solve.on('error', reject);
        solve.then(result => {
            let universidades = encontrarPosicionesDeUnos(result["solution"]["output"]["json"]["universidades"])
            let Ganancia = parseInt(result["solution"]["output"]["default"].split("Ganancia:")[1].trim(), 10);
            console.log(universidades)
            console.log(result)
            // return salida
            resolve({
            universidades,
            Ganancia
            });
        })
    });
}


async function solucion(poblacion,empresas,ubicacionesExistentes, n_sedes){
    let matriz_ganancias_poblacion =  generar_matriz_ganancias(poblacion,ubicacionesExistentes,25)
    let matriz_ganancias_empresas =  generar_matriz_ganancias(empresas,ubicacionesExistentes,20)
    let { universidades , Ganancia } = await conectorMinizinc(matriz_ganancias_poblacion, matriz_ganancias_empresas, n_sedes);
    //calcular ganancias
    ganancia_existente = ganancia(poblacion, empresas, ubicacionesExistentes)

    // ganancia_final =  ganancia(poblacion, empresas, universidades)
    let resultado = `ganancia inicial: ${ganancia_existente}
ganancia final: ${ganancia_existente + Ganancia}
pociciones establecidas: ${formatearPosiciones(ubicacionesExistentes)}
pociciones nuevas: ${formatearPosiciones(universidades)}
`
    return resultado
}
// fin funciones minizinc

 // Exportar las funciones 
 module.exports = {
    solucion
  };