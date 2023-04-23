# 🕹️ Juego de Tic Tac Toe en TypeScript

![Node version](https://img.shields.io/badge/node-16.20.0-green)
![TypeScript version](https://img.shields.io/badge/typescript-5.0.4-blue)

Este proyecto es una implementación del clásico juego Tic Tac Toe, también conocido como Tres en Raya. Se puede jugar contra la máquina o la IA, así como en modo multijugador. Fue desarrollado con programación orientada a objetos y el patrón Modelo-Vista-Controlador (MVC), usando TypeScript para la lógica del juego y SCSS para el diseño de la interfaz gráfica. El juego se ejecuta directamente en el navegador y cuenta con una interfaz de usuario intuitiva, implementada mediante manipulación del DOM. El proyecto está estructurado en múltiples clases e interfaces que interactúan entre sí para gestionar correctamente el flujo del juego.

## 📋 Funcionalidades

El juego implementado en este proyecto cuenta con las siguientes funcionalidades:

- Modo de juego solo o multijugador en un tablero de 3x3 casillas. Por defecto, la "X" comienza el juego.
- Existe un interruptor para seleccionar el modo multijugador.
- Cuando se juega en modo de un solo jugador, el oponente es una IA imposible de vencer. 😅
- La partida finaliza cuando un jugador completa una línea horizontal, vertical o diagonal de su símbolo en el tablero, o cuando se llenan todas las casillas sin que ningún jugador haya ganado.
- Al finalizar una partida, se muestra el ganador y se reinicia automáticamente, incrementando el contador del jugador ganador.
- La interfaz de usuario es intuitiva y fácil de usar, permitiendo a los jugadores hacer clic en la casilla que desean marcar.

## 🔎 Tablero del juego

A continuación se muestra una captura de pantalla de la interfaz gráfica del juego:

<p align="center">
<img src="https://github.com/LuisFelipeL/Tic-Tac-Toe/blob/master/images/board_game.jpeg" width="200px">
</p>

## 🧰 Tecnologias utilizadas

El proyecto fue desarrollado utilizando las siguientes tecnologías:

- `Node.js` versión 16.20.0.
- `TypeScript` versión 5.0.4.
- Manipulación del `DOM` para implementar la interfaz de usuario (UI).
- `Sass` para diseñar la interfaz gráfica del juego.
- `Browser-sync` versión 2.29.1 para actualizar automáticamente el navegador durante el desarrollo.
- `Webpack` versión 5.80.0 para gestionar el bundle de TypeScript a JavaScript y Sass a CSS.

## 🎨 Cómo usar

Para utilizar este proyecto, sigue los siguientes pasos:

1. Clona el repositorio en tu máquina local. Asegúrate de tener `Node.js` y `npm` instalados en tu máquina.

```Bash
git clone https://github.com/lopepardo/TicTacToe.git
```

2. Abre la terminal y navega hasta la carpeta raíz del proyecto.

```Bash
cd TicTacToe
```

3. Instala las dependencias necesarias mediante `npm`:

```Bash
npm install
```

4. Ejecuta npm run build para compilar el proyecto.

```Bash
npm run build
```

5. Abre el archivo `index.html` en tu navegador y ¡disfruta del juego!

Si deseas modificar o extender la aplicación, puedes hacerlo a través del código fuente ubicado en la carpeta `src`. Para levantar el servidor local y ver tus cambios en tiempo real, ejecuta el siguiente comando:

```Bash
npm run dev
```

## 🔮 Mejoras futuras

A continuación, se presentan algunas mejoras que podrían implementarse en el futuro para mejorar la funcionalidad y la experiencia de usuario del juego:

- Implementar diferentes niveles de dificultad para la inteligencia artificial.
- Permitir a los jugadores alternar entre los símbolos X y O durante la partida.
- Incluir animaciones para hacer el juego más atractivo visualmente.
- Permitir a los jugadores personalizar los símbolos que se utilizan para jugar.
- Dar la opción a los jugadores de introducir un nombre o alias para ser mostrado durante la partida.
- Añadir la opción de jugar en modo multijugador online con otros jugadores.
- ...

## 📃 Licencia

Este proyecto está bajo la Licencia MIT. Puedes consultar el archivo LICENSE para más información.
