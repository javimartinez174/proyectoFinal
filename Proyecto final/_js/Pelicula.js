window.onpaint =  ajaxComprobarSesionIniciada(); //se ejecuta antes de cargar la página

window.onload = function() {
    crearPagina();
    document.getElementById("btnInsertComentario").addEventListener("click", insertarComentario);
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


var idPelicula; //variable global
function capturarIdURL() {
    var url = window.location.href;
    var pos1 = url.indexOf("=");
    idPelicula = url.substring(pos1+1, url.length);
}

function crearPagina() {
    capturarIdURL();
    obtenerInfoPelicula(idPelicula);
    obtenerInfoDirector(idPelicula);
    obtenerInfoActor(idPelicula);
    obtenerInfoGenero(idPelicula);
    obtenerInfoPlataforma(idPelicula);
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

function obtenerInfoGenero(idPelicula) {
    llamadaAjax("../ObtenerInfoGenero.php", "id=" + parseInt(idPelicula),
    function(texto) {
            var generos = JSON.parse(texto);

            for(var i=0; i<generos.length; i++) {
                crearGenero(generos[i]);
            }     
    },
    function(texto) {
 
    }
    );
}

function obtenerInfoPlataforma(idPelicula) {
    llamadaAjax("../ObtenerInfoPlataforma.php", "id=" + parseInt(idPelicula),
    function(texto) {
            var plataformas = JSON.parse(texto);

            for(var i=0; i<plataformas.length; i++) {
                crearPlataforma(plataformas[i]);
            }     
    },
    function(texto) {
 
    }
    );
}

function obtenerComentarios(idPelicula) {
    /*while(document.getElementById("comentarios").firstChild){
        document.getElementById("comentarios").removeChild(document.getElementById("comentarios").lastChild); //provisional
    }*/
    llamadaAjax("../ObtenerComentarios.php", "peliculaId=" + parseInt(idPelicula),
    function(texto) {
            var comentarios = JSON.parse(texto);

            for(var i=0; i<comentarios.length; i++) {
                obtenerUsuarioComentario(comentarios[i]);
            }
    },
    function(texto) {
 
    }
    );
}

function obtenerComentarioInsertado() {
    llamadaAjax("../ObtenerComentarioinsertado.php", "",
    function(texto) {
            var comentario = JSON.parse(texto);
            obtenerUsuarioComentario(comentario);
    },
    function(texto) {
 
    }
    );
}


function crearPelicula(infoPelicula) {
    cargarBreadcrumbs(infoPelicula);

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

function crearGenero(infoGenero) {
    var nombre = document.createElement("p");
    nombre.innerHTML = infoGenero.nombre+" ";
    nombre.setAttribute("font-weight", "bold");
    nombre.setAttribute("href", "#");
    nombre.setAttribute("target", "_blank");
    
    document.getElementById("infoGenero").appendChild(nombre);
}

function crearPlataforma(infoPlataforma) {
    var nombre = document.createElement("p");
    nombre.innerHTML = infoPlataforma.nombre+" ";
    nombre.setAttribute("font-weight", "bold");
    nombre.setAttribute("href", infoPlataforma.nombre);
    nombre.setAttribute("target", "_blank");
    
    document.getElementById("infoPlataforma").appendChild(nombre);
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

function crearComentario(comentario, usuario) {
    
    var divComent = document.createElement("div");
    divComent.setAttribute("class", "divComent");

    var coment = document.createElement("p")
    coment.innerHTML = ""+comentario.mensaje;
    var infoComent = document.createElement("p")
    infoComent.innerHTML = "Publicado por "+usuario.nombre+" "+usuario.apellidos+" | "+comentario.fechaPublicacion;
    
    divComent.appendChild(infoComent);
    divComent.appendChild(coment);

    document.getElementById("comentarios").insertBefore(divComent, document.getElementById("comentarios").firstChild);
}

function cargarBreadcrumbs(infoPelicula) {
    var breadcrumbs = document.createElement("li");
    breadcrumbs.innerHTML = infoPelicula.nombre;
    document.getElementById("breadcrumb").appendChild(breadcrumbs);
}

function insertarComentario() {
    llamadaAjax("../InsertarComentario.php", "mensaje=" + document.getElementById("insertComentario").value+"&peliculaId="+parseInt(idPelicula),
    function(texto) {
            obtenerComentarioInsertado(); 
    },
    function(texto) {
 
    }
    );
}