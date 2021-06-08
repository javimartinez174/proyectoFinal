<?php

require_once "../_com/DAO.php";

if (DAO::haySesionRamIniciada() && DAO::intentarCanjearSesionCookie()){
    $sesionIniciada = true;
}else if(!DAO::haySesionRamIniciada() && DAO::intentarCanjearSesionCookie()){
    $usuario = DAO::obtenerUsuarioPorCookie($_COOKIE["codigoCookie"]);
    DAO::marcarSesionComoIniciada($usuario);
    $sesionIniciada = true;
}else{
    $sesionIniciada = false;
}

echo json_encode($sesionIniciada);
