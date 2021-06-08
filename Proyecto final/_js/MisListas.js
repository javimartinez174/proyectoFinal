window.onload = function(){
    cargarListas();
    cargarBreadcrumbs();
    divAlerta = document.getElementById("alerta");
    formulario = document.getElementById("formulario");
    redesSociales();
}

//----------------------------MÉTODOS JQUERY----------------------
function mostrarTooltip(){
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip(
            $('[data-toggle="tooltip"]').click(function () {
                $('[data-toggle="tooltip"]').tooltip("hide");
             }),
        );   
    });
}
//----------------------------MÉTODOS AJAX-------------------------

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

function ajaxCrearNuevaLista(listaInput){
    llamadaAjax("../_php/CrearNuevaLista.php", "nombreLista="+listaInput.value,
    function(texto) {
        
            var exito = JSON.parse(texto);
            if(exito){
                $('#myModal').modal('hide');
                cargarListas();
                crearBtnCrearNuevaLista();
            }
    },
    function(texto) {
 
    }
    );
}

function cargarListas() {
    limpiarDiv();
    crearBtnCrearNuevaLista();
    llamadaAjax("../_php/ObtenerListasUsuario.php", "",
    function(texto) {
        
            var listas = JSON.parse(texto);

            for (var i=0; i<listas.length; i++) {
                domCrearListas(listas[i], i);
            }
    },
    function(texto) {
 
    }
    );
}

function cargarPelisLista(lista, divPelis){
    llamadaAjax("../_php/ObtenerInfoPeliculaPorListaId.php", "id="+parseInt(lista.id),
    function(texto) {
        
            var peliculas = JSON.parse(texto);
        if(peliculas !=null){
            for (var i=0; i<peliculas.length; i++) {
                domCrearPeliculas(peliculas[i], divPelis, lista);
            }
        }
    },
    function(texto) {
 
    });
}

function eliminarLista(listaId){
    llamadaAjax("../_php/EliminarLista.php", "listaId="+parseInt(listaId),
    function(texto) {
        var exito = JSON.parse(texto);
            if(exito){
                limpiarDivAlertas();
                mensaje = "Lista eliminada con exito";
                crearAlerta(mensaje);
                cargarListas();
                crearBtnCrearNuevaLista();
            }
    },
    function(texto) {
        alert("algo ha ido mal")
    });
}

function eliminarPelicula(listaId, peliculaId){
    llamadaAjax("../_php/BorrarPeliculaLista.php", "listaId="+parseInt(listaId)+"&peliculaId="+parseInt(peliculaId),
    function(texto) {
        limpiarDivAlertas();
        mensaje = "Pelicula eliminada con exito"
        crearAlerta(mensaje);
        cargarListas();
    },
    function(texto) {
        alert("algo ha ido mal")
    });
}


//--------------------------MÉTODOS DEL DOM------------------------------------

function crearBtnCrearNuevaLista() {
    limpiarDiv();
    divInsertPeli = document.createElement("div");
    divInsertPeli.setAttribute("class", "divInsertPeli");

    aNuevaLista = document.createElement("button");
    aNuevaLista.setAttribute("id", "abreModal");
    aNuevaLista.setAttribute("class", "nuevaLista")
    aNuevaLista.setAttribute("data-toggle", "modal");
    aNuevaLista.setAttribute("data-target", "#myModal");
    aNuevaLista.setAttribute("href", "#");
    aNuevaLista.innerHTML= "Crear Lista  <i class='fas fa-plus'></i>";

    divInsertPeli.appendChild(aNuevaLista);

    document.getElementById("listasUsuario").appendChild(divInsertPeli);
    document.getElementById("abreModal").addEventListener("click", crearFormularioNuevaLista);
}

function crearFormularioNuevaLista(){
    limpiarDivFormulario();

    pNombreLista=document.createElement("p");
    pNombreLista.innerHTML = "Indique el nombre de su nueva lista: ";

    nombreListaInput = document.createElement("input");
    nombreListaInput.setAttribute("type", "text");
    nombreListaInput.setAttribute("placeholder", "Nombre de la nueva Lista");
    nombreListaInput.setAttribute("required", true);

    var introducir = document.createElement("button");
    introducir.addEventListener("click", function(){
        ajaxCrearNuevaLista(nombreListaInput);
    })
    introducir.setAttribute("name", "crear");
    introducir.setAttribute("class", "crear");
    introducir.innerHTML = "Crear Lista";
    introducir.setAttribute("value", "Crear Lista");

    formulario.appendChild(pNombreLista);
    formulario.appendChild(nombreListaInput);
    formulario.appendChild(introducir);
}

function domCrearListas(lista, i){
    nombreLista = document.createElement("div");
    nombreLista.setAttribute("class", "collapsible container");
    nombreLista.addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
        content.style.maxHeight = null;
        } else {
        content.style.maxHeight = content.scrollHeight + "px";
        } 
    });
    tituloLista = document.createElement("h4");
    tituloLista.innerHTML = lista.nombre
    nombreLista.appendChild(tituloLista);
    document.getElementById("listasUsuario").appendChild(nombreLista);

    divPelis = document.createElement("div");
    divPelis.setAttribute("class", "content");
    divPelis.setAttribute("id", lista.nombre);
    document.getElementById("listasUsuario").appendChild(divPelis);

    if(i != 0){
        btnEliminarLista = document.createElement("button");
        btnEliminarLista.innerHTML = "X";
        btnEliminarLista.setAttribute("class", "eliminarLista");
        btnEliminarLista.setAttribute("data-toggle", "tooltip");
        btnEliminarLista.setAttribute("title", "Eliminar "+lista.nombre);
        btnEliminarLista.setAttribute("data-placement", "bottom");
        btnEliminarLista.addEventListener("click", function(){
            eliminarLista(lista.id);
        });

        nombreLista.appendChild(btnEliminarLista);
    }
    cargarPelisLista(lista, divPelis);
}


function crearAlerta(mensaje){
    
    modal = document.createElement("div");
    modal.setAttribute("class", "modal");
    modal.setAttribute("id", "modalAlerta");

    modalDialog = document.createElement("div");
    modalDialog.setAttribute("class", "modal-dialog modal-dialog-centered modal-sm");
   

    alerta = document.createElement("div");
    alerta.setAttribute("class", "alert alert-success");
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

function domCrearPeliculas(pelicula, divPelis, lista){
    
    contenedorPelicula = document.createElement("div");
    contenedorPelicula.setAttribute("class", "containerPeli");
    aPeli = document.createElement("a");
    aPeli.setAttribute("href", "Pelicula.html?verinfo="+pelicula.id);
    imgPeli = document.createElement("img");
    imgPeli.setAttribute("src", "../_img/"+pelicula.caratula);
    imgPeli.setAttribute("data-toggle", "tooltip");
    imgPeli.setAttribute("title", pelicula.nombre);
    imgPeli.setAttribute("data-placement", "top");
    

    saltoLinea = document.createElement("br");
    eliminarPeli = document.createElement("button");
    eliminarPeli.innerHTML = "X";
    eliminarPeli.setAttribute("data-toggle", "tooltip");
    eliminarPeli.setAttribute("title", "Eliminar de "+lista.nombre);
    eliminarPeli.setAttribute("data-placement", "top");
    eliminarPeli.addEventListener("click", function(){
        eliminarPelicula(lista.id, pelicula.id);
    });
    aPeli.appendChild(imgPeli);
    divPelis.appendChild(contenedorPelicula);
    contenedorPelicula.appendChild(aPeli);
    contenedorPelicula.appendChild(eliminarPeli);

    mostrarTooltip();
}

function cargarBreadcrumbs() {
    var breadcrumbs = document.createElement("li");
    breadcrumbs.innerHTML = "Mis Listas";
    document.getElementById("breadcrumb").appendChild(breadcrumbs);
}

//-------------------------------UTILIDADES-------------------------------

function limpiarDivFormulario() {
    while(formulario.firstChild){
        formulario.removeChild(formulario.lastChild);
    }
 }


function limpiarDivAlertas(){
    while(divAlerta.firstChild){
        divAlerta.removeChild(divAlerta.lastChild);
    }
}
function limpiarDiv(){
    while(listasUsuario.firstChild){
        listasUsuario.removeChild(listasUsuario.lastChild);
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