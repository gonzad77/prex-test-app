# prex-test-app

# Features and decisions

- Login and signup con username/password
- Editar logo, se tomo la decision de cambiar el logo y guardar el link momentaneamente en ionic/storage. El logo se reiniciara al cerrar y abrir la apcicacion nuevamente.
- Ver films, una vez logueados se podra ver la lista de las 10 peliculas seleccionadas para esta prueba.
- Search films, la app permite buscar una de las peliculas por su titulo.
- Delete film, la app permite borrar la pelicula seleccionada.
- Editar fils, la app permite editar tanto su titulo, sus estrellas, su descripcion y su fecha de lanzamiento.
- Log out.

Importante aclarar en el caso de borrar todas las peliculas se podran volver a cargar con el archivo prex-text-films.json de la api en la base de datos.

Al no contar con un contenedor remoto de imagenes (como amazone) decidi dejar las imagenes de las peliculas estaticas en la app.

# Install

Clonar el repositorio y correr `npm i` para instalar las dependencias.

# Running

Para poder ver la app dejo 3 formas.

Importante cambiar dentro de la carpeta helpers la apiUrl por la correspondiente ( o usar localhost)
`private apiUrl = 'http://192.168.1.2:8000/api';`

1.

Correr `ionic serve`

Esta es la opcion mas facil y rapida, la unica diferencia que existe con las otras dos es que al cambiar el logo se abre el explorador de windows para seleccionar una imagen.

Al inspeccionar elemento en la pagina donde esta corriendo la app se podran seleccionar diferentes dispositivos.


2.

Correr `ionic cordova platform add android` (en mi caso uso windows)

Correr `ionic cordova run android`

En este caso se puede tener un dispositivo fijo. 

Es importante para este caso tener las variables de entorno seteadas y una version valida de gradle.


3.

Correr `ionic cordova platform add android`

Abrir la carpeta /platforms/android con AndroidStudio

Una vez hecho esto se podrian seleccionar difernetes virtual devices como tambien un dispositivo fisico en el cual correr la app.
