window.onload = function(){
    cargarListas();
    cargarBreadcrumbs();
}

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


function cargarListas() {
    limpiarDiv();
    llamadaAjax("../ObtenerListasUsuario.php", "",
    function(texto) {
        
            var listas = JSON.parse(texto);

            for (var i=0; i<listas.length; i++) {
                domCrearListas(listas[i]);
            }
    },
    function(texto) {
 
    }
    );
}

function cargarPelisLista(listaId, divPelis){
    llamadaAjax("../ObtenerInfoPeliculaPorListaId.php", "id="+parseInt(listaId),
    function(texto) {
        
            var peliculas = JSON.parse(texto);
        if(peliculas !=null){
            for (var i=0; i<peliculas.length; i++) {
                domCrearPeliculas(peliculas[i], divPelis, listaId);
            }
        }
    },
    function(texto) {
 
    });
}

function domCrearListas(lista){
    nombreLista = document.createElement("div");
    nombreLista.setAttribute("class", "collapsible container");
    nombreLista.addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
        content.style.maxHeight = null;
        } else {
        content.style.maxHeight = content.scrollHeight + "px";
        } 
    });
    nombreLista.innerHTML= lista.nombre;
    document.getElementById("listasUsuario").appendChild(nombreLista);

    divPelis = document.createElement("div");
    divPelis.setAttribute("class", "content");
    divPelis.setAttribute("id", lista.nombre);
    document.getElementById("listasUsuario").appendChild(divPelis);

    cargarPelisLista(lista.id, divPelis);
}

function eliminarPelicula(listaId, peliculaId){
    llamadaAjax("../BorrarPeliculaLista.php", "listaId="+parseInt(listaId)+"&peliculaId="+parseInt(peliculaId),
    function(texto) {
        cargarListas();
    },
    function(texto) {
        alert("algo ha ido mal")
    });
}

function domCrearPeliculas(pelicula, divPelis, listaId){
    
    aPeli = document.createElement("a");
    aPeli.setAttribute("href", "Pelicula.html?verinfo="+pelicula.id);
    imgPeli = document.createElement("img");
    imgPeli.setAttribute("src", "../_img/"+pelicula.caratula);
    imgPeli.setAttribute("data-toggle", "tooltip");
    imgPeli.setAttribute("title", pelicula.nombre);
    imgPeli.setAttribute("data-placement", "top");
    mostrarTooltip();


    eliminarPeli = document.createElement("button");
    eliminarPeli.innerHTML = "-";
    eliminarPeli.addEventListener("click", function(){
        eliminarPelicula(listaId, pelicula.id);
    });
    aPeli.appendChild(imgPeli);
    divPelis.appendChild(aPeli);
    divPelis.appendChild(eliminarPeli);
}

function mostrarTooltip(){
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();   
    });
}
function limpiarDiv(){
    while(listasUsuario.firstChild){
        listasUsuario.removeChild(listasUsuario.lastChild);
    }
}

function cargarBreadcrumbs() {
    var breadcrumbs = document.createElement("li");
    breadcrumbs.innerHTML = "Mis Listas";
    document.getElementById("breadcrumb").appendChild(breadcrumbs);
}
