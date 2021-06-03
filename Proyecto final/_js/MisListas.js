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

function cargarPelisLista(listaId, content){
    llamadaAjax("../ObtenerInfoPeliculaPorListaId.php", "id="+parseInt(listaId),
    function(texto) {
        
            var peliculas = JSON.parse(texto);
        if(peliculas !=null){
            for (var i=0; i<peliculas.length; i++) {
                domCrearPeliculas(peliculas[i], content);
            }
        }
    },
    function(texto) {
 
    });
}

function domCrearListas(lista){
    nombreLista = document.createElement("button");
    nombreLista.setAttribute("type", "button");
    nombreLista.setAttribute("class", "collapsible");
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

    content = document.createElement("div");
    content.setAttribute("class", "content");
    content.setAttribute("id", lista.nombre);
    document.getElementById("listasUsuario").appendChild(content);

    cargarPelisLista(lista.id, content);
}


function domCrearPeliculas(pelicula, content){

    aPeli = document.createElement("a");
    aPeli.setAttribute("href", "Pelicula.html?verinfo="+pelicula.id);
    imgPeli = document.createElement("img");
    imgPeli.setAttribute("src", "../_img/"+pelicula.caratula);
    aPeli.appendChild(imgPeli);
    content.appendChild(aPeli);
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
