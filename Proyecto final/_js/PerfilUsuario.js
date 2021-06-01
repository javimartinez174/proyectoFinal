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
    document.getElementById("divImg").appendChild(imagenPerfil);

    var h4Identificador = document.createElement("h4"); 
    h4Identificador.innerHTML = "Alias";
    document.getElementById("infoUsuario").appendChild(h4Identificador);
    var divIdentificador = document.createElement("div");
    divIdentificador.setAttribute("class", "divIdentificador");
    var divIdentificador2 = document.createElement("div");
    divIdentificador2.setAttribute("class", "divIdentificador2");
    var p1 = document.createElement("p");
    p1.innerHTML = usuario.identificador;
    divIdentificador2.appendChild(p1);
    divIdentificador.appendChild(divIdentificador2);
    var iconoEdit = document.createElement("i");
    iconoEdit.setAttribute("class", "fas fa-edit");
    iconoEdit.setAttribute("id", "iconoEdit");
    divIdentificador.appendChild(iconoEdit);
    document.getElementById("infoUsuario").appendChild(divIdentificador);

    var h4Nombre = document.createElement("h4"); 
    h4Nombre.innerHTML = "Nombre";
    document.getElementById("infoUsuario").appendChild(h4Nombre);
    var divNombre = document.createElement("div");
    divNombre.setAttribute("class", "divnombre");
    var divNombre2 = document.createElement("div");
    divNombre2.setAttribute("class", "divNombre2");
    var p2 = document.createElement("p");
    p2.innerHTML = usuario.nombre;
    divNombre2.appendChild(p2);
    divNombre.appendChild(divNombre2);
    var iconoEdit = document.createElement("i");
    iconoEdit.setAttribute("class", "fas fa-edit");
    iconoEdit.setAttribute("id", "iconoEdit");
    divNombre.appendChild(iconoEdit);
    document.getElementById("infoUsuario").appendChild(divNombre);

    var h4Apellidos = document.createElement("h4"); 
    h4Apellidos.innerHTML = "Apellidos";
    document.getElementById("infoUsuario").appendChild(h4Apellidos);
    var divApellidos = document.createElement("div");
    divApellidos.setAttribute("class", "divApellidos");
    var divApellidos2 = document.createElement("div");
    divApellidos2.setAttribute("class", "divApellidos2");
    var p3 = document.createElement("p");
    p3.innerHTML = usuario.apellidos;
    divApellidos2.appendChild(p3);
    divApellidos.appendChild(divApellidos2);
    var iconoEdit = document.createElement("i");
    iconoEdit.setAttribute("class", "fas fa-edit");
    iconoEdit.setAttribute("id", "iconoEdit");
    divApellidos.appendChild(iconoEdit);
    document.getElementById("infoUsuario").appendChild(divApellidos);

    var h4Email = document.createElement("h4"); 
    h4Email.innerHTML = "Email";
    document.getElementById("infoUsuario").appendChild(h4Email);
    var divEmail = document.createElement("div");
    divEmail.setAttribute("class", "divEmail");
    var divEmail2 = document.createElement("div");
    divEmail2.setAttribute("class", "divEmail2");
    var p4 = document.createElement("p");
    p4.innerHTML = usuario.email;
    divEmail2.appendChild(p4);
    divEmail.appendChild(divEmail2);
    var iconoEdit = document.createElement("i");
    iconoEdit.setAttribute("class", "fas fa-edit");
    iconoEdit.setAttribute("id", "iconoEdit");
    divEmail.appendChild(iconoEdit);
    document.getElementById("infoUsuario").appendChild(divEmail);

    var h4Contrasenna = document.createElement("h4"); 
    h4Contrasenna.innerHTML = "Contrasenna";
    document.getElementById("infoUsuario").appendChild(h4Contrasenna);
    var divContrasenna = document.createElement("div");
    divContrasenna.setAttribute("class", "divContrasenna");
    var divPass = document.createElement("div");
    divPass.setAttribute("class", "divPass");
    var p5 = document.createElement("p");
    p5.innerHTML = "********";
    divPass.appendChild(p5);
    divContrasenna.appendChild(divPass);
    var iconoVer = document.createElement("i");
    iconoVer.setAttribute("class", "fas fa-eye");
    iconoVer.setAttribute("id", "iconoVer");
    iconoVer.addEventListener("mouseover", function(){
                                            while(divPass.firstChild){
                                                divPass.removeChild(divPass.lastChild); 
                                            }
                                            var p5 = document.createElement("p");
                                            p5.innerHTML = usuario.contrasenna;
                                            divPass.appendChild(p5);
                                        });
    iconoVer.addEventListener("mouseout", function(){
                                            while(divPass.firstChild){
                                                divPass.removeChild(divPass.lastChild); 
                                            }
                                            var p5 = document.createElement("p");
                                            p5.innerHTML = "********";
                                            divPass.appendChild(p5);
                                        });
                                        
    divContrasenna.appendChild(iconoVer);
    document.getElementById("infoUsuario").appendChild(divContrasenna);
    
}

