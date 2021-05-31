window.onload = function(){
    cargarUsuario();
    infoUsuario = document.getElementById("infoUsuario");
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

function cerrarSesion() {
    window.location = "../SesionCerrar.php";
}

function cargarUsuario() {

    while(infoUsuario.firstChild){
        infoUsuario.removeChild(infoUsuario.lastChild);
    }

    llamadaAjax("../ObtenerUsuarioPerfil.php", "",
    function(texto) {
        
        if ( texto == "" ) { //COMO SI CONTARAS LA LONGITUD DE CADENA
            alert("SIN DATOS!")
        }else{
            var usuario = JSON.parse(texto);

           domCrearPerfil(usuario);
        }
    },
    function(texto) {
 
    }
    );
}


function domCrearPerfil(usuario){
    var breadcrumbs = document.createElement("li");
    breadcrumbs.innerHTML = usuario.identificador;
    document.getElementById("breadcrumb").appendChild(breadcrumbs);


    var imagenPerfil = document.createElement("img");
    imagenPerfil.setAttribute("src", "../_fotoDePerfil/"+usuario.fotoPerfil);
    imagenPerfil.setAttribute("class", "fotoPerfil");

    

    document.getElementById("infoUsuario").appendChild(imagenPerfil);
    document.getElementById("infoUsuario").appendChild();
}

