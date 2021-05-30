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
}

function obtenerInfoPelicula(idPelicula) {
    alert(idPelicula);
    llamadaAjax("../ObtenerInfoPelicula.php", "id=" + idPelicula,
    function(texto) {
            var infoPelicula = JSON.parse(texto);
            crearPelicula(infoPelicula);        
    },
    function(texto) {
 
    }
    );
}

function crearPelicula(infoPelicula) {
    var titulo = document.createElement("h1");
    titulo.innerHTML = ""+infoPelicula.nombre;
    
    document.getElementById("infoPelicula").appendChild(titulo);

}