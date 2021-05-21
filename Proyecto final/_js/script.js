
function mostrarInputsBusqueda(){
    getSelectValue = document.getElementById("busqueda").value;
    if(getSelectValue=="titulo"){
        document.getElementById("nombre").style.display = "inline-block";
        document.getElementById("genero").style.display = "none";
        document.getElementById("puntuacion").style.display = "none";
        document.getElementById("plataforma").style.display = "none";
    }else if(getSelectValue=="genero"){
        document.getElementById("nombre").style.display = "none";
        document.getElementById("genero").style.display = "inline-block";
        document.getElementById("puntuacion").style.display = "none";
        document.getElementById("plataforma").style.display = "none";
    }else if(getSelectValue=="puntuacion"){
        document.getElementById("nombre").style.display = "none";
        document.getElementById("genero").style.display = "none";
        document.getElementById("puntuacion").style.display = "inline-block";
        document.getElementById("plataforma").style.display = "none";
    }else if (getSelectValue=="plataforma"){
        document.getElementById("nombre").style.display = "none";
        document.getElementById("genero").style.display = "none";
        document.getElementById("puntuacion").style.display = "none";
        document.getElementById("plataforma").style.display = "inline-block";
    }
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




