window.onpaint =  ajaxComprobarSesionIniciada(); //se ejecuta antes de cargar la página

window.onload = function() {
    //window.history.pushState("", "Titulo", "../hola.html");
    capturarIdURL();
}

function importarScript(nombre) {
    var s = document.createElement("script");
    s.src = nombre;
    document.querySelector("head").appendChild(s);
}

function llamadaAjax(url, parametros, manejadorOK, manejadorError) {
    //TODO PARA DEPURACIÓN: alert("Haciendo ajax a " + url + "\nCon parámetros " + parametros);

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
    llamadaAjax("../SesionIniciada.php", "", 
    function(texto){
        var sesionIniciada = JSON.parse(texto);
        if(!sesionIniciada){
            window.location ="SesionInicioFormulario.html"
        }
    },  function(texto) {
        }
    );
}

function capturarIdURL() {
    var url = window.location.href;
    var pos1 = url.indexOf("=");
    var idPelicula = url.substring(pos1+1, url.length);
    obtenerInfoPelicula(idPelicula);
    obtenerInfoDirector(idPelicula);
    obtenerInfoActor(idPelicula);
    obtenerComentarios(idPelicula);
}

function obtenerInfoPelicula(idPelicula) {
    
    llamadaAjax("../ObtenerInfoPelicula.php", "id=" + parseInt(idPelicula),
    function(texto) {
            var infoPelicula = JSON.parse(texto);
            crearPelicula(infoPelicula);        
    },
    function(texto) {
 
    }
    );

}

function obtenerInfoDirector(idPelicula) {
    llamadaAjax("../ObtenerInfoDirector.php", "id=" + parseInt(idPelicula),
    function(texto) {
            var directores = JSON.parse(texto);

            for(var i=0; i<directores.length; i++) {
                crearDirector(directores[i]);
            }
                    
    },
    function(texto) {
 
    }
    );
}

function obtenerInfoActor(idPelicula) {
    llamadaAjax("../ObtenerInfoActor.php", "id=" + parseInt(idPelicula),
    function(texto) {
            var actores = JSON.parse(texto);

            for(var i=0; i<actores.length; i++) {
                crearActor(actores[i]);
            }     
    },
    function(texto) {
 
    }
    );
}

function obtenerComentarios(idPelicula) {
    llamadaAjax("../ObtenerComentarios.php", "peliculaId=" + parseInt(idPelicula),
    function(texto) {
            var comentarios = JSON.parse(texto);

            for(var i=0; i<comentarios.length; i++) {
                crearComentario(comentarios[i]);
            }
    },
    function(texto) {
 
    }
    );
}


function crearPelicula(infoPelicula) {
    var breadcrumbs = document.createElement("li");
    breadcrumbs.innerHTML = infoPelicula.nombre;
    document.getElementById("breadcrumb").appendChild(breadcrumbs);

    var titulo = document.createElement("h1");
    titulo.innerHTML = infoPelicula.nombre;

    var divContainer1 = document.createElement("div");
    divContainer1.setAttribute("id", "container1");
    var sinopsis = document.createElement("p");
    sinopsis.setAttribute("id", "pSinopsis");
    sinopsis.innerHTML = infoPelicula.sinopsis;

    var trailer = document.createElement("p");
    trailer.setAttribute("id", "pTrailer");
    trailer.innerHTML = infoPelicula.trailer;
    divContainer1.appendChild(sinopsis);
    divContainer1.appendChild(trailer);


    var puntuacion = document.createElement("p");
    puntuacion.innerHTML = "Puntuación obtenida: "+infoPelicula.puntuacion;

    var anio = document.createElement("p");
    anio.innerHTML = "Año de estreno: "+infoPelicula.anio;
    
    
    document.getElementById("infoPelicula").appendChild(titulo);
    document.getElementById("infoPelicula").appendChild(divContainer1);
    document.getElementById("infoPelicula").appendChild(puntuacion);
    document.getElementById("infoPelicula").appendChild(anio);

}

function crearDirector(infoDirector) {
    var nombre = document.createElement("a");
    nombre.innerHTML = infoDirector.nombre;
    nombre.setAttribute("href", "https://es.wikipedia.org/wiki/"+infoDirector.nombre);
    nombre.setAttribute("target", "_blank");
    
    document.getElementById("infoDirector").appendChild(nombre);
}

function crearActor(infoActor) {
    var nombre = document.createElement("a");
    nombre.innerHTML = infoActor.nombre+", ";
    nombre.setAttribute("href", "https://es.wikipedia.org/wiki/"+infoActor.nombre);
    nombre.setAttribute("target", "_blank");
    
    document.getElementById("infoActor").appendChild(nombre);
}

function obtenerUsuarioComentario(comentario) {
    llamadaAjax("../ObtenerUsuario.php", "id=" + parseInt(comentario.usuarioId),
    function(texto) {
            var usuario = JSON.parse(texto);
            crearComentario(comentario, usuario);
    },
    function(texto) {
 
    }
    );
}

function crearComentario(comentario) {
    var comentario = document.createElement("p")
    comentario.innerHTML = comentario.mensaje;
    var fechaComentario = document.createElement("p");
    fechaComentario.innerHTML = comentario.fechaPublicacion;
    /*var usuarioComentario = document.createElement("h4");
    usuarioComentario.innerHTML = usuario.nombre+" "+usuario.apellidos;*/

    document.getElementById("comentarios").appendChild(comentario);
    document.getElementById("comentarios").appendChild(fechaComentario);
    //document.getElementById("comentarios").appendChild(usuarioComentario);
}
