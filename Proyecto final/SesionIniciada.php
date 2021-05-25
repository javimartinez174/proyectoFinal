<?php

require_once "_com/DAO.php";

if (DAO::haySesionRamIniciada() || DAO::intentarCanjearSesionCookie()){
    $sesionIniciada = true;
}else{
    $sesionIniciada = false;
}

$datosErroneos = isset($_REQUEST["datosErroneos"]);
$nuevoUsuario = isset($_REQUEST["nuevo"]);
$sesionCerrada = isset($_REQUEST["cerrarSesion"]);

echo json_encode($sesionIniciada);
