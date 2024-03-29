    window.onpaint =  ajaxComprobarSesionIniciada(); //se ejecuta antes de cargar la página
    window.onpaint =  crearCarruselNovedades();


    window.onload = function() {
        jQueyCarrusel();
        document.getElementById("abreModal").addEventListener("click", crearBotonesInicio);
        document.getElementById("descubrenos").addEventListener("click", crearBotonesInicio);
        formulario = document.getElementById("formulario");
        divAlerta= document.getElementById("alerta");
        redesSociales();        
    }


//---------------------------MÉTODOS AJAX-------------------
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
        llamadaAjax("../_php/SesionIniciada.php", "", 
        function(texto){
            var sesionIniciada = JSON.parse(texto);
            if(sesionIniciada){
                window.location ="PaginaPrincipal.html";
            }
        },  function(texto) {
            }
        );
    }

    function ajaxIniciarSesion(inputId, contrasenna, recuerdame){
            
        llamadaAjax("../_php/IniciarSesionAJAX.php", "identificador="+inputId.value+"&contrasenna="+contrasenna.value+"&recuerdame="+recuerdame.checked,
            function(texto) {
                var exito = JSON.parse(texto);

                if(!exito){
                    $('#myModal').modal('hide');
                    divLimpiarAlerta();
                    mensaje = "Error! Las credenciales son erroneas";
                    crearAlerta(mensaje);
                }else{
                    window.location= "PaginaPrincipal.html";
                }
                
            }, function (texto){}
        );
    }

    function ajaxRegistrarNuevoUsuario(nombre, apellidos, identificador, email, contrasenna, contrasenna2){
        llamadaAjax("../_php/RegistrarUsuarioAjax.php", "nombre="+nombre.value+"&apellidos="+apellidos.value+
                                                    "&identificador="+identificador.value+"&email="+email.value
                                                    +"&contrasenna="+contrasenna.value+"&contrasenna2="+contrasenna2.value,
            function(texto) {
                var exito = JSON.parse(texto);

                if(!exito){
                    $('#myModal').modal('hide');
                    divLimpiarAlerta();
                    mensaje = "Error! Algo ha ido mal. Puede que su identificador ya se esté usando";
                    crearAlerta(mensaje);
                }else{
                    $('#myModal').modal('hide');
                    divLimpiarAlerta();
                    mensaje = "Registrado con éxito, inicie sesión";
                    crearAlerta(mensaje);     
                }
 
            }, function (texto){}
        );
    }

    function crearCarruselNovedades(){

        llamadaAjax("../_php/PeliculasNovedades.php", "",
            function(texto) {
                var peliculas = JSON.parse(texto);
    
                for (var i=0; i<peliculas.length; i++) {
                    // No se fuerza la ordenación, ya que PHP nos habrá dado los elementos en orden correcto y sería una pérdida de tiempo.
                    domCrearCarruselNovedades(peliculas[i]);
                }
            }, function (texto){}
        );
    }
    

//----------------------------MÉTODOS DEL DOM-----------------------------

    function crearBotonesInicio() {

        //Limpiar modal
        divLimpiarFormulario();

        //Crear botones para iniciar sesión o registrarse
        var btnIniciarSesion = document.createElement("button");
        btnIniciarSesion.setAttribute("id", "iniciarSesion");
        btnIniciarSesion.setAttribute("class", "iniciarSesion");
        btnIniciarSesion.innerHTML = "Iniciar Sesion";
        document.getElementById("formulario").appendChild(btnIniciarSesion);
        

        var btnRegistrarse = document.createElement("button");
        btnRegistrarse.setAttribute("id", "registrarse");
        btnRegistrarse.setAttribute("class", "registrarse");
        btnRegistrarse.innerHTML = "Registrarse";
        document.getElementById("formulario").appendChild(btnRegistrarse);
        

        btnIniciarSesion.addEventListener("click", function(){
            crearFormularioInicio(btnIniciarSesion, btnRegistrarse);
        });
        btnRegistrarse.addEventListener("click", function(){
            crearFormularioRegistrarse(btnIniciarSesion, btnRegistrarse);
        });
        
    }

    //Crear formulario para iniciar sesión con cuenta existente
    function crearFormularioInicio(btnIniciarSesion, btnRegistrarse){
        document.getElementById("formulario").removeChild(btnIniciarSesion);
        document.getElementById("formulario").removeChild(btnRegistrarse);

        crearBtnAtras();

        var pUsuario = document.createElement("p");
        pUsuario.innerHTML = "Usuario: ";

        var inputId = document.createElement("input");
        inputId.setAttribute("type", "text");
        inputId.setAttribute("name", "identificador");
        inputId.setAttribute("id", "identificador");
        inputId.setAttribute("placeholder", "Usuario");
        inputId.setAttribute("required", true);
    
        var pContrasenna = document.createElement("p");
        pContrasenna.innerHTML = "Contraseña: ";

        var contrasenna = document.createElement("input");
        contrasenna.setAttribute("type", "password");
        contrasenna.setAttribute("name", "contrasenna");
        contrasenna.setAttribute("id", "contrasenna");
        contrasenna.setAttribute("placeholder", "Contraseña");
        contrasenna.setAttribute("required", true);

        var pRecuerdame = document.createElement("p");
        pRecuerdame.innerHTML = "Mantener Sesion Iniciada: ";
        pRecuerdame.style.display= "inline-block";
        pRecuerdame.style.marginRight = "1em";

        var recuerdame = document.createElement("input");
        recuerdame.setAttribute("type", "checkbox");
        recuerdame.setAttribute("name", "recordar");
        recuerdame.setAttribute("id", "recordar");
        recuerdame.style.display = "inline-block";

        var inicioSesion = document.createElement("button");
        inicioSesion.addEventListener("click", function(){
            ajaxIniciarSesion(inputId, contrasenna, recuerdame);
        })
        inicioSesion.setAttribute("name", "iniciar");
        inicioSesion.setAttribute("class", "botonIniciar");
        inicioSesion.innerHTML = "Iniciar sesión";
        inicioSesion.setAttribute("value", "Iniciar sesión");

        document.getElementById("formulario").appendChild(pUsuario);
        document.getElementById("formulario").appendChild(inputId);
        document.getElementById("formulario").appendChild(pContrasenna);
        document.getElementById("formulario").appendChild(contrasenna);
        document.getElementById("formulario").appendChild(pRecuerdame);
        document.getElementById("formulario").appendChild(recuerdame);
        document.getElementById("formulario").appendChild(inicioSesion);
        
    }

     //Crear formulario para cuenta nueva
    function crearFormularioRegistrarse(btnIniciarSesion, btnRegistrarse){
        document.getElementById("formulario").removeChild(btnIniciarSesion);
        document.getElementById("formulario").removeChild(btnRegistrarse);

        crearBtnAtras();

        //formulario registro

        var pNombre = document.createElement("p");
        pNombre.innerHTML = "Nombre: ";

        var nombre = document.createElement("input");
        nombre.setAttribute("type", "text");
        nombre.setAttribute("name", "nombre");
        nombre.setAttribute("id", "nombre");
        nombre.setAttribute("placeholder", "Nombre");
        nombre.setAttribute("required", true);

        var pApellidos = document.createElement("p");
        pApellidos.innerHTML = "Apellidos: ";

        var apellidos = document.createElement("input");
        apellidos.setAttribute("type", "text");
        apellidos.setAttribute("name", "apellidos");
        apellidos.setAttribute("id", "apellidos");
        apellidos.setAttribute("placeholder", "Apellidos");
        apellidos.setAttribute("required", true);

        var pIdentificador = document.createElement("p");
        pIdentificador.innerHTML = "Usuario: ";

        var identificador = document.createElement("input");
        identificador.setAttribute("type", "text");
        identificador.setAttribute("name", "identificador");
        identificador.setAttribute("id", "identificador");
        identificador.setAttribute("placeholder", "Usuario");
        identificador.setAttribute("required", true);

        var pEmail = document.createElement("p");
        pEmail.innerHTML = "Email: ";

        var email = document.createElement("input");
        email.setAttribute("type", "text");
        email.setAttribute("name", "email");
        email.setAttribute("id", "email");
        email.setAttribute("placeholder", "Email");
        email.setAttribute("required", true);
        
    
        var pContrasenna = document.createElement("p");
        pContrasenna.innerHTML = "Contraseña: ";

        var contrasenna = document.createElement("input");
        contrasenna.setAttribute("type", "password");
        contrasenna.setAttribute("name", "contrasenna");
        contrasenna.setAttribute("id", "contrasenna");
        contrasenna.setAttribute("placeholder", "Contraseña");
        contrasenna.setAttribute("required", true);

        var pContrasenna2 = document.createElement("p");
        pContrasenna2.innerHTML = "Confirme su contraseña: ";

        var contrasenna2 = document.createElement("input");
        contrasenna2.setAttribute("type", "password");
        contrasenna2.setAttribute("name", "contrasenna2");
        contrasenna2.setAttribute("id", "contrasenna2");
        contrasenna2.setAttribute("placeholder", "Confirme su contraseña");
        contrasenna2.setAttribute("required", true);

        var registrarme = document.createElement("button");
        registrarme.setAttribute("name", "registrarme");
        registrarme.setAttribute("value", "registrarme");
        registrarme.addEventListener("click", function(){
            ajaxRegistrarNuevoUsuario(nombre, apellidos, identificador, email, contrasenna, contrasenna2);
        })        
        registrarme.innerHTML ="Registrarme";

        document.getElementById("formulario").appendChild(pNombre);
        document.getElementById("formulario").appendChild(nombre);
        document.getElementById("formulario").appendChild(pApellidos);
        document.getElementById("formulario").appendChild(apellidos);
        document.getElementById("formulario").appendChild(pIdentificador);
        document.getElementById("formulario").appendChild(identificador);
        document.getElementById("formulario").appendChild(pEmail);
        document.getElementById("formulario").appendChild(email);
        document.getElementById("formulario").appendChild(pContrasenna);
        document.getElementById("formulario").appendChild(contrasenna);
        document.getElementById("formulario").appendChild(pContrasenna2);
        document.getElementById("formulario").appendChild(contrasenna2);
        document.getElementById("formulario").appendChild(registrarme);
    }

    //boton para volver atras
    function crearBtnAtras() {
        
        var divAtras = document.createElement("div");
        divAtras.setAttribute("class", "divAtras");
        var btnAtras = document.createElement("i");
        btnAtras.setAttribute("class", "fas fa-angle-left fa-2x"); //fa-2x para size
        divAtras.appendChild(btnAtras);
        divAtras.addEventListener("click", crearBotonesInicio);
        document.getElementById("formulario").appendChild(divAtras);
    }

    //creación de mennsaje de alerta
    function crearAlerta(mensaje){
    
        modal = document.createElement("div");
        modal.setAttribute("class", "modal");
        modal.setAttribute("id", "modalAlerta");

        modalDialog = document.createElement("div");
        modalDialog.setAttribute("class", "modal-dialog modal-dialog-centered modal-sm");
    

        alerta = document.createElement("div");
        alerta.setAttribute("class", "alert alert-danger");
        alerta.innerHTML = mensaje;

        btnCerrar = document.createElement("button");
        btnCerrar.setAttribute("type", "button");
        btnCerrar.setAttribute("class", "close");

        alerta.appendChild(btnCerrar);

        modalDialog.appendChild(alerta);
        modal.appendChild(modalDialog);

        divAlerta.appendChild(modal);

        $("#modalAlerta").modal("show");
    }

  
//Sección de Novedades (Carrusel)

function domCrearCarruselNovedades(pelicula){
    novedades = document.getElementById("novedades");

    divPelicula = document.createElement("div");

    imgCaratula = document.createElement("img");
    imgCaratula.setAttribute("id", "imgNovedades");
    imgCaratula.setAttribute("class", "imgNovedades");
    imgCaratula.setAttribute("src", "../_img/"+pelicula.caratula);    

    divPelicula.appendChild(imgCaratula);
    novedades.appendChild(divPelicula);
    
}

//-----------------------UTILIDADES------------------------------------

function divLimpiarAlerta(){
    while(divAlerta.firstChild){
        divAlerta.removeChild(divAlerta.lastChild);
    }
}


function divLimpiarFormulario(){
    while(formulario.firstChild){
        formulario.removeChild(formulario.lastChild);
    }
}


//footer redes sociales
const shareButton = document.getElementsByClassName("shareButton");
function redesSociales() {
    shareButton[0].addEventListener("click", (e) => {
        for( let i=0; i < shareButton.length; i++ ) {
        shareButton[i].classList.toggle("open")
        shareButton[0].classList.remove("sent")
        }
    })

    for( let i=1; i < shareButton.length; i++ ) {
    
    shareButton[i].addEventListener("click", (e) => {
        
        for( let i=0; i < shareButton.length; i++ ) {
            shareButton[i].classList.toggle("open")
        }
        shareButton[0].classList.toggle("sent")
        })
    }
}


    //------------------MÉTODOS JQUEY---------------------
    function jQueyCarrusel(){
        $(document).ready(function(){  
            $('.autoplay').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            });
        });
    }
