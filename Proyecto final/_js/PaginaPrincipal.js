window.onpaint =  ajaxComprobarSesionIniciada(); //se ejecuta antes de cargar la página

window.onload = function() {
    document.getElementById("btnBuscar").addEventListener("click", cargarBusqueda, false);
    cargarPelis();
    comprobarAdmin();
    cartelera = document.getElementById("cartelera");
    formulario = document.getElementById("formulario");
    alerta = document.getElementById("alerta");
    redesSociales();
}

//-----------------------------MÉTODOS JQUERY-----------------------------

function mostrarTooltip(){
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip(
            $('[data-toggle="tooltip"]').click(function () {
                $('[data-toggle="tooltip"]').tooltip("hide");
             }),
        );   
    });
}


//--------------------------MÉTODOS AJAX---------------------------------
function llamadaAjax(url, parametros, manejadorOK, manejadorError) {

    var request = new XMLHttpRequest();

    request.open("POST", url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    request.onreadystatechange = function() {
        if (this.readyState == 4 && request.status == 200) {
            manejadorOK(request.responseText);
        }
        if (manejadorError != null && request.readyState == 4 && this.status != 200) {
            manejadorError(request.responseText);
        }
    };
    
    request.send(parametros);
}

function ajaxComprobarSesionIniciada(){
    llamadaAjax("../_php/SesionIniciada.php", "", 
        function(texto){
            var sesionIniciada = JSON.parse(texto);
            if(!sesionIniciada){
                window.location ="../SesionCerrar.php";
            }
        }, function(texto) {
        }
    );
}

function cargarPelis() {
    llamadaAjax("../_php/CargarPeliculas.php", "",
        function(texto) {
            
            var peliculas = JSON.parse(texto);

            for (var i=0; i<peliculas.length; i++) {
                domCrearPelis(peliculas[i]);}
        
        }, function (texto){}
    );
}

function cargarBusqueda() {

    divLimpiarCartelera();
    var busqueda = document.getElementById("busqueda");

    if(busqueda.value.length < 3){
        divLimpiarAlerta();
        mensaje = "Debes escribir al menos 3 carácteres";
        crearAlertaInsertada(mensaje);
        cargarPelis();
    } else if(busqueda.value != ""){
        llamadaAjax("../_php/BusquedaAJAX.php", "busqueda=" + busqueda.value,
            function(texto) {
                
                if ( texto == "" ) { //COMO SI CONTARAS LA LONGITUD DE CADENA
                    divLimpiarAlerta();
                    mensaje = "OOP...! Parece que no hay ninguna película con esas características";
                    crearAlertaInsertada(mensaje);
                    cargarPelis();
                    busqueda.value = "";
                }else{
                    var peliculas = JSON.parse(texto);

                    for(var i=0; i<peliculas.length; i++) {
                        domCrearPelis(peliculas[i]);
                    }
                }
            },
            function(texto) {
        
            }
        );
    }else{
        divLimpiarAlerta();
        mensaje = "No puede hacer una busqueda vacía";
        crearAlertaInsertada(mensaje);
        cargarPelis();
    }
}


function aniadirAListaFavoritosAJAX(peliculaId){
    llamadaAjax("../_php/AniadirAListaFavoritosAJAX.php", "peliculaId="+parseInt(peliculaId),
        function(texto) {
                divLimpiarAlerta();
                mensaje = "Pelicula insertada en favoritos";
                crearAlertaInsertada(mensaje);
        },
        function(texto) {
    
        }
    );
}

function comprobarAdmin() {
    llamadaAjax("../_php/ComprobarAdmin.php", "",
        function(texto) {
            var admin = JSON.parse(texto);
            if(admin)
                crearBtnInsertarPeliculaAdmin();
        },
        function(texto) {
    
        }
    );
}

function ajaxIntroducirPelicula(inputNombre, inputDirector, inputActores, inputGeneros, inputPlataformas, anio, puntuacion, sinopsis, trailer, caratula) {
    llamadaAjax("../_php/IntroducirPelicula.php", "nombre="+inputNombre.value+"&director="+inputDirector.value+"&actores="+inputActores.value+"&generos="+inputGeneros.value+"&plataformas="+inputPlataformas.value+"&anio="+anio.value+"&puntuacion="+puntuacion.value+"&sinopsis="+sinopsis.value+"&trailer="+trailer.value+"&caratula="+caratula.value,
    function(texto) {
            $('#myModal').modal('hide');
            cargarPelis();
    }, function (texto){}
);
}

//-------------------------------MÉTODOS DEL DOM-----------------------

function domCrearPelis(pelicula) {
    
    divCube = document.createElement("div");
    divCube.setAttribute("class", "cube");
    divCube.setAttribute("id", ""+pelicula.id);

    divFlip = document.createElement("div");
    divFlip.setAttribute("class", "flip");
    divFlop = document.createElement("div");
    divFlop.setAttribute("class", "flop");
    //divCube.addEventListener("click", redireccionarPelicula);

    imgCaratula = document.createElement("img");
    imgCaratula.setAttribute("id", "imgNovedades");
    imgCaratula.setAttribute("class", "imgNovedades");
    imgCaratula.setAttribute("src", "../_img/"+pelicula.caratula);    
    imgCaratula.setAttribute("width", "270px");
    imgCaratula.setAttribute("height", "400px");

      var divRow = document.createElement("div");
      divRow.setAttribute("class", "row");
      var div1 = document.createElement("div");
      div1.setAttribute("class", "peliculaCard card");
      var divWrapper = document.createElement("div");
      divWrapper.setAttribute("class", "wrapper");
      //header
      var divHeader = document.createElement("div");
      divHeader.setAttribute("class", "header");
      var divDate = document.createElement("div");
      divDate.setAttribute("class", "date");
      var spanDate = document.createElement("span");
      spanDate.setAttribute("class", "year");
      spanDate.innerHTML = pelicula.anio;
      divDate.appendChild(spanDate);
      var ulIconos = document.createElement("ul");
      ulIconos.setAttribute("class", "menu-content");
      var liCorazon = document.createElement("li");
      var aCorazon = document.createElement("i");
      aCorazon.setAttribute("href", "#");
      aCorazon.setAttribute("class", "fas fa-heart");
      aCorazon.setAttribute("id", "corazon");
      aCorazon.setAttribute("data-toggle", "tooltip");
      aCorazon.setAttribute("title", "Añadir "+ pelicula.nombre + " a Favoritos");
      aCorazon.setAttribute("data-placement", "top");
      aCorazon.addEventListener("click", function(){
          aniadirAListaFavoritosAJAX(pelicula.id);
      })
      
      liCorazon.appendChild(aCorazon);
      ulIconos.appendChild(liCorazon);
      divHeader.appendChild(divDate);
      divHeader.appendChild(ulIconos);
      //data
      var divData = document.createElement("div");
      divData.setAttribute("class", "data");
      var divContent = document.createElement("div");
      divContent.setAttribute("class", "content");
      var spanPuntuacion = document.createElement("span");
      spanPuntuacion.setAttribute("class", "author");
      spanPuntuacion.innerHTML = "Valorada con "+pelicula.puntuacion+" estrellas en WatchFilm";
      var h1Titulo = document.createElement("h2");
      h1Titulo.setAttribute("class", "title");
      h1Titulo.innerHTML = pelicula.nombre;
      var pText = document.createElement("p");
      pText.setAttribute("class", "text");
      pText.innerHTML = pelicula.sinopsis;
      var aLeerMas = document.createElement("a");
      aLeerMas.setAttribute("href", "#");
      aLeerMas.setAttribute("class", "button");
      aLeerMas.setAttribute("id", ""+pelicula.id);
      aLeerMas.addEventListener("click", redireccionarPelicula);
      aLeerMas.innerHTML = "Leer Más";

      divContent.appendChild(spanPuntuacion);
      divContent.appendChild(h1Titulo);
      divContent.appendChild(pText);
      divContent.appendChild(aLeerMas);
      divData.appendChild(divContent);

      divWrapper.appendChild(divHeader);
      divWrapper.appendChild(divData);
      div1.appendChild(divWrapper);
      divRow.appendChild(div1);
      divFlop.appendChild(divRow);
      
    //FALTA genero, director, reparto de actores

    //cartelera.appendChild(corazon);

    divFlip.appendChild(imgCaratula);
    divCube.appendChild(divFlip);
    divCube.appendChild(divFlop);
   
    cartelera.appendChild(divCube);

    mostrarTooltip();
}

function crearAlertaInsertada(mensaje){
    modalAlerta = document.createElement("div");
    modalAlerta.setAttribute("class", "modal");
    modalAlerta.setAttribute("id", "modalAlerta");

    modalDialog = document.createElement("div");
    modalDialog.setAttribute("class", "modal-dialog modal-dialog-centered modal-sm");
   

    mensajeAlerta = document.createElement("div");
    mensajeAlerta.setAttribute("class", "alert alert-success");
    mensajeAlerta.innerHTML = mensaje;

    btnCerrar = document.createElement("button");
    btnCerrar.setAttribute("type", "button");
    btnCerrar.setAttribute("class", "close");

    mensajeAlerta.appendChild(btnCerrar);

    modalDialog.appendChild(mensajeAlerta);
    modalAlerta.appendChild(modalDialog);

    alerta.appendChild(modalAlerta);

    $("#modalAlerta").modal("show");
}

function crearBtnInsertarPeliculaAdmin() {
    divInsertPeli = document.createElement("div");
    divInsertPeli.setAttribute("class", "nav-item");
    aInsertPeli = document.createElement("a");
    aInsertPeli.setAttribute("class", "nav-link ml-auto");
    aInsertPeli.setAttribute("id", "abreModal");
    aInsertPeli.setAttribute("data-toggle", "modal");
    aInsertPeli.setAttribute("data-target", "#myModal");
    aInsertPeli.setAttribute("href", "#");
    aInsertPeli.innerHTML = "Añadir Nueva Película";
    iInsertPeli = document.createElement("i");
    iInsertPeli.setAttribute("class", "fas fa-plus-square");
    //<button type="button" id="abreModal" class="ml-auto" data-toggle="modal" data-target="#myModal"></button>
    aInsertPeli.insertBefore(iInsertPeli, aInsertPeli.firstChild);
    divInsertPeli.appendChild(aInsertPeli);

    document.getElementById("navRightPrincipal").insertBefore(divInsertPeli, document.getElementById("navRightPrincipal").firstChild);
    document.getElementById("abreModal").addEventListener("click", crearFormularioIntroducirPelicula);
}

function crearFormularioIntroducirPelicula() {
    
    var pNombre = document.createElement("p");
    pNombre.innerHTML = "Título: ";

    var inputNombre = document.createElement("input");
    inputNombre.setAttribute("type", "text");
    inputNombre.setAttribute("name", "nombre");
    inputNombre.setAttribute("id", "nombre");
    inputNombre.setAttribute("placeholder", "Título");
    inputNombre.setAttribute("required", true);

    var pDirector = document.createElement("p");
    pDirector.innerHTML = "Director: ";

    var inputDirector = document.createElement("input");
    inputDirector.setAttribute("type", "text");
    inputDirector.setAttribute("name", "director");
    inputDirector.setAttribute("id", "director");
    inputDirector.setAttribute("placeholder", "Director");
    inputDirector.setAttribute("required", true);

    var pActores = document.createElement("p");
    pActores.innerHTML = "Actores separados por comas: ";

    var inputActores = document.createElement("input");
    inputActores.setAttribute("type", "text");
    inputActores.setAttribute("name", "actor");
    inputActores.setAttribute("id", "actor");
    inputActores.setAttribute("placeholder", "Actores por comas");
    inputActores.setAttribute("required", true);

    var pGeneros = document.createElement("p");
    pGeneros.innerHTML = "Generos separados por comas: ";

    var inputGeneros = document.createElement("input");
    inputGeneros.setAttribute("type", "text");
    inputGeneros.setAttribute("name", "genero");
    inputGeneros.setAttribute("id", "genero");
    inputGeneros.setAttribute("placeholder", "Generos por comas");
    inputGeneros.setAttribute("required", true);

    var pPlataformas = document.createElement("p");
    pPlataformas.innerHTML = "Plataformas separadas por comas: ";

    var inputPlataformas = document.createElement("input");
    inputPlataformas.setAttribute("type", "plataforma");
    inputPlataformas.setAttribute("name", "plataforma");
    inputPlataformas.setAttribute("id", "plataforma");
    inputPlataformas.setAttribute("placeholder", "Plataformas por comas");
    inputPlataformas.setAttribute("required", true);

    var pAnio = document.createElement("p");
    pAnio.innerHTML = "Año: ";

    var anio = document.createElement("input");
    anio.setAttribute("type", "number");
    anio.setAttribute("name", "anio");
    anio.setAttribute("id", "anio");
    anio.setAttribute("placeholder", "Año");
    anio.setAttribute("required", true);

    var pPuntuacion = document.createElement("p");
    pPuntuacion.innerHTML = "Puntuación: ";

    var puntuacion = document.createElement("input");
    puntuacion.setAttribute("type", "number");
    puntuacion.setAttribute("name", "puntuacion");
    puntuacion.setAttribute("id", "puntuacion");
    puntuacion.setAttribute("placeholder", "Puntuación");
    puntuacion.setAttribute("required", true);

    var pSinopsis = document.createElement("p");
    pSinopsis.innerHTML = "Sinopsis: ";

    var sinopsis = document.createElement("input");
    sinopsis.setAttribute("type", "text");
    sinopsis.setAttribute("name", "sinopsis");
    sinopsis.setAttribute("id", "sinopsis");
    sinopsis.setAttribute("placeholder", "Sinopsis");
    sinopsis.setAttribute("required", true);

    var pTrailer = document.createElement("p");
    pTrailer.innerHTML = "Tráiler: ";

    var trailer = document.createElement("input");
    trailer.setAttribute("type", "text");
    trailer.setAttribute("name", "trailer");
    trailer.setAttribute("id", "trailer");
    trailer.setAttribute("placeholder", "Tráiler");
    trailer.setAttribute("required", true);

    var pCaratula = document.createElement("p");
    pCaratula.innerHTML = "Carátula: ";

    var caratula = document.createElement("input");
    caratula.setAttribute("type", "text");
    caratula.setAttribute("name", "caratula");
    caratula.setAttribute("id", "caratula");
    caratula.setAttribute("placeholder", "Carátula");
    caratula.setAttribute("required", true);

    var introducir = document.createElement("button");
    introducir.addEventListener("click", function(){
        ajaxIntroducirPelicula(inputNombre, inputDirector, inputActores, inputGeneros, inputPlataformas, anio, puntuacion, sinopsis, trailer, caratula);
    })
    introducir.setAttribute("name", "introducir");
    introducir.setAttribute("class", "btnIntroducir");
    introducir.innerHTML = "Introducir Película";
    introducir.setAttribute("value", "Introducir Película");

    document.getElementById("formulario").appendChild(pNombre);
    document.getElementById("formulario").appendChild(inputNombre);
    document.getElementById("formulario").appendChild(pDirector);
    document.getElementById("formulario").appendChild(inputDirector);
    document.getElementById("formulario").appendChild(pActores);
    document.getElementById("formulario").appendChild(inputActores);
    document.getElementById("formulario").appendChild(pGeneros);
    document.getElementById("formulario").appendChild(inputGeneros);
    document.getElementById("formulario").appendChild(pPlataformas);
    document.getElementById("formulario").appendChild(inputPlataformas);
    document.getElementById("formulario").appendChild(pAnio);
    document.getElementById("formulario").appendChild(anio);
    document.getElementById("formulario").appendChild(pPuntuacion);
    document.getElementById("formulario").appendChild(puntuacion);
    document.getElementById("formulario").appendChild(pSinopsis);
    document.getElementById("formulario").appendChild(sinopsis);
    document.getElementById("formulario").appendChild(pTrailer);
    document.getElementById("formulario").appendChild(trailer);
    document.getElementById("formulario").appendChild(pCaratula);
    document.getElementById("formulario").appendChild(caratula);
    document.getElementById("formulario").appendChild(introducir);   
}

//---------------------------------------UTILIDADES----------------------------------

function divLimpiarAlerta(){
    while(alerta.firstChild){
        alerta.removeChild(alerta.lastChild);
    }
}

function divLimpiarCartelera(){
    while(cartelera.firstChild){
        cartelera.removeChild(cartelera.lastChild);
    }
}

function divLimpiarFormulario(){
    while(formulario.firstChild){
        formulario.removeChild(formulario.lastChild);
    }
}

function redireccionarPelicula(){
    window.location = "Pelicula.html?verinfo="+this.id;
}

//footer redes sociales
const shareButton = document.getElementsByClassName("shareButton");
function redesSociales() {
    shareButton[0].addEventListener("click", (e) => {
        for( let i=0; i < shareButton.length; i++ ) {
        shareButton[i].classList.toggle("open")
        shareButton[0].classList.remove("sent")
        }
    })

    for( let i=1; i < shareButton.length; i++ ) {
    
    shareButton[i].addEventListener("click", (e) => {
        
        for( let i=0; i < shareButton.length; i++ ) {
            shareButton[i].classList.toggle("open")
        }
        shareButton[0].classList.toggle("sent")
        })
    }
}