## Creadores

- **Miguel Angel Ceballos         - 2259619**
- **Cristian leonardo             - 1968253**
- **Nicolas Gutierrez             - 2259515**
- **Karen Jhulieth Grijalba Ortiz - 2259623**


# Optimización de Ubicación de Programas de Ingeniería de Sistemas

Este proyecto tiene como objetivo resolver el problema de ubicar nuevos programas de ingeniería de sistemas en un plano cartesiano 2D, considerando diversas restricciones de ubicación. El modelo propuesto busca maximizar la cobertura de la población y el entorno empresarial de las nuevas ubicaciones, respetando las restricciones de proximidad a las localizaciones existentes.

## Descripción del Problema

Actualmente, existen varias localizaciones de programas de ingeniería de sistemas que necesitan ser ampliadas para aceptar más estudiantes. El desafío consiste en encontrar el mejor lugar para los nuevos programas bajo las siguientes restricciones:

- **No contigüidad**: Los nuevos programas no pueden ser ubicados contiguos a ninguna de las localizaciones existentes.
- **Segmento de población**: El segmento de población en la ubicación elegida y las cercanas no puede ser menor a 25.
- **Entorno empresarial**: La suma del entorno empresarial en la ubicación elegida y las cercanas no puede ser menor a 20.

## Entrada

El modelo toma un archivo de entrada con la siguiente estructura:

1. El número de localizaciones existentes.
2. Las coordenadas de estas localizaciones.
3. El tamaño de la matriz de segmentación de población y entorno empresarial.
4. Las matrices de segmentación de población y entorno empresarial.
5. El número de nuevos programas a ubicar.

### Ejemplo de Entrada

```plaintext
3
6 8
8 4
10 10
15
4 0 1 1 2 2 0 0 4 15 15 4 11 2 1
4 0 3 1 6 2 0 0 4 15 15 4 8 2 1
4 0 3 1 6 2 0 0 4 9 9 4 2 2 2
...
4
```

## Salida

La salida generada por el modelo incluye:

1. **Ganancia total sin incluir las nuevas localizaciones**.
2. **Ganancia total después de agregar las nuevas localizaciones**.
3. **Las coordenadas de las localizaciones existentes** ordenadas por el primer valor.
4. **Las coordenadas de las nuevas localizaciones** ordenadas por el primer valor.

### Ejemplo de Salida

```plaintext
120
240
6 8
8 4
10 10
2 3
5 5
12 1
13 15
```

## Requisitos

- **Node.js** (para ejecutar el servidor y el modelo)
- **Minizinc** (si es necesario para el modelo de optimización)
- **Solvers de optimización** como Gurobi, CPLEX o HiGHS (dependiendo del solver que se utilice)

## Instrucciones de Instalación

1. **Clona este repositorio**:

   ```bash
   git clone git@github.com:Ceball0s/Analisis_Algoritmos2.git
   ```

2. **Instala las dependencias necesarias**:

   ```bash
   npm install
   ```

3. **Si utilizas Minizinc**, asegúrate de tenerlo instalado:

   En sistemas basados en Debian/Ubuntu, puedes instalar Minizinc con:

   ```bash
   sudo apt install minizinc
   #arch
   yay -S  minizinc-ide
   ```

4. **Para ejecutar el modelo**:

   ```bash
   npm run start
   ```

