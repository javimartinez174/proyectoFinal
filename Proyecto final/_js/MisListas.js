window.onload = function(){
    cargarListas();
    
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
    nombreLista.setAttribute("class", "collapsible")
    nombreLista.innerHTML= lista.nombre;
    document.getElementById("listasUsuario").appendChild(nombreLista);

    content = document.createElement("div");
    content.setAttribute("class", "content");
    content.setAttribute("id", lista.nombre);
    document.getElementById("listasUsuario").appendChild(content);

    cargarPelisLista(lista.id, content);
}


function domCrearPeliculas(pelicula, content){

    imgPeli = document.createElement("img");
    imgPeli.setAttribute("src", "../_img/"+pelicula.caratula);

    content.appendChild(imgPeli);
}

function limpiarDiv(){
    while(listasUsuario.firstChild){
        listasUsuario.removeChild(listasUsuario.lastChild);
    }
}
