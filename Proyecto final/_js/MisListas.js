window.onload = function(){
    cargarListas();
    listasUsuario = document.getElementById("listasUsuario");
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

function cargarPelisLista(listaId){
    llamadaAjax("../ObtenerInfoPeliculaPorListaId.php", parseInt(listaId),
    function(texto) {
        
            var peliculas = JSON.parse(texto);

            for (var i=0; i<peliculas.length; i++) {
                domCrearPeliculas(peliculas[i], i);
            }
    },
    function(texto) {
 
    });
}

function domCrearListas(lista){
    nombreLista = document.createElement("button");
    nombreLista.addEventListener("click", cargarPelisLista(lista.id));
    nombreLista.innerHTML= lista.nombre;

    document.getElementById("listasUsuario").appendChild(nombreLista);
}

function domCrearPeliculas(pelicula, pos){
    if(pos == 0){
        limpiarDiv;
    }

    nombrePeli = document.createElement("img");
    nombrePeli.setAttribute("src", "../_img/"+pelicula.caratula)

    document.getElementById("listasUsuario").appendChild(nombrePeli);

}

function limpiarDiv(){
    while(listasUsuario.firstChild){
        listasUsuario.removeChild(listasUsuario.lastChild);
    }
}
