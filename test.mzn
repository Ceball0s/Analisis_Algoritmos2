% Definición de datos
int: num_trabajadores = 3;  % Número de trabajadores
int: num_tareas = 5;        % Número de tareas
array[1..num_tareas] of int: duraciones = [4, 3, 2, 5, 3];  % Duración de cada tarea
array[1..num_trabajadores] of int: capacidades = [10, 8, 12];  % Capacidad de trabajo de cada trabajador

% Variables
array[1..num_tareas] of var 1..num_trabajadores: asignacion;  % Asignación de tareas a trabajadores

% Restricciones
% Cada tarea debe ser asignada a un trabajador
constraint forall(t in 1..num_tareas) (
    asignacion[t] in 1..num_trabajadores
);

% La carga de trabajo de cada trabajador no debe exceder su capacidad
array[1..num_trabajadores] of var 0..100: carga_trabajadores;
constraint forall(w in 1..num_trabajadores) (
    carga_trabajadores[w] = sum(t in 1..num_tareas) (
        (asignacion[t] = w) * duraciones[t]
    )
);

constraint forall(w in 1..num_trabajadores) (
    carga_trabajadores[w] <= capacidades[w]
);

% Minimizar el tiempo máximo de trabajo
var int: max_carga = max(carga_trabajadores);
solve minimize max_carga;

% Mostrar resultados
output [
    "Asignaciones: ", show(asignacion), "\n",
    "Cargas de trabajo: ", show(carga_trabajadores), "\n",
    "Carga máxima: ", show(max_carga), "\n"
];
