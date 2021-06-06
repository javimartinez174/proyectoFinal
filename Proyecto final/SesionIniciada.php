<?php

require_once "_com/DAO.php";

if (DAO::haySesionRamIniciada() || DAO::intentarCanjearSesionCookie()){
    $sesionIniciada = true;
}else if(!DAO::haySesionRamIniciada() && DAO::intentarCanjearSesionCookie()){
    $usuario = obtenerUsuarioPorCookie($_COOKIE["codigoCookie"]);
    marcarSesionComoIniciada($usuario);
    return true;
}else{
    $sesionIniciada = false;
}

echo json_encode($sesionIniciada);
