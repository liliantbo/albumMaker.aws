# AlbumMaker

## Decripción del Proyecto

AlbumMaker es un desarrollo frontEnd que permite cargar fotos y ordenar un álbum en línea.
Es un proyecto realizado como tarea para la materia FronEnd Programming:React dictada por el [Ing. Juan Antonio Plaza](https://github.com/jplaza) en el [Bootcamps FullStack Developer 2023](http://www.bootcamps.espol.edu.ec/) de la [Escuela Superior Politécnica del Litoral (ESPOL)](https://www.espol.edu.ec/).

![AlbumMakerHome][AlbumMakerHome]

### Funcionalidades

:heavy_check_mark: `Organización de imágenes:` En la interfaz principal de la aplicación, se encontrará una matriz (grid) vacía donde se podrá organizar las imágenes. Para comenzar, se debe seleccionar las fotos que se desea cargar en el álbum arrastrándolas desde tu ordenador y soltándolas en la matriz. Ya con las imágenes en la matriz, se puede arrastrar y soltar las imágenes en la posición deseada dentro de la matriz. Este será el orden en el que aparecerán en el álbum. El botón “Continuar” permite avanzar al siguiente paso del proceso de compra.

:heavy_check_mark:`Datos de facturación y dirección de entrega:` Una vez organizadas las imágenes, se continuará con el ingreso de los datos de facturación y envío, teniendo la opción para utilizar los mismos datos para dirección entrega y datos de facturación. El botón “Resumen del pedido” llevará al último paso.

:heavy_check_mark:`Resumen del pedido:` Esta pantalla muestra una vista previa del álbum y la información de facturación y envío ingresada. Al presionar en el botón “Finalizar pedido" se mostrará el mensaje “Gracias por tu compra” y el album, ni los datos de facturación y entrega pueden ser editados. El botón Nuevo Album permite crear uno desde cero.

:heavy_check_mark:`Personalización:` Se puede trabajar en modo claro/oscuro y se puede seleccionar el template de album.

:heavy_check_mark:`Integración con AWS:` Una vez finalizado el pedido, el sistema tratará de establecer una conexión a una Bucket S3 para almacenar las fotos del album y a la Base de Datos no Relacional Dynamo, para almacenar los datos del cliente, así como el URL de las fotos cargadas previamente en S3. **En caso de que la carga en AWS no se pueda realizar, el sistema sigue funcionando** pero se termina el procesamiento indicando al usuario que no se ha podido realizar el almacenamiento en AWS

![AlbumMakerDemo][AlbumMakerDemo.gif]

<small>[Descargar Video](https://github.com/liliantbo/lbenavides.github.io/blob/main/Demos/AlbumMaker/AlbumMakerDemo.mp4)</small>

## Detalles Técnicos
Este proyecto fue creado con [Create React App](https://github.com/facebook/create-react-app).

Documentación de Tecnología utilizada:

[Javascript ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

[Bootstrap ](https://getbootstrap.esdocu.com/docs/5.1/getting-started/introduction/)

[React](https://es.react.dev/reference/react)

[Learner Lab de AWS Academy](https://awsacademy.instructure.com/)

Los datos se almacenarán de la siguiente manera:

_S3_
![S3Data][S3Data]

_Dynamo_
![DinamoData][DynamoData]



## Descargar y Ejecutar el Proyecto

**1. Crear el ambiente AWS que utilizará el proyecto**

* Base Dynamo: Crear tabla llamada albumMaker con Partition key albumId (String)

* Repositorio S3: Crear bucket llamado albummaker con los siguientes permisos:
 
_Bucket Policy_
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:::albummaker",
                "arn:aws:s3:::albummaker/*"
            ]
        }
    ]
}
```
_Cors_
 ```
 [
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "ETag"
        ]
    }
]
 ```
 
2. Clonar el proyecto

 ```
 git clone https://github.com/liliantbo/albumMaker.git
 ```

3. Ir a la carpeta del proyecto

```
cd albumMaker
```

4. Instalar las dependencias

```
npm install
```
Este comando instalará de manera automática las librerias adicionales utilizadas en el proyecto: aws-sdk, react-bootstrap y date-fns

5. Configurar las credenciales de conexion a AWS en SaveHandler.js

```
AWS.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
    sessionToken: ''
});


```
5. Iniciar el servidor de desarrollo local

```
npm start
```

6. Abrir la aplicación desde el navegador

Abrir [http://localhost:3000](http://localhost:3000) para visualizar el proyecto.

## Desarrollado por:
 [<img src="https://avatars.githubusercontent.com/u/74383265?v=4" width=115><br><sub>Lilian Benavides</sub>](https://github.com/liliantbo)


[DynamoData]: DynamoData.png
[S3Data]: S3Data.png
[AlbumMakerHome]: AlbumMakerHome.png
[AlbumMakerDemo.gif]: AlbumMakerDemo.gif
