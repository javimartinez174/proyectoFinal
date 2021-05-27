//window.onpaint =  

window.onload = function() {
    cargarPelis();
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
    
    request.send();
}

function cargarPelis(){
    llamadaAjax("../PeliculasNovedades.php", "",
        function(texto) {
            var peliculas = JSON.parse(texto);

            for (var i=0; i<peliculas.length; i++) {
                domCrearPelis(peliculas[i]);
            }
        }, function (texto){}
    );
}

function domCrearPelis(pelicula){
    cartelera = document.getElementById("cartelera");

    divCube = document.createElement("div");
    divCube.setAttribute("class", "cube");

    divFlip = document.createElement("div");
    divFlip.setAttribute("class", "flip");
    divFlop = document.createElement("div");
    divFlop.setAttribute("class", "flop");

    imgCaratula = document.createElement("img");
    imgCaratula.setAttribute("id", "imgNovedades");
    imgCaratula.setAttribute("class", "imgNovedades");
    imgCaratula.setAttribute("src", "../_img/"+pelicula.id+".jpg");    
    imgCaratula.setAttribute("width", "270px");
    imgCaratula.setAttribute("height", "400px");

    var titulo = document.createElement("p");
    titulo.innerHTML = pelicula.nombre;
    divFlop.appendChild(titulo);

    sp = document.createElement("br");
    divFlop.appendChild(sp);
    
    var anio = document.createElement("p");
    anio.innerHTML = "Año de estreno: "+pelicula.anio;
    divFlop.appendChild(anio);

    sp = document.createElement("br");
    divFlop.appendChild(sp);

    var puntuacion = document.createElement("p");
    puntuacion.innerHTML = "Puntuación obtenida: "+pelicula.puntuacion;
    divFlop.appendChild(puntuacion);

    divFlip.appendChild(imgCaratula);
    divCube.appendChild(divFlip);
    divCube.appendChild(divFlop);
    cartelera.appendChild(divCube);
    
}