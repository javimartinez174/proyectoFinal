<?php

require_once "_com/DAO.php";
$arrayUsuarioNuevo["identificador"] = $_REQUEST["identificador"];
$arrayUsuarioNuevo["email"] = $_REQUEST["email"];
$arrayUsuarioNuevo["contrasenna"] = $_REQUEST["contrasenna"];
$arrayUsuarioNuevo["contrasenna2"] = $_REQUEST["contrasenna2"];
$arrayUsuarioNuevo["nombre"] = $_REQUEST["nombre"];
$arrayUsuarioNuevo["apellidos"] = $_REQUEST["apellidos"];

$identificador = $arrayUsuarioNuevo["identificador"];
$nombre = $arrayUsuarioNuevo["nombre"];
$apellidos = $arrayUsuarioNuevo["apellidos"];
$email = $arrayUsuarioNuevo["email"];

if ($arrayUsuarioNuevo["contrasenna"] !== $arrayUsuarioNuevo["contrasenna2"]) {
    json_encode("Las contraseñas deben ser iguales");

} else if (!DAO::comprobarIdentificadorDisponible($arrayUsuarioNuevo["identificador"])) {

    if (DAO::crearUsuario($arrayUsuarioNuevo)) {
        redireccionar("PaginaPrincipal.html");
    }

} else {
    json_encode("Identificador no disponible");
}

