int: n;  % Tamaño de la matriz (n x n)
array[1..n, 1..n] of int: poblacion;
array[1..n, 1..n] of int: empresas;

% Variables de decisión: 1 si se construye una universidad en la zona, 0 en caso contrario
array[1..n, 1..n] of var 0..1: universidades;

% Restricción: solo se pueden construir 4 universidades
constraint sum(i in 1..n, j in 1..n)(universidades[i,j]) = 4;

%Restricción: no se puede construir en zonas adyacentes
constraint forall(i in 1..n, j in 1..n)(
  if universidades[i,j] = 1 then
    forall(k in max(1,i-1)..min(n,i+2), l in max(1,j-1)..min(n,j+2))(
      if (i != k \/ j != l) then
        universidades[k,l] = 0
      endif
    )
  endif
);

% % Restricción para evitar posiciones contiguas  
% constraint forall(i in 1..n, j in 1..n) 
%   (universidades[i, j] = 1 -> 
%   (i > 1 -> universidades[i-1, j] = 0) /\ (i < n -> universidades[i+1, j] = 0) /\ 
%   (j > 1 -> universidades[i, j-1] = 0) /\ (j < n -> universidades[i, j+1] = 0) 
% );

% Función objetivo: maximizar la suma ponderada de población y empresas
var int: ganancia = sum(i in 1..n, j in 1..n)(
  universidades[i,j] * (poblacion[i,j] + empresas[i,j])
);

solve maximize ganancia;
% Mostrar las ubicaciones de las universidades y la ganancia 
output [ "Ubicaciones de las universidades:\n", 
show([universidades[i,j] | i in 1..n, j in 1..n]), "\nGanancia: ", show(ganancia), "\n" ];