# AlbumMaker

## Decripción del Proyecto

AlbumMaker es un desarrollo frontEnd que permite cargar fotos y ordenar un álbum en línea.
Es un proyecto realizado como tarea para la materia FronEnd Programming:React dictada por el [Ing. Juan Antonio Plaza](https://github.com/jplaza) en el [Bootcamps FullStack Developer 2023](http://www.bootcamps.espol.edu.ec/) de la [Escuela Superior Politécnica del Litoral (ESPOL)](https://www.espol.edu.ec/).

![AlbumMaker Home](https://github.com/liliantbo/lbenavides.github.io/blob/main/Demos/AlbumMaker/home.JPG?raw=true)

### Funcionalidades

:heavy_check_mark: `Organización de imágenes:` En la interfaz principal de la aplicación, se encontrará una matriz (grid) vacía donde se podrá organizar las imágenes. Para comenzar, se debe seleccionar las fotos que se desea cargar en el álbum arrastrándolas desde tu ordenador y soltándolas en la matriz. Ya con las imágenes en la matriz, se puede arrastrar y soltar las imágenes en la posición deseada dentro de la matriz. Este será el orden en el que aparecerán en el álbum. El botón “Continuar” permite avanzar al siguiente paso del proceso de compra.

:heavy_check_mark:`Datos de facturación y dirección de entrega:` Una vez organizadas las imágenes, se continuará con el ingreso de los datos de facturación y envío, teniendo la opción para utilizar los mismos datos para dirección entrega y datos de facturación. El botón “Resumen del pedido” llevará al último paso.

:heavy_check_mark:`Resumen del pedido:` Esta pantalla muestra una vista previa del álbum y la información de facturación y envío ingresada. Al presionar en el botón “Finalizar pedido" se mostrará el mensaje “Gracias por tu compra” y el album, ni los datos de facturación y entrega pueden ser editados. El botón Nuevo Album permite crear uno desde cero.

:heavy_check_mark:`Personalización:` Se puede trabajar en modo claro/oscuro y se puede seleccionar el template de album.

![AlbumMaker Demo](https://github.com/liliantbo/lbenavides.github.io/blob/main/Demos/AlbumMaker/AlbumMakerDemo.gif?raw=true)

## Detalles Técnicos
Este proyecto fue creado con [Create React App](https://github.com/facebook/create-react-app).

Documentación de Tecnología utilizada:

[Javascript ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

[Bootstrap ](https://getbootstrap.esdocu.com/docs/5.1/getting-started/introduction/)

[React](https://es.react.dev/reference/react)

## Descargar y Ejecutar el Proyecto

1. Clonar el proyecto

 ```
 git clone https://github.com/liliantbo/albumMaker.git
 ```

2. Ir a la carpeta del proyecto

```
cd albumMaker
```

3. Crear el ambiente AWS que utilizará el proyecto

3.1 Crear Tabla albumMaker en Dynamo para almacenar las compras realizadas

4. Instalar las dependencias

```
npm install
```

5. Iniciar el servidor de desarrollo local

```
npm start
```

6. Abrir la aplicación desde el navegador

Abrir [http://localhost:3000](http://localhost:3000) para visualizar el proyecto.

## Desarrollado por:
 [<img src="https://avatars.githubusercontent.com/u/74383265?v=4" width=115><br><sub>Lilian Benavides</sub>](https://github.com/liliantbo)
