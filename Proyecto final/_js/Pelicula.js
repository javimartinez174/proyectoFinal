//------------------------RESPUESTA DE LA PÁGINA AL CARGAR----------------------

window.onpaint =  ajaxComprobarSesionIniciada(); 

window.onload = function() {
    crearPagina();
    document.getElementById("btnInsertComentario").addEventListener("click", insertarComentario);
    divAlerta = document.getElementById("alerta");
    redesSociales();
}


//---------------------------------MÉTODOS JQUERY-----------------------------
function acumularId(idPelicula){ 

    $(document).ready(function() {
        $('#enviar').click(function(){
            var selected = '';    
            $('#formid input[type=checkbox]').each(function(){
                if (this.checked) {
                    selected += $(this).val()+',';
                }
            }); 
    
            if (selected != '') 
                ajaxAnnadirALista(selected, idPelicula);  
            else{
                limpiarDivAlertas();
                mensaje = "Debes seleccionar al menos una opción";
                crearAlerta(mensaje);
            }
            return false;
        });         
    });  
 }

//----------------------------MÉTODOS AJAX-----------------------------------------

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
    llamadaAjax("../_php/SesionIniciada.php", "", 
    function(texto){
        var sesionIniciada = JSON.parse(texto);
        if(!sesionIniciada){
            window.location = "../_php/SesionCerrar.php";
        }
    },  function(texto) {
        }
    );
}

function obtenerInfoPelicula(idPelicula) {
    
    llamadaAjax("../_php/ObtenerInfoPelicula.php", "id=" + parseInt(idPelicula),
        function(texto) {
                var infoPelicula = JSON.parse(texto);
                crearPelicula(infoPelicula);        
        },
        function(texto) {
    
        }
    );

}

function obtenerInfoDirector(idPelicula) {
    llamadaAjax("../_php/ObtenerInfoDirector.php", "id=" + parseInt(idPelicula),
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
    llamadaAjax("../_php/ObtenerInfoActor.php", "id=" + parseInt(idPelicula),
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
    llamadaAjax("../_php/ObtenerInfoGenero.php", "id=" + parseInt(idPelicula),
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
    llamadaAjax("../_php/ObtenerInfoPlataforma.php", "id=" + parseInt(idPelicula),
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
    llamadaAjax("../_php/ObtenerComentarios.php", "peliculaId=" + parseInt(idPelicula),
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
    llamadaAjax("../_php/ObtenerComentarioinsertado.php", "",
        function(texto) {
                var comentario = JSON.parse(texto);
                obtenerUsuarioComentario(comentario);
        },
        function(texto) {
    
        }
    );
}

function ObtenerListasUsuario(idPelicula){
    llamadaAjax("../_php/ObtenerListasUsuario.php", "",
        function(texto) {
            var listas = JSON.parse(texto);

            for (var i=0; i<listas.length; i++) {
                domCrearListasEnModal(listas[i], i,idPelicula, listas.length);
            }
        },
        function(texto) {
    
        }
    );

 }

function ajaxAnnadirALista(idListas, idPelicula){
    llamadaAjax("../_php/AnnadirPeliculaALista.php", "listaId=" + idListas +"&idPelicula="+parseInt(idPelicula),
        function(texto) {
                $('#myModal').modal('hide');
                limpiarDivAlertas();
                mensaje = "Pelicula insertada con éxito";
                crearAlerta(mensaje);
        },
        function(texto) {
    
        }
    );
}
 
function obtenerUsuarioComentario(comentario) {
    llamadaAjax("../_php/ObtenerUsuario.php", "id=" + parseInt(comentario.usuarioId),
        function(texto) {
                var usuario = JSON.parse(texto);
                crearComentario(comentario, usuario);
        },
        function(texto) {
    
        }
    );
}

function insertarComentario() {
    llamadaAjax("../_php/InsertarComentario.php", "mensaje=" + document.getElementById("insertComentario").value+
                "&peliculaId="+parseInt(idPelicula),
        function(texto) {
                document.getElementById("insertComentario").value = "";
                obtenerComentarioInsertado(); 
        },
        function(texto) {
    
        }
    );
}

//-------------------------------------MÉTODOS RELACIONADOS CON DOM-------------------------------

function crearPagina() {
    capturarIdURL();
    obtenerInfoPelicula(idPelicula);
    obtenerInfoDirector(idPelicula);
    obtenerInfoActor(idPelicula);
    obtenerInfoGenero(idPelicula);
    obtenerInfoPlataforma(idPelicula);
    obtenerComentarios(idPelicula);
} 

function crearPelicula(infoPelicula) {
    cargarBreadcrumbs(infoPelicula);

    var titulo = document.createElement("h1");
    titulo.innerHTML = infoPelicula.nombre + " (" + infoPelicula.anio + ")";

    var divContainer1 = document.createElement("div");
    divContainer1.setAttribute("id", "container1");
    var sinopsis = document.createElement("p");
    sinopsis.setAttribute("id", "pSinopsis");
    sinopsis.setAttribute("class", "pSinopsis");
    sinopsis.innerHTML = infoPelicula.sinopsis;
    document.getElementById("iconoAudio").addEventListener("click", function(){
        decirTexto(infoPelicula.sinopsis)
    });

    var trailer = document.createElement("p");
    trailer.setAttribute("class", "ml-auto")
    trailer.setAttribute("id", "pTrailer");
    trailer.innerHTML = infoPelicula.trailer;

    document.getElementById("trailer").appendChild(trailer);

    var imgCaratula = document.createElement("img");
    imgCaratula.setAttribute("class", "imgCaratula");
    imgCaratula.setAttribute("src", "../_img/"+infoPelicula.caratula);

    divImagen = document.getElementById("imagen");
    divImagen.appendChild(imgCaratula);
    divContainer1.appendChild(divImagen);
    divContainer1.appendChild(sinopsis);

    var agregarALista = document.createElement("button");
    agregarALista.setAttribute("class", "agregarLista");
    agregarALista.setAttribute("id", "abreModal");
    agregarALista.setAttribute("data-toggle", "modal");
    agregarALista.setAttribute("data-target", "#myModal");
    agregarALista.setAttribute("href", "#");
    agregarALista.innerHTML= "Añadir a mis listas +";

    divImagen.appendChild(agregarALista);

    document.getElementById("infoPelicula").appendChild(titulo);
    document.getElementById("infoPelicula").appendChild(divContainer1);
    
    var divPunt = document.createElement("div");
    divPunt.setAttribute("class", "divPunt");
    var puntuacion = document.createElement("p");
    puntuacion.innerHTML = "Puntuación obtenida: "+infoPelicula.puntuacion;
    divPunt.appendChild(puntuacion);
    for(var i = 0; i < infoPelicula.puntuacion; i++){
        var imagenEstrella = document.createElement("img");
        imagenEstrella.setAttribute("src", "../_img/estrella.png");
        imagenEstrella.style.width="24px";
        imagenEstrella.style.height="24px";
        divPunt.appendChild(imagenEstrella);
    }
    document.getElementById("infoPelicula").appendChild(divPunt);
    
    document.getElementById("abreModal").addEventListener("click", ObtenerListasUsuario(infoPelicula.id));
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
    nombre.innerHTML = infoGenero.nombre+" / ";
    nombre.setAttribute("font-weight", "bold");
    nombre.setAttribute("href", "#");
    nombre.setAttribute("target", "_blank");
    
    document.getElementById("infoGenero").appendChild(nombre);
}

function crearPlataforma(infoPlataforma) {
    var enlace = document.createElement("a");
    enlace.setAttribute("href", "https://www.google.com/search?q="+ infoPlataforma.nombre);
    enlace.setAttribute("target", "_blank");

    var imagen = document.createElement("img");
    imagen.setAttribute("id", infoPlataforma.icono);
    imagen.setAttribute("class", "iconoPlataforma");
    imagen.setAttribute("src", "../_img/utiles/"+infoPlataforma.icono);

    enlace.appendChild(imagen);
    document.getElementById("infoPlataforma").appendChild(enlace);
}

 function domCrearListasEnModal(lista, pos,  idPelicula, longitudListas){
    var formulario = document.getElementById("formId");
    
    pNombreLista=document.createElement("p");
    pNombreLista.innerHTML = "Lista: "+ lista.nombre;
    pNombreLista.style.display = "inline-block";
    pNombreLista.style.marginRight = "1em";

    nombreListaInput = document.createElement("input");
    nombreListaInput.setAttribute("type", "checkbox");
    nombreListaInput.setAttribute("value", lista.id)
    nombreListaInput.setAttribute("id", lista.id);
  
    var saltoLinea = document.createElement("br");

    formulario.appendChild(pNombreLista);
    formulario.appendChild(nombreListaInput);
    formulario.appendChild(saltoLinea);

    if(pos+1 == longitudListas){
        var introducir = document.createElement("button");
        introducir.setAttribute("name", "crear");
        introducir.setAttribute("class", "crear");
        introducir.setAttribute("id", "enviar");
        introducir.innerHTML = "Insertar Película";
        introducir.setAttribute("value", "Insertar Película");
        formulario.appendChild(introducir); 
        acumularId(idPelicula);
    }
 }


function crearAlerta(mensaje){
    
    modal = document.createElement("div");
    modal.setAttribute("class", "modal");
    modal.setAttribute("id", "modalAlerta");

    modalDialog = document.createElement("div");
    modalDialog.setAttribute("class", "modal-dialog modal-dialog-centered modal-sm");
   

    alerta = document.createElement("div");
    alerta.setAttribute("class", "alert alert-success");
    alerta.innerHTML = mensaje;

    btnCerrar = document.createElement("button");
    btnCerrar.setAttribute("type", "button");
    btnCerrar.setAttribute("class", "close");

    alerta.appendChild(btnCerrar);

    modalDialog.appendChild(alerta);
    modal.appendChild(modalDialog);

    divAlerta.appendChild(modal);

    $("#modalAlerta").modal("show");
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

//--------------------------------------UTILIDADES----------------------------

function limpiarDivAlertas(){
    while(divAlerta.firstChild){
        divAlerta.removeChild(divAlerta.lastChild);
    }
}

function decirTexto(texto) {
    let audio = new SpeechSynthesisUtterance();
    audio.text = texto;
    speechSynthesis.speak(audio);
}

var idPelicula; //variable global
function capturarIdURL() {
    var url = window.location.href;
    var pos1 = url.indexOf("=");
    idPelicula = url.substring(pos1+1, url.length);
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