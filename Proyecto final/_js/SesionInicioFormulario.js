
window.onload = function() {
    document.getElementById("abreModal").addEventListener("click", crearBotonesInicio);
    ajaxComprobarSesionIniciada();
}

function ajaxComprobarSesionIniciada(){
    llamadaAjax("../SesionIniciada.php", "", 
    function(texto){
        var sesionIniciada = JSON.parse(texto);
        if(sesionIniciada){
            window.location ="../PaginaPrincipal.php"
        }
    },  function(texto) {
        }
    );
}

function crearBotonesInicio() {

    //Limpiar modal
    var formulario = document.getElementById("formulario");
    while(formulario.firstChild){
        formulario.removeChild(formulario.lastChild);
    }

    //Crear botones para iniciar sesión o registrarse
    var btnIniciarSesion = document.createElement("button");
    btnIniciarSesion.setAttribute("id", "iniciarSesion");
    btnIniciarSesion.innerHTML = "Iniciar Sesion";
    document.getElementById("formulario").appendChild(btnIniciarSesion);
    btnIniciarSesion.addEventListener("click", crearFormularioInicio);

    var btnRegistrarse = document.createElement("button");
    btnRegistrarse.setAttribute("id", "registrarse");
    btnRegistrarse.innerHTML = "Registrarse";
    document.getElementById("formulario").appendChild(btnRegistrarse);
    btnRegistrarse.addEventListener("click", crearFormularioRegistrarse)


    //Crear formulario para iniciar sesión con cuenta existente
    function crearFormularioInicio(){
        document.getElementById("formulario").removeChild(btnIniciarSesion);
        document.getElementById("formulario").removeChild(btnRegistrarse);

        var form = document.createElement("form");


        var pUsuario = document.createElement("p");
        pUsuario.innerHTML = "Usuario: ";
        form.appendChild(pUsuario);

        var inputId = document.createElement("input");
        inputId.setAttribute("type", "text");
        inputId.setAttribute("name", "identificador");
        inputId.setAttribute("id", "identificador");
        inputId.setAttribute("placeholder", "Usuario");
        inputId.setAttribute("required", true);
        form.appendChild(inputId); 
    
        var pContrasenna = document.createElement("p");
        pContrasenna.innerHTML = "Contraseña: ";
        form.appendChild(pContrasenna);

        var contrasenna = document.createElement("input");
        contrasenna.setAttribute("type", "password");
        contrasenna.setAttribute("name", "contrasenna");
        contrasenna.setAttribute("id", "contrasenna");
        contrasenna.setAttribute("placeholder", "Contraseña");
        contrasenna.setAttribute("required", true);
        form.appendChild(contrasenna);

        var pRecuerdame = document.createElement("p");
        pRecuerdame.innerHTML = "Mantener Sesion Iniciada: ";
        form.appendChild(pRecuerdame);

        var recuerdame = document.createElement("input");
        recuerdame.setAttribute("type", "checkbox");
        recuerdame.setAttribute("name", "recordar");
        recuerdame.setAttribute("id", "recordar");
        form.append(recuerdame);

        var inicioSesion = document.createElement("button");
        inicioSesion.setAttribute("type", "submit");
        inicioSesion.setAttribute("name", "iniciar");
        inicioSesion.innerHTML = "Iniciar sesión";
        inicioSesion.setAttribute("value", "Iniciar sesión");
        form.appendChild(inicioSesion);

        document.getElementById("formulario").appendChild(form);

        form.setAttribute("id", "form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "../SesionInicioComprobar.php");

    }


    //Crear formulario para cuenta nueva
    function crearFormularioRegistrarse(){
        document.getElementById("formulario").removeChild(btnIniciarSesion);
        document.getElementById("formulario").removeChild(btnRegistrarse);


        var formRegistro = document.createElement("form");

        var pNombre = document.createElement("p");
        pNombre.innerHTML = "Nombre: ";
        formRegistro.appendChild(pNombre);

        var nombre = document.createElement("input");
        nombre.setAttribute("type", "text");
        nombre.setAttribute("name", "nombre");
        nombre.setAttribute("id", "nombre");
        nombre.setAttribute("placeholder", "Nombre");
        nombre.setAttribute("required", true);
        formRegistro.appendChild(nombre); 

        var pApellidos = document.createElement("p");
        pApellidos.innerHTML = "Apellidos: ";
        formRegistro.appendChild(pApellidos);

        var apellidos = document.createElement("input");
        apellidos.setAttribute("type", "text");
        apellidos.setAttribute("name", "apellidos");
        apellidos.setAttribute("id", "apellidos");
        apellidos.setAttribute("placeholder", "Apellidos");
        apellidos.setAttribute("required", true);
        formRegistro.appendChild(apellidos); 

        var pUsuario = document.createElement("p");
        pUsuario.innerHTML = "Usuario: ";
        formRegistro.appendChild(pUsuario);

        var usuario = document.createElement("input");
        usuario.setAttribute("type", "text");
        usuario.setAttribute("name", "identificador");
        usuario.setAttribute("id", "identificador");
        usuario.setAttribute("placeholder", "Usuario");
        usuario.setAttribute("required", true);
        formRegistro.appendChild(usuario); 

        var pEmail = document.createElement("p");
        pEmail.innerHTML = "Email: ";
        formRegistro.appendChild(pEmail);

        var email = document.createElement("input");
        email.setAttribute("type", "text");
        email.setAttribute("name", "email");
        email.setAttribute("id", "email");
        email.setAttribute("placeholder", "Email");
        email.setAttribute("required", true);
        formRegistro.appendChild(email); 
        
    
        var pContrasenna = document.createElement("p");
        pContrasenna.innerHTML = "Contraseña: ";
        formRegistro.appendChild(pContrasenna);

        var contrasenna = document.createElement("input");
        contrasenna.setAttribute("type", "password");
        contrasenna.setAttribute("name", "contrasenna");
        contrasenna.setAttribute("id", "contrasenna");
        contrasenna.setAttribute("placeholder", "Contraseña");
        contrasenna.setAttribute("required", true);
        formRegistro.appendChild(contrasenna);

        var pContrasenna2 = document.createElement("p");
        pContrasenna2.innerHTML = "Confirme su contraseña: ";
        formRegistro.appendChild(pContrasenna2);

        var contrasenna2 = document.createElement("input");
        contrasenna2.setAttribute("type", "password");
        contrasenna2.setAttribute("name", "contrasenna2");
        contrasenna2.setAttribute("id", "contrasenna2");
        contrasenna2.setAttribute("placeholder", "Confirme su contraseña");
        contrasenna2.setAttribute("required", true);
        formRegistro.appendChild(contrasenna2);

        var registrarme = document.createElement("button");
        registrarme.setAttribute("type", "submit");
        registrarme.setAttribute("name", "registrarme");
        registrarme.setAttribute("value", "registrarme");
        registrarme.innerHTML ="Registrarme";
        formRegistro.appendChild(registrarme);

        document.getElementById("formulario").appendChild(formRegistro);

        formRegistro.setAttribute("id", "formRegistro");
        formRegistro.setAttribute("method", "post");
        formRegistro.setAttribute("action", "../UsuarioNuevoCrear.php");
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
