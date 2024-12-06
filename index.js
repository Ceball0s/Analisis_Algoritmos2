const MiniZinc = require('minizinc');

const model = new MiniZinc.Model();
model.addFile('test.mzn');

const solve = model.solve({
  options: {
    solver: 'Gecode',
    'time-limit': 10000,
    statistics: true
  }
});

// Transforma `solve` en una promesa
const solvePromise = new Promise((resolve, reject) => {
  // Escucha cuando se encuentre una solución
  solve.on('solution', solution => {
    resolve({
      solution: solution.output.json,
      statistics: solution.statistics
    });
  });

  // Escucha si ocurre un error
  solve.on('error', (error) => {
    reject(error);
  });

  // Escucha estadísticas, puedes usarlas si es necesario
  solve.on('statistics', stats => {
    console.log(stats.statistics);
  });
});

// Maneja la promesa
solvePromise
.then(result => {
    console.log(result.solution); // Muestra la solución
    console.log(result.statistics); // Muestra las estadísticas
})
.catch(error => {
    console.error('Error occurred while solving:', error);
    process.exit(1);
});
