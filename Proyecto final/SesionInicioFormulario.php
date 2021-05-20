<?php

require_once "_com/DAO.php";

if (DAO::haySesionRamIniciada() || DAO::intentarCanjearSesionCookie()) redireccionar("PaginaPrincipal.php");

$datosErroneos = isset($_REQUEST["datosErroneos"]);
$nuevoUsuario = isset($_REQUEST["nuevo"]);
$sesionCerrada = isset($_REQUEST["cerrarSesion"]);

?>


<html lang=''>

<head>
    <meta charset='UTF-8'>
    <title></title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="_styles/formularioInicio.scss">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</head>

<body>
<div>
    <nav class="navbar navbar-expand-sm">
    <!-- Brand/logo -->
        <a class="navbar-brand" href="#">
            <img src="_img/logo.png" width="100" height="70"/>
        </a>
    
    <!-- Links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#">Inicio</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link 2</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link 3</a>
            </li>
        </ul>
        <ul class="nav navbar-nav ml-auto">
            <li class="nav-item">
                <button type="button" class="ml-auto" data-toggle="modal" data-target="#myModal">
                    Iniciar Sesión
                </button>        
            </li>
        </ul>
    </nav>

    <div class="modal fade" id="myModal">
        <div class="modal-dialog modal-dialog-scrollable modal-sm">
            <div class="modal-content">
                <div class="modal-header justify-content-center">
                    <h2 class="text-center">Iniciar Sesión</h2>
                </div>
                <div class= "modal-body align-items-center justify-content-center" id="formulario">
                    <form method='post' action='SesionInicioComprobar.php'>
                        <table>
                            <tr>
                                <td>
                                    <p>Usuario: </p><br>
                                    <input type='text' name='identificador' id='identificador' placeholder="Usuario"
                                        required/>
                                    <br><br>
                                    <p>Contraseña:</p><br>
                                    <input type='password' name='contrasenna' id='identificador' placeholder="Contraseña"
                                        required/>
                                    <br><br>
                                    <p>Recuérdame:</p>
                                    <label>
                                        <input style="width: 20px;" type='checkbox' name='recordar' id='recordar'>
                                    </label>
                                </td>
                            </tr>
                        </table>
                        <br/>

                        <button type='submit' name='iniciar' value='Iniciar Sesión'>Iniciar Sesion</button>
                        <hr>
                        <p>No tienes cuenta: <a href='UsuarioNuevoFormulario.php'>Regístrate.</a></p>
                    </form>
                    <div class="d-flex">
                        <button type="button" class="ml-auto" data-dismiss="modal">Cancelar</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>