<?php

require_once "../_com/DAO.php";

$identificador = $_REQUEST["identificador"];
$contrasenna = $_REQUEST["contrasenna"];
$recuerdame = $_REQUEST["recuerdame"];

$arrayUsuario= (DAO::usuarioObtener($identificador, $contrasenna));

if ($arrayUsuario != null) { // HAN venido datos: identificador existía y contraseña era correcta.
    $exito = true;
    DAO::marcarSesionComoIniciada($arrayUsuario);

    if ($recuerdame) {
        DAO::generarCookieRecordar();
    } else {
        DAO::borrarCookieRecordar();
    }
    
} else {
    $exito = false;
}

echo json_encode($exito);