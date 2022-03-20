# Aldebaran
    Este proyecto es realizado para el area CVDR del Centro de vinculacion y desarrollo de Oaxaca.
# Herramientas que se utilizan
    1. React JS   .................. https://es.reactjs.org/ 
    2. Node JS    .................. https://nodejs.org/es/ 
    3. Express    .................. https://expressjs.com/
    4. Docker     .................. https://www.docker.com/products/docker-hub
    5. PostgreSQL .................. https://hub.docker.com/_/postgres
    6. Git        .................. https://git-scm.com/
    Se recomienda utilizar VSCode   
    y sistema opetativo linux   .... https://code.visualstudio.com/

# Desacarga el proyecto 

    Para desarrollo debemos de clonar el proyecto con git o descargar el Zip  de la rama desarrollo
    git clone -b desarrollo https://github.com/TomasGit-1/Aldebaran.git

    Para Produccion 
    git clone -b IPN-deploy https://github.com/TomasGit-1/Aldebaran.git

# Para utilizar el sistema en desarrollo :
    Tenemos que movernos a las carpetas correspondientes donde esta el archivo package.json
    1. Movernos a la ruta Aldebaran/aldebaran_react/
    2. Ejecutar npm i 
    3. Movernos a la ruta  Aldebaran/Api/
    4. Ejecutar npm i
    5. este comando nos permitira instalar las librerias requeridas
    6. En los archivos package.json se encuentra un apartado que se llama scripts presionar dev o build

# Para desplegar las aplicaciones :

    BackEnd
    1. Generamos el archivo .exe para el Api ejecuntando el comando npm run build

    FrontEnd
    1. Entramos a la ruta aldebaran/aldebaran_react/
    2. Ejecutamos docker-compose up --build
    3. Ejecutamos docker-compose start 

# Extras
    Para detener el FrontEnd se ocupan los comands
    Para ver los contenedores activos
    docker ps ..........copiamos el id de container
    Para ver los contenedores inactivos
    docker ps --a
    Para detener y iniciar un contenedor
    docker stop -- id container --
    docker start -- id container --
    
    Para ver las imagenes 
    docker images

    Para eliminar imagenes
    docker rmi -- idImagen--

    Para eliminar contenedor 
    docker rm -- idContainer--


# Lanzamiento PM2 
https://desarrolloweb.com/articulos/ejecutar-aplicacion-nodejs-pm2.html

# Documentacion
https://www.npmjs.com/package/pm2

# 
pm2 start ecosystem.config.js


https://dev.to/taufiqtab/deploy-reactjs-production-build-with-pm2-5dfo