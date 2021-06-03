<?php

require_once "_com/DAO.php";
$arrayUsuarioNuevo["identificador"] = $_REQUEST["identificador"];
$arrayUsuarioNuevo["email"] = $_REQUEST["email"];
$arrayUsuarioNuevo["contrasenna"] = $_REQUEST["contrasenna"];
$arrayUsuarioNuevo["contrasenna2"] = $_REQUEST["contrasenna2"];
$arrayUsuarioNuevo["nombre"] = $_REQUEST["nombre"];
$arrayUsuarioNuevo["apellidos"] = $_REQUEST["apellidos"];


if ($arrayUsuarioNuevo["contrasenna"] !== $arrayUsuarioNuevo["contrasenna2"]) {
   $exito = false;

} else if (!DAO::comprobarIdentificadorDisponible($arrayUsuarioNuevo["identificador"])) {

    if (DAO::crearUsuario($arrayUsuarioNuevo)) {
        $exito = true;
    }

} else {
    $exito = false;
}

echo json_encode($exito);

