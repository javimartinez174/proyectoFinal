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

function modificarInput(divInput, p1, iconoEdit) {
        var inputEdit = document.createElement("input");
        inputEdit.setAttribute("type", "text");
        inputEdit.setAttribute("placeholder", "Nuevo "+p1.id);
        inputEdit.setAttribute("class", "inputEdit");
        inputEdit.setAttribute("required", true);
        var iconoOK = document.createElement("i");
        iconoOK.setAttribute("class", "fas fa-thumbs-up");
        iconoOK.addEventListener("click", function(){
            if(inputEdit.value!="")
                llamadaAjax("../ModificarIdentificador.php", "nuevoIdentificador="+inputEdit.value+"&input="+p1.id,
                    function(texto) {
                        var exito = JSON.parse(texto);
                        if(exito){
                            iconoEdit.style.display = "block";
                            p1.innerHTML = inputEdit.value;
                        }
                        else
                            alert("Campo obligatorio");
                        divInput.removeChild(divInput.lastChild);
                        divInput.removeChild(divInput.lastChild);
                    },
                    function(texto) {
                    
                    }
                );
            else
                alert("Campo Obligatorio");
        })
        
    divInput.appendChild(inputEdit);    
    divInput.appendChild(iconoOK);
    
}


function domCrearPerfil(usuario){
    var breadcrumbs = document.createElement("li");
    breadcrumbs.innerHTML = usuario.identificador;
    document.getElementById("breadcrumb").appendChild(breadcrumbs);

    var imagenPerfil = document.createElement("img");
    imagenPerfil.setAttribute("src", "../_fotoDePerfil/"+usuario.fotoPerfil);
    imagenPerfil.setAttribute("class", "fotoPerfil");
    document.getElementById("divImg").appendChild(imagenPerfil);

    //identificador
    var h4Identificador = document.createElement("h4"); 
    h4Identificador.innerHTML = "Alias";
    document.getElementById("infoUsuario").appendChild(h4Identificador);
    var divIdentificador = document.createElement("div");
    divIdentificador.setAttribute("class", "divIdentificador");
    var divIdentificador2 = document.createElement("div");
    divIdentificador2.setAttribute("class", "divIdentificador2");
    var p1 = document.createElement("p");
    p1.setAttribute("id", "identificador");
    p1.innerHTML = usuario.identificador;
    divIdentificador2.appendChild(p1);
    divIdentificador.appendChild(divIdentificador2);
    var iconoEdit = document.createElement("i");
    iconoEdit.setAttribute("class", "fas fa-edit");
    iconoEdit.setAttribute("id", "iconoEdit");
    iconoEdit.addEventListener("click", function(){modificarInput(divIdentificador2, p1, this); this.style.display = "none";}, false);
    divIdentificador.appendChild(iconoEdit);    
    document.getElementById("infoUsuario").appendChild(divIdentificador);

    //nombre
    var h4Nombre = document.createElement("h4"); 
    h4Nombre.innerHTML = "Nombre";
    document.getElementById("infoUsuario").appendChild(h4Nombre);
    var divNombre = document.createElement("div");
    divNombre.setAttribute("class", "divnombre");
    var divNombre2 = document.createElement("div");
    divNombre2.setAttribute("class", "divNombre2");
    var p2 = document.createElement("p");
    p2.setAttribute("id", "nombre");
    p2.innerHTML = usuario.nombre;
    divNombre2.appendChild(p2);
    divNombre.appendChild(divNombre2);
    var iconoEdit2 = document.createElement("i");
    iconoEdit2.setAttribute("class", "fas fa-edit");
    iconoEdit2.setAttribute("id", "iconoEdit");
    iconoEdit2.addEventListener("click", function(){modificarInput(divNombre2, p2, this); this.style.display = "none";}, false);
    divNombre.appendChild(iconoEdit2);
    document.getElementById("infoUsuario").appendChild(divNombre);

    //apellidos
    var h4Apellidos = document.createElement("h4"); 
    h4Apellidos.innerHTML = "Apellidos";
    document.getElementById("infoUsuario").appendChild(h4Apellidos);
    var divApellidos = document.createElement("div");
    divApellidos.setAttribute("class", "divApellidos");
    var divApellidos2 = document.createElement("div");
    divApellidos2.setAttribute("class", "divApellidos2");
    var p3 = document.createElement("p");
    p3.setAttribute("id", "apellidos");
    p3.innerHTML = usuario.apellidos;
    divApellidos2.appendChild(p3);
    divApellidos.appendChild(divApellidos2);
    var iconoEdit3 = document.createElement("i");
    iconoEdit3.setAttribute("class", "fas fa-edit");
    iconoEdit3.setAttribute("id", "iconoEdit");
    iconoEdit3.addEventListener("click", function(){modificarInput(divApellidos2, p3, this); this.style.display = "none";}, false);
    divApellidos.appendChild(iconoEdit3);
    document.getElementById("infoUsuario").appendChild(divApellidos);

    //email
    var h4Email = document.createElement("h4"); 
    h4Email.innerHTML = "Email";
    document.getElementById("infoUsuario").appendChild(h4Email);
    var divEmail = document.createElement("div");
    divEmail.setAttribute("class", "divEmail");
    var divEmail2 = document.createElement("div");
    divEmail2.setAttribute("class", "divEmail2");
    var p4 = document.createElement("p");
    p4.setAttribute("id", "email");
    p4.innerHTML = usuario.email;
    divEmail2.appendChild(p4);
    divEmail.appendChild(divEmail2);
    var iconoEdit4 = document.createElement("i");
    iconoEdit4.setAttribute("class", "fas fa-edit");
    iconoEdit4.setAttribute("id", "iconoEdit");
    iconoEdit4.addEventListener("click", function(){modificarInput(divEmail2, p4, this); this.style.display = "none";}, false);
    divEmail.appendChild(iconoEdit4);
    document.getElementById("infoUsuario").appendChild(divEmail);

    //contrasenna
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

