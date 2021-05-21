
window.onload = function() {
    document.getElementById("iniciarSesion").addEventListener("click", formularioInicioAJAX);
}

function formularioInicioAJAX() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          crearFormularioInicio();  
        }
    }
   
    xhr.send();
}

function crearFormularioInicio() {
    var inputId = document.createElement("input");
    inputId.setAttribute("type", "text");
    inputId.setAttribute("name", "identificador");
    inputId.setAttribute("id", "identificador");
    inputId.setAttribute("placeholder", "Usuario");
    inputId.setAttribute("required", true);

    document.getElementById("prueba").appendChild(inputId);
}
